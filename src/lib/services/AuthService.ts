import type { AuthRequest, AuthResponse, RegisterRequest } from "$lib/interfaces/Auth";
import type { User } from "$lib/interfaces/User";
import { jwtDecode } from "jwt-decode";

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

export const logout = async () => {
    await fetch(`${apiUrl}/auth/logout`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });
    localStorage.clear();
    window.location.href = "/"
}

export const logPublicUser = async () => {
    const response: AuthResponse = await loginUser({email: "public", password: "public"});
    setLocalStorage(response);
    window.location.href = "/userspace";
}

export const setLocalStorage = (authResponse: AuthResponse) => {
    localStorage.setItem("token", authResponse.access_token);
    localStorage.setItem("user", JSON.stringify(jwtDecode<User>(authResponse.access_token)));
}