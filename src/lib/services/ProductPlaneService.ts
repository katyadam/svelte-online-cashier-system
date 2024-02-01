import type { ProductPlane, ProductPlaneDto } from "$lib/interfaces/ProductPlane";
const apiUrl = import.meta.env.VITE_API_URL;


export const getProductsPlanes = async (userId: number): Promise<ProductPlane[]> => {
	const response = await fetch(`${apiUrl}/users/${userId}/product-planes`);
	return response.json();
}

export const getProductPlane = async (productPlaneId: string): Promise<ProductPlane> => {
    const response = await fetch(`${apiUrl}/product-planes/${productPlaneId}`);
    return response.json();
}

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