/* =========================
   ELEMENTOS
========================= */

const welcomeTitle =
    document.getElementById(
        "welcomeTitle"
    );


const reservasActivas =
    document.getElementById(
        "reservasActivas"
    );


const espaciosPublicados =
    document.getElementById(
        "espaciosPublicados"
    );


const reservasMes =
    document.getElementById(
        "reservasMes"
    );


const recommendedGrid =
    document.getElementById(
        "recommendedGrid"
    );


/* =========================
   USUARIO
========================= */

/*
==========================================
IMPORTANTE - BACKEND
==========================================

Actualmente usamos información temporal.

Cuando exista autenticación real,
el nombre deberá obtenerse desde
el usuario autenticado en el backend.

==========================================
*/

let nombreUsuario =
    "Fernando";


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


        if (usuario.nombre) {

            nombreUsuario =
                usuario.nombre
                    .trim()
                    .split(" ")[0];

        }

    } catch (error) {

        console.warn(
            "No se pudo leer el usuario guardado."
        );

    }

}


welcomeTitle.textContent =
    `Hola, ${nombreUsuario}`;


/* =========================
   RESERVAS
========================= */

/*
==========================================
IMPORTANTE - BACKEND
==========================================

localStorage es únicamente temporal.

Cuando exista backend, estos valores
deberán obtenerse mediante la API.

==========================================
*/

const reservasGuardadas =
    localStorage.getItem(
        "autoparkReservas"
    );


let reservas = [];


if (reservasGuardadas) {

    try {

        reservas =
            JSON.parse(
                reservasGuardadas
            );

    } catch (error) {

        reservas = [];

    }

}


/* RESERVAS ACTIVAS */

if (reservas.length > 0) {

    const activas =
        reservas.filter(
            reserva =>
                reserva.estado ===
                "activa"
        );


    reservasActivas.textContent =
        activas.length;

}


/* =========================
   RESERVAS DEL MES
========================= */

if (reservas.length > 0) {

    const hoy =
        new Date();


    const anio =
        hoy.getFullYear();


    const mes =
        String(
            hoy.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const prefijo =
        `${anio}-${mes}`;


    const delMes =
        reservas.filter(
            reserva =>
                reserva.fecha &&
                reserva.fecha.startsWith(
                    prefijo
                )
        );


    reservasMes.textContent =
        delMes.length;

}


/* =========================
   ESPACIOS PUBLICADOS
========================= */

/*
    Actualmente la pantalla
    "Mis espacios" todavía no
    persiste los espacios publicados.

    Por eso conservamos el valor
    de ejemplo del Figma.

    REEMPLAZAR POR EL BACKEND
    cuando se implemente.
*/

espaciosPublicados.textContent =
    "3";


/* =========================
   ESTACIONAMIENTOS
   RECOMENDADOS
========================= */

/*
    Estos datos coinciden con los
    utilizados actualmente en
    busqueda.js.

    Posteriormente deberán llegar
    desde el backend.
*/

const recomendados = [

    {
        id: 1,

        nombre:
            "Plaza Juárez",

        zona:
            "centro",

        ubicacion:
            "Centro",

        precio:
            22,

        disponibles:
            4,

        total:
            10,

        distancia:
            0.8,

        abiertoAhora:
            true,

        cubierto:
            true
    },


    {
        id: 2,

        nombre:
            "Universidad",

        zona:
            "upp",

        ubicacion:
            "Zona UPP",

        precio:
            18,

        disponibles:
            8,

        total:
            15,

        distancia:
            1.2,

        abiertoAhora:
            true,

        cubierto:
            false
    }

];


/* =========================
   MOSTRAR RECOMENDADOS
========================= */

function mostrarRecomendados() {

    recommendedGrid.innerHTML =
        "";


    recomendados.forEach(
        estacionamiento => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "recommended-card";


            card.innerHTML = `

                <div class="recommended-image">

                    <img
                        src="assets/images/logo-autopark.png"
                        alt="AutoPark"
                    >

                </div>


                <div class="recommended-info">

                    <h3>
                        ${estacionamiento.nombre}
                    </h3>


                    <p class="recommended-location">
                        ${estacionamiento.ubicacion}
                    </p>


                    <p class="recommended-price">
                        $${estacionamiento.precio}
                        MXN / hora
                    </p>

                </div>


                <div class="recommended-footer">

                    <span class="available-badge">

                        ${estacionamiento.disponibles}
                        espacios libres

                    </span>


                    <button
                        type="button"
                        class="btn-detail"
                        data-id="${estacionamiento.id}"
                    >
                        Ver detalle
                    </button>

                </div>
            `;


            recommendedGrid.appendChild(
                card
            );

        }
    );

}


/* =========================
   VER DETALLE
========================= */

recommendedGrid.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".btn-detail"
            );


        if (!button) {

            return;

        }


        const id =
            Number(
                button.dataset.id
            );


        const estacionamiento =
            recomendados.find(
                item =>
                    item.id === id
            );


        if (!estacionamiento) {

            return;

        }


        sessionStorage.setItem(
            "estacionamientoSeleccionado",
            JSON.stringify(
                estacionamiento
            )
        );


        window.location.href =
            "/detalle.html";

    }
);


/* =========================
   INICIO
========================= */

mostrarRecomendados();