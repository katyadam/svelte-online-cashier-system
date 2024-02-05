<script lang="ts">
    import { getCurrencyList} from "$lib/api";
    import { onMount } from "svelte";
    import ImportForm from "./ImportForm.svelte";

    export let openShopPanel: Function | undefined;
    export let filterData: Function;
    export let entityName: String | undefined;
    export let totalCount: number;
    export let setCurrency: Function;
    export let productPlaneId: number | undefined;

    let searchTerm: string = "";
    let currencyList: string[];
    onMount(async () => {
        currencyList = await getCurrencyList();
    })

    let selectedCurrency: String = "CZK";

    let showFilesForm = false;

    const openFilesForm = () => showFilesForm = true;
    const closeFilesForm = () => showFilesForm = false;

</script>

<head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</head>

<header>
    <div class="header">
        <div class="left-side">
            <div class="search-bar">
                <input type="text" placeholder="Search..." bind:value={searchTerm} on:input={filterData(searchTerm)}/>
            </div>
        </div>
        <div class="right-side">
            {#if currencyList}
                <select
                    class="currency-list"
                    id="currency" 
                    bind:value={selectedCurrency}
                    on:change={setCurrency(selectedCurrency)}
                >
                    {#each currencyList as currency (currency)}
                        <option value={currency}>{currency}</option>
                    {/each}
                </select>
            {/if}
            <span class="title">{entityName}</span>
            <button class="import-button material-icons" title="Import products" on:click={openFilesForm} >cloud_upload</button>
            {#if openShopPanel != null}
                <button class="import-button" title="checkout" on:click={() => openShopPanel ? openShopPanel() : undefined}>
                    <span class="material-icons">shopping_cart</span>
                    {#if totalCount > 0}
                        <span class="item-count">{totalCount}</span>
                    {/if}
                </button>
            {/if}

            {#if showFilesForm}
                <button class="file-form-overlay" on:click={closeFilesForm}></button>
                <div class="file-form">
                    <ImportForm productPlaneId={productPlaneId}/>
                </div>
            {/if}
        </div>
    </div>
</header>

<style>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
    }

    .left-side {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .title {
        font-size: 20px;
        text-decoration: none;
        margin-right: 10px;
    }

    .right-side {
        display: flex;
        align-items: center;
    }

    .search-bar {
        display: flex;
        align-items: center;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 5px;
        margin-right: 10px;
    }

    .import-button {
        cursor: pointer;
        margin-left: 10px;
        background: none;
        border: none;
        position: relative;
    }

    input {
        border: none;
        outline: none;
        width: 200px;
        padding: 5px;
    }

    .item-count {
        position: absolute;
        top: -40%;
        right: -35%;
        background-color: red;
        color: white;
        border-radius: 60%;
        padding: 5px 8px;
        font-size: 12px;
    }

    .currency-list {
        margin: 15px;
        border: none;
        font-size: 20px;
        cursor: pointer;
    }

    .file-form {
        position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: white;
		padding: 20px;
		border: 1px solid #ccc;
		z-index: 1000;
    }

	.file-form-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(186, 186, 186, 0.5);
		z-index: 999;
	}
</style>
