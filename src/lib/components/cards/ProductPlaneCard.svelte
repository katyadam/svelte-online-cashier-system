<script lang="ts">
    import { deleteProductPlane } from "$lib/services/ProductPlaneService";
    import type { ProductPlane } from "$lib/interfaces/ProductPlane";

    export let productPlane: ProductPlane | null;
    
    const handleDelete = async (event: MouseEvent) => {
		event.stopPropagation();
		const confirmed = confirm(`Are you sure you want to delete "${productPlane?.name}" with ${productPlane?.productSet.length} products`);

		if (confirmed) {
			await deleteProductPlane(productPlane?.id);
			location.reload();
		}
    }

</script>

<head>
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</head>

<div class="product-card">
	{#if productPlane != null}
		<button class="remove-button material-icons" on:click={handleDelete}>delete</button>
		<div class="card-content">
			<h2>{productPlane.name}</h2>
		</div>
	{:else}
		<h2>+</h2>
	{/if}
</div>

<div id="confirm-panel" class="panel">
	<div class="confirm-content">
		<p>Are you sure you want to delete this product plane?</p>
		<button class="panel-button" id="confirm-button">Yes</button>
        <button id="cancel-button">No</button>
	</div>
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

	.card-content {
		padding: 10px;
	}

	h2 {  
		margin: 0;
		font-size: 30px;
	}

	.panel {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        justify-content: center;
        align-items: center;
    }

	.confirm-content {
        background-color: #fff;
        padding: 20px;
        border-radius: 5px;
        text-align: center;
    }

	.panel-button {
        margin: 5px;
        padding: 10px;
        cursor: pointer;
    }
</style>