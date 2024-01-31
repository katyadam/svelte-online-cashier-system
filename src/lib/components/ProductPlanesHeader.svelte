<script lang="ts">
    export let openTransactions: Function;

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
            <span class="title">Product planes</span>
            <button class="btn material-icons" title="Open transactions" >cloud_upload</button>
            <button class="btn material-icons" title="Import product planes" on:click={() => openTransactions()}>
                list_alt
            </button>
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

    .btn {
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
