const menuButton =
    document.getElementById(
        "navbarMenuButton"
    );


const navbarLinks =
    document.getElementById(
        "navbarLinks"
    );


const logoutButton =
    document.getElementById(
        "logoutButton"
    );


/* =========================
   ABRIR / CERRAR MENÚ
========================= */

if (
    menuButton &&
    navbarLinks
) {

    menuButton.addEventListener(
        "click",
        () => {

            navbarLinks.classList.toggle(
                "show"
            );

        }
    );

}


/* =========================
   PÁGINA ACTUAL
========================= */

const currentPage =
    window.location.pathname
        .split("/")
        .pop() || "inicio.html";


const links =
    document.querySelectorAll(
        ".nav-link"
    );


links.forEach(link => {

    /*
        No todos los elementos .nav-link
        son enlaces.

        El botón "Cerrar sesión",
        por ejemplo, no tiene href.
    */

    const href =
        link.getAttribute("href");


    if (!href) {

        return;

    }


    const linkPage =
        href
            .split("/")
            .pop();


    if (
        linkPage === currentPage &&
        link.offsetParent !== null
    ) {

        link.classList.add(
            "active"
        );

    }

});


/* =========================
   CERRAR MENÚ AL ELEGIR
   UNA OPCIÓN
========================= */

links.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            if (navbarLinks) {

                navbarLinks.classList.remove(
                    "show"
                );

            }

        }
    );

});


/* =========================
   CERRAR SESIÓN
========================= */

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        () => {


            /*
            ==========================================
            IMPORTANTE - BACKEND
            ==========================================

            ESTA LÓGICA ES TEMPORAL.

            Actualmente AutoPark todavía no tiene
            autenticación real conectada al backend.

            Cuando se implemente el backend,
            BORRAR O REEMPLAZAR esta lógica por
            el cierre de sesión real.

            Por ejemplo:

            - eliminar token JWT;
            - invalidar la sesión del servidor;
            - eliminar cookies de autenticación;
            - llamar al endpoint de logout;
            - limpiar la información del usuario.

            ==========================================
            */


            /*
                Datos temporales utilizados
                actualmente por el frontend.
            */

            sessionStorage.clear();


            localStorage.removeItem(
                "usuarioSesion"
            );


            localStorage.removeItem(
                "sesionActiva"
            );


            localStorage.removeItem(
                "usuarioActual"
            );


            /*
                Regresar al inicio de sesión.
            */

            window.location.href =
                "/login.html";

        }
    );

}