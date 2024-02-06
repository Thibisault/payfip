<template>
    <div class="payment-facture">
      <h2>Paiement de Facture</h2>
      <form @submit.prevent="processPayment">
        <div class="form-group">
          <label for="facture-reference">Référence de la Facture:</label>
          <input type="number" id="facture-reference" v-model="factureReference" required>
        </div>
  
        <div class="form-group">
          <label for="facture-montant">Montant:</label>
          <input type="number" id="facture-montant" v-model="factureMontant" required>
        </div>
  
        <button type="submit">Payer</button>
        <button type="button" @click="goBack">Annuler</button>
      </form>
    </div>
  </template>

<script>
import FactureService from '../services/factureApi';
import { EventBus } from '../services/eventBus.js';

export default {
  data() {
    return {
      factureReference: '',
      factureMontant: '',
    };
  },
  methods: {
    processPayment() {
  // Étape 1: Récupérer la facture par référence
  FactureService.getFactureByReference(this.factureReference).then(response => {
    const facture = response.data;
    // Vérifiez si le montant entré correspond au montant de la facture
    if (facture && facture.montant === parseFloat(this.factureMontant)) {
      // Étape 2: Mettre à jour la facture si le montant est correct
      const now = new Date();
      const data = {
        ...facture, 
        payerOuNon: true,
        dateReglement: now.toISOString(), // Convertir la date actuelle en string ISO pour l'envoyer au backend
      };
      
      FactureService.update(facture.id, data)
        .then(() => {
            EventBus.emit('FacturePaymentSuccess');
          alert('Paiement effectué avec succès');
          this.$router.push('/');
        })
        .catch(error => {
          console.error('Erreur lors du paiement :', error);
          alert('Erreur lors du paiement de la facture');
        });
    } else {
      alert("Le montant ne correspond pas à la facture ou la facture n'existe pas");
    }
  }).catch(error => {
    console.error('Erreur lors de la récupération de la facture :', error);
    alert('Facture introuvable');
  });
},

    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.payment-facture {
  border: 2px solid black; /* Bordure noire pour l'encadré du formulaire */
  padding: 20px; /* Espace entre la bordure et les éléments intérieurs */
  max-width: 500px; /* Largeur maximale de l'encadré */
  margin: auto; /* Centrer l'encadré */
  background-color: #fff; /* Fond blanc pour l'encadré */
}

.form-group {
  margin-bottom: 15px;
  background-color: #000; /* Fond noir pour chaque groupe de formulaire */
  padding: 10px; /* Espace entre la bordure noire et les champs */
}

.form-group label {
  color: white; /* Texte en blanc pour les étiquettes */
}

.form-group input {
  width: 100%; /* Les champs prennent toute la largeur du groupe de formulaire */
  padding: 8px; /* Espacement intérieur pour les champs */
  margin-top: 5px; /* Espace au-dessus des champs */
  border: 2px solid black; /* Bordure noire pour les champs */
  background-color: #fff; /* Fond blanc pour les champs */
  color: black; /* Texte en noir */
}

button {
  background-color: #007bff; /* Couleur de fond pour les boutons */
  color: white; /* Texte en blanc */
  border: none; /* Aucune bordure pour les boutons */
  padding: 10px 20px; /* Padding pour les boutons */
  margin-right: 10px; /* Espace à droite de chaque bouton */
  cursor: pointer; /* Curseur en forme de pointeur */
}

button:hover {
  background-color: #0056b3; /* Changement de couleur au survol */
}

</style>

  