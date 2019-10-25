---
enabled: true
css: "
  background: #62BFB5;
  color: black;
  cursor: pointer;
  display: flex;
  align-items: center;
  text-align: center;
  padding: .5em;

  .wrapper {
    text-align: center;

    @media only screen and (min-width: 451px) {
      flex: 1 0 0%;
    }
  }

  .cta {
    display: inline-block;
    background: #f4d078;
    background: -webkit-linear-gradient(top,#f7dfa5,#f0c14b);
    background: linear-gradient(to bottom,#f7dfa5,#f0c14b);
    border-color: #a88734 #9c7e31 #846a29;
    color: #111;
    margin: .25em 0 0;
    padding: .25em 1em;
  }

  img {
    max-height: 3em;
  }

  @media only screen and (max-width: 600px) {

    img {
      height: 30px;
    }

    .cta {
      display: none;
    }
  }
"
url: https://www.amazon.it/provaprime?tag=motovia-21
---
<div class="image wrapper">
  <img src="./amazon_prime_logo.png">
</div>
<div class="text wrapper">
  <div class="subtitle">
    Spedizioni in 1 GIORNO senza costi aggiuntivi
  </div>
  <div class="cta">Inzia la prova GRATUITA</div>
</div>
