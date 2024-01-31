import type { Product } from "./Product";

export interface Transaction {
    id: number;
    record: string;
}

export interface TransactionDto {
  record: string;
  userId: number;
}