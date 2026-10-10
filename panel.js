// ============================================================
// PANEL DE USUARIO
// Muestra los datos guardados en localStorage, permite
// modificarlos (redirige a register) y eliminarlos.
// También incluye el mini juego "Atrapá al gato".
// ============================================================

const CLAVE_USUARIO = "gw_usuario";

const contenedorDatos = document.getElementById("datos-usuario");
const btnEliminar = document.getElementById("btn-eliminar");
const modalEliminar = document.getElementById("modal-eliminar");
const btnConfirmarEliminar = document.getElementById("confirmar-eliminar");
const btnCancelarEliminar = document.getElementById("cancelar-eliminar");

// ============================================================
// 1. MOSTRAR DATOS DEL USUARIO
// ============================================================
function mostrarDatos() {
    const datosGuardados = localStorage.getItem(CLAVE_USUARIO);

    // Caso 1: no hay datos guardados
    if (!datosGuardados) {
        contenedorDatos.innerHTML = `
            <p class="aviso-simulacion">
                No hay datos guardados todavía.
                <a href="register.html">Registrate primero</a> para ver tu perfil.
            </p>
        `;
        return;
    }

    // Caso 2: hay datos, los mostramos
    try {
        const usuario = JSON.parse(datosGuardados);

        // Formatear la fecha de registro
        const fechaRegistro = new Date(usuario.fechaRegistro)
            .toLocaleString("es-AR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            });

        contenedorDatos.innerHTML = `
            <dl class="datos-lista">
                <dt>Nombre</dt>
                <dd>${usuario.nombre || "—"}</dd>

                <dt>Email</dt>
                <dd>${usuario.email || "—"}</dd>

                <dt>Fecha de nacimiento</dt>
                <dd>${usuario.fechaNacimiento || "—"}</dd>

                <dt>Registrado el</dt>
                <dd>${fechaRegistro}</dd>
            </dl>

            <p class="aviso-simulacion">
                Estos datos están guardados <strong>solo en este navegador</strong>.
                Si borrás los datos del navegador, se pierden.
            </p>
        `;

        console.log("📋 Datos del usuario cargados:", usuario.email);
    } catch (error) {
        console.error("❌ Error al leer los datos:", error);
        contenedorDatos.innerHTML = `
            <p class="aviso-simulacion">
                Hubo un error al leer los datos guardados.
            </p>
        `;
    }
}

// ============================================================
// 2. ELIMINAR CUENTA
// ============================================================
if (btnEliminar) {
    btnEliminar.addEventListener("click", () => {
        modalEliminar.showModal();
    });
}

if (btnCancelarEliminar) {
    btnCancelarEliminar.addEventListener("click", () => {
        modalEliminar.close();
    });
}

if (btnConfirmarEliminar) {
    btnConfirmarEliminar.addEventListener("click", () => {
        // Borrar los datos de localStorage
        localStorage.removeItem(CLAVE_USUARIO);
        console.log("🗑️ Cuenta eliminada de localStorage");

        // Cerrar el modal
        modalEliminar.close();

        // Redirigir al inicio
        window.location.href = "index.html";
    });
}

// Cerrar el modal al hacer clic en el backdrop
if (modalEliminar) {
    modalEliminar.addEventListener("click", (e) => {
        if (e.target === modalEliminar) {
            modalEliminar.close();
        }
    });
}

// ============================================================
// 3. MINI JUEGO: ATRAPÁ AL GATO
// Un gato aparece en una posición aleatoria del área de juego.
// Cada vez que lo clickeás, sumás 1 punto y el gato se mueve.
// El juego dura 10 segundos.
// ============================================================

const areaJuego = document.getElementById("juego-area");
const puntosEl = document.getElementById("juego-puntos");
const tiempoEl = document.getElementById("juego-tiempo");
const btnJugar = document.getElementById("btn-jugar");

const DURACION_SEGUNDOS = 10;

let puntos = 0;
let tiempoRestante = DURACION_SEGUNDOS;
let intervaloJuego = null;
let intervaloCuentaAtras = null;
let juegoActivo = false;

// ------------------------------------------------------------
// Crear el elemento "gato" dentro del área de juego
// ------------------------------------------------------------
function crearGato() {
    const gato = document.createElement("button");
    gato.type = "button";
    gato.className = "juego-gato";
    gato.textContent = "🐱";
    gato.setAttribute("aria-label", "Atrapar al gato");

    gato.addEventListener("click", () => {
        if (!juegoActivo) return;
        puntos++;
        puntosEl.textContent = puntos;
        moverGato();
    });

    return gato;
}

// ------------------------------------------------------------
// Mover el gato a una posición aleatoria dentro del área
// ------------------------------------------------------------
function moverGato() {
    const gato = areaJuego.querySelector(".juego-gato");
    if (!gato) return;

    // Coordenadas aleatorias en porcentaje, dejando margen
    const maxX = areaJuego.clientWidth - gato.offsetWidth;
    const maxY = areaJuego.clientHeight - gato.offsetHeight;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    gato.style.left = `${x}px`;
    gato.style.top = `${y}px`;
}

// ------------------------------------------------------------
// Iniciar el juego
// ------------------------------------------------------------
function iniciarJuego() {
    // Resetear estado
    puntos = 0;
    tiempoRestante = DURACION_SEGUNDOS;
    puntosEl.textContent = "0";
    tiempoEl.textContent = DURACION_SEGUNDOS;
    juegoActivo = true;

    // Limpiar área y crear gato
    areaJuego.innerHTML = "";
    areaJuego.appendChild(crearGato());

    // Deshabilitar botón mientras juega
    btnJugar.disabled = true;
    btnJugar.textContent = "Jugando...";

    // Mover el gato cada 800ms (más rápido = más difícil)
    intervaloJuego = setInterval(moverGato, 800);

    // Cuenta atrás
    intervaloCuentaAtras = setInterval(() => {
        tiempoRestante--;
        tiempoEl.textContent = tiempoRestante;

        if (tiempoRestante <= 0) {
            terminarJuego();
        }
    }, 1000);
}

// ------------------------------------------------------------
// Terminar el juego
// ------------------------------------------------------------
function terminarJuego() {
    juegoActivo = false;
    clearInterval(intervaloJuego);
    clearInterval(intervaloCuentaAtras);

    // Mostrar resultado en el área
    areaJuego.innerHTML = `
        <div class="juego-resultado">
            <p>¡Terminó!</p>
            <p>Atrapaste al gato <strong>${puntos}</strong> veces.</p>
        </div>
    `;

    // Reactivar botón
    btnJugar.disabled = false;
    btnJugar.textContent = "Jugar de nuevo";
}

// ------------------------------------------------------------
// Vincular el botón de jugar
// ------------------------------------------------------------
if (btnJugar) {
    btnJugar.addEventListener("click", iniciarJuego);
}

// ============================================================
// 4. INICIALIZAR AL CARGAR LA PÁGINA
// ============================================================
document.addEventListener("DOMContentLoaded", mostrarDatos);