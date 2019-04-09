//Selectors
let mainCarre = document.querySelector('#mainCarre');
let playButton = document.querySelector('#playButton');
let homeContent = document.querySelector('#home-content');
let container = document.querySelector('#container')
let bpmAccueil = 130;
let bpmGame= 150;
let mainAudio = new Audio('audio/main.mp3')

let clignottementInterval = null;

function parseBpmIntoInterval(bpm){
  return (1/(bpm/60))*1000
}

//Function qui anime le carré de la page d'accueil
(function animateMainCarre(){
  //on convertit le bpm en intervalle
  interval = parseBpmIntoInterval(bpmAccueil);
  clignottementInterval = setInterval(function(){
    let  randomR = randomInt(0,255);
    let  randomG = randomInt(0,255);
    let  randomB = randomInt(0,255);
    //change le carré de couleur
    mainCarre.style.backgroundColor = `rgb(${randomR},${randomG},${randomB})`;
    container.style.backgroundColor = `rgba(${randomR},${randomG},${randomB},0.1)`
    mainCarre.style.transform = 'scale(1.02)';
    setTimeout(function(){
      mainCarre.style.transform = 'scale(1)';
    },50)

  },interval)
})()


function randomInt(min,max){
  //renvoie un int aléatoire entre min et max
  return Math.floor(Math.random()*(max-min+1)+min);
}

playButton.addEventListener('click', function(){
  homeContent.style.display = 'none';
  mainAudio.pause();
  mainAudio.currentTime = 0;
  clearInterval(clignottementInterval);
})


mainAudio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
mainAudio.play();

let game = {
  level:1,
  lose:false,
  maxLevel:10,
  currentLevelColor:null,
  checkResult:function(){
    //Vérifie le % d'erreur du joueur pour le niveau
    //Quand le temps est imparti, ou quand il valide
    null;
  },
  nextLevel:function(){
    //Passage au niveau suivant si succès
    null;
  },
  youLose:function(){
    //Quand on a perdu
    null;
  },
  youWin:function(){
    //Quand on a atteint le level max
    null
  },
  start:function(){
    //Démarre le jeu (musique, etc..)
    null;
  }
}
