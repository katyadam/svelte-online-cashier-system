export interface AuthRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    givenName: string;
    familyName: string;
    email: string;
    password: string;
    role: string;
}

export interface AuthResponse {
    access_token: string;
    refresh_token: string;
}