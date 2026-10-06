/* =========================
   NAVEGACIÓN Y SESIÓN
========================= */

const logoutButton =
    document.getElementById("logoutButton");

const navbarBrand =
    document.getElementById("navbarBrand");

const navbarHome =
    document.getElementById("navbarHome");

const currentPage =
    window.location.pathname
        .split("/")
        .pop() || "index.html";

/*
==========================================
IMPORTANTE - BACKEND
==========================================

Esta comprobación es TEMPORAL.
Cuando exista backend, deberá sustituirse
por la validación real de sesión/token.
==========================================
*/

const sesionActiva =
    localStorage.getItem("sesionActiva") === "true";

const paginasPrivadas = [
    "inicio.html",
    "reservas.html",
    "espacios.html",
    "perfil.html"
];

if (
    paginasPrivadas.includes(currentPage) &&
    !sesionActiva
) {
    const destinoOriginal =
        window.location.pathname +
        window.location.search +
        window.location.hash;

    sessionStorage.setItem(
        "redirectAfterLogin",
        destinoOriginal
    );

    window.location.replace("/login.html");
}

const paginaInicio =
    sesionActiva
        ? "/inicio.html"
        : "/index.html";

if (navbarBrand) {
    navbarBrand.href = paginaInicio;
}

if (navbarHome) {
    navbarHome.href = paginaInicio;
}

const paginasDeAcceso = [
    "login.html",
    "registro.html"
];

if (paginasDeAcceso.includes(currentPage)) {
    document.body.dataset.navbarMode = "guest";
} else {
    document.body.dataset.navbarMode =
        sesionActiva
            ? "user"
            : "guest";
}


/* =========================
   PÁGINA ACTIVA
========================= */

document
    .querySelectorAll(".nav-link")
    .forEach(link => {

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
            link.classList.add("active");
            link.setAttribute(
                "aria-current",
                "page"
            );
        }

    });


/* =========================
   CERRAR COLLAPSE AL NAVEGAR
========================= */

document
    .querySelectorAll("#navbarLinks a.nav-link")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                const collapseElement =
                    document.getElementById(
                        "navbarLinks"
                    );

                if (
                    collapseElement &&
                    window.bootstrap
                ) {
                    const instance =
                        bootstrap.Collapse.getInstance(
                            collapseElement
                        );

                    if (instance) {
                        instance.hide();
                    }
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

function cerrarSesion() {

    /*
    ==========================================
    IMPORTANTE - BACKEND
    ==========================================
    Reemplazar posteriormente por el logout
    real del servidor.
    ==========================================
    */

    localStorage.removeItem("sesionActiva");
    localStorage.removeItem("usuarioSesion");
    localStorage.removeItem("usuarioActual");

    sessionStorage.removeItem(
        "estacionamientoSeleccionado"
    );
    sessionStorage.removeItem(
        "reservaPendiente"
    );
    sessionStorage.removeItem(
        "redirectAfterLogin"
    );

    window.location.href = "/index.html";
}
