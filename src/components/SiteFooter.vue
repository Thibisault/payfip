<template>
    <footer>
        <div class="info-box">
        <div class="info-section">
            <h3>INFORMATIONS</h3>
            <ul>
                <li>Vos questions</li>
                <li>Sécurité informatique</li>
            </ul>
        </div>
        <div class="service-section">
            <h3>QUALITÉ DE SERVICE</h3>
            <ul>
                <li>Accessibilité</li>
            </ul>
        </div>
        <div class="other-sites-section">
            <h3>AUTRES SITES</h3>
            <ul>
                <li><a href="https://collectivites-locales.gouv.fr">collectivites-locales.gouv.fr</a></li>
                <li><a href="https://amendes.gouv.fr">amendes.gouv.fr</a></li>
                <li><a href="https://timbres.impots.gouv.fr">timbres.impots.gouv.fr</a></li>
                <li><a href="https://gouvernement.fr">gouvernement.fr</a></li>
                <li><a href="https://data.gouv.fr">data.gouv.fr</a></li>
                <li><a href="https://legifrance.gouv.fr">legifrance.gouv.fr</a></li>
                <li><a href="https://service-public.fr">service-public.fr</a></li>
            </ul>
        </div>
    </div>


        <p>&copy; 2024 PayFip. Tous droits réservés.</p>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'SiteHeader',
  };
  </script>
  
  <style scoped>
  footer {
    position: fixed; 
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #000000;
    color: white;
    text-align: center;
    padding: 0.5em 0;
    font-size: 0.8em; 
    z-index: 10;
}
  </style>
  