import type { ProductPlane, ProductPlaneDto } from "$lib/interfaces/ProductPlane";
import { getStoredUser, type User } from "$lib/interfaces/User";
const apiUrl = import.meta.env.VITE_API_URL;


export const getProductsPlanes = async (userId: number): Promise<ProductPlane[]> => {
    
	const response = await fetch(`${apiUrl}/users/${userId}/product-planes`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        credentials: "include"
    });
    
	return response.json();
}

const authorizeUserProductPlane = async (productPlaneId: string) => {
    let user: User | null = getStoredUser();
    if (user != null) {
        const productPlanes: ProductPlane[] = await getProductsPlanes(user.id);
        return productPlanes.some(pp => pp.id == parseInt(productPlaneId));
    }
    return false;
}

export const getProductPlane = async (productPlaneId: string): Promise<ProductPlane> => {
    const canBeAccessed = await authorizeUserProductPlane(productPlaneId);
    if (!canBeAccessed) {
        window.location.href = "/err"
        throw new Error("Unauthorized access!");
    }
    
    const response = await fetch(`${apiUrl}/product-planes/${productPlaneId}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
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
        "Authorization": `Bearer ${localStorage.getItem("token")}`
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
            "Authorization": `Bearer ${localStorage.getItem("token")}`
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
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(productPlaneDto)
    });
  
    if (!response.ok) {
        throw new Error(`Failed to update ProductPlane: ${response.statusText}`);
    }
  
    return response.json();
  }