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
let menuAudio = new Audio('audio/menu.mp3')
menuAudio.play();
let selectMode = document.querySelector('#modeSelection')

//Éléments du jeu
let bpmGame = 150;
let audio1 = new Audio('audio/1.mp3');
let audio2 = new Audio('audio/2.mp3');
let audio3 = new Audio('audio/3.mp3');
let congratulationsAudio = new Audio('audio/congratulations.mp3');
let greatAudio = new Audio('audio/great.mp3');
let groovyAudio = new Audio('audio/groovy.mp3');
let perfect = new Audio('audio/perfect.mp3');
let timeUpAudio = new Audio('audio/timeUp.mp3');
let youLoseAudio = new Audio('audio/youLose.mp3');
let youWinAudio = new Audio('audio/youWin.mp3');
let roundAudios = new Array();
let gameWinAudio = new Audio('audio/musicWin.mp3');
let perfectAudio = new Audio('audio/perfect.mp3');
roundAudios[0] = new Audio('audio/round1.mp3');
roundAudios[1] = new Audio('audio/round2.mp3');
roundAudios[2] = new Audio('audio/round3.mp3');
roundAudios[3] = new Audio('audio/round4.mp3');
roundAudios[4] = new Audio('audio/round5.mp3');
roundAudios[5] = new Audio('audio/round6.mp3');
roundAudios[6] = new Audio('audio/round7.mp3');
roundAudios[7] = new Audio('audio/round8.mp3');
roundAudios[8] = new Audio('audio/round9.mp3');
roundAudios[9] = new Audio('audio/finalRound.mp3');
//Musiques de playlist
let music1 = [new Audio('audio/music1.mp3'),140,18.2]; //file, bpm, drop-timecode
let music2 = [new Audio('audio/music2.mp3'),163.5,23];
let music3 = [new Audio('audio/music3.mp3'),120,4];
let music4 = [new Audio('audio/music4.mp3'),120,15.1];
let music5 = [new Audio('audio/music5.mp3'),151,14.3];
let music6 = [new Audio('audio/music6.mp3'),141,18];
let music7 = [new Audio('audio/music7.mp3'),133,28];

let testAudio = [new Audio('audio/test.mp3'),200,"dropTimeCode"];



let mySquareElement = document.querySelector('#mySquare');
let targetSquareElement = document.querySelector('#targetSquare');
let gameContent = document.querySelector('#game-content');
let squaresZone = document.querySelector('#squares-zone');
let checkButton = document.querySelector('#checkButton');
let slidersZone = document.querySelector('#sliders-zone')
let menuOrRetryZone = document.querySelector('#menu-or-retry-zone');
let playAgainButton = document.querySelector('#play-again-button');
let goToMenuButton = document.querySelector('#go-to-menu-button');

var valeur1 = '';
var valeur2 = '';
var valeur3 = '';

//Élements persistents
let container = document.querySelector('#container')
let blinkingInterval = null;

/*
########################
####Events Listeners####
########################
*/

//Accueil
menuAudio.addEventListener('play', animateMainCarre)
menuAudio.addEventListener('ended', function() {
  //redémarre la musique de l'accueil lorsqu'elle est finie
  clearInterval(blinkingInterval);
  this.currentTime = 0;
  this.play();
}, false);

playButton.addEventListener('click', function() {
  //Au clic du bouton play,
  //Le contenu de la page d'accueil n'est plus affiché
  //La musique de l'accueil est coupée et remise à zéro
  menuAudio.pause();
  menuAudio.currentTime = 0;
  //L'animation de l'accueil s'arrête
  clearInterval(blinkingInterval);

  //On lance le joueur
  game.start();
})
checkButton.addEventListener('click', function() {
  game.checkResult();
  clearInterval(timer.interval);
});

playAgainButton.addEventListener('click', function() {
  game.start();
});
goToMenuButton.addEventListener('click', function() {
  game.goToMenu()

});


/*
########################
#######Fonctions########
########################
*/

function change1(event) {
    valeur1.innerHTML = event.target.value;
  updateMySquareColor();
}

function change2(event) {
    valeur2.innerHTML = event.target.value;
  updateMySquareColor();
}

function change3(event) {
    valeur3.innerHTML = event.target.value;
  updateMySquareColor();
}

function updateMySquareColor() {
  if (game.mode ==='rgb') {
      mySquare.color = `rgb(${valeur1.innerHTML},${valeur2.innerHTML},${valeur3.innerHTML})`;
  }
  else if(game.mode==="hsl"){
    mySquare.color = `hsl(${valeur1.innerHTML},${valeur2.innerHTML}%,${valeur3.innerHTML}%)`;
  }
  else if(game.mode==="cmy"){
    let c = parseInt(valeur1.innerHTML);
    let m = parseInt(valeur2.innerHTML);
    let y = parseInt(valeur3.innerHTML);
    let k = 0;

    let code = CMYKtoRGB(c,m,y,k);
    mySquare.color = `rgb(${code[0]},${code[1]},${code[2]})`;
  }

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

function randomChoice(array) {
  //Make random choice within an array
  let index = Math.floor(Math.random() * array.length);
  return array[index];
}

function parseIntoRgb(code) {
  //valeurs possibles de mode : rgba, hsl, cmj
  //Convertit un code couleur en rgb
  //Puis renvoie les composantes
  //pour pouvoir effectuer le calcul de distance entre 2 couleurs
  code = code.substr(4); //On extrait les caractères à partir du 4eme
  code = code.substring(0, code.length - 1); //et on enlève le dernier
  codeArray = code.split(','); //Et on transforme en tableau
  return codeArray;
}
// function cmykToRgb(c, m, y, k) {
//   var r, g, b;
//   r = 255 - ((Math.min(1, c * (1 - k) + k)) * 255);
//   g = 255 - ((Math.min(1, m * (1 - k) + k)) * 255);
//   b = 255 - ((Math.min(1, y * (1 - k) + k)) * 255);
//   return {r : r, g : g, b : b};
// }

function CMYKtoRGB(c,m,y,k){
		var result = new Array();

		c = c / 100;
		m = m / 100;
		y = y / 100;
		k = k / 100;

		result[0] = 1 - Math.min( 1, c * ( 1 - k ) + k );
		result[1] = 1 - Math.min( 1, m * ( 1 - k ) + k );
		result[2] = 1 - Math.min( 1, y * ( 1 - k ) + k );

		result[0] = Math.round( result[0] * 255 );
		result[1] = Math.round( result[1] * 255 );
		result[2] = Math.round( result[2] * 255 );

		return result;
	}

function rgb2lab(rgb) {
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

  x = (x > 0.008856) ? Math.pow(x, 1 / 3) : (7.787 * x) + 16 / 116;
  y = (y > 0.008856) ? Math.pow(y, 1 / 3) : (7.787 * y) + 16 / 116;
  z = (z > 0.008856) ? Math.pow(z, 1 / 3) : (7.787 * z) + 16 / 116;

  return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
}

// calculate the perceptual distance between colors in CIELAB
// https://github.com/THEjoezack/ColorMine/blob/master/ColorMine/ColorSpaces/Comparisons/Cie94Comparison.cs

function deltaE(labA, labB) {
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
  seuil: 20,
  state: 'menu', //menu, checking, playing, lose, win
  mode: null,
  maxLevel: 10,
  currentDistance: null,
  checkResult: function() {
    game.state = 'checking';
    let targetComponentsRgb = parseIntoRgb(targetSquare.color);
    let myComponentsRgb = parseIntoRgb(mySquare.color);
    let targetComponentsLab = rgb2lab(targetComponentsRgb);
    let myComponentsLab = rgb2lab(myComponentsRgb);

    //Vérifie le % d'erreur du joueur pour le niveau
    //Quand le temps est imparti, ou quand il valide
    //appelle parseIntoRgb
    let distance = deltaE(targetComponentsLab, myComponentsLab) //merci github
    this.currentDistance = parseFloat(distance.toFixed(2));
    affichage.checking();
    setTimeout(function() {
      if (game.currentDistance <= game.seuil) {
        game.levelWin();
      } else {
        game.lose();
      }
    }, 7000)
  },
  nextLevel: function() {
    game.state = "playing";
    if (this.level === this.maxLevel) {
      this.state = "win";
      this.gameWin();
      // Affiche l'écran de gagné
    }
    else{
      this.level += 1;
      affichage.clear();
      roundAudios[this.level-1].play();
      document.querySelector('#current-level').innerHTML = this.level;
      targetSquare.randomColor();
      if (game.mode==='cmy') {
        mySquare.color = 'rgb(255,255,255)';
      }
      else{
        mySquare.color = 'rgb(0,0,0)';

      }
      timer.newTimer();
    }
  },
  lose: function() {
    //Quand on a perdu
    this.state = "lose";
    affichage.newMessage('Maybe next time..');
    affichage.lose();
  },
  levelWin: function() {
    //Quand on a atteint le level max
    if (game.currentDistance > 15) {
      affichage.newMessage('Ok !')
    } else if(game.currentDistance>10){
      affichage.newMessage('Nice !')
    } else if (game.currentDistance > 5) {
      affichage.newMessage('You rock !');
      groovyAudio.play();
    } else if (game.currentDistance > 3) {
      affichage.newMessage('GREAT !');
      greatAudio.play();
    } else {
      affichage.newMessage('PERFECT!');
      perfectAudio.play();
    }
    setTimeout(function() {
      game.nextLevel();
    }, 1000)
  },
  gameWin: function(){
    this.state = "win";
    congratulationsAudio.play();
    affichage.gameWin();

  },
  start: function() {
    //Démarre le jeu (musique, etc..)
    homeContent.style.display = 'none';
    this.level = 0;
    document.querySelector('#explications').style.display = 'none';
    gameContent.style.display='none';
    if (this.state ==="menu") {
      affichage.newSliders();
    }
    setTimeout(function() {
      affichage.newMessage('Ready ?')
    }, 100)
    setTimeout(function() {
      affichage.newMessage('3..');
      if (game.state==="menu") {
        audio3.play();
      }
    }, 800)
    setTimeout(function() {
      affichage.newMessage('2..');
      if (game.state==="menu") {
        audio2.play();
      }
    }, 1600)
    setTimeout(function() {
      affichage.newMessage('1..');
      if (game.state==="menu") {
        audio1.play();
      }
    }, 2400)
    setTimeout(function() {
      if (game.state === "menu") {
        playList.launch();
      }
      affichage.newMessage('GO');
      game.nextLevel();
      gameContent.style.display = '';
      affichage.clear()

    }, 3500)


  },
  get mode() {
    return selectMode.options[selectMode.selectedIndex].value;
  },
  goToMenu: function() {
    if (this.state != 'menu') {
      affichage.deleteSliders();
      affichage.cancelBounce();
      playList.quit();
      menuAudio.play();
      gameContent.style.display = 'none';
      homeContent.style.display = '';
      container.style.background = '';
      document.querySelector('#explications').style.display = ''
      this.state = 'menu';
    }
  }
}

let timer = {
  values: [30, 27, 24, 20, 17, 14, 12,10, 8, 7],
  interval: null,
  get currentTime() {
    return this.values[game.level - 1];
  },
  newTimer: function() {
    let sec = this.currentTime;
    this.setTime(sec);
    this.interval = setInterval(function() {
      sec -= 1;
      timer.setTime(sec);
      if (sec === 0) {
        clearInterval(timer.interval);
        timeUpAudio.play();
        game.checkResult();
      }
    }, 1000)
  },
  timeGoesBy: function() {

  },
  setTime: function(time) {
    document.querySelector('#current-time').innerHTML = time;
  }
}

class Square {
  constructor(DomElement) {
    this.element = DomElement;
  }
  set color(color) {
    //remplit d'une certaine couleur
    this.element.style.backgroundColor = color;
  }
  get color() {
    return this.element.style.backgroundColor;
  }

  randomColor() {
    let randomR = randomInt(0, 255);
    let randomG = randomInt(0, 255);
    let randomB = randomInt(0, 255);
    this.color = `rgb(${randomR},${randomG},${randomB})`;
  }
}

const mySquare = new Square(mySquareElement);
const targetSquare = new Square(targetSquareElement);



let affichage = {
  bounceIntervalVar: null,
  colors:['#4a148c','#1a237e','#311b92','#880e4f','#0d47a1','#01579b','#006064','#004d40','#1b5e20','#33691e','#bf360c','#3e2723'], //Some flat colors for the animation
  checking: function() {
    checkButton.style.visibility = 'hidden';
    slidersZone.style.transform = 'translateY(300px)';
    setTimeout(function() {
      slidersZone.style.display = 'none';
    }, 1000)
    document.querySelector('#my-square-zone').style.transform = 'translateX(-150px)';
    document.querySelector('#target-square-zone').style.transform = 'translateX(150px)';

    setTimeout(affichage.newPercentage, 3000);
    setTimeout(function() {
      document.querySelector('#my-square-zone').style.transform = 'translateX(0)';
      document.querySelector('#target-square-zone').style.transform = 'translateX(0)';
    }, 3000);
  },
  newPercentage: function() {
    let newPercentageDiv = document.createElement('p');
    let percentage = (100-game.currentDistance).toFixed(2).toString()+'%';
    console.log(percentage);
    let newPercentage = document.createTextNode(percentage);
    newPercentageDiv.appendChild(newPercentage);
    newPercentageDiv.classList.add('percentage');
    squaresZone.appendChild(newPercentageDiv);
    newPercentageDiv.style.marginLeft = `-${newPercentageDiv.offsetWidth/2}px`;
    newPercentageDiv.style.marginTop = `-${newPercentageDiv.offsetHeight/2}px`;
  },
  deleteSliders: function(){
    slidersZone.parentNode.removeChild(slidersZone);
  },
  newSliders: function(mode = game.mode) {
    //Crée les sliders adapté au mode sélectionné
    //Appelée une fois au début de la partie
    let slidersZoneTemp = document.createElement('div');
    slidersZoneTemp.setAttribute('id','sliders-zone');

    let divSlider1Temp = document.createElement('div');

    let tag1Temp = document.createElement('i');
    divSlider1Temp.appendChild(tag1Temp);

    let slider1Temp = document.createElement('input');
    slider1Temp.setAttribute('type','range');
    slider1Temp.setAttribute('id','slider1');
    slider1Temp.setAttribute('min','0');
    slider1Temp.setAttribute('value','0')
    divSlider1Temp.appendChild(slider1Temp);

    let valeur1Temp = document.createElement('i');
    valeur1Temp.appendChild(document.createTextNode('0'));
    valeur1Temp.setAttribute('id','valeur1')
    divSlider1Temp.appendChild(valeur1Temp);
    slidersZoneTemp.appendChild(divSlider1Temp);
    slider1Temp.addEventListener('input',change1)

    slidersZoneTemp.appendChild(divSlider1Temp);

    let divSlider2Temp = document.createElement('div');

    let tag2Temp = document.createElement('i');
    divSlider2Temp.appendChild(tag2Temp);

    let slider2Temp = document.createElement('input');
    slider2Temp.setAttribute('type','range');
    slider2Temp.setAttribute('id','slider2');
    slider2Temp.setAttribute('min','0');
    slider2Temp.setAttribute('value','0')
    divSlider2Temp.appendChild(slider2Temp);

    let valeur2Temp = document.createElement('i');
    valeur2Temp.appendChild(document.createTextNode('0'));
    valeur2Temp.setAttribute('id','valeur2')
    divSlider2Temp.appendChild(valeur2Temp);
    slidersZoneTemp.appendChild(divSlider2Temp);
    slider2Temp.addEventListener('input',change2)

    slidersZoneTemp.appendChild(divSlider2Temp);

    let divSlider3Temp = document.createElement('div');

    let tag3Temp = document.createElement('i');
    divSlider3Temp.appendChild(tag3Temp);

    let slider3Temp = document.createElement('input');
    slider3Temp.setAttribute('type','range');
    slider3Temp.setAttribute('id','slider3');
    slider3Temp.setAttribute('min','0');
    slider3Temp.setAttribute('value','0')
    divSlider3Temp.appendChild(slider3Temp);

    let valeur3Temp = document.createElement('i');
    valeur3Temp.appendChild(document.createTextNode('0'));
    valeur3Temp.setAttribute('id','valeur3')
    divSlider3Temp.appendChild(valeur3Temp);
    slidersZoneTemp.appendChild(divSlider3Temp);
    slider3Temp.addEventListener('input',change3)

    slidersZoneTemp.appendChild(divSlider3Temp);

    squaresZone.after(slidersZoneTemp);
    valeur1 = document.querySelector('#valeur1');
    valeur2 = document.querySelector('#valeur2');
    valeur3 = document.querySelector('#valeur3');

    slidersZone = document.querySelector('#sliders-zone');

    if (mode === "rgb") {
      tag1Temp.appendChild(document.createTextNode('R'));
      slider1Temp.setAttribute('max','255');
      slider1Temp.classList.add('rgb');
      tag2Temp.appendChild(document.createTextNode('G'));
      slider2Temp.setAttribute('max','255');
      slider2Temp.classList.add('rgb');
      tag3Temp.appendChild(document.createTextNode('B'));
      slider3Temp.setAttribute('max','255');
      slider3Temp.classList.add('rgb');
    } else if (mode === "hsl") {
      tag1Temp.appendChild(document.createTextNode('H'));
      slider1Temp.setAttribute('max','360');
      tag2Temp.appendChild(document.createTextNode('S'));
      slider2Temp.setAttribute('max','100');
      tag3Temp.appendChild(document.createTextNode('L'));
      slider3Temp.setAttribute('max','100');
    } else if (mode === "cmy") {
      tag1Temp.appendChild(document.createTextNode('C'));
      slider1Temp.setAttribute('max','100');
      slider1Temp.classList.add('cmy');
      tag2Temp.appendChild(document.createTextNode('M'));
      slider2Temp.setAttribute('max','100');
      slider2Temp.classList.add('cmy');
      tag3Temp.appendChild(document.createTextNode('Y'));
      slider3Temp.setAttribute('max','100');
      slider3Temp.classList.add('cmy');
    }
  },
  lose: function() {
    document.querySelector('#cibleTag').style.visibility = 'hidden';
    document.querySelector('#monCarreTag').style.visibility = 'hidden';
    document.querySelector('#my-square-zone').style.transform = 'translateX(-150px)';
    setTimeout(function() {
      squaresZone.style.transform = 'translateY(500px)';
      menuOrRetryZone.style.display = '';
      menuOrRetryZone.style.marginLeft = `-${menuOrRetryZone.offsetWidth/2}px`;

    }, 3000)
    setTimeout(function() {
      squaresZone.style.display = 'none';
    }, 6000)

    document.querySelector('#time-zone').style.visibility = 'hidden';
    document.querySelector('#target-square-zone').style.transform = 'translateX(150px)';
    targetSquare.color = '#666';
    mySquare.color = '#666';
  },

  newMessage: function(message) {
    let newMessageDiv = document.createElement('p');
    let newMessage = document.createTextNode(message);
    newMessageDiv.appendChild(newMessage);
    newMessageDiv.classList.add('message');
    container.appendChild(newMessageDiv);
    newMessageDiv.style.marginLeft = `-${newMessageDiv.offsetWidth/2}px`;
    newMessageDiv.style.marginTop = `-${newMessageDiv.offsetHeight/2}px`;
    setTimeout(function() {
      newMessageDiv.parentNode.removeChild(newMessageDiv);
    }, 1400)
  },

  gameWin:function(){
    confettiRain();
    playList.quit();
    // currentAudio.pause()
    gameWinAudio.play();
    document.querySelector('#cibleTag').style.visibility = 'hidden';
    document.querySelector('#monCarreTag').style.visibility = 'hidden';
    document.querySelector('#my-square-zone').style.transform = 'translateX(-150px)';
    setTimeout(function() {
      squaresZone.style.transform = 'translateY(500px)';
      menuOrRetryZone.style.display = '';
      menuOrRetryZone.style.marginLeft = `-${menuOrRetryZone.offsetWidth/2}px`;

    }, 3000)
    setTimeout(function() {
      squaresZone.style.display = 'none';
    }, 6000)

    document.querySelector('#time-zone').style.visibility = 'hidden';
    document.querySelector('#target-square-zone').style.transform = 'translateX(150px)';
    targetSquare.color = '#f2f200';
    mySquare.color = '#f2f200';
  },

  clear: function() {
    if (document.querySelector('.percentage') != null) {
      document.querySelector('.percentage').parentNode.removeChild(document.querySelector('.percentage'));
    }
    container.style.background = '';

    document.querySelector('#time-zone').style.visibility = '';
    squaresZone.style.transform = 'translateY(0)';
    squaresZone.style.display='';
    document.querySelector('#cibleTag').style.visibility = '';
    document.querySelector('#monCarreTag').style.visibility = '';
    document.querySelector('#my-square-zone').style.transform = 'translateX(0)';
    document.querySelector('#target-square-zone').style.transform = 'translateX(0)';
    menuOrRetryZone.style.display='none';
    slidersZone.style.transform = 'translateY(0px)';
    slidersZone.style.display = '';
    slider1.value = 0;
    slider2.value = 0;
    slider3.value = 0;
    valeur1.innerHTML= 0;
    valeur2.innerHTML= 0;
    valeur3.innerHTML= 0;
    checkButton.style.visibility = '';

    //
    if (game.state ==="win") {
      cancelAnimationFrame(confettiRain);
    }
  },

  get bounceInterval(){
    return parseBpmIntoInterval(playList.currentBpm);
  },
  bounce: function() {
    console.log('Bounce function launched');
    this.bounceIntervalVar = setInterval(()=>{
      if (game.state !="menu") {
          container.style.background = `linear-gradient(#010101,${randomChoice(this.colors)})`;
      }
    },this.bounceInterval)
  },

  cancelBounce(){
    clearInterval(this.bounceIntervalVar);
  }
}


let playList = {
  tracks: [music1,music2,music3,music5,music6,music7],
  currentTrackNumber:0,
  currentDropTimeOut:null,
  get currentTrack(){
    return this.tracks[this.currentTrackNumber];
  },
  get currentBpm(){
    return this.currentTrack[1];
  },
  launch:function(){
    for (let i = 0; i < this.tracks.length; i++) {
      this.tracks[i][0].addEventListener('ended',()=>{
        this.nextTrack();
      });
    }
    this.playCurrentTrack();
  },
  nextTrack: function(){
    affichage.cancelBounce();
    container.style.background = '';
    clearTimeout(this.currentDropTimeOut);
    this.currentTrack[0].currentTime = 0;
    this.currentTrack[0].pause();
    if (this.currentTrackNumber === this.tracks.length-1) {
      this.currentTrackNumber = 0
    }
    else{
      this.currentTrackNumber +=1;
    }
    this.playCurrentTrack();
  },
  quit:function(){
    this.currentTrack[0].currentTime = 0;
    this.currentTrack[0].pause()
    this.currentTrackNumber = 0
  }
  ,
  playCurrentTrack: function(){
    console.log('Playcurrent track appelé');
    this.currentTrack[0].play();
    this.currentDropTimeOut = setTimeout(()=>{
    affichage.bounce();
    },this.currentTrack[2]*1000)
  }
}
