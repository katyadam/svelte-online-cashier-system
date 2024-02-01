const apiUrl = import.meta.env.VITE_API_URL;

interface CurrencyResponse {
    [code: string]: string
}

export const getCurrencyList = async () => {
    const response = await fetch("https://api.frankfurter.app/currencies");
    const result: CurrencyResponse = await response.json();
    
    return Object.keys(result);
}