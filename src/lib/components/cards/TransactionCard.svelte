<script lang="ts">
    import type { Product } from "$lib/interfaces/Product";
    import type { Transaction } from "$lib/interfaces/Transaction";
    
    export let transaction: Transaction;
    let txDate: Date = new Date(transaction.creationTime);
    let shopProducts = new Map<Product, number>();
    let totalCost: number = 0;
    let currencyToShow: string;

    const jsonObject: { [key: string]: number } = JSON.parse(transaction.record);
    for (const [productJson, amount] of Object.entries(jsonObject)) {
        const product: Product = JSON.parse(productJson);
        shopProducts.set(product, amount);
        totalCost += product.price * amount;
        currencyToShow = product.currency;
    }
    
</script>

  
<div class="card">
    <div class="tx-info">
        <p>{`Total cost: ${Math.trunc(totalCost * 100) / 100} ${currencyToShow}`}</p>
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
                <td>{Math.trunc(product.price * 100) / 100} {currencyToShow}</td>
                <td>{amount}x</td>
            </tr>
        {/each}
        </tbody>
</table>
</div>


<style>
    .card {
        width: 100%;
        margin: 20px auto;
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