import type { Product } from "$lib/interfaces/Product";
import { writable, type Writable } from "svelte/store";

// Currency handeling
export const storeSelectedCurrency: Writable<string> = writable("CZK");
export const storeCurrencyRates: Writable<{[currency: string]: number}> = writable({});

// Product planes page
export const showProductPlaneCreate: Writable<boolean> = writable(false);
export const showTransactions: Writable<boolean> = writable(false);

// Products page
export const showProductCreate: Writable<boolean> = writable(false);
export const showProductEdit: Writable<boolean> = writable(false);
export const productToEdit: Writable<Product> = writable();
export const showShopPanel: Writable<boolean> = writable(false);

export const shopProducts: Writable<Map<Product, number>> = writable(new Map());
export const totalCount: Writable<number> = writable(0)
