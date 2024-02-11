<head>
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</head>

<section>
    <div>
        <a class="title material-icons" href="/">arrow_back</a>
        <h1>About</h1>
        <p>Made by: <a href="https://www.linkedin.com/in/adam-kattan/">Adam Kattan</a></p>
        <p>Deployed on: <a href="https://railway.app/">Railway</a></p>
        <p>Tech stack: <a href="https://svelte.dev/">Svelte</a> <a href="https://www.typescriptlang.org/">(Typescript)</a>,
          <a href="https://spring.io/projects/spring-boot">Java Spring Boot</a>, <a href="https://www.postgresql.org/">PostgreSQL</a></p>
        <p>With this online cashier system, you can create your product plane and its products.</p>
        <p class="highlight">Currently under development...</p>
    </div>

    
    <ul>
      <li>You can register or use public demo account.</li>
      <li>Product planes and products can be created, edited, and deleted.</li>
      <li>Each product plane can contain products.</li>
      <li>Every product has a starting price and initial currency.</li>
      <li>You have the option to alter the currency in which products are displayed.</li>
      <li>Products can be selected, added to a cart, and a new transaction can be started.</li>
      <li>Each transaction is stored and can be listed afterwards.</li>
      <li>Public product planes will be deleted each day at 3:00AM (CET). Public transactions each hour.</li>
      <li>You can filter product planes and products by their name.</li>
      <li>Products can be uploaded via text file.</li>
      <li>Products can be downloaded as a text file in format: name,price,currency</li>
    </ul>

</section>


<style>
  
    div {
      position: relative;
      text-align: center;
      align-items: center;
    }
  
    h1 {
      display: inline-block;
    }
    
    a {
      color: blue;
    }

    .title {
      position: absolute;
      top: 10%;
      left: 10%;
      text-decoration: none;
      font-size: 50px;
      background-color: aqua;
      border-radius: 50%;
      padding: 5px;
    }

    .title:hover {
      background-color: blueviolet;
      color: white;
      transition-duration: 2s;
      text-decoration: none;
    }

    .highlight {
      color: red;
      font-weight: 700;
    }


</style>