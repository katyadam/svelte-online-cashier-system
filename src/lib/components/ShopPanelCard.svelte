<script lang="ts">
    import type { Product } from "$lib/interfaces/Product";
    import { afterUpdate, onMount } from "svelte";
    import { storeCurrencyRates, storeSelectedCurrency } from "../../store";

    export let removeProduct: Function;
    export let addProduct: Function;
    export let decrProduct: Function;
    export let product: Product;
    export let amount: number;

    let currencyRate: number;
	const setCurrencyRate = () => {
		if (product != null) {
            if (product.currency == $storeSelectedCurrency) {
                currencyRate = 1;
            } else {
                currencyRate = $storeCurrencyRates[product.currency];
            }
		}
	}

    onMount(() => setCurrencyRate());

</script>

<head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</head>

<div class="card-container">
    <div>
        <span>{product.name}</span>
        <span>{Math.trunc((product.price / currencyRate) * 100) / 100} {$storeSelectedCurrency}</span>
        <span>{amount}x</span>
    </div>
    <div>
        <button class="material-icons" on:click={() => addProduct(product)}>add</button>
        <button class="material-icons" on:click={() => decrProduct(product)}>remove</button>
        <button on:click={() => removeProduct(product.id)}>Delete</button>
    </div>
</div>

<style>
    .card-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin: 5px;
        background-color: #f9f9f9;
    }

    .card-container span {
        margin-right: 10px;
        overflow: scroll;

    }

    .card-container button {
        font-size: 15px;
        background-color: #ff5f5f;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 3px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .card-container button:hover {
        background-color: #e04848;
    }
</style>