<script lang="ts">
    import { page } from "$app/stores";
    import { createProduct } from "$lib/services/ProductService";
    import type { ProductDto } from "$lib/interfaces/Product";
    import { getCurrencyList } from "$lib/api";
    import { onMount } from "svelte";
    import { showProductCreate, storeSelectedCurrency } from "../../../store";

	let selectedCurrency: string;

	let currencyList: string[];
    let name: string = "";
    let price: number;

    const handleSubmit = async () => {
		let productDto: ProductDto = {
			name: name,
			productPlaneId: Number.parseInt($page.params.productPlane),
			price: price,
			currency: selectedCurrency
		};
		await createProduct(productDto);
		location.reload();
		$showProductCreate = false;
    };
	onMount(async () => {
		currencyList = await getCurrencyList();		
		selectedCurrency = $storeSelectedCurrency
	})
</script>


<div>
	<h2>Create new product</h2>
	<form on:submit|preventDefault={handleSubmit}>
		<label for="name">Name:</label>
		<input type="text" id="name" bind:value={name} required />
		
		<label for="price">Price:</label>
		<input type="number" id="price" bind:value={price} min="0" required />
		
		{#if currencyList}
			<label for="currency">Currency:</label>
			<select id="currency" bind:value={selectedCurrency}>
			{#each currencyList as currency (currency)}
				<option value={currency}>{currency}</option>
			{/each}
			</select>
		{/if}
		
		<button type="submit">Create</button>
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
  