 const sidebar = document.querySelector(".sidebar");
 const sidebarToggler = document.querySelector(".sidebar-toggler");
// sidebarToggler represente le classe name du fleche
 sidebarToggler.addEventListener("click",() =>{
    // sa s'est une ecouteur d'evenement 
    sidebar.classList.toggle("collapsed");  //remplace sidebar par collapsed
    // alert('ok');
    

})


// URL du JSON Server
const API_URL = "http://localhost:3000/cours";

// Fonction pour charger les données
async function chargerCours() {
  try {
    // Récupérer les données depuis l'API
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Erreur lors de la récupération des données");
    const cours = await response.json();

    // Sélectionner le tableau
    const tableBody = document.querySelector("#ListeCours ");

    // Insérer les données dans le tableau
    tableBody.innerHTML = cours.map(cour => `
      <tr>
        <td>${cour.professeur}</td>
        <td>${cour.module}</td>
        <td>${cour.heures}</td>
        <td>${cour.semestre}</td>
      </tr>
    `).join("");
  } catch (error) {
    console.error("Erreur :", error);
  }
}

// Charger les données au chargement de la page
document.addEventListener("DOMContentLoaded", chargerCours);

