// Exemple de fonction de connexion
function login() {
    const loginInput = document.getElementById('login').value;
    const passwordInput = document.getElementById('password').value;
  
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(data => {
        const user = data.users.find(user => user.login === loginInput && user.mdp === passwordInput);
        if (user) {
          const role = data.roles.find(role => role.id_role === user.id_role);
          alert(`Connexion réussie en tant que ${role.nom_Role}`);
          // Redirection en fonction du rôle
          if (role.nom_Role === 'ROLE_RP') {
            window.location.href = "../cours/listeCours.html";
          } 
          else if (role.nom_Role === 'ROLE_ETUDIANT') {
            window.location.href = "/etudiant_dashboard.html";
          } 
          else if (role.nom_Role === 'ROLE_PROF') {
            window.location.href = "/prof_dashboard.html";
          }
          else if (role.nom_Role === 'ROLE_AC') {
            window.location.href = "/ac_dashboard.html";
          }
        } else {
          alert("Identifiants incorrects");
        }
      });
  }
  