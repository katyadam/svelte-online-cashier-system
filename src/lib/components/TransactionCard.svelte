<script lang="ts">
    import type { Product } from "$lib/interfaces/Product";
    import type { Transaction } from "$lib/interfaces/Transaction";
    
    export let transaction: Transaction;
    let txDate: Date = new Date(transaction.creationTime);
    let shopProducts = new Map<Product, number>();
    let totalCost: number = 0;

    const jsonObject: { [key: string]: number } = JSON.parse(transaction.record);
    for (const [productJson, amount] of Object.entries(jsonObject)) {
        const product: Product = JSON.parse(productJson);
        shopProducts.set(product, amount);
        totalCost += product.price * amount;
    }
</script>

  
<div class="card">
    <div class="tx-info">
        <p>{`Total cost: ${totalCost}`}</p>
        <p>{`Time: ${txDate.toLocaleTimeString()} | Date: ${txDate.toLocaleDateString()}`}</p>            
    </div>
    <table>
        <thead>
        <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Amount</th>
        </tr>
        </thead>
        <tbody>
        {#each Array.from(shopProducts.entries()) as [product, amount] (product)}
            <tr class="list-item">
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{amount}x</td>
            </tr>
        {/each}
        </tbody>
</table>
</div>


<style>
    .card {
        width: 100%; /* Adjust the width as needed */
        margin: 20px auto; /* Center the table horizontally */
        border: none;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }

    .list-item {
        margin-bottom: 8px;
    }
    .tx-info {
        padding: 3px;
    }
    .tx-info p {
        margin: 0;
    }
</style>