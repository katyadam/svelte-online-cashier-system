import type { ProductPlaneDto } from "./interfaces/ProductPlane";
import type { ProductDto } from "./interfaces/Product";
import type { TransactionDto, Transaction } from "./interfaces/Transaction";

const apiUrl = 'http://localhost:8080';

export const createProductPlane = async (productPlaneDto: ProductPlaneDto) => {
  const response = await fetch(`${apiUrl}/product-planes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productPlaneDto),
  });

  if (!response.ok) {
    throw new Error(`Failed to create ProductPlane: ${response.statusText}`);
  }

  return response.json();
};

export const createProduct = async (productDto: ProductDto) => {
  const response = await fetch(`${apiUrl}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productDto),
  });

  if (!response.ok) {
    throw new Error(`Failed to create ProductPlane: ${response.statusText}`);
  }

  return response.json();
};

export const deleteProductPlane = async (id: number | undefined) => {
    if (id == undefined) {
		throw new Error(`Failed to remove ProductPlane, undefined id.`);
	}

	const response = await fetch(`${apiUrl}/product-planes/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		}
	});

	if (!response.ok) {
		throw new Error(`Failed to remove ProductPlane: ${response.statusText}`);
	}

	return response.json()
}

export const deleteProduct = async (id: number | undefined) => {
	if (id == undefined) {
		throw new Error(`Failed to remove ProductPlane, undefined id.`);
	}
	

    const response = await fetch(`${apiUrl}/products/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		}
	});

	if (!response.ok) {
		throw new Error(`Failed to remove Product: ${response.statusText}`);
	}

	return response.json()
}

export const updateProductPlane = async (id: number | undefined, productPlaneDto: ProductPlaneDto) => {
	if (id == undefined) {
		throw new Error(`Failed to update ProductPlane, undefined id.`);
	}

	const response = await fetch(`${apiUrl}/product-planes/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(productPlaneDto)
	});

	if (!response.ok) {
		throw new Error(`Failed to update ProductPlane: ${response.statusText}`);
	}

	return response.json();
}

export const updateProduct = async (id: number | undefined, productDto: ProductDto) => {
	if (id == undefined) {
		throw new Error(`Failed to update Product, undefined id.`);
	}

	const response = await fetch(`${apiUrl}/products/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(productDto)
	});

	if (!response.ok) {
		throw new Error(`Failed to update Product: ${response.statusText}`);
	}

	return response.json();
}

export const createTransaction = async (transactionDto: TransactionDto) => {
	
	const response = await fetch(`${apiUrl}/transactions`, {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify(transactionDto),
	  });
	
	  if (!response.ok) {
		throw new Error(`Failed to create Transaction: ${response.statusText}`);
	  }
	
	  return response.json();
}

interface TransactionsResponse {
	content: Transaction[];
  }

export const getUserTransactions = async (userId: number): Promise<Transaction[]> => {
	const response = await fetch(`${apiUrl}/transactions`);
	const result: TransactionsResponse = await response.json();
	return result.content;
}