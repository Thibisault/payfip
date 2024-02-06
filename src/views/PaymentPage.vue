<template>
    <main>
        <div class="payment-box">
            <h2>SAISIR L'IDENTIFIANT STRUCTURE PUBLIQUE</h2>
            <form @submit.prevent="searchCollectivite">
  <label for="public-structure-id">Identifiant structure publique : *</label>
  <input type="text" id="public-structure-id" v-model="publicStructureId" placeholder="Entrez l'identifiant ici" required>

  <div class="buttons">
    <button type="submit">Valider</button>
    <button type="button" @click="goBack">Annuler</button>
  </div>
</form>

        </div>
    </main>
  </template>
  
  <script>
  import CollectiviteService from '../services/collectiviteApi';
  import { EventBus } from '../services/eventBus.js';
  
  export default {
    name: 'PaymentPage',
    data() {
      return {
        publicStructureId: '',
      };
    },
    methods: {
      
      searchCollectivite() {
      CollectiviteService.getByCodeCol(this.publicStructureId)
        .then(response => {
          const collectivite = response.data;
          if (collectivite) {
            EventBus.emit('switchView');
            this.$router.push({ name: 'PaymentFacture', params: { codeCol: this.publicStructureId } });
          } else {
            alert('Aucune collectivité trouvée pour cet identifiant');
          }
        })
        .catch(error => {
          console.error('Erreur :', error);
          alert('Erreur lors de la recherche de la collectivité');
        });
      },

      goBack() {
        this.$router.go(-1);
      }
    }
  };
  </script>
  
  
  <style scoped>
   
  </style>
  