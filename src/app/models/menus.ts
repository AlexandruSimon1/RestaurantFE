import { EnumType } from 'typescript';

export class Menus {
    id: number;
    categoryType: string;
    name: string;
    description: string;
    price: number;
    constructor(menus: any) {
        this.id = menus.id;
        this.categoryType = menus.categorytype;
        this.name = menus.name;
        this.price = menus.price;
    }
}
