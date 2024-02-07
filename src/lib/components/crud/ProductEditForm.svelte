<script lang="ts">
    import { page } from "$app/stores";
    import { updateProduct } from "$lib/services/ProductService";
    import type { ProductDto, Product } from "$lib/interfaces/Product";
	import { getCurrencyList } from "$lib/api";
    import { onMount } from "svelte";
    import { productToEdit, showProductEdit } from "../../../store";

	let product: Product = $productToEdit;
	let currencyList: string[];
    let name: string = product?.name;
    let price: number = product?.price;
	let selectedCurrency: string = product?.currency;

    const handleSubmit = () => {
		let productDto: ProductDto = {
			name: name,
			productPlaneId: Number.parseInt($page.params.productPlane),
			price: price,
			currency: selectedCurrency
		};
		updateProduct(product?.id, productDto);
		location.reload();
		$showProductEdit = false;
    };

	onMount(async () => {
		currencyList = await getCurrencyList();		
	})
</script>


<div>
	<h2>Edit product</h2>
	<form on:submit|preventDefault={handleSubmit}>
		<label for="name">Name:</label>
		<input type="text" id="name" bind:value={name} required />
		
		<label for="price">Price:</label>
		<input type="number" id="price" bind:value={price} required />
		
		{#if currencyList}
			<label for="currency">Currency:</label>
			<select id="currency" bind:value={selectedCurrency}>
			{#each currencyList as currency (currency)}
				<option value={currency}>{currency}</option>
			{/each}
			</select>
		{/if}
		
		<button type="submit">Edit</button>
	</form>
</div>
  
<style>
	div {
	  display: flex;
	  flex-direction: column;
	  max-width: 700px;
	  margin: auto;
	  background-color: #fff;
	  padding: 20px;
	  border: 1px solid #ccc;
	  border-radius: 8px;
	}
  
	label {
	  margin-bottom: 8px;
	  color: #555;
	}
  
	input, select {
	  width: 100%;
	  padding: 8px;
	  margin-bottom: 16px;
	  box-sizing: border-box;
	  border: 1px solid #ccc;
	  border-radius: 4px;
	}

	select option {
		font-size: 15px;
		cursor: pointer;
	}
  
	button {
	  padding: 8px 16px;
	  background-color: #007bff;
	  color: #fff;
	  border: none;
	  border-radius: 4px;
	  cursor: pointer;
	}
  
	button:hover {
	  background-color: #0056b3;
	}
</style>
  