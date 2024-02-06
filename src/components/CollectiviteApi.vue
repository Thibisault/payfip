    <template>
    <div class="main-collectivite">
        <h1 class="title">Gestion des Collectivités</h1>

        <div class="buttons-container">
        <form @submit.prevent="addCollectivite" class="form-add">
            <input type="number" v-model="newCollectivite.codeCol" placeholder="Code de la collectivité">
            <button type="submit">Ajouter une Collectivité</button>
        </form>
        <button @click="deleteAllCollectivites()" class="btn-delete-all">Supprimer Toutes les Collectivités</button>
        </div>
    
        <div class="table-container">
            <table>
            <thead>
                <tr>
                <th>Code de la Collectivité</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="collectivite in collectivites" :key="collectivite.id">
                <td>
                    <template v-if="editingCollectivite && editingCollectivite.id === collectivite.id">
                    <input type="number" v-model="editingCollectivite.codeCol">
                    </template>
                    <template v-else>
                    {{ collectivite.codeCol }}
                    </template>
                </td>
                <td>
                    <template v-if="editingCollectivite && editingCollectivite.id === collectivite.id">
                    <button @click="confirmEdit(editingCollectivite)" class="btn-confirm">Confirmer</button>
                    <button @click="cancelEdit" class="btn-cancel">Annuler</button>
                    </template>
                    <template v-else>
                    <button @click="editCollectivite(collectivite)">Modifier</button>
                    <button @click="deleteCollectivite(collectivite.id)">Supprimer</button>
                    </template>
                </td>
                </tr>
            </tbody>
            </table>
        </div>
        </div>
    </template>
    
    <script>
    import CollectiviteService from '../services/collectiviteApi';
    
    export default {
        name: 'CollectiviteApi',
    
        data() {
        return {
            collectivites: [],
            newCollectivite: {
            codeCol: '', // Code de la collectivité
            editingCollectivite: null, // Collectivité en cours d'édition
            },
        };
        },
        methods: {
        editCollectivite(collectivite) {
            this.editingCollectivite = { ...collectivite };
            this.fetchCollectivites(); // Recharger la liste après annulation
        },
    
        cancelEdit() {
            this.editingCollectivite = null;
            this.fetchCollectivites(); // Recharger la liste après annulation
        },
    
        confirmEdit(collectivite) {
            CollectiviteService.update(collectivite.id, collectivite)
            .then(() => {
                this.fetchCollectivites(); // Recharger la liste après la mise à jour
                this.editingCollectivite = null; // Sortir du mode édition
            })
            .catch(error => {
                console.error("Erreur lors de la mise à jour de la collectivité: ", error);
            });
        },
    
        fetchCollectivites() {
            CollectiviteService.getAll() 
            .then(response => {
                this.collectivites = response.data;
            })
            .catch(error => {
                console.error("Erreur: ", error);
            });
        },
    
        addCollectivite() {
            CollectiviteService.create(this.newCollectivite)
            .then(() => {
                this.fetchCollectivites(); // Recharger la liste après l'ajout
                this.newCollectivite = { codeCol: ''     }; // Réinitialiser le formulaire
            })
            .catch(error => {
                console.error("Erreur: ", error);
            });
        },
    
        deleteCollectivite(id) {
            CollectiviteService.delete(id)
            .then(() => {
                this.fetchCollectivites(); // Recharger la liste après la suppression
            })
            .catch(error => {
                console.error("Erreur: ", error);
            });
        },
    
        deleteAllCollectivites() {
            CollectiviteService.deleteAll()
            .then(() => {
                this.fetchCollectivites(); // Recharger la liste après la suppression
            })
            .catch(error => {
                console.error("Erreur: ", error);
            });
        },
        },
        mounted() {
        this.fetchCollectivites();
        },
    };
    </script>
    
    <style>

.main-collectivite{
    width: 100%;
    display: flex;
    flex-direction: column;
}

.buttons-container{
    display: flex;
    flex-direction: row;
}



    </style>
    