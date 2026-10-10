// ============================================================
// GATO BAILARIN
// Carga una secuencia de imágenes al azar y las reproduce en loop.
// Para agregar una vestimenta nueva: sumar el nombre a VESTIMENTAS
// y crear la carpeta correspondiente en assets/gato/
// ============================================================

const VESTIMENTAS = ["ninja", "geisha"];
const TOTAL_FRAMES = 6;
const VELOCIDAD_MS = 250; // 150ms por frame ≈ 6.6 fps

const gatoImg = document.getElementById("gato");
let frameActual = 1;

// Elegir vestimenta al azar al cargar
const vestimentaElegida = VESTIMENTAS[Math.floor(Math.random() * VESTIMENTAS.length)];

// Formatear número de frame a dos dígitos (1 -> "01")
function formatearFrame(n) {
    return String(n).padStart(2, "0");
}

// Cambiar frame
function siguienteFrame() {
    frameActual = (frameActual % TOTAL_FRAMES) + 1;
    const ruta = `assets/gato/${vestimentaElegida}/frame_${formatearFrame(frameActual)}.png`;
    gatoImg.src = ruta;
}

// Arrancar el baile
setInterval(siguienteFrame, VELOCIDAD_MS);

// DEBUG: mostrar en consola qué vestimenta salió
console.log(`🐱 Vestimenta elegida: ${vestimentaElegida}`);

// ============================================================
// RULETA GIRATORIA
// Al presionar el botón, la imagen rota 360° * N vueltas.
// Cuando termina, se abre el modal con la advertencia legal.
// ============================================================

const btnGirar = document.getElementById("btn-girar");
const ruletaImg = document.getElementById("ruleta");
const modalLegal = document.getElementById("modal-legal");
const btnCerrarModal = document.getElementById("cerrar-modal");

// Estado del giro (para no permitir giros simultáneos)
let girando = false;

// Ángulo acumulado (para que cada giro sume y no reinicie)
let anguloActual = 0;

function girarRuleta() {
    // Si ya está girando, no hacer nada
    if (girando) return;
    girando = true;

    // Vueltas aleatorias entre 3 y 6 + un pequeño ángulo extra
    // para que no caiga siempre en el mismo lugar
    const vueltas = Math.floor(Math.random() * 4) + 3; // 3, 4, 5 o 6
    const anguloExtra = Math.floor(Math.random() * 360);
    anguloActual += vueltas * 360 + anguloExtra;

    // Aplicar la rotación (el CSS tiene la transición de 4s)
    ruletaImg.style.transform = `rotate(${anguloActual}deg)`;

    // Deshabilitar el botón visualmente mientras gira
    btnGirar.disabled = true;
    btnGirar.textContent = "🎲 Girando...";

    // Esperar a que termine la animación (4s) y mostrar el modal
    setTimeout(() => {
        girando = false;
        btnGirar.disabled = false;
        btnGirar.textContent = "🎯 Girar la ruleta";

        // Abrir el modal
        if (typeof modalLegal.showModal === "function") {
            modalLegal.showModal();
        } else {
            // Fallback por si el navegador no soporta <dialog>
            alert("⚠️ Advertencia Legal: las plataformas de apuestas en Argentina están reguladas. Ver Ley 25.326 y proyectos de ley sobre ludopatía.");
        }
    }, 4000); // 4000ms = 4s, igual que la transición CSS
}

// Cerrar el modal
btnCerrarModal.addEventListener("click", () => {
    modalLegal.close();
});

// Cerrar el modal al hacer click fuera (en el backdrop)
modalLegal.addEventListener("click", (e) => {
    if (e.target === modalLegal) {
        modalLegal.close();
    }
});

// Vincular el botón
btnGirar.addEventListener("click", girarRuleta);