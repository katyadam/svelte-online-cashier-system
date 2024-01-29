import type { Category } from "./Category";

export interface Product {
    id: number;
    name: string;
    category: Category;
}

export interface ProductDto {
    name: string;
    productPlaneId: number;
    categoryId: number;
}