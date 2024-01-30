<script lang="ts">
    import type { Product } from "$lib/interfaces/Product";
    import ShopPanelCard from "./ShopPanelCard.svelte";

    export let shopProducts: Map<Product, number>;
    export let removeProduct: Function;
    export let addProduct: Function;
    export let decrProduct: Function;

    export let totalPrice: number;

</script>

<head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</head>

<div>
    <div class="top-bar">
        <span>Total price: {totalPrice}</span>
        <button>
            <span>Process</span>
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

