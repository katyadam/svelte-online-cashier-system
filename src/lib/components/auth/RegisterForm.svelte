<script lang="ts">
    import type { AuthResponse } from "$lib/interfaces/Auth";
    import { registerUser, setLocalStorage } from "$lib/services/AuthService";

    let givenName = "";
    let familyName = "";
    let email = "";
    let password = "";
    
    const handleRegister = async () => {
        const authResponse: AuthResponse = await registerUser({
            givenName: givenName,
            familyName: familyName,
            email: email,
            password: password,
            role: "USER"
        });

        setLocalStorage(authResponse);
        window.location.href = "/userspace";
    };
  </script>

<div class="login-container">
    <h2>Register</h2>
  
    <form>
        <div class="input-group">
            <label for="givenName">Given Name (first name):</label>
            <input type="text" bind:value={givenName} id="givenName" />
        </div>

        <div class="input-group">
            <label for="familyName">Family Name (last name):</label>
            <input type="text" bind:value={familyName} id="familyName" />
        </div>

        <div class="input-group">
            <label for="email">Email:</label>
            <input type="email" bind:value={email} id="email" />
        </div>
        
        <div class="input-group">
            <label for="password">Password:</label>
            <input type="password" bind:value={password} id="password" />
        </div>
        <input type="submit" on:click={handleRegister} class="login-button" value="Register" />
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
  