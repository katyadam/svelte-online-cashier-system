<script lang="ts">
    export let entityName: String | undefined;
    export let openShopPanel: Function | undefined;
    export let totalCount: number;
</script>

<head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</head>

<header>
    <div class="header">
        <div class="left-side">
            <div class="search-bar">
                <input type="text" placeholder="Search..." />
            </div>
        </div>
        <div class="right-side">
            <span class="title">{entityName}</span>
            <button class="import-button material-icons" title="Import product planes" >cloud_upload</button>
            {#if openShopPanel != null}
                <button class="import-button" title="checkout" on:click={() => openShopPanel ? openShopPanel() : undefined}>
                    <span class="material-icons">shopping_cart</span>
                    <span class="item-count">{totalCount}</span>
                </button>
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
        margin-right: 10px; /* Add margin to separate the search bar from the import button */
    }

    .import-button {
        cursor: pointer;
        margin-left: 10px; /* Add margin to separate the import button from the search bar */
        background: none;
        border: none;
        position: relative;
    }

    input {
        border: none;
        outline: none;
        width: 200px; /* Adjust the width as needed */
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
</style>
