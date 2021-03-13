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
const form = document.getElementById('form');
const submit = document.querySelector('input[type=submit]');

const messErr = document.createElement('span')

messErr.textContent += "Ceci est un message d'erreur";
messErr.classList.add('formData[data-error]::after');
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
function validate() {
  // variables
  var firstName = document.getElementById('first');
  var lastName = document.getElementById('last');
  var email = document.getElementById('email');
  var quantity = document.querySelector("input[name='quantity']");
  var radios = document.querySelectorAll("input[type=radio][name=location]");
  var checkboxReq = document.getElementById('checkbox1');
  submit.addEventListener('submit', function(){formData.removeChild(messErr);})

  /* test du prénom */
  if (firstName.value.length < 2 || firstName.value == "") {
    console.log("le prenom doit contenir au moins 2 caracteres");
    firstName.focus();
    firstName.parentNode.appendChild(messErr);
    return false ;
  }

  /* test du nom de famille */
  else if (lastName.value.length < 2 || firstName.value == "") {
    console.log("le nom doit contenir au moins 2 caracteres");
    lastName.focus()
    return false ;
  }

  /* test du mail */
  if (!email.value.match(/[a-z0-9_\-\.]+@[a-z0-9_\-\.]+\.[a-z]+/i)) {
    console.log(" Veuillez entrer une adresse mail valide");
    email.focus()
    return false ;
  }

  /* test que le nombre de fois spécifié est bien un nombre / entre 0 et 99 */
  if (quantity.value == "" || quantity.value > 99) {
    console.log("le nombre doit etre compris entre 0 et 99");
    quantity.focus()
    return false ;
  }

  // boucle pour vérifier si chaque bouton radio est coché, si oui renvoie true
  var valeur;
  for(var i = 0; i < radios.length; i++){
   if(radios[i].checked){
   valeur = radios[i].value;
   }
  }

  // si la boucle ne trouve rien renvoi false
  if (valeur === undefined){console.log("erreur");return false;}
  // checkbox required
  if (checkboxReq.checked === false)
  {console.log('il faut cocher la case !!!!');return false;}
  return true ;
}


submit.addEventListener('onsubmit', function(){firstName.parentNode.removeChild(messErr);})