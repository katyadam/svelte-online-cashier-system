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

export const importProducts = async (event: Event, productPlaneId: number, files: FileList) => {
    event.preventDefault()

    const formData = new FormData();
    formData.append('file', files[0]);

    const response = await fetch(`${apiUrl}/products/upload/${productPlaneId}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: formData,
    });
}