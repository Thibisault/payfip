<template>
  <div id="app" class="allContainer">
    <SiteHeader class="header" />

    <div class="baniere">
      <button @click="toggleFacture" :class="{'active-button': showFacture, 'cacher': showFacture}">
  {{ showFacture ? 'Cacher Facture' : 'Voir les Factures' }}
</button>
<button @click="toggleCollectivite" :class="{'active-button': showCollectivite, 'cacher': showCollectivite}">
  {{ showCollectivite ? 'Cacher Collectivite' : 'Voir les Collectivites' }}
</button>
    </div>

    <div class="main-body">
      <router-view class="composant1" :class="{ 'active': showFacture || showCollectivite }" />
      <div class="composant2" v-show="showFacture || showCollectivite">
        <FactureApi v-if="showFacture" />
        <CollectiviteApi v-if="showCollectivite" />
      </div>
    
    </div>

    <SiteFooter class="footer"/>
  </div>
</template>




<script>
import SiteHeader from './components/SiteHeader.vue';
import SiteFooter from './components/SiteFooter.vue';


import CollectiviteApi from '@/components/CollectiviteApi.vue';
import FactureApi from '@/components/FactureApi.vue';

import { EventBus } from './services/eventBus.js';
export default {
  name: 'App',
  components: {
    SiteHeader,
    SiteFooter, FactureApi, CollectiviteApi
  },

  data() {
    return {
      showCollectivite: false,
      showFacture: false,
    };
  },

  computed: {
    activeComponent() {
      if (this.showCollectivite) {
        return 'CollectiviteApi';
      } else if (this.showFacture) {
        return 'FactureApi';
      } else {
        return null;
      }
    },
  },

  methods: {
    toggleFacture() {
      this.showFacture = !this.showFacture;
      if (this.showFacture) {
        this.showCollectivite = false;
      }
    },
    toggleCollectivite() {
      this.showCollectivite = !this.showCollectivite;
      if (this.showCollectivite) {
        this.showFacture = false;
      }
    },
  },

  mounted() {
    EventBus.on('switchView', () => {
      if (this.showCollectivite) {
        this.showCollectivite = false;
        this.showFacture = true;
      }
    });
    EventBus.on('goToPayementPage', () => {
      if (this.showFacture) {
        this.showCollectivite = true;
        this.showFacture = false;
      }
    });
  },
  beforeUnmount() {
    EventBus.off('switchView');
    EventBus.off('goToPayementPage');
  },

};
</script>

<style>
.allContainer {
  width: 100%;
  height: 100vh; /* Hauteur totale de l'écran */
  display: flex;
  flex-direction: column;
}

.header, .footer {
  width: 100%;
}

.header {
  left: 0;
  top: 0;
}

.footer{
  bottom: 0;
  left: 0;
}

.baniere {
  display: flex;
  justify-content: center; 
  align-items: center; 
}

.main-body {
  display: flex;
  flex-direction: row; 
  overflow: hidden;
}


.composant1 {
  width: 100%; /* Largeur par défaut à 100% */
}

.active {
  max-width: 50%; /* Ajuste la largeur à 50% pour le composant1 */
}

/* Pour le bouton actif */
.active-button {
  background-color: #007bff; 
  color: white;
}

/* Pour le bouton 'Cacher' */
.active-button.cacher {
  background-color: red; 
}

/* Surbrillance au passage de la souris pour le bouton 'Cacher' */
.active-button.cacher:hover {
  background-color: darkred; 
}

</style>


