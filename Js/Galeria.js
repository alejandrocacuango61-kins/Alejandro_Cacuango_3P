const imagenes = document.getElementById('imagenes');
const total = imagenes.children.length;
const indicadores = document.getElementById('indicadores');
const galeria = document.getElementById('galeria');
let indice = 0;
let intervalo;

// Crear los puntitos
for (let i = 0; i < total; i++) {
  const punto = document.createElement('span');
  punto.classList.add('indicador');
  if (i === 0) punto.classList.add('activo');
  punto.addEventListener('click', () => {
    indice = i;
    mostrarImagen(indice);
    actualizarIndicadores();
    reiniciarAuto();
  });
  indicadores.appendChild(punto);
}

const puntos = document.querySelectorAll('.indicador');

function mostrarImagen(i) {
  imagenes.style.transform = `translateX(-${i * 100}%)`;
}

function actualizarIndicadores() {
  puntos.forEach(p => p.classList.remove('activo'));
  puntos[indice].classList.add('activo');
}

function siguiente() {
  indice = (indice + 1) % total;
  mostrarImagen(indice);
  actualizarIndicadores();
}

function anterior() {
  indice = (indice - 1 + total) % total;
  mostrarImagen(indice);
  actualizarIndicadores();
}

document.getElementById('siguiente').addEventListener('click', () => {
  siguiente();
  reiniciarAuto();
});
document.getElementById('anterior').addEventListener('click', () => {
  anterior();
  reiniciarAuto();
});

// Movimiento automático
function iniciarAuto() {
  intervalo = setInterval(siguiente, 4000);
}

function reiniciarAuto() {
  clearInterval(intervalo);
  iniciarAuto();
}

// Pausar al pasar el mouse
galeria.addEventListener('mouseenter', () => clearInterval(intervalo));
galeria.addEventListener('mouseleave', iniciarAuto);

iniciarAuto();