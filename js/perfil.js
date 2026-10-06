/* =========================
   ELEMENTOS DEL DOM
========================= */

const profileForm =
    document.getElementById(
        "profileForm"
    );


const nombre =
    document.getElementById(
        "nombre"
    );


const correo =
    document.getElementById(
        "correo"
    );


const telefono =
    document.getElementById(
        "telefono"
    );


const tipoCuenta =
    document.getElementById(
        "tipoCuenta"
    );


const ciudad =
    document.getElementById(
        "ciudad"
    );


const contrasena =
    document.getElementById(
        "contrasena"
    );


/* =========================
   BOTONES
========================= */

const btnEditar =
    document.getElementById(
        "btnEditar"
    );


const btnGuardar =
    document.getElementById(
        "btnGuardar"
    );


const btnCancelar =
    document.getElementById(
        "btnCancelar"
    );


const btnLogout =
    document.getElementById(
        "btnLogout"
    );


/* =========================
   INFORMACIÓN DEL USUARIO
========================= */

const userNameTitle =
    document.getElementById(
        "userNameTitle"
    );


const avatarInitials =
    document.getElementById(
        "avatarInitials"
    );


/* =========================
   INPUTS EDITABLES
========================= */

const inputs = [

    nombre,
    correo,
    telefono,
    tipoCuenta,
    ciudad,
    contrasena

];


let valoresIniciales = {};


/* =========================
   CARGAR USUARIO TEMPORAL
========================= */

/*
==========================================
IMPORTANTE - BACKEND
==========================================

Estos datos actualmente se obtienen
desde localStorage.

Cuando exista backend deberán obtenerse
desde la cuenta autenticada mediante API.

==========================================
*/

const usuarioGuardado =
    localStorage.getItem(
        "usuarioActual"
    );


if (usuarioGuardado) {

    try {

        const usuario =
            JSON.parse(
                usuarioGuardado
            );


        if (
            usuario.nombre &&
            nombre
        ) {

            nombre.value =
                usuario.nombre;


            userNameTitle.textContent =
                usuario.nombre;


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

    } catch (error) {

        console.warn(
            "No se pudieron cargar los datos del usuario."
        );

    }

}


/* =========================
   INICIALES
========================= */

function actualizarIniciales(
    nombreCompleto
) {

    if (!avatarInitials) {

        return;

    }


    const iniciales =
        nombreCompleto
            .trim()
            .split(/\s+/)
            .map(
                palabra =>
                    palabra.charAt(0)
            )
            .join("")
            .substring(
                0,
                2
            )
            .toUpperCase();


    avatarInitials.textContent =
        iniciales;

}


/* =========================
   EDITAR PERFIL
========================= */

btnEditar.addEventListener(
    "click",
    () => {

        inputs.forEach(
            input => {

                if (input) {

                    valoresIniciales[
                        input.id
                    ] = input.value;


                    input.disabled =
                        false;

                }

            }
        );


        btnEditar.disabled =
            true;


        btnGuardar.disabled =
            false;


        btnCancelar.disabled =
            false;

    }
);


/* =========================
   CANCELAR CAMBIOS
========================= */

btnCancelar.addEventListener(
    "click",
    () => {

        inputs.forEach(
            input => {

                if (input) {

                    input.value =
                        valoresIniciales[
                            input.id
                        ] || "";


                    input.disabled =
                        true;

                }

            }
        );


        btnEditar.disabled =
            false;


        btnGuardar.disabled =
            true;


        btnCancelar.disabled =
            true;

    }
);


/* =========================
   GUARDAR CAMBIOS
========================= */

profileForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        if (
            nombre.value.trim() === "" ||
            correo.value.trim() === ""
        ) {

            alert(
                "El nombre y el correo son obligatorios."
            );


            return;

        }


        /*
        ==========================================
        IMPORTANTE - BACKEND
        ==========================================

        Este guardado es TEMPORAL.

        Cuando exista backend:

        - Enviar los cambios mediante API.
        - Validarlos en el servidor.
        - Actualizar la cuenta real.
        - NO guardar datos sensibles aquí.

        ==========================================
        */


        const nuevoNombre =
            nombre.value.trim();


        userNameTitle.textContent =
            nuevoNombre;


        actualizarIniciales(
            nuevoNombre
        );


        /*
            Conservamos temporalmente únicamente
            nombre y correo para la interfaz.
        */

        const usuarioActualizado = {

            nombre:
                nuevoNombre,

            correo:
                correo.value.trim()

        };


        localStorage.setItem(
            "usuarioActual",
            JSON.stringify(
                usuarioActualizado
            )
        );


        inputs.forEach(
            input => {

                if (input) {

                    input.disabled =
                        true;

                }

            }
        );


        btnEditar.disabled =
            false;


        btnGuardar.disabled =
            true;


        btnCancelar.disabled =
            true;

    }
);


/* =========================
   CERRAR SESIÓN
========================= */

if (btnLogout) {

    btnLogout.addEventListener(
        "click",
        () => {

            /*
                Utilizamos el mismo botón de
                cierre de sesión del navbar
                para no tener dos lógicas
                diferentes.
            */

            const navbarLogout =
                document.getElementById(
                    "logoutButton"
                );


            if (navbarLogout) {

                navbarLogout.click();

                return;

            }


            /*
            ==========================================
            RESPALDO TEMPORAL
            ==========================================

            Solo se utiliza si por alguna razón
            el navbar no se cargó correctamente.

            BORRAR / REEMPLAZAR cuando exista
            autenticación mediante backend.
            ==========================================
            */

            localStorage.removeItem(
                "sesionActiva"
            );


            localStorage.removeItem(
                "usuarioActual"
            );


            sessionStorage.removeItem(
                "estacionamientoSeleccionado"
            );


            sessionStorage.removeItem(
                "reservaPendiente"
            );


            window.location.href =
                "/login.html";

        }
    );

}