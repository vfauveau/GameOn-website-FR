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
// creation du message erreur
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
// fonction qui append le message d'erreur
function erreurMessage(variable, texte, endroit) {
  variable.classList.add('erreur');
  variable.textContent = texte;
  variable.style.display = "inline";
  endroit.parentNode.appendChild(variable);
}
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
// variable
const modalBody = document.getElementsByClassName('.modal-body');

/*FORMULAIRE */
formulaire.addEventListener('submit', function validate(ev) {
  var validation = true;
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
  /* test du mail */
  if (!email.value.match(/[a-z0-9_\-\.]+@[a-z0-9_\-\.]+\.[a-z]+/i)) {
    email.focus();
    erreurMessage(messageEmail, messages[2], email);
    validation = false;
  }

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

  // si la boucle ne trouve rien renvoi false et affiche un message d'erreur
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
    ev.preventDefault();
    return false
  }

  if (validation === true) {
    return true
  }
});

