// rp.js

// Fonction pour vérifier si l'utilisateur connecté est un RP
function verifierUtilisateurConnecte() {
    console.log("Vérification de l'utilisateur connecté...");
  
    // Récupérer les informations de l'utilisateur connecté depuis le stockage local
    const utilisateurConnecte = JSON.parse(localStorage.getItem("utilisateurConnecte"));
  
    if (!utilisateurConnecte) {
      alert("Veuillez vous connecter pour accéder à cette page.");
      window.location.href = "../views/RP/login/login.html"; // Rediriger vers la page de connexion si non connecté
      return null;
    }
  
    console.log("Utilisateur connecté :", utilisateurConnecte);
  
    // Vérifier que l'utilisateur a le rôle "ROLE_RP"
    if (utilisateurConnecte.role !== "ROLE_RP") {
      alert("Accès refusé : Vous n'avez pas les permissions nécessaires.");
      window.location.href = "../../views/RP/login/login.html"; // Rediriger vers une page d'erreur ou d'accès refusé
      return null;
    }
  
    return utilisateurConnecte;
  }
  
  // Fonction pour afficher la liste des professeurs
  function afficherListeProfesseurs(users, roles) {
    console.log("Données reçues pour afficher les professeurs :", users, roles);
  
    // Filtrer les utilisateurs ayant le rôle "ROLE_PROF"
    const professeurs = users.filter((user) => {
      const role = roles.find((role) => role.id_role === user.id_role);
      return role.nom_Role === "ROLE_PROF";
    });
  
    console.log("Professeurs filtrés :", professeurs);
  
    // Sélectionner le conteneur où insérer la table
    const listeContainer = document.getElementById("listeProfesseurs");
  
    if (!listeContainer) {
      console.error("Le conteneur 'listeProfesseurs' est introuvable !");
      return;
    }
  
    // Créer la table HTML
    listeContainer.innerHTML = `
      <table class="w-full border mx-16 mt-2 mb-8">
        <thead class="bg-red-800">
          <tr>
            <th scope="col" class="text-white px-6 py-3">Prenom</th>
            <th scope="col" class="text-white px-6 py-3">Nom</th>
            <th scope="col" class="text-white px-6 py-3">Specialite</th>
            <th scope="col" class="text-white px-6 py-3">Grade</th>
            <th scope="col" class="text-white px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          ${professeurs
            .map(
              (prof) => `
            <tr class="border hover:bg-gray-100">
              <td scope="row" class="px-6 py-4">${prof.Prenom}</td>
              <td class="px-8 py-4">${prof.Nom}</td>
              <td class="px-12 py-4">${prof.Specialite || "Non défini"}</td>
              <td class="px-6 py-4">${prof.Grade || "Non défini"}</td>
              <td class="px-6 py-4 text-blue-700">
                <a href="Ajout.html">Modifier</a>
              </td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;
  }
  
  // Fonction principale pour initialiser le tableau RP
  function initRpDashboard() {
    console.log("Initialisation du tableau RP...");
  
    // Vérifier si l'utilisateur connecté est un RP
    const utilisateurConnecte = verifierUtilisateurConnecte();
    if (!utilisateurConnecte) return;
  
    // Charger les données des utilisateurs et des rôles depuis le JSON
    fetch("users.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des données JSON");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Données chargées avec succès :", data);
  
        const { users, roles } = data;
  
        // Afficher la liste des professeurs
        afficherListeProfesseurs(users, roles);
      })
      .catch((error) => console.error("Erreur lors du chargement des données :", error));
  }
  
  // Appeler la fonction d'initialisation au chargement de la page
  document.addEventListener("DOMContentLoaded", initRpDashboard);
  