---
css: "
  background: rgb(50,37,232);
  background: linear-gradient(0deg, rgba(50,37,232,1) 0%, rgba(44,29,155,1) 100%);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  text-align: center;
  padding: 1em;

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
    margin: .5em 0 0;
    padding: .5em 2em;
  }

  img {
    max-height: 5em;
    height: auto;
    width: auto;
  }

  @media only screen and (max-width: 450px) {
    font-size: .8rem;
    
    .br {
      display: block;
      height: 0;
      visibility: hidden;
    }

    .image {
      flex: 1 0 0%;
      margin-right: 1.5em;
    }
  }
"
url: https://www.amazon.it/gp/dmusic/promotions/AmazonMusicUnlimited?tag=motovia-21
---
<div class="image wrapper">
  <img src="./amazon-music-unlimited.png">
</div>
<div class="text wrapper">
  <div class="subtitle">
    50 milioni di brani<span class="br">,</span>
    GRATIS per 90 giorni
  </div>
  <div class="cta">Iscriviti subito!</div>
</div>
