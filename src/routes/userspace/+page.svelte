<script lang="ts">
    import { onMount } from "svelte";
    import type { ProductPlane } from "$lib/interfaces/ProductPlane";
    import ProductPlanesHeader from "$lib/components/headers/product-planes/ProductPlanesHeader.svelte";
	import ProductPlanesGrid from "$lib/components/grids/ProductPlanesGrid.svelte";
	import Loading from "$lib/components/Loading.svelte";
    import ProductPlaneCreateForm from "$lib/components/panels/ProductPlaneCreateForm.svelte";
	import TransactionsTable from "$lib/components/panels/TransactionsPanel.svelte";
	import LoginForm from "$lib/components/auth/LoginForm.svelte";
	import { getProductsPlanes } from "$lib/services/ProductPlaneService";
    import { showProductPlaneCreate, showTransactions } from "../../store";
    import { getStoredUser, type User } from "$lib/interfaces/User";

    let productPlanes: ProductPlane[] | null = null;
	let initialProductPlanes: ProductPlane[];	
	let isLoggedIn: boolean = false;
	onMount(async () => {
		isLoggedIn = localStorage.length == 2;
		try {
			let user = getStoredUser();
			if (user != null) {
				productPlanes = await getProductsPlanes(user.id);
				initialProductPlanes = productPlanes;		
			}
		} catch (error) {
			console.error("Error fetching data: ", error);
		}
    });

	const filterData = async (searchTerm: string) => {
		let filtered: ProductPlane[] = [];
		initialProductPlanes?.forEach(pp => {
			if (pp.name.toLocaleLowerCase().startsWith(searchTerm.toLocaleLowerCase())) {
				filtered.push(pp)
			}
		});
		productPlanes = filtered;
	}

</script>
  
{#if isLoggedIn}
	<main>
		<ProductPlanesHeader filterData={filterData} />
		{#if productPlanes}
			<ProductPlanesGrid productPlanes={productPlanes}/>
		{:else}
			<Loading />
		{/if}

		{#if $showProductPlaneCreate}
			<button class="overlay" on:click={() => {$showProductPlaneCreate = false;}}></button>
			<div class="form-container">
				<ProductPlaneCreateForm />
			</div>
		{/if}

		{#if $showTransactions}
			<button class="txs-table-overlay" on:click={() => {$showTransactions = false;}}></button>
			<div class="txs-table">
				<TransactionsTable />
			</div>
		{/if}
	</main>
{:else}
	<h2>You need to log in first or <a href="/register">register</a></h2>
	<LoginForm />
{/if}

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

	.txs-table {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: 90%;
		width: 70%;
		background-color: #fff;
		box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
		overflow-y: auto;
		z-index: 1000;
		border-radius: 10px;
	}

	.txs-table-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(186, 186, 186, 0.5);
		z-index: 999;
	}
	@media (max-width: 768px) {
        .form-container,
        .txs-table {
            width: 90%;
        }
    }

</style>
  
  