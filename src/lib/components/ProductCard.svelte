<script lang="ts">
    import { deleteProduct } from "$lib/services/ProductService";
    import type { Product } from "$lib/interfaces/Product";

    export let product: Product | null;
    export let openEditForm: Function;

    const handleDelete = () => {
		deleteProduct(product?.id);
		location.reload()
    }
</script>

<div class="product-card">
    {#if product != null}
		<button class="remove-button material-icons" on:click={handleDelete}>delete</button>
		<button class="edit-button material-icons" on:click={openEditForm(product)}>edit</button>
    {/if}
    <div class="card-content">
		<h2>{product ? product.name : "+"}</h2>
		<h3>{product ? `Price: ${product.price}` : ""}</h3>
		<h3>{product ? `Currency: ${product.currency}` : ""}</h3>
    </div>
</div>

<style>

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

	.edit-button {
		font-size: 30px;
		position: absolute;
		top: 10px;
		left: 10px;
		background-color: #55fb1e;
		color: #fff;
		padding: 10px;
		border: none;
		border-radius: 50%; /* Make the button circular */
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