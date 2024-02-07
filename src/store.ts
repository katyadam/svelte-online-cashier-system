import { writable, type Writable } from "svelte/store";

export const storeSelectedCurrency: Writable<string> = writable("CZK");

export const storeCurrencyRates: Writable<{[currency: string]: number}> = writable({});

export const showProductPlaneCreate: Writable<boolean> = writable(false);
export const showTransactions: Writable<boolean> = writable(false);