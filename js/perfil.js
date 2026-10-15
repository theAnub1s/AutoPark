/* =========================
   ELEMENTOS DEL DOM
========================= */

const profileForm =
    document.getElementById("profileForm");

const nombre =
    document.getElementById("nombre");

const correo =
    document.getElementById("correo");

const telefono =
    document.getElementById("telefono");

const tipoCuenta =
    document.getElementById("tipoCuenta");

const ciudad =
    document.getElementById("ciudad");

const contrasena =
    document.getElementById("contrasena");

const btnTogglePassword =
    document.getElementById("btnTogglePassword");


/* =========================
   BOTONES
========================= */

const btnEditar =
    document.getElementById("btnEditar");

const btnGuardar =
    document.getElementById("btnGuardar");

const btnCancelar =
    document.getElementById("btnCancelar");

const btnLogout =
    document.getElementById("btnLogout");


/* =========================
   INFORMACIÓN DEL USUARIO
========================= */

const userNameTitle =
    document.querySelector(".user-name");

const avatarInitials =
    document.querySelector("#avatarInitials");

const perfilMensaje =
    document.getElementById("perfilMensaje");


/* =========================
   INPUTS DEL FORMULARIO
========================= */

const inputs =
    document.querySelectorAll(
        "#profileForm .form-control"
    );


/* =========================
   VARIABLES
========================= */

let valoresIniciales = {};

let modoEdicion = false;


/* =========================
   MENSAJES DEL PERFIL
========================= */

function mostrarMensaje(texto, tipo) {

    if (!perfilMensaje) {
        return;
    }

    perfilMensaje.textContent = texto;

    perfilMensaje.className = "alert";

    if (tipo === "exito") {

        perfilMensaje.classList.add(
            "alert-success"
        );

    } else if (tipo === "error") {

        perfilMensaje.classList.add(
            "alert-danger"
        );

    } else {

        perfilMensaje.classList.add(
            "alert-info"
        );

    }

    perfilMensaje.classList.remove("d-none");
}


function ocultarMensaje() {

    if (!perfilMensaje) {
        return;
    }

    perfilMensaje.textContent = "";

    perfilMensaje.classList.add("d-none");

}


/* =========================
   CARGAR USUARIO TEMPORAL
========================= */
function cargarUsuario() {

    const usuarioGuardado =
        localStorage.getItem("usuarioActual");

    if (!usuarioGuardado) {
        return;
    }

    try {

        const usuario =
            JSON.parse(usuarioGuardado);

        if (
            usuario.nombre && nombre) {

            nombre.value = usuario.nombre;

            if (userNameTitle) {

                userNameTitle.textContent = usuario.nombre;

            }

            actualizarIniciales(
                usuario.nombre
            );

        }

        if (
            usuario.correo &&
            correo
        ) {

            correo.value =
                usuario.correo;

        }

        if (
            usuario.telefono &&
            telefono
        ) {

            telefono.value =
                usuario.telefono;

        }

        if (
            usuario.ciudad &&
            ciudad
        ) {

            ciudad.value =
                usuario.ciudad;

        }

    } catch (error) {

        console.warn(
            "No se pudieron cargar los datos del usuario."
        );

    }

}


/* =========================
   ACTUALIZAR INICIALES
========================= */

function actualizarIniciales(nombreCompleto) {

    if (!avatarInitials) {
        return;
    }

    const palabras =
        nombreCompleto
            .trim()
            .split(/\s+/)
            .filter(Boolean);

    const iniciales =
        palabras
            .slice(0, 2)
            .map(function obtenerInicial(palabra) {

                return palabra
                    .charAt(0)
                    .toUpperCase();

            })
            .join("");

    avatarInitials.textContent =
        iniciales || "U";

}


/* =========================
   GUARDAR VALORES ORIGINALES
========================= */

function guardarValoresIniciales() {

    valoresIniciales = {};

    inputs.forEach(function guardarCampo(input) {

        valoresIniciales[input.id] =
            input.value;

    });

}


/* =========================
   RESTAURAR VALORES
========================= */

function restaurarValoresIniciales() {

    inputs.forEach(function restaurarCampo(input) {

        if (
            Object.prototype.hasOwnProperty.call(
                valoresIniciales,
                input.id
            )
        ) {

            input.value =
                valoresIniciales[input.id];

        }

        input.classList.remove(
            "is-valid",
            "is-invalid"
        );

    });

}


/* =========================
   HABILITAR EDICIÓN
========================= */

function manejarEdicion() {

    ocultarMensaje();

    guardarValoresIniciales();

    modoEdicion = true;

    inputs.forEach(function habilitarCampo(input) {

        if (
            input.id !== "tipoCuenta" &&
            input.id !== "contrasena"
        ) {

            input.disabled = false;

        }

    });

    if (btnEditar) {
        btnEditar.disabled = true;
    }

    if (btnGuardar) {
        btnGuardar.disabled = false;
    }

    if (btnCancelar) {
        btnCancelar.disabled = false;
    }

    if (nombre) {
        nombre.focus();
    }

}


/* =========================
   CANCELAR EDICIÓN
========================= */

function manejarCancelacion() {
    restaurarValoresIniciales();
    modoEdicion = false;
    deshabilitarCampos();
    ocultarMensaje();
}


/* =========================
   DESHABILITAR CAMPOS
========================= */

function deshabilitarCampos() {

    inputs.forEach(function deshabilitarCampo(input) {

        input.disabled = true;

    });

    if (btnEditar) {
        btnEditar.disabled = false;
    }

    if (btnGuardar) {
        btnGuardar.disabled = true;
    }

    if (btnCancelar) {
        btnCancelar.disabled = true;
    }

}


/* =========================
   VALIDAR CAMPOS
========================= */

function manejarValidacion(event) {

    const campo = event.target;

    if (!campo.matches("input.form-control")) {
        return;
    }

    if (campo.disabled) {
        return;
    }

    let campoValido = true;

    switch (campo.id) {

        case "nombre":

            campoValido =
                campo.value.trim().length >= 3;

            break;

        case "correo":

            campoValido =
                campo.value.trim() !== "" &&
                campo.validity.valid;

            break;

        case "telefono": {

            const telefonoLimpio =
                campo.value.replace(/\D/g, "");

            campoValido =
                campo.value.trim() === "" ||
                telefonoLimpio.length === 10;

            break;

        }

        case "ciudad":

            campoValido =
                campo.value.trim().length >= 2;

            break;

        default:

            return;

    }

    campo.classList.toggle(
        "is-valid",
        campoValido &&
        campo.value.trim() !== ""
    );

    campo.classList.toggle(
        "is-invalid",
        !campoValido
    );

}


/* =========================
   VALIDAR FORMULARIO
========================= */

function validarPerfil() {

    let formularioValido = true;

    ocultarMensaje();

    inputs.forEach(function limpiarValidacion(input) {

        input.classList.remove(
            "is-valid",
            "is-invalid"
        );

    });

    if (nombre.value.trim().length < 3) {

        nombre.classList.add("is-invalid");

        mostrarMensaje(
            "El nombre debe contener al menos 3 caracteres.",
            "error"
        );

        nombre.focus();

        formularioValido = false;

        return formularioValido;

    }

    nombre.classList.add("is-valid");

    if (
        correo.value.trim() === "" ||
        !correo.validity.valid
    ) {

        correo.classList.add("is-invalid");

        mostrarMensaje(
            "Ingresa un correo electrónico válido.",
            "error"
        );

        correo.focus();

        formularioValido = false;

        return formularioValido;

    }

    correo.classList.add("is-valid");

    const telefonoLimpio =
        telefono.value.replace(/\D/g, "");

    if (
        telefono.value.trim() !== "" &&
        telefonoLimpio.length !== 10
    ) {

        telefono.classList.add("is-invalid");

        mostrarMensaje(
            "El teléfono debe contener 10 dígitos.",
            "error"
        );

        telefono.focus();

        formularioValido = false;

        return formularioValido;

    }

    if (telefono.value.trim() !== "") {

        telefono.classList.add("is-valid");

    }

    if (ciudad.value.trim().length < 2) {

        ciudad.classList.add("is-invalid");

        mostrarMensaje(
            "Ingresa una ciudad válida.",
            "error"
        );

        ciudad.focus();

        formularioValido = false;

        return formularioValido;

    }

    ciudad.classList.add("is-valid");

    return formularioValido;

}


/* =========================
   GUARDAR CAMBIOS
========================= */

function manejarGuardado(event) {

    event.preventDefault();

    if (!modoEdicion) {
        return;
    }

    if (!validarPerfil()) {
        return;
    }

    const nuevoNombre =
        nombre.value.trim();

    const nuevoCorreo =
        correo.value.trim();

    const usuarioActualizado = {

        nombre: nuevoNombre,

        correo: nuevoCorreo,

        telefono: telefono.value.trim(),

        ciudad: ciudad.value.trim()

    };

    try {

        localStorage.setItem(
            "usuarioActual",
            JSON.stringify(usuarioActualizado)
        );

    } catch (error) {

        mostrarMensaje(
            "No fue posible guardar los cambios en este navegador.",
            "error"
        );

        return;

    }

    if (userNameTitle) {

        userNameTitle.textContent =
            nuevoNombre;

    }

    actualizarIniciales(nuevoNombre);

    modoEdicion = false;

    deshabilitarCampos();

    guardarValoresIniciales();

    mostrarMensaje(
        "Los cambios de tu perfil se guardaron correctamente en este navegador.",
        "exito"
    );

}


/* =========================
   CERRAR SESIÓN
========================= */

function manejarCierreSesion() {

    const navbarLogout =
        document.getElementById("logoutButton");

    if (
        navbarLogout &&
        navbarLogout !== btnLogout
    ) {

        navbarLogout.click();

        return;

    }

    localStorage.removeItem("sesionActiva");

    localStorage.removeItem("usuarioActual");

    sessionStorage.removeItem(
        "estacionamientoSeleccionado"
    );

    sessionStorage.removeItem(
        "reservaPendiente"
    );

    window.location.href = "login.html";

}


/* =========================
   MOSTRAR / OCULTAR CONTRASEÑA
========================= */

function manejarMostrarContrasena() {
    if (!contrasena) {
        return;
    }

    const esPassword = contrasena.type === "password";
    contrasena.type = esPassword ? "text" : "password";

    const icono = btnTogglePassword.querySelector("i");
    if (icono) {
        icono.classList.toggle("bi-eye");
        icono.classList.toggle("bi-eye-slash");
    }
}


/* =========================
   REGISTRO DE EVENTOS
========================= */

if (btnEditar) {

    btnEditar.addEventListener(
        "click",
        manejarEdicion
    );

}

if (btnCancelar) {

    btnCancelar.addEventListener(
        "click",
        manejarCancelacion
    );

}

if (profileForm) {

    profileForm.addEventListener(
        "submit",
        manejarGuardado
    );

    profileForm.addEventListener(
        "input",
        manejarValidacion
    );

}

if (btnLogout) {

    btnLogout.addEventListener(
        "click",
        manejarCierreSesion
    );

}

if (btnTogglePassword) {
    btnTogglePassword.addEventListener(
        "click",
        manejarMostrarContrasena
    );
}


/* =========================
   INICIALIZACIÓN
========================= */

cargarUsuario();

deshabilitarCampos();
