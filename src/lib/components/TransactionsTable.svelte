<script lang="ts">
    import { getUserTransactions } from "$lib/api";
    import type { Transaction } from "$lib/interfaces/Transaction";
    import { onMount } from "svelte";
    import type { Product } from "$lib/interfaces/Product";
    import TransactionCard from "./TransactionCard.svelte";

    let txs:  Transaction[];

    onMount(async () => {
        try {
            txs = await getUserTransactions(1);
        } catch (error) {
            console.error(error);
        }
    })

    let shopProducts = new Map<Product, number>();
    const parseRecord = (record: string): Map<Product, number> => {
        const jsonObject: { [key: string]: number } = JSON.parse(record);
        

        for (const [productJson, amount] of Object.entries(jsonObject)) {
            const product: Product = JSON.parse(productJson);
            shopProducts.set(product, amount);
        }
        console.log(shopProducts);
        
        return shopProducts;
    }

</script>

<head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</head>

<div>
    <h2>Completed transactions</h2>
    {#if txs}
        {#each txs as tx (tx.id)}
            <div>
                <TransactionCard shopProducts={parseRecord(tx.record)}/>
            </div>
        {/each}
    {/if}
</div>

<style>
    .new-lines {
        white-space: inherit;
    }
</style>