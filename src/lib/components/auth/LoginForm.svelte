<script lang="ts">
    import { loginUser, setLocalStorage } from "$lib/services/AuthService";
    import type { AuthResponse }  from "$lib/interfaces/Auth";

    let email = "";
    let password = "";
    const handleLogin = async () => {
        const authResponse: AuthResponse = await loginUser({ email: email, password: password });       
        setLocalStorage(authResponse);
        window.location.href = "/userspace";
    };
  </script>

<div class="login-container">
    <h2>Login</h2>
  
    <form action="">
        <div class="input-group">
            <label for="username">Email:</label>
            <input type="email" bind:value={email} id="username" />
        </div>
        
        <div class="input-group">
            <label for="password">Password:</label>
            <input type="password" bind:value={password} id="password" />
        </div>
        <input type="submit" on:click={handleLogin} class="login-button" value="Login" />
    </form>
  
</div>
  
<style>
    .login-container {
        max-width: 600px;
        width: 70%;
        padding: 20px;
        margin: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
  
    .input-group {
        margin-bottom: 15px;
        width: 100%;
    }
  
    .input-group label {
        display: block;
        margin-bottom: 5px;
    }
  
    .input-group input {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
    }
  
    .login-button {
        background-color: #4caf50;
        color: white;
        padding: 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
</style>
  