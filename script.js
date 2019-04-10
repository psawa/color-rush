//Selectors
let mainCarre = document.querySelector('#mainCarre');
let playButton = document.querySelector('#playButton');
let homeContent = document.querySelector('#home-content');
let container = document.querySelector('#container')
let bpmAccueil = 130;
let bpmGame = 150;
let mainAudio = new Audio('audio/main.mp3')
let clignottementInterval = null;

let selectMode = document.querySelector('#modeSelection')

function parseBpmIntoInterval(bpm) {
  return (1 / (bpm / 60)) * 1000
}

mainAudio.addEventListener('play',animateMainCarre)
//Function qui anime le carré de la page d'accueil
//Se déclenche quand la musique commence
function animateMainCarre() {
  //on convertit le bpm en intervalle
  interval = parseBpmIntoInterval(bpmAccueil);
  clignottementInterval = setInterval(function() {
    //Ce code s'éxécute à intervalle régulier
    //Pour être en rithme sur la musique
    let randomR = randomInt(0, 255);
    let randomG = randomInt(0, 255);
    let randomB = randomInt(0, 255);
    //change le carré et le fond de couleur en rythme
    mainCarre.style.backgroundColor = `rgb(${randomR},${randomG},${randomB})`;
    container.style.background =  `linear-gradient(rgba(${randomR},${randomG},${randomB},0.1),#00163a)`
    mainCarre.style.transform = 'scale(1.02)';
    //Animation du carré qui grossit
    setTimeout(function() {
      mainCarre.style.transform = 'scale(1)';
    }, 50)

  }, interval)
}


function randomInt(min, max) {
  //renvoie un entier aléatoire entre min et max
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//Au clic du bouton play,
playButton.addEventListener('click', function() {
  //Le contenu de la page d'accueil n'est plus affiché
  homeContent.style.display = 'none';
  //La musique de l'accueil est coupée et remise à zéro
  mainAudio.pause();
  mainAudio.currentTime = 0;
  //L'animation de l'accueil s'arrête
  clearInterval(clignottementInterval);

  //On lance le joueur
  jeu.start();
})

mainAudio.addEventListener('ended', function() {
  //redémarre la musique de l'accueil lorsqu'elle est finie
  this.currentTime = 0;
  this.play();
}, false);

let game = {
  //Objet jeu, gère le noyau et l'affichage
  level: null,
  lose: false,
  mode: null,
  maxLevel: 10,
  currentTargetColor: null,
  currentSourceColor:null,
  checkResult: function() {
    //Vérifie le % d'erreur du joueur pour le niveau
    //Quand le temps est imparti, ou quand il valide
    //appelle parseIntoRgb
    null;
  },
  nextLevel: function() {
    //Passage au niveau suivant si succès
    //Vérifie qu'on a pas atteint le niveau maximal
    null;
  },
  youLose: function() {
    //Quand on a perdu
    null;
  },
  youWin: function() {
    //Quand on a atteint le level max
    null
  },
  start: function() {
    //Démarre le jeu (musique, etc..)
    //initialise le niveau à 1
    //Détecter le mode...
    null;
  },
  get mode(){
    return selectMode.options[selectMode.selectedIndex].value;
  }
}

let affichage = {
  //Créer des attribus correspondant à la structure de la page
  newTargetSquare: function(mode = jeu.mode){
    //Crée un nouveau carré cible, rempli avec un certain espace de couleurs
    //Appelée à chaque niveau
    if (mode==="rgb") {
      null;
    }
    else if (mode==="rgba") {
      null;
    }
    else if (mode==="hsl") {
      null;
    }
    else if (mode==="cmj") {
      null;
    }
  },
  newSliders: function(mode = game.mode){
    //Crée les sliders adapté au mode sélectionné
    //Appelée une fois au début de la partie
    if (mode==="rgb") {
      null;
    }
    else if (mode==="rgba") {
      null;
    }
    else if (mode==="hsl") {
      null;
    }
    else if (mode==="cmj") {
      null;
    }
  },
  newResults: function(result){
    //Affiche le résultat
    null;
  },
  newSkip: function(){
    //passe le temps d'attente et va directement au résultat
  },
  newWin: function(){

  }
}

function parseIntoRgb(code, mode = jeu.mode){
  //valeurs possibles de mode : rgba, hsl, cmj
  //Convertit un code couleur en rgb
  //pour pouvoir effectuer le calcul de distance entre 2 couleurs
  if(mode==="rgba") {
    null;
  }
  else if(mode==="hsl"){
    null
  }
  else if(mode==="cmj"){
    null
  }
}
//Lance la musique
mainAudio.play();
