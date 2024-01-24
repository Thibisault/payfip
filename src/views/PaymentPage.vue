<template>
    <main>
        <div class="payment-box">
            <h2>SAISIR L'IDENTIFIANT STRUCTURE PUBLIQUE</h2>
            <p>Veuillez renseigner l'identifiant structure publique</p>
            <form>
                <label for="public-structure-id">Identifiant structure publique : *</label>
                <input type="text" id="public-structure-id" name="public-structure-id" required>
                
                <label for="reference">Saisir la référence *</label>
                <input type="text" id="reference" name="reference" required>
                
                <div class="buttons">
                    <button type="submit">Valider</button>
                    <button type="button" @click="goBack">Annuler</button>
                </div>
            </form>
        </div>
    </main>
  </template>
  
  <script>
  export default {
    name: 'PaymentPage',
    methods: {
      goBack() {
        this.$router.go(-1); 
      }
    }
  };
  </script>
  
  <style scoped>
   
  </style>
  