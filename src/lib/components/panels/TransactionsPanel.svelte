<script lang="ts">
    import { getUserTransactions } from "$lib/services/TransactionService";
    import type { Transaction } from "$lib/interfaces/Transaction";
    import { onMount } from "svelte";
    import TransactionCard from "../cards/TransactionCard.svelte";
    import { getStoredUser } from "$lib/interfaces/User";

    let txs:  Transaction[];

    onMount(async () => {
        try {
            let user = getStoredUser();
            if (user != null) {
                txs = await getUserTransactions(user.id);
            }
        } catch (error) {
            console.error(error);
        }
    })

</script>

<head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</head>

<div class="transactions-box">
    <h2>Completed transactions</h2>
    {#if txs}
        {#each txs as tx (tx.id)}
            <div>
                <TransactionCard transaction={tx}/>
            </div>
        {/each}
    {/if}
</div>

<style>
    .transactions-box {
        display: flex;
        flex-direction: column;
        padding: 5px;
    }
  
    .transactions-box h2 {
        font-size: 20px;
        margin-bottom: 20px;
        align-self: center;
    }
</style>