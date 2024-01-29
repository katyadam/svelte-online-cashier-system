<script lang="ts">
    import type { Product } from "$lib/interfaces/Product";
    import { onMount } from "svelte";
    import { page } from "$app/stores";

    let product: Product | undefined;

    onMount(async () => {
        try {
            const response = await fetch(`http://localhost:8080/products/${$page.params.product}`);
            product = await response.json();
        } catch (error) {
            console.log(error)
        }
    })

</script>

<h2>{product?.name}</h2>
<h2>{product?.category.name}</h2>