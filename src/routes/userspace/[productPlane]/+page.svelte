<script lang="ts">
	import type { ProductPlane } from "$lib/interfaces/ProductPlane";
	import { page } from "$app/stores";
    import { onMount } from "svelte";
    import SearchHeader from "$lib/components/SearchHeader.svelte";
	import ProductCard from "$lib/components/ProductCard.svelte";
    import Loading from "$lib/components/Loading.svelte";
	import AddForm from "$lib/components/crud/ProductCreateForm.svelte";
	import EditForm from "$lib/components/crud/ProductEditForm.svelte"
    import type { Product } from "$lib/interfaces/Product";
	let productPlane: ProductPlane | undefined;

	onMount(async () => {
		try {
			const response = await fetch(`http://localhost:8080/product-planes/${$page.params.productPlane}`);
			productPlane = await response.json();;
		} catch (error) {
			console.log(error)
		}
	})

	let showForm: boolean = false;
	const openForm = () => {
		showForm = true;
	}
	const closeForm = () => {
		showForm = false;
	}

	let showEditForm: boolean = false;
	let productToEdit: Product;
	const openEditForm = (product: Product) => {
		showEditForm = true;
		productToEdit = product;
	}
	const closeEditForm = () => {
		showEditForm = false;
	} 

</script>

<main>
	<SearchHeader entityName={productPlane?.name}/>
	{#if productPlane}
        <div class="grid-container">
            {#each productPlane.productSet as product (product.id)}
				<ProductCard product={product} openEditForm={openEditForm}/>
            {/each}
			<button class="button" on:click={openForm}>
				<ProductCard product={null} openEditForm={openEditForm}/>
			</button>
        </div>
    {:else}
        <Loading />
    {/if}

	{#if showForm}
		<button class="overlay" on:click={closeForm}></button>
		<div class="form-container">
			<AddForm closeForm={closeForm} />
		</div>
	{/if}

	{#if showEditForm}
	<button class="overlay" on:click={closeEditForm}></button>
	<div class="form-container">
		<EditForm closeEditForm={closeEditForm} product={productToEdit}/>
	</div>
{/if}



</main>

<style>
    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      max-height: 700px; /* Set a maximum height for the grid container */
      padding: 15px;
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