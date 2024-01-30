<script>
    let loginClicked = () => {
      console.log('Button 1 clicked');
      // Add your logic for button 1 click event
    };
</script>
  
<style>
    /* Add your styling here */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
    }

    .title {
        font-size: 20px;
    }
  
    .routers {
        display: flex;
        gap: 20px;
        font-size: 20px;
    }

    .no-underline {
        text-decoration: none;
    }

</style>

<header>
    <div class="header">
        <div class="title">
            <a class="no-underline" href="/">Online cashier system</a>
        </div>
        <div class="routers">
          <a href="about">About us</a>
          <a href="userspace">Login</a>
          <a href="/">Get Started</a>
        </div>
      </div>    
</header>
  