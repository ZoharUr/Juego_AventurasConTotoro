
const apartadoPj = document.getElementById('apartadoPj');
apartadoPj.style.display = 'none';

document.getElementById('btnPj').addEventListener('click', function() {
    apartadoPj.style.display = 'flex';
});

document.getElementById('btnNonPj').addEventListener('click', function() {
    apartadoPj.style.display = 'none';
});





// Verifica si sessionStorage es compatible en el navegador
if (typeof(Storage) !== "undefined") {
    // Establece el valor en sessionStorage
    sessionStorage.setItem('personaje', 'Totoro');
    console.log('Personaje Totoro inicializado en sessionStorage');
} else {
    console.log('El navegador no es compatible con sessionStorage');
}


document.getElementById('btnPjTotoro').addEventListener('click', function() {
    // Establecer el valor en sessionStorage
    sessionStorage.setItem('personaje', 'Totoro');
    console.log('Personaje Totoro seleccionado');
});

  // Asignar un evento al botón "btnPjChild"
document.getElementById('btnPjChild').addEventListener('click', function() {
    // Establecer el valor en sessionStorage
    sessionStorage.setItem('personaje', 'Child');
    console.log('Personaje Child seleccionado');
});



// Obtén una referencia al video y al botón "Cerrar Video"
const videoElement = document.querySelector('video');
const btnCerrarVideo = document.getElementById('btnCerrarVideo');

// Asigna eventos al botón "Abrir Video" y al botón "Cerrar Video"
document.getElementById('btnAbrirVideo').addEventListener('click', function() {
    const contenedorVideo = document.getElementById('contenedorVideo');
    contenedorVideo.style.display = 'block';
    videoElement.play();
});

btnCerrarVideo.addEventListener('click', function() {
    // Pausa el video y lo lleva al inicio (tiempo 0)
    videoElement.pause();
    videoElement.currentTime = 0;

    // Oculta el contenedor de video
    const contenedorVideo = document.getElementById('contenedorVideo');
    contenedorVideo.style.display = 'none';
});

