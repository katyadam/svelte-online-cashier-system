<script lang="ts">
    import { deleteProduct } from "$lib/services/ProductService";
    import type { Product } from "$lib/interfaces/Product";
    import { afterUpdate } from "svelte";
    import { storeCurrencyRates, storeSelectedCurrency } from "../../store";

    export let product: Product | null;
    export let openEditForm: Function;

	const handleDelete = () => {
		event?.stopPropagation();
		deleteProduct(product?.id);
		location.reload()
    }

	let productPrice: number;
	const setProductPrice = () => {
		if (product != null) {
			let currencyRate = $storeCurrencyRates[product.currency];
			if (currencyRate == undefined) {
				productPrice = Math.trunc((product.price) * 100) / 100
			} else {
				productPrice = Math.trunc((product.price / currencyRate) * 100) / 100
			}
		}
	}

	afterUpdate(() => setProductPrice());

</script>

<div class="product-card">
    {#if product}
		<button class="remove-button material-icons" on:click={handleDelete}>delete</button>
		<button class="edit-button material-icons" on:click={openEditForm(product)}>edit</button>
		<div class="card-content">
			<h2>{product.name}</h2>
			<h3>{`Price: ${productPrice} ${$storeSelectedCurrency}`}</h3>
			<h3>{`Initial currency: ${product.currency}`}</h3>
		</div>
	{:else}
		<h2>+</h2>
    {/if}
</div>

<style>

	.product-card {
		position: relative;
		background-color: #e0e0e0;
		border-radius: 15px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 200px;
		margin-bottom: 10px;
		cursor: pointer;
		transition: box-shadow 0.3s ease;
		min-width: 300px;
		border: none;
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
		border-radius: 50%;
		cursor: pointer;
		transition: background-color 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.remove-button:hover {
		background-color: #e04848;
	}

	.edit-button {
		font-size: 30px;
		position: absolute;
		top: 10px;
		left: 10px;
		background-color: #55fb1e;
		color: #fff;
		padding: 10px;
		border: none;
		border-radius: 50%;
		cursor: pointer;
		transition: background-color 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
	}

	.edit-button:hover {
		background-color: #5cd41b;
	}

	.card-content {
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	h2 {  
		margin: 0;
		font-size: 30px;
	}
</style>