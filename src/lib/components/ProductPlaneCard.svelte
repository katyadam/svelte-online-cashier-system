<script lang="ts">
    import { deleteProductPlane, updateProductPlane } from "$lib/services/ProductPlaneService";
    import type { ProductPlane, ProductPlaneDto } from "$lib/interfaces/ProductPlane";

    export let productPlane: ProductPlane | null;
    
    const handleDelete = () => {
      deleteProductPlane(productPlane?.id);
      location.reload()
    }

</script>

<head>
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</head>

<div class="product-card">
  {#if productPlane != null}
    <button class="remove-button material-icons" on:click={handleDelete}>delete</button>
  {/if}
  <div class="card-content">
    <h2>{productPlane ? productPlane.name : "+"}</h2>
  </div>
</div>

<style>
  /* Existing styles remain unchanged */

  .product-card {
    position: relative;
    background-color: #e0e0e0;
    border-radius: 15px;
    overflow: hidden;
    display: flex;
    flex-direction: column; /* Arrange child elements vertically */
    justify-content: center; /* Center vertically */
    align-items: center; /* Center horizontally */
    height: 200px;
    margin-bottom: 10px;
    cursor: pointer;
    transition: box-shadow 0.3s ease;
    min-width: 300px;
    border: none;
    position: relative;
  }

  .product-card:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }

  .remove-button {
    font-size: 30px;
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #ff5f5f;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 50%; /* Make the button circular */
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .remove-button:hover {
    background-color: #e04848;
  }

  .card-content {
    padding: 10px;
  }

  h2 {  
    margin: 0;
    font-size: 30px;
  }
</style>