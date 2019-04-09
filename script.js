//Selectors
let mainCarre = document.querySelector('#mainCarre');
let playButton = document.querySelector('#playButton');
let homeContent = document.querySelector('#home-content');
let container = document.querySelector('#container')
let bpmAccueil = 130;
let bpmGame= 150;
let mainAudio = new Audio('audio/main.mp3')

function parseBpmIntoInterval(bpm){
  return (1/(bpm/60))*1000
}

//Function qui anime le carré de la page d'accueil
(function animateMainCarre(){
  //on convertit le bpm en intervalle
  let interval = parseBpmIntoInterval(bpmAccueil);
  setInterval(function(){
    let  randomR = randomInt(0,255);
    let  randomG = randomInt(0,255);
    let  randomB = randomInt(0,255);
    //change le carré de couleur
    mainCarre.style.backgroundColor = `rgb(${randomR},${randomG},${randomB})`;
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
})

let game = {
  level:1,

}

mainAudio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
mainAudio.play();
