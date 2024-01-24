<template>
  <header>
      <div class="left-logos">
          <img :src="require('@/assets/imageDrapeauFr.jpg')" alt="Bloc Marque">
          <img :src="require('@/assets/PayFIp_logotype.jpg')" alt="Logo Temporaire PayFip">
      </div>

      <div class="right-section">
          <div class="language-selection">
              <img :src="require('@/assets/flag_FR.gif')" alt="Drapeau Français">
              <img :src="require('@/assets/flag_EN.gif')" alt="Drapeau Anglais">
          </div>
          <img :src="require('@/assets/temp_logo_payfip_s.jpg')" alt="Drapeau Anglais">
      </div>
   </header> 
  </template>

  <script>
  export default {
    name: 'SiteHeader',
  };
  </script>
  
  <style scoped>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 1em 0;
  }
  </style>