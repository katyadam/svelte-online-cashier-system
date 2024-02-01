<script lang="ts">
    import { page } from "$app/stores";
    import { createProduct } from "$lib/services/ProductService";
    import type { ProductDto } from "$lib/interfaces/Product";

    export let closeForm: Function;

    let name: string = "";
    let price: number = 0;

    const handleSubmit = () => {
		let productDto: ProductDto = {
			name: name,
			productPlaneId: Number.parseInt($page.params.productPlane),
			price: price
		};
		createProduct(productDto);
		location.reload();
		closeForm();
    };
</script>


<div>
    <h2>Create new product</h2>
    <form on:submit|preventDefault={handleSubmit}>
		<label for="name">Name:</label>
		<input type="text" id="name" bind:value={name} required />
		<input type="number" id="price" bind:value={price} required />
	
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
  