<script lang="ts">
    import type { ProductPlane } from "$lib/interfaces/ProductPlane";
    import ProductPlaneCard from "$lib/components/ProductPlaneCard.svelte";
    import { showProductPlaneCreate } from "../../../store";

    export let productPlanes: ProductPlane[];

</script>


<div class="grid-container">
    {#each productPlanes.sort((a, b) => a.name.localeCompare(b.name)) as item (item.id)}
        <a href="/userspace/{item.id}" class="button">
          <ProductPlaneCard productPlane={item}/>
        </a>
    {/each}
    <button class="button" on:click={() => {$showProductPlaneCreate = true;}}>
        <ProductPlaneCard productPlane={null} />
    </button>
</div>

<style>
    .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
        gap: 20px;
        max-height: 700px;
        padding: 20px;
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