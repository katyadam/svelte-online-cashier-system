<script lang="ts">
	import type { ProductPlane } from "$lib/interfaces/ProductPlane";
    import type { Product } from "$lib/interfaces/Product";
	import { page } from "$app/stores";
    import { onMount } from "svelte";
    import ProductsHeader from "$lib/components/headers/products/ProductsHeader.svelte";
	import ShopPanel from "$lib/components/panels/ShopPanel.svelte";
    import Loading from "$lib/components/Loading.svelte";
	import AddForm from "$lib/components/panels/ProductCreateForm.svelte";
	import EditForm from "$lib/components/panels/ProductEditForm.svelte"
	import { getProductPlane } from "$lib/services/ProductPlaneService";
    import { showProductCreate, showProductEdit, showShopPanel, totalCount, shopProducts } from "../../../store";
	import ProductsGrid from "$lib/components/grids/ProductsGrid.svelte";

	let productPlane: ProductPlane;
	let products: Product[] | null = null;
	let initialProducts: Product[] | null = null;
	let isLoggedIn: boolean = false;
	
	onMount(async () => {
		isLoggedIn = localStorage.length == 2;
		if (!isLoggedIn) {
			window.location.href = "/auth/login";
		}
		try {
			productPlane = await getProductPlane($page.params.productPlane);
			products = productPlane.productSet;
			initialProducts = productPlane.productSet;
		} catch (error) {
			console.log(error)
		}
	})

	const filterData = async (searchTerm: string) => {
		let filtered: Product[] = [];
		initialProducts?.forEach(pp => {
			if (pp.name.toLocaleLowerCase().startsWith(searchTerm.toLocaleLowerCase())) {
				filtered.push(pp)
			}
		});
		products = filtered;
	}

</script>

<main>
	<ProductsHeader	
		productPlane={productPlane}
		filterData={filterData}
	/>
	{#if products}
		<ProductsGrid products={products}/>
	{:else}
		<Loading />
	{/if}

	{#if $showProductCreate}
		<button class="overlay" on:click={() => {$showProductCreate = false;}}></button>
		<div class="form-container">
			<AddForm />
		</div>
	{/if}

	{#if $showProductEdit}
		<button class="overlay" on:click={() => {$showProductEdit = false;}}></button>
		<div class="form-container">
			<EditForm />
		</div>
	{/if}
	
	{#if $showShopPanel}
		<button class="shop-panel-overlay" on:click={() => {$showShopPanel = false;}}></button>
		<div class="shop-panel">
			<ShopPanel
		/>
		</div>
	{/if}
</main>

<style>

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
		background-color: rgba(0, 252, 13, 0.5);
		z-index: 999;
	}

	.shop-panel {
        position: fixed;
        top: 100px;
        right: 0;
        height: 70%;
        width: 420px;
        background-color: #fff;
        box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
        overflow-y: auto;
        z-index: 1000;
		border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }

	.shop-panel-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(186, 186, 186, 0.5);
		z-index: 999;
	}

	@media (max-width: 768px) {
		main {
			width: 100%;
		}

        .form-container,
        .shop-panel {
            width: 90%;
        }
    }

</style>