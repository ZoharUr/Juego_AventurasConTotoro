/* SELECCIONAR PERSONAJE */
const apartadoPj = document.getElementById("apartadoPj");
apartadoPj.style.display = "none";

/* PRIMER JUEGO */
const firstGame = document.getElementById("firstGame");
const distance = document.getElementById("distance");
let treasureSound = new Audio("./assets/sounds/treasure.mp3");
const WIDTH = 889;
const HEIGHT = 500;
let target = {
  x: getRandomNumber(WIDTH),
  y: getRandomNumber(HEIGHT),
};
let $firstGame = document.querySelector("#firstGame");
let $distance = document.querySelector("#distance");
let clicks = 0;

let timerInterval;
let secondsElapsed = 0;
const timeElapsedElement = document.getElementById("timeElapsed");

const secondGame = document.getElementById("secondGame");

document.getElementById("btnPj").addEventListener("click", function () {
  apartadoPj.style.display = "flex";
  firstGame.style.display = "none";
  distance.style.display = "none";
  secondGame.style.display = "none";
  clicks = 0;
  target = {
    x: getRandomNumber(WIDTH),
    y: getRandomNumber(HEIGHT),
  };
  $distance.innerHTML =
    "Debes buscar al Hollin Viajero!! (Haz click para comenzar)";

  treasureSound.currentTime = 0;
  treasureSound.pause();
  endGame()
});

document.getElementById("btnNonPj").addEventListener("click", function () {
  apartadoPj.style.display = "none";
  firstGame.style.display = "none";
  distance.style.display = "none";
  secondGame.style.display = "none";

  treasureSound.currentTime = 0;
  treasureSound.pause();
  endGame()
});

if (typeof Storage !== "undefined") {
  sessionStorage.setItem("personaje", "Child");
  console.log("Personaje Child inicializado en sessionStorage");
} else {
  console.log("El navegador no es compatible con sessionStorage");
}

document.getElementById("btnPjTotoro").addEventListener("click", function () {
  sessionStorage.setItem("personaje", "Totoro");
  treasureSound.currentTime = 0;
  treasureSound.pause();
  Swal.fire({
    position: "med",
    icon: "success",
    showConfirmButton: false,
    timer: 700,
  });
  firstGame.style.display = "none";
  distance.style.display = "none";
  secondGame.style.display = "none";
});

document.getElementById("btnPjChild").addEventListener("click", function () {
  sessionStorage.setItem("personaje", "Child");

  treasureSound.currentTime = 0;
  treasureSound.pause();

  Swal.fire({
    position: "med",
    icon: "success",
    showConfirmButton: false,
    timer: 700,
  });
  firstGame.style.display = "none";
  distance.style.display = "none";
  secondGame.style.display = "none";
});

const videoElement = document.querySelector("#video");
const btnCerrarVideo = document.getElementById("btnCerrarVideo");
document.getElementById("btnAbrirVideo").addEventListener("click", function () {
  const contenedorVideo = document.getElementById("contenedorVideo");
  contenedorVideo.style.display = "block";
});

btnCerrarVideo.addEventListener("click", function () {
  videoElement.src =
    "https://www.youtube.com/embed/FsUDoAgduBQ?si=uTFhaTazmb1q0wTL";
  const contenedorVideo = document.getElementById("contenedorVideo");
  contenedorVideo.style.display = "none";
});

const btnJugar = document.getElementById("btnJugar");

btnJugar.addEventListener("click", function () {
  const personaje = sessionStorage.getItem("personaje");
  apartadoPj.style.display = "none";
  treasureSound.currentTime = 0;
  treasureSound.pause();
  clicks = 0;
  target = {
    x: getRandomNumber(WIDTH),
    y: getRandomNumber(HEIGHT),
  };
  $distance.innerHTML =
    "Debes buscar al Hollin Viajero!! (Haz click para comenzar)";

    endGame()

  if (personaje === "Totoro") {
    firstGame.style.display = "none";
    distance.style.display = "none";
    secondGame.style.display = "flex";
  } else if (personaje === "Child") {
    firstGame.style.display = "flex";
    distance.style.display = "flex";
    secondGame.style.display = "none";
  }
});

/* GAME 1 */
$firstGame.addEventListener("click", function (e) {
  let distance = getDistance(e, target);
  if ((clicks == 0) & (distance > 20)) {
    treasureSound.currentTime = 0;
    treasureSound.volume = 0.5;
    treasureSound.play();
    treasureSound.loop = true;
    startTimer();
  }

  console.log("click");
  clicks++;
  document.getElementById("clickCount").textContent = `Clicks: ${clicks}`;

  let volume = getVolume(distance);

  treasureSound.volume = volume;

  let distanceHint = getDistanceHint(distance);

  $distance.innerHTML = `<h2>${distanceHint}</h2>`;
  if (distance < 20) {
    treasureSound.pause();
    Swal.fire(`Encontraste al Hollin Viajero en ${clicks} clicks!`);

    const targetX = target.x;
    const targetY = target.y;

    const treasureImage = document.getElementById("treasureImage");
    treasureImage.style.display = "block";
    treasureImage.style.left = targetX - 17 + "px";
    treasureImage.style.top = targetY - 17 + "px";

    clearInterval(timerInterval);
    secondsElapsed = 0;
    timeElapsedElement.textContent = `Tiempo transcurrido: ${secondsElapsed} segundos`; // Actualiza el elemento de tiempo

    clicks = 0;
    document.getElementById("clickCount").textContent = `Clicks: ${clicks}`;

    target = {
      x: getRandomNumber(WIDTH),
      y: getRandomNumber(HEIGHT),
    };
    $distance.innerHTML =
      "Debes buscar al Hollin Viajero!! (Haz click para comenzar)";
  }
});

function getVolume(distance) {
  const maxDistance = 360;
  const minDistance = 30;
  const maxVolume = 1;
  const minVolume = 0.1;

  if (distance < minDistance) {
    return maxVolume;
  } else if (distance >= maxDistance) {
    return minVolume;
  } else {
    const volumeRange = maxVolume - minVolume;
    const distanceRange = maxDistance - minDistance;
    const volume =
      maxVolume - ((distance - minDistance) / distanceRange) * volumeRange;
    return volume;
  }
}

function startTimer() {
  timerInterval = setInterval(function () {
    secondsElapsed++;
    timeElapsedElement.textContent = `Tiempo transcurrido: ${secondsElapsed} segundos`;
  }, 1000);
}

/* SEGUNDO JUEGO */

const score=document.querySelector('.score');
const startScreen=document.querySelector('.startScreen');
const gameArea=document.querySelector('.gameArea');
startScreen.addEventListener('click',start);
let player={speed:15,score:0};
let keys ={ArrowUp:false,ArrowDown:false,ArrowLeft:false,ArrowRight:false}

document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);

function keyDown(e){
    e.preventDefault();
    keys[e.key]=true;
}
function keyUp(e){
    e.preventDefault();
    keys[e.key]=false;
}

function isCollide(a,b){
    aRect=a.getBoundingClientRect();
    bRect=b.getBoundingClientRect();
    return !((aRect.bottom<bRect.top)||(aRect.top>bRect.bottom)||(aRect.right<bRect.left)||(aRect.left>bRect.right))
}

function moveLines(){
    let lines=document.querySelectorAll('.lines');
    lines.forEach(function(item){
        if(item.y >=650){
            item.y-=740;
        }
        item.y+=player.speed;
        item.style.top=item.y+"px";
    })
}
function endGame(){
    
    player.start=false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML="<p>Presione aquí para comenzar<br> Si chocas pierdes ...</p> <br> Puntuación final:"+player.score;
    enableMouseWheel();
  }
function moveEnemy(car){
    let enemy=document.querySelectorAll('.enemy');
    enemy.forEach(function(item){

        if(isCollide(car,item)){
            console.log("Bang!");
            endGame();
        }
        if(item.y >=750){
            item.y=-300;
            item.style.left=Math.floor(Math.random()*350)+"px";
        }
        item.y+=player.speed;
        item.style.top=item.y+"px";
    })
}
function gamePlay(){

    console.log("here we go");
    let car=document.querySelector('.car');
    let road=gameArea.getBoundingClientRect();
    /*console.log(road);*/
    if(player.start){
        moveLines();
        moveEnemy(car);

        if(keys.ArrowUp && player.y>(road.top+70)){
            player.y-=player.speed
        }
        if(keys.ArrowDown && player.y<(road.bottom-85)){
            player.y+=player.speed
        }
        if(keys.ArrowLeft && player.x>0 ){
            player.x-=player.speed
        }
        if(keys.ArrowRight && player.x<(road.width-50)){
            player.x+=player.speed
        }
        car.style.top=player.y+"px";
        car.style.left=player.x+"px";
        window.requestAnimationFrame(gamePlay);
        console.log(player.score++);
        player.score++;
        let ps=player.score-1-1;
        score.innerText="Score: "+ps;
    }
}
function start(){
    disableMouseWheel();
    startScreen.classList.add('hide');
    gameArea.innerHTML="";
    player.start=true;
    player.score=0;
    window.requestAnimationFrame(gamePlay);

    for(x=0;x<5;x++){
        let roadLine=document.createElement('div');
        roadLine.setAttribute('class','lines');
        roadLine.y=(x*150);
        roadLine.style.top=roadLine.y+"px";
        gameArea.appendChild(roadLine);
    }

    let car=document.createElement('div');
    car.setAttribute('class','car');
    gameArea.appendChild(car);

    player.x=car.offsetLeft;


    for(x=0;x<3;x++){
        let enemyCar=document.createElement('div');
        enemyCar.setAttribute('class','enemy');
        enemyCar.y=((x+1)*350)*-1;
        enemyCar.style.top=enemyCar.y+"px";
        enemyCar.style.backgroundColor=randomColor();
        enemyCar.style.left=Math.floor(Math.random()*350)+"px";
        gameArea.appendChild(enemyCar);
    }


}
function randomColor(){
    function c(){
        let hex=Math.floor(Math.random()*256).toString(16);
        return ("0"+String(hex)).substr(-2);
    }
    return "#"+c()+c()+c();
}

// Deshabilitar el desplazamiento con la rueda del mouse en todo el documento
function disableMouseWheel() {
  if (window.addEventListener) {
      // Los navegadores modernos utilizan addEventListener
      window.addEventListener('wheel', preventDefault, { passive: false });
  } else {
      // Navegadores antiguos utilizan attachEvent
      window.attachEvent('onmousewheel', preventDefault);
  }
}

// Restablecer el desplazamiento con la rueda del mouse
function enableMouseWheel() {
  if (window.removeEventListener) {
      window.removeEventListener('wheel', preventDefault, { passive: false });
  } else {
      window.detachEvent('onmousewheel', preventDefault);
  }
}

// Función para prevenir el comportamiento predeterminado del desplazamiento
function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault) e.preventDefault();
  e.returnValue = false;
}

// Deshabilitar el desplazamiento con la rueda del mouse
//disableMouseWheel();

// Habilitar el desplazamiento con la rueda del mouse cuando lo desees
// enableMouseWheel();
