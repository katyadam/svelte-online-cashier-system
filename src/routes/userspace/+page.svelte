<script lang="ts">
    import { onMount } from "svelte";
    import ProductPlaneCard from "$lib/components/ProductPlaneCard.svelte";
    import type { ProductPlane } from "$lib/interfaces/ProductPlane";
    import ProductPlanesHeader from "$lib/components/headers/product-planes/ProductPlanesHeader.svelte";
	import Loading from "$lib/components/Loading.svelte";
    import ProductPlaneCreateForm from "$lib/components/crud/ProductPlaneCreateForm.svelte";
	import TransactionsTable from "$lib/components/TransactionsTable.svelte";
	import { getProductsPlanes } from "$lib/services/ProductPlaneService";
    import { showProductPlaneCreate, showTransactions } from "../../store";

    let productPlanes: ProductPlane[] | null = null;
	let initialProductPlanes: ProductPlane[];	
    onMount(async () => {
      try {
			productPlanes = await getProductsPlanes(1);
			initialProductPlanes = productPlanes;		
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
  
<main>
	<ProductPlanesHeader openTransactions={() => {$showTransactions = true;}} filterData={filterData} />
    {#if productPlanes}
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
        .grid-container {
            grid-template-columns: 1fr;
        }

        .form-container,
        .txs-table {
            width: 90%;
        }
    }

</style>
  
  