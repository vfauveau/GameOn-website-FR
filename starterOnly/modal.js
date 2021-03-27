function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}


// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelector(".close");
const formulaire = document.getElementById('form');
const submit = document.querySelector('input[type=submit]');
const modalBody = document.getElementsByClassName('.modal-body');
// messages d'erreurs  à implémenter dans chaque span d'erreur
const messages = [
  "Le prénom doit contenir au moins 2 caractères.",
  "Le nom doit contenir au moins 2 caractères.",
  "Veuillez entrer une adresse email valide.",
  "Veuillez entrer une date de naissance valide.",
  "Veuillez indiquer votre nombre de participation.",
  "Veuillez choisir une ville de participation.",
  "Veuillez accepter les conditions d'utilisations."
]
const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const email = document.getElementById('email');
const date = document.getElementById('birthdate');
const quantity = document.querySelector("input[name='quantity']");
const radios = document.querySelectorAll("input[type=radio][name=location]");
const checkboxReq = document.getElementById('checkbox1');
// creation des messages erreurs
var messagePrenom = document.createElement("span");
var messageNom = document.createElement("span");
var messageEmail = document.createElement("span");
var messageQuantite = document.createElement("span");
var messageRadios = document.createElement("span");
var messageDate = document.createElement("span");
var messageCase = document.createElement("span");

// fonction qui reset le message l'affichage des messages d'erreurs
function messageReset() {
  messagePrenom.style.display = "none";
  messageNom.style.display = "none";
  messageEmail.style.display = "none";
  messageDate.style.display = "none";
  messageRadios.style.display = "none";
  messageQuantite.style.display = "none";
  messageCase.style.display = "none";
}
/* fonction qui append le message d'erreur avec 3 paramètres (la variable contenant le span associé à l'erreur, le texte que ce message doit contenir et l'endroit où il doit être ajouté(
  on prend le formdata parent de l'input en question))*/
function erreurMessage(variable, texte, endroit) {
  variable.classList.add('erreur');
  variable.textContent = texte;
  variable.style.display = "inline";
  endroit.parentNode.appendChild(variable);
}

/* variante sans le append pour des éléments posant des problèmes lors de l'intégration du message d'erreur */
function erreurMessage2(variable, texte) {
  variable.classList.add('erreur');
  variable.textContent = texte;
  variable.style.display = "inline";}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

/* on ferme la modale sur l'evenement click */
modalClose.addEventListener("click", closeModal);

/*FORMULAIRE */
formulaire.addEventListener('submit', function validate(ev) {
  var validation = true; // booléen qui controlera la validation
  ev.preventDefault();
  messageReset();

  /* test du prénom */
  if (firstName.value.length < 2 || firstName.value == "") {
    firstName.focus();
    erreurMessage(messagePrenom, messages[0], firstName);
    validation = false;
  }

  /* test du nom de famille */
  if (lastName.value.length < 2 || lastName.value == "") {
    lastName.focus();
    erreurMessage(messageNom, messages[1], lastName);
    validation = false;
  }
  /* test du mail regex de vérification */
  if (!email.value.match(/[a-z0-9_\-\.]+@[a-z0-9_\-\.]+\.[a-z]+/i)) {
    email.focus();
    erreurMessage(messageEmail, messages[2], email);
    validation = false;
  }
// controle qu'une valeur date est remplie (pas sa validité)
  if (date.value == "" || date.value.length < 8) {
    erreurMessage(messageDate, messages[3], date);
    date.focus()
    validation = false
  }
  /* test que le nombre de fois spécifié est bien un nombre / entre 0 et 99 */
  if (quantity.value == "" || quantity.value > 99) {
    quantity.focus();
    erreurMessage(messageQuantite, messages[4], quantity);
    validation = false;
  }

  // boucle pour vérifier si chaque bouton radio est coché, si oui renvoie true
  var valeur;
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      valeur = radios[i].value;
    }
  }

  // si après la boucle la valeur est toujours indéfinie, validation devient false et affiche un message d'erreur
  if (valeur === undefined) {
    erreurMessage2(messageRadios, messages[5]);
    formData[6].insertAdjacentElement('beforebegin', messageRadios);
    validation = false;
  }

  // checkbox required vérification que la case est cochée sinon affiche un message d'erreur
  if (checkboxReq.checked === false) {
    erreurMessage2(messageCase, messages[6]);
    formData[6].insertAdjacentElement('afterend', messageCase);
    validation = false;
  }
  // si au moins un élément du formulaire est invalide, empêche l'envoi, conserve les valeurs et retourne false ;
  if (validation === false) {
    return false
  }

  if (validation === true) {
    // on montre les valeurs dans la console log
    console.log("Prénom : " + firstName.value);
    console.log("Nom : " + lastName.value);
    console.log("Email : "+ email.value);
    console.log('Nombre de participations : '+ quantity.value);
    console.log('Date de naissance : '+ birthdate.value);
    console.log('Endroit : '+ valeur);
    // la modale invisible superpose le formulaire affiche le message et devient visible
    var divValidation = document.getElementById('div-Validation');
    divValidation.style.display="flex";
    // on paramètre le nouveau bouton pour fermer la modale.
    var buttonClose = document.getElementById('btn-close');
    buttonClose.addEventListener('click', closeModal);
    return true;
  }
});
