pipeline {
    agent any
    triggers {
        githubPush()
    }
    stages {
        stage('Build Docker UI image') {
            steps {
                echo 'Building service image and pushing it to DockerHub'
                    withCredentials([usernamePassword(credentialsId: 'Docker', usernameVariable: 'dockerLogin',
                        passwordVariable: 'dockerPassword')
                ]) {
                            sh script: "docker login -u ${dockerLogin} -p ${dockerPassword}"
                            sh script: "docker image build -t ${dockerLogin}/restaurant-ui ."
                            sh script: "docker push ${dockerLogin}/restaurant-ui"
                }
                echo 'Building UI image and pushing it to DockerHub is successful done'
            }
        }
        stage('Deploy On AWS EC2 Instance') {
            steps { withCredentials([string(credentialsId: 'Restaurant-Service-EC2-URL',variable: "host"),
                        usernamePassword(credentialsId: 'Docker', usernameVariable: 'dockerLogin',
                        passwordVariable: 'dockerPassword'),
                        sshUserPrivateKey(credentialsId: 'AWS-Keypair', keyFileVariable: 'identity',
                        passphraseVariable: '', usernameVariable: 'userName')
                ]) {
                    script {
                        def remote = [:]
                            remote.user = userName
                            remote.host = host
                            remote.name = userName
                            remote.identityFile = identity
                            remote.allowAnyHosts = 'true'
//                             sshCommand remote: remote, command: 'docker container kill https-restaurant-ui'
//                             sshCommand remote: remote, command: 'docker rm -v https-restaurant-ui'
//                             sshCommand remote: remote, command: "docker rmi ${dockerLogin}/restaurant-ui:latest"
                            sshCommand remote: remote, command: "docker login | docker pull ${dockerLogin}/restaurant-ui"
                            sshCommand remote: remote, command: "docker container run -d -p 443:443 --name https-restaurant-ui ${dockerLogin}/restaurant-ui"
                            sshCommand remote: remote, command: 'exit'
                    }
                    timeout(time: 90, unit: 'SECONDS') {
                        waitUntil(initialRecurrencePeriod: 2000) {
                            script {
                                def result =
                                sh script: 'curl -k --silent --output /dev/null https://${host}:443',
                                returnStatus: true
                                return (result == 0)
                            }
                        }
                    }
                        echo 'Angular UI is up'
                }
            }
        }
        stage('Clean Docker Images') {
            steps {
                echo 'Starting Deleting Created Docker Images'
                sh script: 'docker system prune -af --volumes'
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
