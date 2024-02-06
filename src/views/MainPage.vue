<template>
  <main>
    <div class="image-container">
      <img :src="require('@/assets/impot.jpg')" alt="Logo PayFip" class="background-image">
      <div class="overlay-text">
        <h1>La solution de paiement de la Direction Générale des Finances Publiques</h1>
        <p>La Direction Générale des Finances Publiques met à votre disposition ce site pour faciliter le paiement des créances publiques.</p>
        <p>PayFiP vous permet de payer vos factures publiques (hors impôts) 24h/24, 7j/7, en toute sécurité.</p>
      </div>
    </div>
    <button id="pay-button" @click="goToPaymentPage">Payer vos factures publiques</button>
  </main>
</template>


<script>
import { EventBus } from '../services/eventBus.js';
export default {
  name: 'MainPage',

  methods: {
    goToPaymentPage() {
      console.log('goToPayementPage')
      EventBus.emit('goToPayementPage');
      this.$router.push({ name: 'PaymentPage' });
    },
  },
};

</script>

<style scoped>
.main {
  width: 100%;
  position: relative;
}

.image-container {
  position: relative;
  width: 100%;
  height: 25vh; /* Hauteur fixe à 50% de la hauteur de la fenêtre */
  overflow: hidden; /* Cache les parties de l'image qui dépassent */
}


.background-image {
  width: 100%;
  height: auto; /* Ajuste la hauteur pour conserver le ratio */
  object-fit: cover; /* Assure que l'image couvre toute la largeur et hauteur du conteneur */
}

.overlay-text {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5); /* Fond sombre transparent */
  color: white; /* Texte en blanc */
  padding: 20px; /* Espace autour du texte */
}

#pay-button {
  display: block; /* Pour que le bouton prenne toute la largeur */
  width: 100%;
  margin-top: 20px; /* Espace au-dessus du bouton */
  padding: 10px 0; /* Espace vertical dans le bouton */
  background-color: #007bff; /* Couleur de fond bleue */
  color: white; /* Texte en blanc */
  border: none;
  cursor: pointer;
}
</style>

