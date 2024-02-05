<script lang="ts">
    import { importProducts } from "$lib/api";

    export let productPlaneId: number | undefined;

    let files: FileList;

    const handleSubmit = async (event: Event) => {
        if (productPlaneId != undefined) {
            importProducts(event, productPlaneId, files);
            location.reload();
        } else {
            console.error(`Product plane id ${productPlaneId} is not valid!`);
        }
    }

</script>

<div class="form-container">
    <h2>Please provide text file with lines in format: product-name,product-price,product-currency</h2>
    <form on:submit={handleSubmit}>
        <input type="file" class="file-input" bind:files />
        <button type="submit" class="import-button">Import</button>
    </form>
</div>

<style>
    .form-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20px;
    }
  
    .file-input {
        cursor: pointer;
    }
  
    .import-button {
        background-color: #007bff;
        color: #fff;
        padding: 10px;
        border: none;
        cursor: pointer;
    }
  
    .import-button:hover {
        background-color: #0056b3;
    }
</style>