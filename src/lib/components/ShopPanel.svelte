<script lang="ts">
    import { createTransaction } from "$lib/services/TransactionService";
    import type { Product } from "$lib/interfaces/Product";
    import type { TransactionDto } from "$lib/interfaces/Transaction";
    import ShopPanelCard from "./ShopPanelCard.svelte";
    import { storeCurrencyRates, storeSelectedCurrency } from "../../store";
    import { afterUpdate } from "svelte";

    export let shopProducts: Map<Product, number>;
    export let removeProduct: Function;
    export let addProduct: Function;
    export let decrProduct: Function;


    const createRecord = (): string => {
        const jsonObject: { [key: string]: number } = {};
        for (const [product, amount] of shopProducts) {
            const productKey = JSON.stringify(product);
            jsonObject[productKey] = amount;
        }

        return JSON.stringify(jsonObject);
    }

    const handleProceed = () => {
        if (shopProducts.size == 0) {
            return;
        }
        let transactionDto: TransactionDto = {
            record: createRecord(),
            userId: 1, // TODO
        }
        
        createTransaction(transactionDto);
        location.reload();
    }
    
    let totalPrice: number = 0;
    const countTotalPrice = (): void => {
        totalPrice = 0;
        for (const [product, amount] of shopProducts) {
            if (product.currency == $storeSelectedCurrency) {
                totalPrice += product.price * amount;
            } else {
                totalPrice += (product.price * amount) / $storeCurrencyRates[product.currency]
            }
        }
    }

    afterUpdate(() => countTotalPrice())

</script>

<head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</head>

<div>
    <div class="top-bar">
        <span>Total price: {Math.trunc((totalPrice) * 100) / 100} {$storeSelectedCurrency}</span>
        <button on:click={handleProceed}>
            <span>Proceed</span>
            <span class="material-icons">arrow_forward</span>
        </button>
    </div>
    {#each shopProducts as [product, amount]}
        <ShopPanelCard
            product={product}
            removeProduct={removeProduct}
            amount={amount}
            addProduct={addProduct}
            decrProduct={decrProduct}
        />
    {/each}
</div>

<style>
    .top-bar {
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
    }
    .top-bar button {
        display: flex;
        align-items: end;
        background-color: #55fb1e;
        border: none;
        cursor: pointer;
        padding: 7px;
        transition: background-color 0.3s ease;
    }   
    .top-bar button:hover {
        background-color: #5cd41b;
    }
    .top-bar button span {
        margin-left: 7px;
    }
</style>

