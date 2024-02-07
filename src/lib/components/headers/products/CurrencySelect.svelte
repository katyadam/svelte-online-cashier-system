<script lang="ts">
    import { getCurrencyList, getRatesList } from "$lib/api";
    import { onMount } from "svelte";
    import { storeCurrencyRates, storeSelectedCurrency } from "../../../../store";
    
    let selectedCurrency: string = "CZK";
    let currencyList: string[];

    onMount(async () => {
        currencyList = await getCurrencyList();
    })

    const setCurrency = async (currency: string): Promise<void> => {
		$storeSelectedCurrency = currency;
		$storeCurrencyRates = await getRatesList(currency);
	}
	setCurrency("CZK");
</script>

{#if currencyList}
    <select
        class="currency-list"
        id="currency" 
        bind:value={selectedCurrency}
        on:change={() => setCurrency(selectedCurrency)}
        >
        {#each currencyList as currency (currency)}
            <option value={currency}>{currency}</option>
        {/each}
    </select>
{/if}

<style>
    .currency-list {
        margin: 15px;
        border: none;
        font-size: 20px;
        cursor: pointer;
    }
</style>