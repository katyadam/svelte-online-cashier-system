<script lang="ts">
    import type { Product } from "$lib/interfaces/Product";
    import { addProduct } from "$lib/services/ShopProductsManager";
    import { showProductCreate } from "../../../store";
    import ProductCard from "../cards/ProductCard.svelte";

    export let products: Product[];
</script>

<div class="grid-container">
    {#each products.sort((a, b) => a.name.localeCompare(b.name)) as product (product.id)}
        <button class="button" on:click={() => addProduct(product)}>
            <ProductCard product={product} />
        </button>
    {/each}
    <button class="button" on:click={() => {$showProductCreate = true;}}>
        <ProductCard product={null} />
    </button>
</div>

<style>
    .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
        max-height: 700px;
        padding: 15px;
    }

	.button {
		border: none;
		background-color: white;
		text-decoration: none;
	}
    @media (max-width: 768px) {
        .grid-container {
            grid-template-columns: 1fr;
        }
    }
</style>