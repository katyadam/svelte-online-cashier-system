<script>
    import { goto } from '$app/navigation';

    let isOnLogin = true;

    function switchLayout() {
        isOnLogin = !isOnLogin;
        if (isOnLogin) {
            goto("/auth/login");
        } else {
            goto("/auth/register");
        }
    }
</script>

<head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</head>

<a class="back material-icons" href="/">arrow_back</a>

<div class="header-container">
    <h2>
        {#if isOnLogin}
            <button on:click={() => switchLayout()}>or Register</button>
        {:else}
            <button on:click={() => switchLayout()}>or Log In</button>
        {/if}
    </h2>
</div>

<style>
    .header-container {
        display: flex;
        position: absolute;
        left: 50%;
        top: 90%;
        transform: translate(-50%, -50%);
    }
    button {
        border: none;
        background-color: white;
        cursor: pointer;
        font-size: 30px;
        width: 300px;
    }
    .back {
        font-size: 50px;
        text-decoration: none;
        padding: 12px;
    }
</style>