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
   PÁGINA ACTUAL
========================= */

const currentPage =
    window.location.pathname
        .split("/")
        .pop() || "inicio.html";


/* =========================
   ESTADO DE SESIÓN
========================= */

/*
==========================================
IMPORTANTE - BACKEND
==========================================

Esta comprobación es TEMPORAL.

Por ahora AutoPark utiliza localStorage
para simular que un usuario inició sesión.

Cuando exista el backend:

- BORRAR / REEMPLAZAR esta comprobación.
- Validar token, cookie o sesión real.
- Obtener el usuario desde el servidor.

==========================================
*/

const sesionActiva =
    localStorage.getItem(
        "sesionActiva"
    ) === "true";


/*
    Login y registro siempre muestran
    la navegación para invitados.
*/

const paginasInvitado = [
    "login.html",
    "registro.html"
];


if (
    paginasInvitado.includes(
        currentPage
    )
) {

    document.body.dataset.navbarMode =
        "guest";

} else {

    document.body.dataset.navbarMode =
        sesionActiva
            ? "user"
            : "guest";

}


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
   MARCAR PÁGINA ACTUAL
========================= */

const links =
    document.querySelectorAll(
        ".nav-link"
    );


links.forEach(link => {

    /*
        El botón Cerrar sesión también
        utiliza la clase nav-link,
        pero no contiene href.
    */

    const href =
        link.getAttribute(
            "href"
        );


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
   CERRAR MENÚ
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
        cerrarSesion
    );

}


/* =========================
   FUNCIÓN CERRAR SESIÓN
========================= */

function cerrarSesion() {

    /*
    ==========================================
    IMPORTANTE - BACKEND
    ==========================================

    ESTA LÓGICA ES TEMPORAL.

    Cuando se implemente el backend,
    BORRAR / REEMPLAZAR esta sección por:

    - endpoint de logout;
    - eliminación del token;
    - invalidación de sesión;
    - eliminación de cookies;
    - cierre de sesión real del servidor.

    ==========================================
    */


    localStorage.removeItem(
        "sesionActiva"
    );


    localStorage.removeItem(
        "usuarioSesion"
    );


    localStorage.removeItem(
        "usuarioActual"
    );


    /*
        Información temporal que no debe
        conservarse después de salir.
    */

    sessionStorage.removeItem(
        "estacionamientoSeleccionado"
    );


    sessionStorage.removeItem(
        "reservaPendiente"
    );


    window.location.href =
        "/login.html";

}