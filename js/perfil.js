// ELEMENTOS DEL DOM
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


// BOTONES
const btnEditar =
    document.getElementById("btnEditar");

const btnGuardar =
    document.getElementById("btnGuardar");

const btnCancelar =
    document.getElementById("btnCancelar");

const btnLogout =
    document.getElementById("btnLogout");


// ELEMENTOS DE INFORMACIÓN
const userNameTitle =
    document.getElementById("userNameTitle");

const avatarInitials =
    document.getElementById("avatarInitials");


// ARREGLO DE INPUTS EDITABLES
const inputs = [
    nombre,
    correo,
    telefono,
    tipoCuenta,
    ciudad,
    contrasena
];


// ALMACENAMIENTO DE VALORES ORIGINALES
let valoresIniciales = {};


// HABILITAR EDICIÓN
btnEditar.addEventListener("click", () => {

    // Guardar copia de respaldo por si el usuario cancela
    inputs.forEach(input => {

        if (input) {

            valoresIniciales[input.id] =
                input.value;

            input.disabled = false;

        }

    });


    // Estado de botones
    btnEditar.disabled = true;

    btnGuardar.disabled = false;

    btnCancelar.disabled = false;

});


// CANCELAR EDICIÓN
btnCancelar.addEventListener("click", () => {

    // Restaurar valores y deshabilitar inputs
    inputs.forEach(input => {

        if (input) {

            input.value =
                valoresIniciales[input.id] || "";

            input.disabled = true;

        }

    });


    // Estado de botones
    btnEditar.disabled = false;

    btnGuardar.disabled = true;

    btnCancelar.disabled = true;

});


// GUARDAR CAMBIOS
profileForm.addEventListener("submit", event => {

    event.preventDefault();


    // Validar campos obligatorios
    if (
        nombre.value.trim() === "" ||
        correo.value.trim() === ""
    ) {

        alert("El nombre y el correo son obligatorios.");

        return;

    }


    /*
        Aquí posteriormente enviaremos
        los datos actualizados al backend.
    */


    // Actualizar nombre e iniciales en el panel izquierdo
    const nuevoNombre =
        nombre.value.trim();

    if (userNameTitle) {

        userNameTitle.textContent =
            nuevoNombre;

    }

    if (avatarInitials) {

        const iniciales =
            nuevoNombre
                .split(" ")
                .map(palabra => palabra[0])
                .join("")
                .substring(0, 2)
                .toUpperCase();

        avatarInitials.textContent =
            iniciales;

    }


    // Bloquear inputs tras guardar
    inputs.forEach(input => {

        if (input) {

            input.disabled = true;

        }

    });


    // Estado de botones
    btnEditar.disabled = false;

    btnGuardar.disabled = true;

    btnCancelar.disabled = true;

});


// CERRAR SESIÓN
if (btnLogout) {

    btnLogout.addEventListener("click", () => {

        /*
            Aquí posteriormente se limpiará
            la sesión/token del usuario.
        */

        window.location.href =
            "login.html";

    });

}