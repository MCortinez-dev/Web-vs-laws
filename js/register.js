// ============================================================
// REGISTRO DE USUARIO (simulado)
// Guarda los datos del formulario en localStorage para que
// el panel de usuario pueda recuperarlos después.
// No hay backend: todo queda en el navegador del usuario.
// ============================================================

// Clave donde guardamos los datos del usuario en localStorage.
// Usamos un prefijo "gw_" (Game World) para evitar colisiones
// con otros datos que pudiera tener el navegador.
const CLAVE_USUARIO = "gw_usuario";

const formRegistro = document.getElementById("form-registro");
const modalRegistro = document.getElementById("modal-registro");
const btnCerrarModal = document.getElementById("cerrar-modal-registro");

// ------------------------------------------------------------
// Al cargar la página, si ya hay un usuario guardado,
// precargamos los campos para que no tenga que escribir de nuevo.
// ------------------------------------------------------------
function precargarDatos() {
    const datosGuardados = localStorage.getItem(CLAVE_USUARIO);
    if (!datosGuardados) return;

    try {
        const usuario = JSON.parse(datosGuardados);

        // Precargar cada campo si existe
        if (usuario.nombre) {
            document.getElementById("reg-nombre").value = usuario.nombre;
        }
        if (usuario.email) {
            document.getElementById("reg-email").value = usuario.email;
        }
        if (usuario.fechaNacimiento) {
            document.getElementById("reg-fecha").value = usuario.fechaNacimiento;
        }
        // ⚠️ NO precargamos la contraseña por seguridad,
        // aunque sea una simulación. Es buena práctica.

        console.log("📋 Datos precargados desde localStorage:", usuario.email);
    } catch (error) {
        console.error("❌ Error al leer los datos guardados:", error);
    }
}

// ------------------------------------------------------------
// Guardar los datos del formulario en localStorage
// ------------------------------------------------------------
function guardarUsuario(datos) {
    try {
        localStorage.setItem(CLAVE_USUARIO, JSON.stringify(datos));
        console.log("💾 Usuario guardado en localStorage:", datos.email);
    } catch (error) {
        console.error("❌ Error al guardar en localStorage:", error);
    }
}

// ------------------------------------------------------------
// Manejar el submit del formulario
// ------------------------------------------------------------
if (formRegistro) {
    formRegistro.addEventListener("submit", (e) => {
        e.preventDefault();

        // Validación nativa del navegador (respeta required, minlength, etc.)
        if (!formRegistro.checkValidity()) {
            formRegistro.reportValidity();
            return;
        }

        // Recolectar datos del formulario
        const datos = {
            nombre: document.getElementById("reg-nombre").value.trim(),
            email: document.getElementById("reg-email").value.trim(),
            fechaNacimiento: document.getElementById("reg-fecha").value,
            // ⚠️ NO guardamos la contraseña. Es una simulación.
            fechaRegistro: new Date().toISOString()
        };

        // Guardar en localStorage
        guardarUsuario(datos);

        // Mostrar modal de éxito
        if (typeof modalRegistro.showModal === "function") {
            modalRegistro.showModal();
        } else {
            alert("✅ Registro simulado exitoso. Tus datos se guardaron en el navegador.");
        }

        // Resetear el formulario
        formRegistro.reset();
    });
}

// ------------------------------------------------------------
// Cerrar el modal
// ------------------------------------------------------------
if (btnCerrarModal && modalRegistro) {
    btnCerrarModal.addEventListener("click", () => modalRegistro.close());

    modalRegistro.addEventListener("click", (e) => {
        if (e.target === modalRegistro) modalRegistro.close();
    });
}

// ------------------------------------------------------------
// Al cargar la página, precargar datos previos
// ------------------------------------------------------------
document.addEventListener("DOMContentLoaded", precargarDatos);