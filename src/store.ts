import { writable, type Writable } from "svelte/store";

export const storeSelectedCurrency: Writable<string> = writable("CZK");

export const storeCurrencyRates: Writable<{[currency: string]: number}> = writable({});