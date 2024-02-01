<script lang="ts">
	import type { ProductPlane } from "$lib/interfaces/ProductPlane";
    import type { Product } from "$lib/interfaces/Product";
	import { page } from "$app/stores";
    import { onMount } from "svelte";
    import ProductsHeader from "$lib/components/ProductsHeader.svelte";
	import ShopPanel from "$lib/components/ShopPanel.svelte";
	import ProductCard from "$lib/components/ProductCard.svelte";
    import Loading from "$lib/components/Loading.svelte";
	import AddForm from "$lib/components/crud/ProductCreateForm.svelte";
	import EditForm from "$lib/components/crud/ProductEditForm.svelte"
	import { getProductPlane } from "$lib/services/ProductPlaneService";

	let productPlane: ProductPlane | undefined;

	onMount(async () => {
		try {
			productPlane = await getProductPlane($page.params.productPlane);
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
		event?.stopPropagation()
	}
	const closeEditForm = () => {
		showEditForm = false;
	}

	let showShopPanel: boolean = false;
	const openShopPanel = () => {
		showShopPanel = true;
	}

	const closeShopPanel = () => {
		showShopPanel = false;
	}
	
	let shopProducts: Map<Product, number> = new Map();
	let totalPrice: number = 0;
	let totalCount: number = 0;
	const removeProduct = (id: number) => {
		let newShopProducts = shopProducts;
		for (const [product, amount] of newShopProducts) {
			if (product.id === id) {
				newShopProducts.delete(product);
				totalPrice -= amount * product.price;
				totalCount -= amount;
				break;
			}
		}
		shopProducts = newShopProducts;
	}
	const addProduct = (product: Product) => {
		let newShopProducts = shopProducts;
		if (newShopProducts.has(product)) {
			let currAmount = newShopProducts.get(product);
			if (currAmount != undefined && currAmount > 0) {
				newShopProducts.set(product, currAmount + 1);
				shopProducts = newShopProducts;
			} else {
				console.error("Invalid product amount!")
			}
		} else {
			shopProducts.set(product, 1);
		}
		totalPrice += product.price;
		totalCount += 1
	}
	const decrProduct = (product: Product) => {
		let newShopProducts = shopProducts;
		if (newShopProducts.has(product)) {
			let currentAmount = newShopProducts.get(product);
			if (currentAmount == 1) {
				removeProduct(product.id);
				return;
			} else {
				newShopProducts.set(product, currentAmount ? currentAmount - 1 : 0);
			}
		}
		shopProducts = newShopProducts;
		totalPrice -= product.price;
		totalCount -= 1;
	}

</script>

<main>
	<ProductsHeader entityName={productPlane?.name} openShopPanel={openShopPanel} totalCount={totalCount}/>
	{#if productPlane}
        <div class="grid-container">
            {#each productPlane.productSet.sort((a, b) => a.name.localeCompare(b.name)) as product (product.name)}
				<button class="button" on:click={() => addProduct(product)}>
					<ProductCard product={product} openEditForm={openEditForm}/>
				</button>
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
	{#if showShopPanel}
		<button class="shop-panel-overlay" on:click={closeShopPanel}></button>
		<div class="shop-panel">
			<ShopPanel
				shopProducts={shopProducts}
				removeProduct={removeProduct}
				addProduct={addProduct}
				decrProduct={decrProduct}
				totalPrice={totalPrice}
        />
		</div>
	{/if}
</main>

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

</style>