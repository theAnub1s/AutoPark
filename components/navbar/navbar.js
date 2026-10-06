/* =========================
   ELEMENTOS
========================= */

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


const navbarBrand =
    document.getElementById(
        "navbarBrand"
    );


const navbarHome =
    document.getElementById(
        "navbarHome"
    );


/* =========================
   PÁGINA ACTUAL
========================= */

const currentPage =
    window.location.pathname
        .split("/")
        .pop() || "index.html";


/* =========================
   SESIÓN
========================= */

/*
==========================================
IMPORTANTE - BACKEND
==========================================

Esta comprobación es TEMPORAL.

Actualmente se utiliza localStorage para
simular una sesión iniciada.

Cuando exista backend:

- reemplazar esta comprobación;
- validar token/cookie/sesión;
- consultar al servidor;
- proteger también las rutas desde backend.

==========================================
*/

const sesionActiva =
    localStorage.getItem(
        "sesionActiva"
    ) === "true";


/* =========================
   PÁGINAS PRIVADAS
========================= */

/*
    Estas páginas requieren
    una cuenta autenticada.
*/

const paginasPrivadas = [

    "inicio.html",
    "reservas.html",
    "espacios.html",
    "perfil.html"

];


/* =========================
   PROTEGER PÁGINAS
========================= */

if (
    paginasPrivadas.includes(
        currentPage
    ) &&
    !sesionActiva
) {

    /*
        Guardamos a dónde quería ir
        el usuario.

        Después del login podremos
        regresarlo automáticamente.
    */

    const destinoOriginal =
        window.location.pathname +
        window.location.search +
        window.location.hash;


    sessionStorage.setItem(
        "redirectAfterLogin",
        destinoOriginal
    );


    window.location.replace(
        "/login.html"
    );

}


/* =========================
   DESTINO DEL INICIO
========================= */

/*
    SIN SESIÓN:

    Logo
       ↓
    index.html

    Inicio
       ↓
    index.html


    CON SESIÓN:

    Logo
       ↓
    inicio.html

    Inicio
       ↓
    inicio.html
*/

const paginaInicio =
    sesionActiva
        ? "/inicio.html"
        : "/index.html";


if (navbarBrand) {

    navbarBrand.href =
        paginaInicio;

}


if (navbarHome) {

    navbarHome.href =
        paginaInicio;

}


/* =========================
   MODO DEL NAVBAR
========================= */

/*
    Login y registro siempre utilizan
    las opciones para invitados.
*/

const paginasDeAcceso = [

    "login.html",
    "registro.html"

];


if (
    paginasDeAcceso.includes(
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
   MENÚ MÓVIL
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
   PÁGINA ACTIVA
========================= */

const links =
    document.querySelectorAll(
        ".nav-link"
    );


links.forEach(
    link => {

        const href =
            link.getAttribute(
                "href"
            );


        /*
            Cerrar sesión es un botón,
            por eso no tiene href.
        */

        if (!href) {

            return;

        }


        const linkPage =
            href
                .split("/")
                .pop();


        /*
            En la Landing, Inicio apunta
            a index.html.

            En el dashboard, Inicio apunta
            a inicio.html.
        */

        if (
            linkPage === currentPage &&
            link.offsetParent !== null
        ) {

            link.classList.add(
                "active"
            );

        }

    }
);


/* =========================
   CERRAR MENÚ AL NAVEGAR
========================= */

links.forEach(
    link => {

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

    }
);


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
   FUNCIÓN LOGOUT
========================= */

function cerrarSesion() {

    /*
    ==========================================
    IMPORTANTE - BACKEND
    ==========================================

    Lógica TEMPORAL.

    Posteriormente deberá reemplazarse por:

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


    sessionStorage.removeItem(
        "estacionamientoSeleccionado"
    );


    sessionStorage.removeItem(
        "reservaPendiente"
    );


    sessionStorage.removeItem(
        "redirectAfterLogin"
    );


    /*
        Al cerrar sesión regresamos
        a la Landing pública.
    */

    window.location.href =
        "/index.html";

}