// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  env: 'LOCAL',
  baseAPIUrl: 'https://restaurant-simon-project.page:8443/api/restaurant/v1',
  api: {
    administrator: 'administrators',
    waiter: 'waiters',
    menu: 'menus',
    order: 'orders',
    table: 'tables',
    checkout: 'checkouts',
  },
};