<!-- FormComponent.svelte -->
<script lang="ts">
    import { createProductPlane } from "$lib/services/ProductPlaneService";
    import type { ProductPlaneDto } from "$lib/interfaces/ProductPlane";
	  export let closeForm: Function;
    let name = "";
  
    const handleSubmit = () => {
      let productPlaneDto: ProductPlaneDto = {
        name: name,
        userId: 1
      };
      console.log(productPlaneDto);
      
      createProductPlane(productPlaneDto);
      location.reload();
      closeForm()
    };
  </script>
  
  <div>
    <h2>Create new product plane</h2>
    <form on:submit|preventDefault={handleSubmit}>
      <label for="name">Name:</label>
      <input type="text" id="name" bind:value={name} required />
  
      <button type="submit">Create</button>
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
  