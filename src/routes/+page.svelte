<script lang="ts">
    import LoginForm from "$lib/components/auth/LoginForm.svelte";
    import RegisterForm from "$lib/components/auth/RegisterForm.svelte";
    let showLogin = false;
    let showRegister = false;
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app"/>    
</svelte:head>

<div class="nav">
    <div class="left-section">
        <a class="title" href="/">Online cashier system</a>
    </div>
    <div class="right-section">
        <a class="tab" href="/userspace">Show demo</a>
        <a class="tab" href="/about">About</a>
        <button class="tab" on:click={() => {showLogin = true;}}>Login</button>
        <button class="tab" on:click={() => {showRegister = true;}}>Register</button>
    </div>
</div>

{#if showLogin}
    <button class="overlay" on:click={() => {showLogin = false;}}></button>
    <div class="form">
        <LoginForm />
    </div>
{/if}
{#if showRegister}
    <button class="overlay" on:click={() => {showRegister = false;}}></button>
    <div class="form">
        <RegisterForm />
    </div>
{/if}

<style>
    .nav {
        display: flex;
        align-items: center;
        background-color: #fff;
        width: 100%;
    }

    .left-section {
        display: flex;
        margin-left: 15px;
    }

    .tab {
        text-decoration: none;
        font-size: 20px;
        cursor: pointer;
        border: none;
        background-color: #fff;
        padding: 5px;
    }

    .tab:hover {
        color: blue;
        transition-duration: 1s;
    }

    .title {
        text-decoration: none;
        font-size: 25px;
    }

    .right-section {
        margin-left: auto;
        margin-right: 15px;
    }

    .form {
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

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(186, 186, 186, 0.5);
        z-index: 999;
    }
</style>