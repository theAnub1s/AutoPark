const reservasContainer =
    document.getElementById(
        "reservasContainer"
    );


const emptyState =
    document.getElementById(
        "emptyState"
    );


const tabButtons =
    document.querySelectorAll(
        ".tab-button"
    );


let tabActual =
    "activas";


/* =========================
   DATOS DE EJEMPLO
========================= */

/*
    DATOS TEMPORALES.

    ELIMINAR / REEMPLAZAR CUANDO
    SE IMPLEMENTE EL BACKEND REAL.
*/

const reservasEjemplo = [

    {
        id: 1,

        estacionamiento: {
            id: 1,
            nombre: "Estacionamiento Centro",
            ubicacion: "Centro de Pachuca",
            precio: 20,
            disponibles: 5
        },

        fecha: "2026-10-01",

        horaEntrada: "18:00",

        horaSalida: "20:00",

        total: 40,

        estado: "activa"
    },

    {
        id: 2,

        estacionamiento: {
            id: 2,
            nombre: "Plaza Juárez",
            ubicacion: "Zona Centro",
            precio: 22,
            disponibles: 4
        },

        fecha: "2026-10-04",

        horaEntrada: "10:00",

        horaSalida: "12:00",

        total: 44,

        estado: "activa"
    }

];


/* =========================
   CARGAR DATOS
========================= */

function cargarReservas() {

    const guardadas =
        localStorage.getItem(
            "autoparkReservas"
        );


    if (!guardadas) {

        localStorage.setItem(
            "autoparkReservas",
            JSON.stringify(
                reservasEjemplo
            )
        );


        return [
            ...reservasEjemplo
        ];

    }


    return JSON.parse(
        guardadas
    );

}


let reservas =
    cargarReservas();


/* =========================
   GUARDAR
========================= */

function guardarReservas() {

    /*
        REEMPLAZAR POR API / BACKEND
        CUANDO SE IMPLEMENTE.
    */

    localStorage.setItem(
        "autoparkReservas",
        JSON.stringify(reservas)
    );

}


/* =========================
   FORMATEAR FECHA
========================= */

function formatearFecha(fecha) {

    const fechaObjeto =
        new Date(
            `${fecha}T00:00:00`
        );


    return fechaObjeto
        .toLocaleDateString(
            "es-MX",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        )
        .replace(".", "");

}


/* =========================
   RENDER
========================= */

function mostrarReservas() {

    reservasContainer.innerHTML =
        "";


    const filtradas =
        reservas.filter(
            reserva => {

                if (
                    tabActual ===
                    "activas"
                ) {

                    return (
                        reserva.estado ===
                        "activa"
                    );

                }


                return (
                    reserva.estado !==
                    "activa"
                );

            }
        );


    if (
        filtradas.length === 0
    ) {

        emptyState.classList.remove(
            "hidden"
        );

        return;

    }


    emptyState.classList.add(
        "hidden"
    );


    filtradas.forEach(
        reserva => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "reserva-card";


            const estadoTexto =
                reserva.estado ===
                "activa"
                    ? "Confirmada"
                    : reserva.estado ===
                      "cancelada"
                        ? "Cancelada"
                        : "Finalizada";


            card.innerHTML = `

                <div class="reserva-image">
                    P
                </div>


                <div class="reserva-info">

                    <h2>
                        ${reserva.estacionamiento.nombre}
                    </h2>

                    <p>
                        ${formatearFecha(reserva.fecha)}
                        ·
                        ${reserva.horaEntrada}
                        –
                        ${reserva.horaSalida}
                    </p>

                    <p>
                        ${reserva.estacionamiento.ubicacion}
                    </p>

                    <p>
                        Total:
                        $${reserva.total} MXN
                    </p>

                </div>


                <div class="reserva-actions">

                    <span
                        class="status-badge ${reserva.estado}"
                    >
                        ${estadoTexto}
                    </span>


                    <button
                        type="button"
                        class="btn-detail"
                        data-action="detalle"
                        data-id="${reserva.id}"
                    >
                        Ver detalle
                    </button>


                    ${
                        reserva.estado ===
                        "activa"
                            ? `
                                <button
                                    type="button"
                                    class="btn-cancel"
                                    data-action="cancelar"
                                    data-id="${reserva.id}"
                                >
                                    Cancelar
                                </button>
                              `
                            : ""
                    }

                </div>
            `;


            reservasContainer
                .appendChild(
                    card
                );

        }
    );

}


/* =========================
   PESTAÑAS
========================= */

tabButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                tabActual =
                    button.dataset.tab;


                tabButtons.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                mostrarReservas();

            }
        );

    }
);


/* =========================
   ACCIONES
========================= */

reservasContainer.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "button"
            );


        if (!button) {

            return;

        }


        const id =
            Number(
                button.dataset.id
            );


        const reserva =
            reservas.find(
                item =>
                    item.id === id
            );


        if (!reserva) {

            return;

        }


        /* VER DETALLE */

        if (
            button.dataset.action ===
            "detalle"
        ) {

            sessionStorage.setItem(
                "estacionamientoSeleccionado",
                JSON.stringify(
                    reserva.estacionamiento
                )
            );


            window.location.href =
                "/detalle.html";

        }


        /* CANCELAR */

        if (
            button.dataset.action ===
            "cancelar"
        ) {

            const confirmar =
                confirm(
                    "¿Deseas cancelar esta reserva?"
                );


            if (!confirmar) {

                return;

            }


            reserva.estado =
                "cancelada";


            guardarReservas();

            mostrarReservas();

        }

    }
);


/* =========================
   INICIO
========================= */

mostrarReservas();