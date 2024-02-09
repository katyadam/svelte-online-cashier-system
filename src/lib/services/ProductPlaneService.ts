import type { ProductPlane, ProductPlaneDto } from "$lib/interfaces/ProductPlane";
const apiUrl = import.meta.env.VITE_API_URL;


export const getProductsPlanes = async (userId: number): Promise<ProductPlane[]> => {
    
	const response = await fetch(`${apiUrl}/users/${userId}/product-planes`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huZG9lMUBnbWFpbC5jb20iLCJpYXQiOjE3MDc0ODA3MjYsImV4cCI6MTcwNzU2NzEyNn0.jJhBh9CwHu7Nk9m35iAS-jqHsGOvZnWR9YgL1CdWCm8",
        },
        credentials: "include"
    });
    
	return response.json();
}

export const getProductPlane = async (productPlaneId: string): Promise<ProductPlane> => {
    const response = await fetch(`${apiUrl}/product-planes/${productPlaneId}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huZG9lMUBnbWFpbC5jb20iLCJpYXQiOjE3MDc0ODA3MjYsImV4cCI6MTcwNzU2NzEyNn0.jJhBh9CwHu7Nk9m35iAS-jqHsGOvZnWR9YgL1CdWCm8",
        },
        credentials: "include"
    });
    return response.json();
}

export const createProductPlane = async (productPlaneDto: ProductPlaneDto) => {
    const response = await fetch(`${apiUrl}/product-planes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huZG9lMUBnbWFpbC5jb20iLCJpYXQiOjE3MDc0ODA3MjYsImV4cCI6MTcwNzU2NzEyNn0.jJhBh9CwHu7Nk9m35iAS-jqHsGOvZnWR9YgL1CdWCm8"
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
              "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huZG9lMUBnbWFpbC5jb20iLCJpYXQiOjE3MDc0ODA3MjYsImV4cCI6MTcwNzU2NzEyNn0.jJhBh9CwHu7Nk9m35iAS-jqHsGOvZnWR9YgL1CdWCm8"
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
              "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huZG9lMUBnbWFpbC5jb20iLCJpYXQiOjE3MDc0ODA3MjYsImV4cCI6MTcwNzU2NzEyNn0.jJhBh9CwHu7Nk9m35iAS-jqHsGOvZnWR9YgL1CdWCm8"
          },
          body: JSON.stringify(productPlaneDto)
      });
  
      if (!response.ok) {
          throw new Error(`Failed to update ProductPlane: ${response.statusText}`);
      }
  
      return response.json();
  }