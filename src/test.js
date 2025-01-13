const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('motDePasse');

const sidebar = document.querySelector(".sidebar");
const sidebarToggler = document.querySelector(".sidebar-toggler");
const tBodyCours = document.querySelector("#tBodyCours")

let cours=[];
let professeurs = [];
let semestres = [];
document.addEventListener("DOMContentLoaded",async(event)=>{

    await loadData();
    // let datas = await findAllCours();
    // cours = [...datas];
    init();
    // console.log(cours);


    //fonction qui retourne les cours
// async function findAllCours(){
//     let response = await fetch(`http://localhost:3000/Cours`);    //fetch fct async
//     let datas = await response.json();
//     return datas;
// }

// Fonction pour charger toutes les données nécessaires
async function loadData() {
  // Récupérer les cours, professeurs et semestres
  const [coursData, profData, semestreData] = await Promise.all([
    fetch("http://localhost:3000/Cours").then((res) => res.json()),
    fetch("http://localhost:3000/Professeurs").then((res) => res.json()),
    fetch("http://localhost:3000/Semestres").then((res) => res.json()),
  ]);

  // Sauvegarder les données globales
  cours = [...coursData];
  professeurs = [...profData];
  semestres = [...semestreData];

  // Enrichir les cours avec les informations des professeurs et des semestres
  cours = cours.map((c) => ({
    ...c,
    professeur: professeurs.find((p) => p.idProf === c.idProf)?.nom || "Inconnu",
    semestre: semestres.find((s) => s.idSemestre === c.idSemestre)?.nom || "Inconnu",
  }));
}

function init() {
    //ajout des tr sur le tbody du tableau
    tBodyCours.innerHTML = generateTBody(cours)
}


//fonction qui permet de generer des tr
function generateTr(cours) {

    return `
    <tr class="border    hover:bg-gray-200" >
        <td scope="row" class="px-6 py-4">${cours.professeur}</td>
        <td scope="row" class="px-6 py-4">${cours.module}</td>
        <td scope="row" class="px-6 py-4">${cours.nbrHeure}</td>
        <td scope="row" class="px-6 py-4">${cours.semestre}</td>
        <td class="px-6 py-4 text-blue-700">
            <button data-modal-target="authentication-modal"
            data-modal-toggle="authentication-modal"
            class="block  text-blue-600  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button">
            Voir Seance
            </button>
        </td>


    </tr>
    `
} 

//fonction qui permet de generer tbody
function generateTBody(allcours) {
    html = ""
    for (const cours of allcours) {
        html += generateTr(cours)
    }
    return html;
}


// sidebarToggler represente le classe name du fleche
 sidebarToggler.addEventListener("click",() =>{
 sidebar.classList.toggle("collapsed");  //remplace sidebar par collapsed

})
});


// Fonction pour vérifier si les champs sont vides
function validateForm() {
    if (!emailInput.value || !passwordInput.value) {
        alert('Veuillez remplir tous les champs');
        return false;
    }
    return true;
}

// Ajouter un événement sur la soumission du formulaire
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Vérifier si les champs sont remplis
    if (!validateForm()) {
        return;
    }

   
    fetch('http://localhost:3000/Etudiants')
        .then(response => {
            if (!response.ok) {
                alert('Erreur réseau');
                return null;
            }
            return response.json();
        })
        .then(etudiants => {
            if (etudiants) {
                // Vérifier si l'utilisateur existe
                const user = etudiants.find(etudiant =>
                    etudiant.login === emailInput.value &&
                    etudiant.pwd === passwordInput.value
                );

                if (user) {
                    localStorage.setItem('login', emailInput.value);
                    localStorage.setItem('password', passwordInput.value);

                    window.location.href = '../cours/listeCours.html';
                } else {
                    alert('Login ou mot de passe incorrect');
                    passwordInput.value = ''; 
                }
            }
        })
        .catch(() => {
            alert('Erreur de connexion au serveur');
        });
});

window.addEventListener('load', () => {
    localStorage.removeItem('login');
    localStorage.removeItem('password');
});


