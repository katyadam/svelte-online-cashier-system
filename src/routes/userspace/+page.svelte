
<script lang="ts">
    import { onMount } from "svelte";
    import ProductPlaneCard from "$lib/components/ProductPlaneCard.svelte";
    import type { ProductPlane } from "$lib/interfaces/ProductPlane";
    import SearchHeader from "$lib/components/SearchHeader.svelte";
	import Loading from "$lib/components/Loading.svelte";
    import AddForm from "$lib/components/crud/ProductPlaneCreateForm.svelte";

    interface ApiResponse {
      content: ProductPlane[];
    }
  
    let apiData: ProductPlane[] | null = null;
  
    onMount(async () => {
      try {
        const response = await fetch("http://localhost:8080/product-planes");
        const result: ApiResponse = await response.json();
        apiData = result.content;
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    });

	let showCreateForm: boolean = false;
	let showEditForm: boolean = false
	const openForm = () => {
		showCreateForm = true;
	}
	const closeForm = () => {
		showCreateForm = false;
	}

</script>
  
<main>
	<SearchHeader entityName="Product planes" openShopPanel={null}/>
    {#if apiData}
        <div class="grid-container">
            {#each apiData.sort((a, b) => a.name.localeCompare(b.name)) as item (item.id)}
                <a href="/userspace/{item.id}" class="button">
                  <ProductPlaneCard productPlane={item}/>
				</a>
            {/each}
            <button class="button" on:click={openForm}>
				<ProductPlaneCard productPlane={null} />
			</button>
        </div>
    {:else}
        <Loading />
    {/if}

	{#if showCreateForm}
		<button class="overlay" on:click={closeForm}></button>
		<div class="form-container">
			<AddForm closeForm={closeForm} />
		</div>
	{/if}
</main>



<style>
    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 20px;
      max-height: 700px; /* Set a maximum height for the grid container */
      padding: 20px;
    }

	.button {
		border: none;
		background-color: white;
		text-decoration: none;
	}

	.form-container {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: white;
		padding: 20px;
		border: 1px solid #ccc;
		z-index: 1000;
	}

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 252, 13, 0.5); /* Semi-transparent black overlay */
		z-index: 999; /* Ensure the overlay is behind the form */
	}

</style>
  
  