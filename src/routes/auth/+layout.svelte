<script lang="ts">
    import AuthHeader from "$lib/components/headers/auth/AuthHeader.svelte";   
</script>

<div class="container">
    <AuthHeader />
    <slot />
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
    }
</style>