<script lang="ts">
    import { logout } from "$lib/services/AuthService";
    import { onMount } from "svelte";
    import { showTransactions } from "../../../../store";
    import SearchBar from "../SearchBar.svelte";
    import type { User } from "$lib/interfaces/User";

    export let filterData: Function;
    let user: User;
    onMount(() => {
        let userJson = localStorage.getItem("user");
        if (userJson != null) {
            user = JSON.parse(userJson);
        }
    })
</script>

<head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</head>

<header>
    <div class="header">
        <div class="left-side">
            <a class="left-btn material-icons" href="/">arrow_back</a>
            <SearchBar filterData={filterData}/>
        </div>
        <div class="right-side">
            <span class="title">{user?.givenName} {user?.familyName}</span>
            <button class="btn material-icons" title="Open transactions" on:click={() => {$showTransactions = true;}}>
                list_alt
            </button>
            <button class="btn material-icons" title="Logout" on:click={() => logout()}>
                power_settings_new
            </button>
        </div>
    </div>
</header>

<style>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
    }

    .left-side {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .title {
        font-size: 20px;
        text-decoration: none;
        margin-right: 10px;
    }

    .right-side {
        display: flex;
        align-items: center;
    }

    .btn {
        cursor: pointer;
        margin-left: 10px;
        background: none;
        border: none;
        position: relative;
    }

    .left-btn {
        cursor: pointer;
        margin-right: 10px;
        background: none;
        border: none;
        position: relative;
        text-decoration: none;
        font-size: 30px;
    }
</style>
