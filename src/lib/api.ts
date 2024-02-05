const apiUrl = import.meta.env.VITE_API_URL;

interface CurrencyResponse {
    [code: string]: string
}

export const getCurrencyList = async () => {
    const response = await fetch("https://api.frankfurter.app/currencies");
    const result: CurrencyResponse = await response.json();
    
    return Object.keys(result);
}

interface RatesList {
    rates: {
        [currency: string]: number
    }
}
export const getRatesList = async (from: string) => {
    const response = await fetch(`https://api.frankfurter.app/latest?from=${from}`);
    const result: RatesList = await response.json();
    
    return result.rates;
}