import type { Product } from "$lib/interfaces/Product";
import { shopProducts, totalCount } from "../../store";

export const addProduct = (product: Product) => {
    shopProducts.update((currentShopProducts) => {
        const newShopProducts = new Map(currentShopProducts);

        if (newShopProducts.has(product)) {
            const currAmount = newShopProducts.get(product);

            if (currAmount !== undefined && currAmount > 0) {
                newShopProducts.set(product, currAmount + 1);
            } else {
                console.error("Invalid product amount!");
            }
        } else {
            newShopProducts.set(product, 1);
        }

        totalCount.update((currentTotalCount) => currentTotalCount + 1);

        return newShopProducts;
    });
};

export const removeProduct = (id: number) => {
    shopProducts.update((currShopProducts) => {
        const newShopProducts = new Map(currShopProducts);

        for (const [product, amount] of newShopProducts) {
            if (product.id === id) {
                newShopProducts.delete(product);
                totalCount.update((curr) => curr - amount);
                break;
            }
        }
        return newShopProducts;
    });
};

export const decrProduct = (product: Product) => {
    shopProducts.update((currShopProducts) => {
        const newShopProducts = new Map(currShopProducts);

        if (newShopProducts.has(product)) {
            let currentAmount = newShopProducts.get(product);
            if (currentAmount == 1) {
                removeProduct(product.id);
                return new Map();
            } else {
                newShopProducts.set(product, currentAmount ? currentAmount - 1 : 0);
            }
        }
        totalCount.update((curr) => curr - 1);
        return newShopProducts
    });
};