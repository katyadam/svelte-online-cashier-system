<script lang="ts">
    import { getCurrencyList} from "$lib/api";
    import { onMount } from "svelte";
    import ImportForm from "./ImportForm.svelte";
    import { updateProductPlane } from "$lib/services/ProductPlaneService";
    import type { ProductPlane, ProductPlaneDto } from "$lib/interfaces/ProductPlane";

    export let openShopPanel: Function | undefined;
    export let filterData: Function;
    export let productPlane: ProductPlane;
    export let totalCount: number;
    export let setCurrency: Function;

    let searchTerm: string = "";
    let currencyList: string[];
    onMount(async () => {
        currencyList = await getCurrencyList();
    })

    let selectedCurrency: String = "CZK";

    let showFilesForm = false;

    const openFilesForm = () => showFilesForm = true;
    const closeFilesForm = () => showFilesForm = false;

    let editMode = false;
    const openEditMode = () => {
        editMode = true;
    }

    const editName = async () => {
        if (productPlane) {
                const updatedProductPlane: ProductPlaneDto = {
                name: productPlane.name,
                userId: 1 // TODO
            }
            updateProductPlane(productPlane?.id, updatedProductPlane);
        }
        editMode = false;
    }

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
            {#if productPlane}
                {#if editMode}
                    <form class="edit-form" on:submit={editName}>
                        <input type="text" bind:value={productPlane.name}>
                        <button class="material-icons">done</button>
                    </form>
                {:else}
                    <button class="title" on:dblclick={openEditMode}>{productPlane.name}</button>
                {/if}
            {/if}
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
                    <ImportForm productPlaneId={productPlane?.id}/>
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
    }

    .left-side {
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .title {
        min-width: 80px;
        font-size: 20px;
        text-decoration: none;
        margin-right: 10px;
        border: none;
        text-decoration: none;
        background: none;
        cursor: text;
    }

    .right-side {
        padding: 10px;
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

    .edit-form {
        display: flex;
        justify-content: space-around;
    }

    .edit-form button {
        border: none;
        background-color: #55fb1e;
        transition: background-color 0.3s ease;
        cursor: pointer;
        color: white;
        border-radius: 50%;
        padding: 5px;
    }
    .edit-form button:hover {
        background-color: #5cd41b;
    }

    @media (max-width: 768px) {
        .header {
			display: flex;
			flex-direction: column;
		}
    }
</style>
