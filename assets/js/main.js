/* SELECCIONAR PERSONAJE */
const apartadoPj = document.getElementById('apartadoPj');
apartadoPj.style.display = 'none';

/* PRIMER JUEGO */
const firstGame = document.getElementById('firstGame')
const distance = document.getElementById('distance')
let treasureSound = new Audio("./assets/sounds/treasure.mp3")
const WIDTH = 889
const HEIGHT = 500
let target = {
    x: getRandomNumber(WIDTH),
    y: getRandomNumber(HEIGHT)
};
let $firstGame = document.querySelector('#firstGame');
let $distance = document.querySelector('#distance');
let clicks = 0;

/* SEGUNDO JUEGO */
const secondGame = document.getElementById('secondGame')

document.getElementById('btnPj').addEventListener('click', function() {
    apartadoPj.style.display = 'flex';
    firstGame.style.display = 'none'
    distance.style.display = 'none'
    secondGame.style.display='none'

    // Genera un nuevo valor para 'target' y limpia el contenido de 'distance'
    clicks = 0; // Resetea el contador de clics
    target = {
        x: getRandomNumber(WIDTH),
        y: getRandomNumber(HEIGHT)
    };
    $distance.innerHTML = 'Debes buscar al Hollin Viajero!! (Haz click para comenzar)';

    treasureSound.currentTime = 0;
    treasureSound.pause()

});

document.getElementById('btnNonPj').addEventListener('click', function() {
    apartadoPj.style.display = 'none';
    firstGame.style.display = 'none'
    distance.style.display = 'none'
    secondGame.style.display='none'

    treasureSound.currentTime = 0;
    treasureSound.pause()

});

// Verifica si sessionStorage es compatible en el navegador
if (typeof(Storage) !== "undefined") {
    // Establece el valor en sessionStorage
    sessionStorage.setItem('personaje', 'Child');

    console.log('Personaje Child inicializado en sessionStorage');
} else {
    console.log('El navegador no es compatible con sessionStorage');

}

document.getElementById('btnPjTotoro').addEventListener('click', function() {
    // Establecer el valor en sessionStorage
    sessionStorage.setItem('personaje', 'Totoro');

    treasureSound.currentTime = 0;
    treasureSound.pause()


    Swal.fire({
        position: 'med',
        icon: 'success',
        showConfirmButton: false,
        timer: 700
      })
    //console.log('Personaje Totoro seleccionado');
    firstGame.style.display = 'none'
    distance.style.display = 'none'
    secondGame.style.display='none'
});

// Asignar un evento al botón "btnPjChild"
document.getElementById('btnPjChild').addEventListener('click', function() {
    // Establecer el valor en sessionStorage
    sessionStorage.setItem('personaje', 'Child');

    treasureSound.currentTime = 0;
    treasureSound.pause()


    Swal.fire({
        position: 'med',
        icon: 'success',
        showConfirmButton: false,
        timer: 700
      })
    //console.log('Personaje Child seleccionado');
    firstGame.style.display = 'none'
    distance.style.display = 'none'
    secondGame.style.display='none'

});



// Obtén una referencia al video y al botón "Cerrar Video"
const videoElement = document.querySelector('#video'); // Utiliza '#video' para seleccionar el elemento <iframe>
const btnCerrarVideo = document.getElementById('btnCerrarVideo');

// Asigna eventos al botón "Abrir Video" y al botón "Cerrar Video"
document.getElementById('btnAbrirVideo').addEventListener('click', function() {
    const contenedorVideo = document.getElementById('contenedorVideo');
    contenedorVideo.style.display = 'block';

});

btnCerrarVideo.addEventListener('click', function() {
    videoElement.src = 'https://www.youtube.com/embed/FsUDoAgduBQ?si=uTFhaTazmb1q0wTL'; // Detiene el video
    const contenedorVideo = document.getElementById('contenedorVideo');
    contenedorVideo.style.display = 'none';
});


const btnJugar = document.getElementById('btnJugar');


btnJugar.addEventListener('click', function() {

    const personaje = sessionStorage.getItem('personaje');
    apartadoPj.style.display = 'none';

    treasureSound.currentTime = 0;
    treasureSound.pause()

    clicks = 0; // Resetea el contador de clics
    target = {
        x: getRandomNumber(WIDTH),
        y: getRandomNumber(HEIGHT)
    };
    $distance.innerHTML = 'Debes buscar al Hollin Viajero!! (Haz click para comenzar)';

    if (personaje === 'Totoro') {
    
        firstGame.style.display = 'none'
        distance.style.display = 'none'
        secondGame.style.display='flex'


    } else if (personaje === 'Child') {

        firstGame.style.display = 'flex'
        distance.style.display = 'flex'
        secondGame.style.display='none'
        
    }
});


/* GAME 1 */
$firstGame.addEventListener('click', function(e) {

    if (clicks==0){
        treasureSound.currentTime = 0;
        treasureSound.volume=0.5
        treasureSound.play()
        treasureSound.loop=true
    }

    console.log('click');
    clicks++;
    let distance = getDistance(e, target);

    let volume = getVolume(distance);
    
    // Establece el volumen del sonido según la distancia
    treasureSound.volume = volume;

    let distanceHint = getDistanceHint(distance);
    $distance.innerHTML = `<h2>${distanceHint}</h2>`;

    if (distance < 20) {
        treasureSound.pause()
        Swal.fire(`Encontraste al Hollin Viajero en ${clicks} clicks!`)
        

        // Obtiene la posición de target
        const targetX = target.x;
        const targetY = target.y;

        // Muestra la imagen del tesoro en la posición de target
        const treasureImage = document.getElementById('treasureImage');
        treasureImage.style.display = 'block';
        treasureImage.style.left = targetX-17 + 'px';
        treasureImage.style.top = targetY-17 + 'px';

        // Genera un nuevo valor para 'target' y limpia el contenido de 'distance'
        clicks = 0; // Resetea el contador de clics
        target = {
            x: getRandomNumber(WIDTH),
            y: getRandomNumber(HEIGHT)
        };
        $distance.innerHTML = 'Debes buscar al Hollin Viajero!! (Haz click para comenzar)';
    }
});

// Función para calcular el volumen basado en la distancia
function getVolume(distance) {
    const maxDistance = 360;  // Distancia máxima para el volumen más bajo
    const minDistance = 30;   // Distancia mínima para el volumen más alto
    const maxVolume = 1;      // Volumen máximo
    const minVolume = 0.1;    // Volumen mínimo
    
    if (distance < minDistance) {
        return maxVolume;
    } else if (distance >= maxDistance) {
        return minVolume;
    } else {
        const volumeRange = maxVolume - minVolume;
        const distanceRange = maxDistance - minDistance;
        const volume = maxVolume - ((distance - minDistance) / distanceRange) * volumeRange;
        return volume;
    }
}

/* GAME 2 */