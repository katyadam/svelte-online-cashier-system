import type { Product } from "./Product";

export interface ProductPlane {
    id: number;
    name: string;
    productSet: Product[];
}

export interface ProductPlaneDto {
  name: string;
  userId: number;
}
