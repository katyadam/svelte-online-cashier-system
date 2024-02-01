export interface Transaction {
    id: number;
    record: string;
    creationTime: number;
}

export interface TransactionDto {
	record: string;
	userId: number;
}