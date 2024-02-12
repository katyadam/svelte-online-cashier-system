import type { Transaction, TransactionDto } from "$lib/interfaces/Transaction";
const apiUrl = import.meta.env.VITE_API_URL;

export const createTransaction = async (transactionDto: TransactionDto) => {
	
	const response = await fetch(`${apiUrl}/transactions`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			"Authorization": `Bearer ${localStorage.getItem("token")}`
		},
		body: JSON.stringify(transactionDto),
	});
	
	if (!response.ok) {
		throw new Error(`Failed to create Transaction: ${response.statusText}`);
	}
	
	return response.json();
}

export const getUserTransactions = async (userId: number): Promise<Transaction[]> => {
	const response = await fetch(`${apiUrl}/users/${userId}/transactions`, {
		method: "GET",
		headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
	});
	
	return response.json();
}