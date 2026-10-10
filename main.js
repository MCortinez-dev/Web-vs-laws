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
// Al presionar el botón, SOLO la imagen de la ruleta rota.
// El wrapper y el gato se quedan quietos.
// ============================================================

const btnGirar = document.getElementById("btn-girar");
const modalLegal = document.getElementById("modal-legal");
const btnCerrarModal = document.getElementById("cerrar-modal");

// ⚠️ IMPORTANTE: seleccionamos la imagen por su CLASE, no por ID.
// Así evitamos conflictos si hay IDs duplicados en el DOM.
const ruletaImg = document.querySelector(".ruleta-img");

let girando = false;
let anguloActual = 0;

function girarRuleta() {
    if (girando) return;

    // Verificación de seguridad: si no encontramos la imagen, avisamos
    if (!ruletaImg) {
        console.error("❌ No se encontró la imagen de la ruleta (.ruleta-img)");
        return;
    }

    girando = true;

    // Duración aleatoria entre 3 y 5 segundos
    const duracionMs = Math.floor(Math.random() * 2000) + 3000;

    // Vueltas aleatorias (6 a 10)
    const vueltas = Math.floor(Math.random() * 5) + 6;
    const anguloExtra = Math.floor(Math.random() * 360);
    anguloActual += vueltas * 360 + anguloExtra;

    // Aplicar SOLO a la imagen
    ruletaImg.style.transition = `transform ${duracionMs}ms cubic-bezier(0.15, 0.85, 0.25, 1)`;
    ruletaImg.style.transform = `rotate(${anguloActual}deg)`;

    // Estado visual del botón
    btnGirar.disabled = true;
    btnGirar.textContent = "🎲 Girando...";

    // Mostrar modal al terminar
    setTimeout(() => {
        girando = false;
        btnGirar.disabled = false;
        btnGirar.textContent = "🎯 Girar la ruleta";

        if (typeof modalLegal.showModal === "function") {
            modalLegal.showModal();
        } else {
            alert("⚠️ Advertencia Legal: las plataformas de apuestas en Argentina están reguladas. Ver Ley 25.326 y proyectos de ley sobre ludopatía.");
        }
    }, duracionMs);
}

// Cerrar el modal
btnCerrarModal.addEventListener("click", () => {
    modalLegal.close();
});

// Cerrar el modal al hacer click en el backdrop
modalLegal.addEventListener("click", (e) => {
    if (e.target === modalLegal) {
        modalLegal.close();
    }
});

// Vincular el botón
btnGirar.addEventListener("click", girarRuleta);

// ============================================================
// FORMULARIO DE CONTACTO
// Interceptamos el submit para evitar que la página se recargue.
// En un sitio real, acá se enviarían los datos al backend.
// ============================================================

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault(); // No recargar la página
        alert("✅ (Simulación) Tus datos fueron 'enviados'. En un sitio real, acá se almacenarían en una base de datos.");
        contactForm.reset();
    });
}

// ============================================================
// CARRUSEL AUTOMÁTICO
// Avanza solo cada 5 segundos. Se pausa cuando:
//   - el usuario interactúa con el scroll (manual)
//   - el mouse está encima del carrusel (desktop)
//   - el usuario tiene "reducir movimiento" activado (accesibilidad)
// Para agregar más slides: sumar <article class="carousel-slide">
// al HTML. El JS los detecta automáticamente.
// ============================================================

const carousel = document.querySelector(".carousel-container");
const slides = document.querySelectorAll(".carousel-slide");

// Configuración
const INTERVALO_MS = 5000;       // 5 segundos entre cada avance
const PAUSA_INTERACCION_MS = 10000; // 10s de pausa si el usuario interactúa

let slideActual = 0;
let intervaloCarrusel = null;
let pausaHasta = 0;              // Timestamp hasta cuándo está pausado
let timeoutReanudar = null;      // Timer para reanudar después de una interacción
let pausadoPorHover = false;     // Estado de hover

// ------------------------------------------------------------
// Respeta la preferencia de "reducir movimiento" del sistema.
// Si está activa, el carrusel NO avanza solo.
// ------------------------------------------------------------
const prefiereReducirMovimiento = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

// ------------------------------------------------------------
// Ir a un slide específico usando scrollTo (respeta el snap)
// ------------------------------------------------------------
function irASlide(indice) {
    if (!carousel || slides.length === 0) return;

    // Asegurar que el índice esté dentro del rango
    slideActual = (indice + slides.length) % slides.length;

    const slide = slides[slideActual];
    carousel.scrollTo({
        left: slide.offsetLeft - carousel.offsetLeft,
        behavior: "smooth"
    });
}

// ------------------------------------------------------------
// Avanzar al siguiente slide (o volver al primero)
// ------------------------------------------------------------
function siguienteSlide() {
    irASlide(slideActual + 1);
}

// ------------------------------------------------------------
// Pausar el carrusel por un tiempo determinado.
// Se usa cuando el usuario interactúa manualmente.
// ------------------------------------------------------------
function pausarPorInteraccion() {
    pausaHasta = Date.now() + PAUSA_INTERACCION_MS;

    // Si ya hay un timer de reanudación, cancelarlo
    if (timeoutReanudar) clearTimeout(timeoutReanudar);

    // Reanudar después del tiempo de pausa
    timeoutReanudar = setTimeout(() => {
        pausaHasta = 0;
    }, PAUSA_INTERACCION_MS);
}

// ------------------------------------------------------------
// Arrancar / detener el auto-avance
// ------------------------------------------------------------
function arrancarCarrusel() {
    if (intervaloCarrusel) return;
    intervaloCarrusel = setInterval(() => {
        // Si está pausado (por interacción o hover), no avanzar
        if (Date.now() < pausaHasta) return;
        if (pausadoPorHover) return;
        siguienteSlide();
    }, INTERVALO_MS);
}

function detenerCarrusel() {
    if (intervaloCarrusel) {
        clearInterval(intervaloCarrusel);
        intervaloCarrusel = null;
    }
}

// ------------------------------------------------------------
// Detectar interacción del usuario con el scroll.
// Cuando el usuario hace scroll manual, pausamos el auto-avance.
// ------------------------------------------------------------
if (carousel) {
    carousel.addEventListener("scroll", () => {
        // Solo pausar si fue scroll manual (no el que dispara el propio JS).
        // Un truco simple: si pasó más de 100ms desde el último scroll,
        // consideramos que es manual. Si no, es del JS.
        if (Date.now() - ultimoScrollJS > 150) {
            pausarPorInteraccion();
        }
        ultimoScrollJS = Date.now();
    }, { passive: true });

    // Pausa al pasar el mouse por encima (desktop)
    carousel.addEventListener("mouseenter", () => {
        pausadoPorHover = true;
    });

    carousel.addEventListener("mouseleave", () => {
        pausadoPorHover = false;
    });

    // Pausa al tocar (mobile) — se reactiva cuando el usuario deja de tocar
    carousel.addEventListener("touchstart", () => {
        pausadoPorHover = true;
    }, { passive: true });

    carousel.addEventListener("touchend", () => {
        pausadoPorHover = false;
        pausarPorInteraccion(); // Pausa extra después del toque
    }, { passive: true });
}

// ------------------------------------------------------------
// Marca para distinguir scroll del JS vs scroll manual
// ------------------------------------------------------------
let ultimoScrollJS = 0;

// ------------------------------------------------------------
// Arrancar el carrusel si el usuario no prefiere reducir movimiento
// ------------------------------------------------------------
if (!prefiereReducirMovimiento && carousel && slides.length > 1) {
    arrancarCarrusel();
}