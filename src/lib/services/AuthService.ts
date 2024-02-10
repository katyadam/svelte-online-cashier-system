import type { AuthRequest, AuthResponse, RegisterRequest } from "$lib/interfaces/Auth";

const apiUrl = import.meta.env.VITE_API_URL;

export const loginUser = async (authRequest: AuthRequest): Promise<AuthResponse> => {
    const response = await fetch(`${apiUrl}/auth/authenticate`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(authRequest)
    });
    
    return response.json();
}

export const registerUser = async (registerRequest: RegisterRequest): Promise<AuthResponse> => {
    const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerRequest)
    });

    return response.json();
}