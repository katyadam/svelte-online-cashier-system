<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
</head>

<div class="loading-container">
    <i class="fas fa-spinner loading-spinner"></i>
</div>

<style>
    .loading-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }

    .loading-spinner {
        font-size: 5em;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>