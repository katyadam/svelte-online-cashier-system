<script lang="ts">
    import LoginForm from "$lib/components/auth/LoginForm.svelte";
    import RegisterForm from "$lib/components/auth/RegisterForm.svelte";
    import { logPublicUser, logout } from "$lib/services/AuthService";
    import { onMount } from "svelte";
    let showLogin = false;
    let showRegister = false;
    
    let isEmpty = true;
    onMount(() => {
        isEmpty = localStorage.length == 0;
    })

</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="online cashier system"/>    
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</svelte:head>

<div class="nav">
    <div class="left-section">
        <a class="title" href="/">Online cashier system</a>
    </div>
    <div class="right-section">
        <a class="tab" href="/about">About</a>
        {#if isEmpty} 
            <button class="tab" on:click={() => logPublicUser()}>Try demo</button>
            <button class="tab" on:click={() => {showLogin = true;}}>Login</button>
            <button class="tab" on:click={() => {showRegister = true;}}>Register</button>
        {:else}
            <a class="tab" href="/userspace">Product planes</a>
            <button class="tab material-icons" on:click={() => logout()}>power_settings_new</button>
        {/if}
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
        position: absolute;
        display: flex;
        align-items: center;
        width: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .left-section {
        display: flex;
        flex-direction: column;
        margin-left: 15px;
        max-width: 50%;
    }

    .tab {
        text-decoration: none;
        font-size: 20px;
        cursor: pointer;
        border: 1px solid;
        background-color: #fff;
        padding: 15px;
        text-align: center;
        margin-bottom: 30px;
        border-radius: 5%;
    }

    .tab:hover {
        color: blue;
        transition-duration: 1s;
    }


    .title {
        text-decoration: none;
        font-size: 120px;
    }

    .right-section {
        display: flex;
        flex-direction: column;
        position: relative;
        right: 10%;
        margin-left: auto;
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

    @media (max-width: 768px) {
        .title {
            font-size: 40px;
        }
        .right-section {
            right: 5%;
        }
        .tab {
            padding: 5px;
            margin-bottom: 8px;
        }
    }
</style>