<script lang="ts">
    export let filterData: Function;
    let searchTerm: string = "";
</script>

<div class="search-bar">
    <input type="text" placeholder="Search..." bind:value={searchTerm} on:input={filterData(searchTerm)}/>
</div>

<style>
    .search-bar {
        display: flex;
        align-items: center;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 5px;
        margin-right: 10px;
    }

    input {
        border: none;
        outline: none;
        width: 200px;
        padding: 5px;
    }
</style>