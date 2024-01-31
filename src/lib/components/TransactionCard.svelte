<script lang="ts">
    import type { Product } from "$lib/interfaces/Product";

    export let shopProducts: Map<Product, number>;
</script>

<div>
    <ul>
        {#each Array.from(shopProducts.entries()) as [product, amount] (product)}
            <li>{product.name} {product.price} {amount}</li>
        {/each}
    </ul>
</div>

