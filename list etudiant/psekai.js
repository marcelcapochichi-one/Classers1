let etudiants = [];
        let kai = "etudiants";

        let oniNom = document.getElementById("oniNom");
        let oniPrenom = document.getElementById("oniPrenom");
        let Ajouter = document.getElementById("Ajouter");
        let listeEtudiants = document.getElementById("listeEtudiants");
        let compteur = document.getElementById("compteur");

        function sauvegarderEtudiants() {
            localStorage.setItem(kai, JSON.stringify(etudiants));
        }

        function chargerEtudiants() {
            let donnees = localStorage.getItem(kai);
            if (donnees !== null) {
                etudiants = JSON.parse(donnees);
            } else {
                etudiants = [];
            }
        }

        function afficherEtudiants() {
            listeEtudiants.innerHTML = "";

            etudiants.forEach(function (etudiant) {
                let li = document.createElement("li");

                let span = document.createElement("span");
                span.textContent = etudiant.nom + " " + etudiant.prenom;

                let Supprimer = document.createElement("button");
                Supprimer.textContent = "Supprimer";
                Supprimer.addEventListener("click", function () {
                    supprimerEtudiant(etudiant.id);
                });

                li.appendChild(span);
                li.appendChild(Supprimer);
                listeEtudiants.appendChild(li);
            });

            compteur.textContent = etudiants.length;
        }

        function ajouterEtudiant() {
            let nom = oniNom.value.trim();
            let prenom = oniPrenom.value.trim();

            if (nom === "" || prenom === "") {
                alert("Veuillez remplir tout les champ.");
                return;
            }

            let nouvelEtudiant = {
                id: Date.now(),
                nom: nom,
                prenom: prenom,
            };

            etudiants.push(nouvelEtudiant);
            sauvegarderEtudiants();
            afficherEtudiants();

             oniNom.value = "";
            oniPrenom.value = "";
        }

        function supprimerEtudiant(id) {
            etudiants = etudiants.filter(function (e) {
                return e.id !== id;
            });

            sauvegarderEtudiants();
            afficherEtudiants();
        }

        Ajouter.addEventListener("click", ajouterEtudiant);
        chargerEtudiants();
        afficherEtudiants();