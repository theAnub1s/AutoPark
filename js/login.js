const loginForm =
    document.getElementById(
        "loginForm"
    );


const email =
    document.getElementById(
        "email"
    );


const password =
    document.getElementById(
        "password"
    );


const loginMessage =
    document.getElementById(
        "loginMessage"
    );


/* =========================
   INICIAR SESIÓN
========================= */

loginForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        loginMessage.textContent =
            "";


        /* =========================
           VALIDACIÓN
        ========================= */

        if (
            email.value.trim() === "" ||
            password.value.trim() === ""
        ) {

            loginMessage.textContent =
                "Completa todos los campos.";


            loginMessage.style.color =
                "#B42318";


            return;

        }


        /* =========================
           SESIÓN TEMPORAL
        ========================= */

        /*
        ==========================================
        IMPORTANTE - BACKEND
        ==========================================

        ESTA AUTENTICACIÓN ES TEMPORAL.

        Actualmente cualquier correo y contraseña
        que cumplan con la validación permiten
        entrar al sistema.

        Cuando exista el backend:

        - BORRAR / REEMPLAZAR esta lógica.
        - Enviar correo y contraseña a la API.
        - Validar las credenciales.
        - Recibir token o cookie de sesión.
        - Obtener los datos reales del usuario.
        - Manejar credenciales incorrectas.

        ==========================================
        */


        const usuarioTemporal = {

            nombre:
                "Fernando Ruiz",

            correo:
                email.value
                    .trim()

        };


        localStorage.setItem(
            "sesionActiva",
            "true"
        );


        localStorage.setItem(
            "usuarioActual",
            JSON.stringify(
                usuarioTemporal
            )
        );


        loginMessage.textContent =
            "Inicio de sesión correcto.";


        loginMessage.style.color =
            "#475467";


        /* =========================
           REDIRECCIÓN POSTERIOR
        ========================= */

        const destinoPendiente =
            sessionStorage.getItem(
                "redirectAfterLogin"
            );


        if (destinoPendiente) {

            sessionStorage.removeItem(
                "redirectAfterLogin"
            );


            window.location.href =
                destinoPendiente;

            return;

        }


        window.location.href =
            "/inicio.html";

    }
);