    <template>
      <div class="main-facture">
        <h1>Gestion des Factures</h1>

        <div class="column-flex">
    <div class="form-container">
      <form @submit.prevent="addFacture">
        <!-- Champ pour le montant de la facture -->
        <input type="number" v-model="newFacture.montant" placeholder="Entrez le montant ici">

        <!-- Champ pour la référence de la facture -->
        <input type="number" v-model="newFacture.reference" placeholder="Entrez la référence ici">

        <!-- Bouton pour soumettre le formulaire -->
        <button type="submit">Ajouter une Facture</button>
      </form>
      <button @click="deleteAllFactures()">Supprimer Toutes les Factures</button>
    </div>
  </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Nom de la Facture</th>
              <th>Montant</th>
              <th>Référence</th>
              <th>Date de Création</th>
              <th>Date de Règlement</th>
              <th>État du Paiement</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
    <tr v-for="facture in factures" :key="facture.id">
      <td>
        <template v-if="editingFacture && editingFacture.id === facture.id">
          <input type="text" v-model="editingFacture.nom">
        </template>
        <template v-else>
          {{ facture.nom }}
        </template>
      </td>
      <td>
        <template v-if="editingFacture && editingFacture.id === facture.id">
          <input type="number" v-model="editingFacture.montant">
        </template>
        <template v-else>
          {{ facture.montant }}
        </template>
      </td>
      <td>
        <template v-if="editingFacture && editingFacture.id === facture.id">
          <input type="number" v-model="editingFacture.reference">
        </template>
        <template v-else>
          {{ facture.reference }}
        </template>
      </td>
      <td>
        <template v-if="editingFacture && editingFacture.id === facture.id">
          <input type="number" v-model="editingFacture.dateCreation">
        </template>
        <template v-else>
          {{ facture.dateCreation }}
        </template>
      </td>
      <td>
        <template v-if="editingFacture && editingFacture.id === facture.id">
          <input type="number" v-model="editingFacture.dateReglement">
        </template>
        <template v-else>
          {{ facture.dateReglement }}
        </template>
      </td>
      <td>
        <template v-if="editingFacture && editingFacture.id === facture.id">
          <input type="number" v-model="editingFacture.payerOuNon">
        </template>
        <template v-else>
          {{ facture.payerOuNon }}
        </template>
      </td>
      <!-- Répéter pour les autres colonnes -->
      <td>
        <template v-if="editingFacture && editingFacture.id === facture.id">
          <button @click="confirmEdit(editingFacture)" class="btn-confirm">Confirmer</button>
          <button @click="cancelEdit" class="btn-cancel">Annuler</button>
        </template>
        <template v-else>
          <button @click="editFacture(facture)">Modifier</button>
          <button @click="deleteFacture(facture.id)">Supprimer</button>
        </template>
      </td>
    </tr>
  </tbody>

        </table>
      </div>
    </div>
  </template>

    <script>
    import FactureService from '../services/factureApi';
    import { EventBus } from '../services/eventBus.js';

    export default {

      name : 'FactureApi',

      data() {
        return {
          factures: [],
          newFacture: {
            nom: '', // Nom de la facture
            montant: '', // Montant de la facture
            reference: '', // Référence de la facture
            editingFacture: null, // Facture en cours d'édition
          },
        };
      },
      methods: {

        editFacture(facture) {
      this.editingFacture = { ...facture };
      this.fetchFactures(); // Recharger la liste après annulation

    },

    cancelEdit() {
      this.editingFacture = null;
      this.fetchFactures(); // Recharger la liste après annulation
    },


      confirmEdit(facture) {
      FactureService.update(facture.id, facture)
        .then(() => {
          this.fetchFactures(); // Recharger la liste après la mise à jour
          this.editingFacture = null; // Sortir du mode édition
        })
        .catch(error => {
          console.error("Erreur lors de la mise à jour de la facture: ", error);
        });
    },

        formatTimestamp(timestamp) {
          if (!timestamp) return '';
          const date = new Date(timestamp);
          return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        },

        fetchFactures() {
        console.log("Envoi de la requête pour récupérer les factures");
        FactureService.getAll()
          .then(response => {
            console.log("Réponse reçue:", response.data);
            this.factures = response.data;
          })
          .catch(error => {
            console.error("Erreur lors de la récupération des factures:", error);
          });
      },


        addFacture() {
      FactureService.create(this.newFacture)
        .then(() => {
          this.fetchFactures(); // Recharger la liste après l'ajout
          this.newFacture = { nom: '', montant: '', reference: '' }; // Réinitialiser le formulaire
        })
        .catch(error => {
          console.error("Erreur: ", error);
        });
      },

        deleteFacture(id) {
        FactureService.delete(id)
        .then(() => {
          this.fetchFactures(); // Recharger la liste après la suppression
        })
        .catch(error => {
          console.error("Erreur: ", error);
        });
        },

        deleteAllFactures() {
        FactureService.deleteAll()
          .then(() => {
            this.fetchFactures(); // Recharger la liste après la suppression
          })
          .catch(error => {
            console.error("Erreur: ", error);
          });
        }
      },


      mounted() {
      this.fetchFactures();

      EventBus.on('FacturePaymentSuccess', () => {
        this.fetchFactures();
      });
    },

    beforeUnmount() {
      EventBus.off('FacturePaymentSuccess', this.fetchFactures);
    }
  };

    </script>

    <style>

    .main-facture{
      width: 100%;
      height: 100vh;
      position: relative;
      color: black;
    }
    .column-flex {
      display: flex; /* Active flexbox */
      align-items: center; /* Centre les éléments verticalement */
      gap: 1vh; /* Espace entre les enfants flex */
    }

    .form-container, .button-container {
      display: flex;
      align-items: center;
    }

    .table-container {
    max-height: 60vh;
    overflow-y: auto;
    width: 100%;
    scrollbar-width: inherit;
  }

    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0; /* Empêche l'espace entre les cellules */
    }

    th, td {
      position: relative; 
      padding: 8px;
      text-align: left;
      background: white; /* Couleur de fond pour masquer la bordure du pseudo-élément */
      color: #333;
    }

    thead th {
      background-color: #e0e0e0; /* Une couleur d'en-tête plus foncée */
      color: black; /* Couleur de texte pour les en-têtes */
    }

    .btn-confirm {
      background-color: green; /* Couleur de fond pour le bouton Confirmer */
      color: white; /* Couleur du texte */
    }

    .btn-cancel {
      background-color: red; /* Couleur de fond pour le bouton Annuler */
      color: white; /* Couleur du texte */
    }

    </style>