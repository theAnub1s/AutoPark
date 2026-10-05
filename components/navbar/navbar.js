const menuButton =
    document.getElementById("navbarMenuButton");

const navbarLinks =
    document.getElementById("navbarLinks");


/* =========================
   ABRIR / CERRAR MENÚ
========================= */

if (menuButton && navbarLinks) {

    menuButton.addEventListener("click", () => {

        navbarLinks.classList.toggle("show");

    });

}


/* =========================
   PÁGINA ACTUAL
========================= */

const currentPage =
    window.location.pathname
        .split("/")
        .pop() || "inicio.html";


const links =
    document.querySelectorAll(".nav-link");


links.forEach(link => {

    const linkPage =
        link.getAttribute("href")
            .split("/")
            .pop();


    if (linkPage === currentPage) {

        link.classList.add("active");

    }

});


/* =========================
   CERRAR MENÚ AL ELEGIR
   UNA OPCIÓN
========================= */

links.forEach(link => {

    link.addEventListener("click", () => {

        if (navbarLinks) {

            navbarLinks.classList.remove("show");

        }

    });

});