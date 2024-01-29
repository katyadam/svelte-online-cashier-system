<script lang="ts">
    import { page } from "$app/stores";
    import { updateProduct } from "$lib/api";
    import type { ProductDto, Product } from "$lib/interfaces/Product";

    export let closeEditForm: Function;
    export let product: Product;

    let name = product?.name;

    const handleSubmit = () => {
      let productDto: ProductDto = {
        name: name,
        productPlaneId: Number.parseInt($page.params.productPlane),
        categoryId: 4 // TODO
      };
      updateProduct(product?.id, productDto);
      location.reload();
      closeEditForm()
    };

</script>


<div>
    <h2>Edit product</h2>
    <form on:submit|preventDefault={handleSubmit}>
      <label for="name">Name:</label>
      <input type="text" id="name" bind:value={name} required />
  
      <button type="submit">Edit</button>
    </form>
  </div>
  
  <style>
    div {
      background-color: #fff;
      padding: 20px;
      border: 1px solid #ccc;
    }
  
    label {
      display: block;
      margin-bottom: 8px;
    }
  
    input {
      width: 100%;
      padding: 8px;
      margin-bottom: 16px;
      box-sizing: border-box;
    }
  
    button {
      padding: 8px 16px;
      background-color: #007bff;
      color: #fff;
      border: none;
      cursor: pointer;
    }
  </style>
  