//Faire des contrôles clavier pour les PGM

/*
########################
####Variables ##########
########################
*/

//Éléments de l'accueil
let mainCarre = document.querySelector('#mainCarre');
let playButton = document.querySelector('#playButton');
let homeContent = document.querySelector('#home-content');
let bpmAccueil = 130;
let mainAudio = new Audio('audio/main.mp3')
mainAudio.play();
let selectMode = document.querySelector('#modeSelection')

//Éléments du jeu
let bpmGame = 150;
let mySquareElement = document.querySelector('#mySquare');
let targetSquareElement = document.querySelector('#targetSquare');
let gameContent = document.querySelector('#game-content');
let gameAudio = new Audio('audio/game.mp3');
let squaresZone = document.querySelector('.squares-zone');
let checkButton = document.querySelector('#checkButton');
let slidersZone = document.querySelector('#sliders-zone')
let slider1 = document.querySelector('#slider1');//R if Rgb, H if HSL...
let slider2 = document.querySelector('#slider2');//G if RGb, S if HSL..
let slider3 = document.querySelector('#slider3');//B if RGB, L if HSL..
//let slider4 = document.querySelector('#slider4');//A from rgba



//Élements persistents
let container = document.querySelector('#container')
let blinkingInterval = null;

/*
########################
####Events Listeners####
########################
*/

//Accueil
mainAudio.addEventListener('play',animateMainCarre)
mainAudio.addEventListener('ended', function() {
  //redémarre la musique de l'accueil lorsqu'elle est finie
  clearInterval(clignottementInterval);
  this.currentTime = 0;
  this.play();
}, false);

playButton.addEventListener('click', function() {
  //Au clic du bouton play,
  //Le contenu de la page d'accueil n'est plus affiché
  homeContent.style.display = 'none';

  //La musique de l'accueil est coupée et remise à zéro
  mainAudio.pause();
  mainAudio.currentTime = 0;
  //L'animation de l'accueil s'arrête
  clearInterval(blinkingInterval);

  //On lance le joueur
  game.start();
})
checkButton.addEventListener('click',function(){
  game.checkResult();
  clearInterval(timer.interval);
}
)



//Jeu
slider1.addEventListener('input', change1);
slider2.addEventListener('input', change2);
slider3.addEventListener('input', change3);
//slider4.addEventListener('input', change4);

/*
########################
#######Fonctions########
########################
*/

function change1(event){
  if (game.mode==='rgb') {
    document.querySelector('#valeur1').innerHTML = event.target.value;
  }
  updateMySquareColor();
}
function change2(event){
  if (game.mode==='rgb') {
    document.querySelector('#valeur2').innerHTML = event.target.value;
  }
  updateMySquareColor();
}
function change3(event){
  if (game.mode==='rgb') {
    document.querySelector('#valeur3').innerHTML = event.target.value;
  }
  updateMySquareColor();
}

function updateMySquareColor(){
  mySquare.color = `rgb(${document.querySelector('#valeur1').innerHTML},${document.querySelector('#valeur2').innerHTML},${document.querySelector('#valeur3').innerHTML})`;
}

function parseBpmIntoInterval(bpm) {
  //Convertit une fréquence en bpm vers un intervalle en ms
  return (1 / (bpm / 60)) * 1000;
}

function animateMainCarre() {
  /*fonction qui anime le carré de la page d'accueil
  Se déclenche quand la musique commence*/

  //on convertit le bpm en intervalle
  interval = parseBpmIntoInterval(bpmAccueil);
  blinkingInterval = setInterval(function() {
    //Ce code s'éxécute à intervalle régulier
    //Pour être en rithme sur la musique
    let randomR = randomInt(0, 255);
    let randomG = randomInt(0, 255);
    let randomB = randomInt(0, 255);
    //change le carré et le fond de couleur en rythme
    mainCarre.style.backgroundColor = `rgb(${randomR},${randomG},${randomB})`;
    container.style.background =  `linear-gradient(rgba(${randomR},${randomG},${randomB},0.01),#00163a)`
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

function parseIntoRgb(code, mode = game.mode){
  //valeurs possibles de mode : rgba, hsl, cmj
  //Convertit un code couleur en rgb
  //Puis renvoie les composantes
  //pour pouvoir effectuer le calcul de distance entre 2 couleurs
  if(mode==="rgb"){
    code = code.substr(4); //On extrait les caractères à partir du 4eme
    code = code.substring(0,code.length-1); //et on enlève le dernier
    codeArray = code.split(',');//Et on transforme en tableau
    return codeArray;
  }
  else if(mode==="rgba") {
    null;
  }
  else if(mode==="hsl"){
    null
  }
  else if(mode==="cmj"){
    null
  }
}


function rgb2lab(rgb){
  var r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255,
      x, y, z;

  r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
  z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

  x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
  y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
  z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;

  return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
}

// calculate the perceptual distance between colors in CIELAB
// https://github.com/THEjoezack/ColorMine/blob/master/ColorMine/ColorSpaces/Comparisons/Cie94Comparison.cs

function deltaE(labA, labB){
  var deltaL = labA[0] - labB[0];
  var deltaA = labA[1] - labB[1];
  var deltaB = labA[2] - labB[2];
  var c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
  var c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
  var deltaC = c1 - c2;
  var deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
  deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
  var sc = 1.0 + 0.045 * c1;
  var sh = 1.0 + 0.015 * c1;
  var deltaLKlsl = deltaL / (1.0);
  var deltaCkcsc = deltaC / (sc);
  var deltaHkhsh = deltaH / (sh);
  var i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
  return i < 0 ? 0 : Math.sqrt(i);
}

/*
########################
#######Objets###########
########################
*/
let game = {
  //Objet jeu, gère le noyau
  //Déclaré en premier pour pouvoir être manipulé
  level: 0,
  seuil:20,
  state:'menu',//menu, checking, playing, lose, win
  mode: null,
  maxLevel: 10,
  currentDistance:null,
  checkResult: function() {
    game.state = 'checking';
    let targetComponentsRgb = parseIntoRgb(targetSquare.color);
    let myComponentsRgb = parseIntoRgb(mySquare.color);
    let targetComponentsLab = rgb2lab(targetComponentsRgb);
    let myComponentsLab = rgb2lab(myComponentsRgb);

    //Vérifie le % d'erreur du joueur pour le niveau
    //Quand le temps est imparti, ou quand il valide
    //appelle parseIntoRgb
    let distance = deltaE(targetComponentsLab,myComponentsLab).toFixed(2); //merci github
    this.currentDistance = distance;
    console.log(distance);
    affichage.checking();
    setTimeout(function(){
      if (game.currentDistance <= game.seuil){
        affichage.newMessage('GREAT !')
        affichage.clear();
        game.nextLevel()
      }
      else{
        affichage.newMessage('Maybe next time..');
      }
    },7000)
  },
  nextLevel: function() {
    if (this.level ===  this.maxLevel) {
      return null; // Affiche l'écran de gagné
    }
    this.level+=1;
    document.querySelector('#current-level').innerHTML = this.level;
    targetSquare.randomColor();
    mySquare.color = 'rgb(255,255,255)';
    timer.newTimer();
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
    this.state = 'playing';
    document.querySelector('#explications').style.display = 'none';
    gameAudio.play();
    setTimeout(function(){
      affichage.newMessage('Ready ?')
    },100)
    setTimeout(function(){
      affichage.newMessage('3..');
    },800)
    setTimeout(function(){
      affichage.newMessage('2..');
    },1600)
    setTimeout(function(){
      affichage.newMessage('1..');
    },2400)
    setTimeout(function(){
      affichage.newMessage('GO');
      game.nextLevel();
      gameContent.style.display = '';
    },3500)


  },
  get mode(){
    return selectMode.options[selectMode.selectedIndex].value;
  }
}

let timer = {
  values: [30,27,25,22,18,15,13,11,10,8],
  interval: null,
  get currentTime(){
    return this.values[game.level-1];
  },
  newTimer: function(){
    let sec = this.currentTime;
    this.setTime(sec);
    this.interval = setInterval(function(){
      sec -= 1;
      timer.setTime(sec);
      if (sec === 0) {
        clearInterval(timer.interval);
        game.checkResult();
      }
    },1000)
  },
  timeGoesBy:function(){

  },
  setTime: function(time){
    document.querySelector('#current-time').innerHTML = time;
  }
}

class Square {
  constructor(DomElement) {
    this.element = DomElement;
  }
  set color(color){
    //remplit d'une certaine couleur
    this.element.style.backgroundColor = color;
  }
  get color(){
    return this.element.style.backgroundColor;
  }
  bounce(){
    //Animation, le carré bounce à partir d'un certain temps
    setInterval(function(){
      if (jeu.state === 'play') {
        //Animation
      }
    },parseBpmIntoInterval(bpmGame))
  }
  randomColor(){
    let randomR = randomInt(0, 255);
    let randomG = randomInt(0, 255);
    let randomB = randomInt(0, 255);
    this.color = `rgb(${randomR},${randomG},${randomB})`;
  }

}

const mySquare = new Square(mySquareElement);
const targetSquare = new Square(targetSquareElement);



let affichage = {
  //Créer des attribus correspondant à la structure de la page
  checking:function(){
    checkButton.style.visibility = 'hidden';
    slidersZone.style.display = 'none';
    document.querySelector('#my-square-zone').style.transform = 'translateX(-150px)';
    document.querySelector('#target-square-zone').style.transform = 'translateX(150px)';

    setTimeout(affichage.newPercentage,3000);
    setTimeout(function(){
      document.querySelector('#my-square-zone').style.transform = 'translateX(0)';
      document.querySelector('#target-square-zone').style.transform = 'translateX(0)';
    },3000);
  },
  newPercentage:function(){
    let newPercentageDiv = document.createElement('p');
    let newPercentage = document.createTextNode(game.currentDistance+'%');
    newPercentageDiv.appendChild(newPercentage);
    newPercentageDiv.classList.add('percentage');
    squaresZone.appendChild(newPercentageDiv);
    newPercentageDiv.style.marginLeft = `-${newPercentageDiv.offsetWidth/2}px`;
    newPercentageDiv.style.marginTop = `-${newPercentageDiv.offsetHeight/2}px`;
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

  newMessage:function(message){
    let newMessageDiv = document.createElement('p');
    let newMessage = document.createTextNode(message);
    newMessageDiv.appendChild(newMessage);
    newMessageDiv.classList.add('message');
    container.appendChild(newMessageDiv);
    newMessageDiv.style.marginLeft = `-${newMessageDiv.offsetWidth/2}px`;
    newMessageDiv.style.marginTop = `-${newMessageDiv.offsetHeight/2}px`;
    setTimeout(function(){
      newMessageDiv.parentNode.removeChild(newMessageDiv);
    },1400)
  },
  clear:function(){
    document.querySelector('.percentage').parentNode.removeChild(document.querySelector('.percentage'));
    checkButton.style.visibility = '';
    slidersZone.style.display = '';
    slider1.value = '255';
    slider2.value = '255';
    slider3.value = '255';

  }
}
