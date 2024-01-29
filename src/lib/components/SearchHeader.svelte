// TODO: decompose + add product-plane name editing

<script lang="ts">
    export let entityName: String | undefined;
</script>

<head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</head>

<header>
    <div class="header">
        <div class="left-side">
            <div class="import-button material-icons hamburger" title="Menu" >menu</div> <!-- Google icon for upload -->
            <span class="title">{entityName}</span>                
        </div>
        <div class="right-side">
            <div class="search-bar">
                <input type="text" placeholder="Search..." />
            </div>
            <div class="import-button material-icons" title="Import product planes" >cloud_upload</div> <!-- Google icon for upload -->
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

    .hamburger {
        cursor: pointer;
        margin-right: 50px;
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
        font-size: 24px;
        cursor: pointer;
        margin-left: 10px; /* Add margin to separate the import button from the search bar */
    }

    input {
        border: none;
        outline: none;
        width: 200px; /* Adjust the width as needed */
        padding: 5px;
    }
</style>
