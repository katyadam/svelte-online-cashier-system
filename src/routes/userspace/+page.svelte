
<script lang="ts">
    import { onMount } from "svelte";
    import ProductPlaneCard from "$lib/components/ProductPlaneCard.svelte";
    import type { ProductPlane } from "$lib/interfaces/ProductPlane";
    import ProductPlanesHeader from "$lib/components/ProductPlanesHeader.svelte";
	import Loading from "$lib/components/Loading.svelte";
    import AddForm from "$lib/components/crud/ProductPlaneCreateForm.svelte";
	import TransactionsTable from "$lib/components/TransactionsTable.svelte";

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
	const openForm = () => {
		showCreateForm = true;
	}
	const closeForm = () => {
		showCreateForm = false;
	}

	let showTransactions: boolean = false;
	const openTransactions = () => {
		showTransactions = true;
	}
	const closeTransactions = () => {
		showTransactions = false;
	}

</script>
  
<main>
	<ProductPlanesHeader openTransactions={openTransactions}/>
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

	{#if showTransactions}
		<button class="txs-table-overlay" on:click={closeTransactions}></button>
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

	.txs-table {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: 90%;
		width: 70%; /* Adjust the width as needed */
		background-color: #fff;
		box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
		overflow-y: auto;
		z-index: 1000;
		border-radius: 10px; /* Add border-radius for rounded corners */
	}

	.txs-table-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(186, 186, 186, 0.5); /* Semi-transparent black overlay */
		z-index: 999;
	}

</style>
  
  