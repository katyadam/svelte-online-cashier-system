export interface User {
    id: number;
    givenName: string;
    familyName: string;
    email: string;
    password: string;
    role: string;
    exp: number;
}

export const getStoredUser = (): User | null => {
    let userJson = localStorage.getItem("user");
    if (userJson == null) {
        return null;
    }
    return JSON.parse(userJson);
}