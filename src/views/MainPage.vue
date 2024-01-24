<template>
    <main>
      <div class="background-image">
        <img :src="require('@/assets/impot.jpg')" alt="Logo PayFip">
      </div>
      <div class="content">
        <h1>La solution de paiement de la Direction Générale des Finances Publiques</h1>
        <p>La Direction Générale des Finances Publiques met à votre disposition ce site pour faciliter le paiement des créances publiques.</p>
        <p>PayFiP vous permet de payer vos factures publiques (hors impôts) 24h/24, 7j/7, en toute sécurité.</p>
      </div>
      <br>
      <button id="pay-button" @click="goToPaymentPage">Payer vos factures publiques</button>
    </main>
  </template>
  
  <script>
  export default {
    name: 'MainPage',
    methods: {
      goToPaymentPage() {
        this.$router.push('/PaymentPage');
      }
    }
  };
  </script>
  
  <style scoped>
  main {
    position: relative;
  }
  
  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: -1;
  }
  
  .background-image img {
    width: 100%;
    height: auto;
  }
  
  .content {
    background-color: rgba(0, 0, 0, 0.5); /* Transparent gray background */
    color: white; /* White text color */
    padding: 2em;
    z-index: 1;
    /* Add additional styling as needed */
  }
  
  /* Style for the button */
  #pay-button {
    /* Button specific styles */
  }
  
  /* Other styles */
  </style>
  