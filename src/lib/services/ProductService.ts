import type { ProductDto } from "$lib/interfaces/Product";
const apiUrl = import.meta.env.VITE_API_URL;

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