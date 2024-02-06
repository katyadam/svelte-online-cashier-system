<script>
    import Header from "$lib/components/Header.svelte";
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app"/>    
</svelte:head>

<!-- <Header /> -->
<main>
    <a href="/userspace">Show demo</a>
    <a href="about">About</a>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
    }
    main a {
        text-decoration: none;
        font-size: 50px;
    }
    main a:hover {
        color: blue;
        transition-duration: 1s;
    }
</style>