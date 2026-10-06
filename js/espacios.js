const modal =
    document.getElementById(
        "modalPublicar"
    );


const openModal =
    document.getElementById(
        "openModal"
    );


const closeModal =
    document.getElementById(
        "closeModal"
    );


const cancelModal =
    document.getElementById(
        "cancelModal"
    );


const publicarForm =
    document.getElementById(
        "publicarForm"
    );


const espaciosList =
    document.getElementById(
        "espaciosList"
    );


const totalEspacios =
    document.getElementById(
        "totalEspacios"
    );


const disponiblesHoy =
    document.getElementById(
        "disponiblesHoy"
    );


const publicarMensaje =
    document.getElementById(
        "publicarMensaje"
    );


const modalTitle =
    document.getElementById(
        "modalTitle"
    );


const modalDescription =
    document.getElementById(
        "modalDescription"
    );


const submitModal =
    document.getElementById(
        "submitModal"
    );


/* =========================
   INPUTS
========================= */

const nombreInput =
    document.getElementById(
        "nombreEspacio"
    );


const ubicacionInput =
    document.getElementById(
        "ubicacion"
    );


const precioInput =
    document.getElementById(
        "precio"
    );


const cantidadInput =
    document.getElementById(
        "cantidad"
    );


const disponibilidadInput =
    document.getElementById(
        "disponibilidad"
    );


const horaInicioInput =
    document.getElementById(
        "horaInicio"
    );


const horaFinInput =
    document.getElementById(
        "horaFin"
    );


/* =========================
   ESTADO
========================= */

let modoModal =
    "crear";


let tarjetaActual =
    null;


/* =========================
   IMPORTANTE - BACKEND
========================= */

/*

    Actualmente los cambios se reflejan
    únicamente en el frontend.

    Cuando se implemente el backend:

    - Los espacios deberán cargarse desde la API.
    - Publicar deberá crear un registro real.
    - Editar deberá actualizar la base de datos.
    - La disponibilidad deberá guardarse
      en el servidor.
    - La cantidad disponible deberá obtenerse
      y actualizarse desde el backend.
    - Los horarios deberán persistirse
      en la base de datos.

*/


/* =========================
   HABILITAR CAMPOS
========================= */

function habilitarTodosLosCampos() {

    nombreInput.disabled =
        false;


    ubicacionInput.disabled =
        false;


    precioInput.disabled =
        false;


    cantidadInput.disabled =
        false;


    disponibilidadInput.disabled =
        false;


    horaInicioInput.disabled =
        false;


    horaFinInput.disabled =
        false;

}


/* =========================
   BLOQUEAR CAMPOS GENERALES
========================= */

function bloquearCamposGenerales() {

    nombreInput.disabled =
        true;


    ubicacionInput.disabled =
        true;


    precioInput.disabled =
        true;


    /*
        Cantidad, disponibilidad
        y horario permanecen editables
        para cumplir RF08.
    */

    cantidadInput.disabled =
        false;


    disponibilidadInput.disabled =
        false;


    horaInicioInput.disabled =
        false;


    horaFinInput.disabled =
        false;

}


/* =========================
   ACTUALIZAR RESUMEN
========================= */

function actualizarResumen() {

    const tarjetas =
        espaciosList.querySelectorAll(
            ".espacio-card"
        );


    totalEspacios.textContent =
        tarjetas.length;


    const disponibles =
        espaciosList.querySelectorAll(
            '.espacio-card[data-disponible="true"]'
        );


    disponiblesHoy.textContent =
        disponibles.length;

}


/* =========================
   ESTADO DE TARJETA
========================= */

function actualizarEstadoTarjeta(
    tarjeta,
    disponibilidad
) {

    const estado =
        tarjeta.querySelector(
            ".status"
        );


    const disponible =
        disponibilidad ===
        "Disponible";


    tarjeta.dataset.disponible =
        disponible
            ? "true"
            : "false";


    estado.textContent =
        disponibilidad;


    estado.classList.remove(
        "disponible",
        "no-disponible"
    );


    if (disponible) {

        estado.classList.add(
            "disponible"
        );

    } else {

        estado.classList.add(
            "no-disponible"
        );

    }

}


/* =========================
   ABRIR PUBLICAR
========================= */

openModal.addEventListener(
    "click",
    () => {

        modoModal =
            "crear";


        tarjetaActual =
            null;


        publicarForm.reset();


        habilitarTodosLosCampos();


        disponibilidadInput.value =
            "Disponible";


        modalTitle.textContent =
            "Publicar espacio";


        modalDescription.textContent =
            "Ingresa los datos del estacionamiento.";


        submitModal.textContent =
            "Publicar espacio";


        publicarMensaje.textContent =
            "";


        modal.classList.add(
            "show"
        );

    }
);


/* =========================
   CERRAR MODAL
========================= */

function cerrarModal() {

    modal.classList.remove(
        "show"
    );


    publicarForm.reset();


    publicarMensaje.textContent =
        "";


    habilitarTodosLosCampos();


    tarjetaActual =
        null;

}


closeModal.addEventListener(
    "click",
    cerrarModal
);


cancelModal.addEventListener(
    "click",
    cerrarModal
);


/* =========================
   CERRAR AL DAR CLIC FUERA
========================= */

modal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            modal
        ) {

            cerrarModal();

        }

    }
);


/* =========================
   LEER TARJETA
========================= */

function cargarDatosTarjeta(
    tarjeta
) {

    const titulo =
        tarjeta.querySelector(
            ".espacio-info h2"
        );


    const textos =
        tarjeta.querySelectorAll(
            ".espacio-info p"
        );


    nombreInput.value =
        titulo.textContent.trim();


    ubicacionInput.value =
        textos[0].textContent.trim();


    /* PRECIO */

    const precioTexto =
        textos[1].textContent;


    const precioEncontrado =
        precioTexto.match(
            /\$([\d.]+)/
        );


    precioInput.value =
        precioEncontrado
            ? precioEncontrado[1]
            : "";


    /* CANTIDAD */

    cantidadInput.value =
        tarjeta.dataset.cantidad ||
        0;


    /* DISPONIBILIDAD */

    disponibilidadInput.value =
        tarjeta.dataset.disponible ===
        "false"
            ? "No disponible"
            : "Disponible";


    /* HORARIO */

    const horarioTexto =
        textos[2].textContent;


    const horarioEncontrado =
        horarioTexto.match(
            /(\d{2}:\d{2})\s*[–-]\s*(\d{2}:\d{2})/
        );


    if (horarioEncontrado) {

        horaInicioInput.value =
            horarioEncontrado[1];


        horaFinInput.value =
            horarioEncontrado[2];

    }

}


/* =========================
   EDITAR / DISPONIBILIDAD
========================= */

espaciosList.addEventListener(
    "click",
    event => {

        const tarjeta =
            event.target.closest(
                ".espacio-card"
            );


        if (!tarjeta) {

            return;

        }


        /* =====================
           EDITAR
        ===================== */

        if (
            event.target.classList.contains(
                "btn-secondary"
            )
        ) {

            modoModal =
                "editar";


            tarjetaActual =
                tarjeta;


            habilitarTodosLosCampos();


            cargarDatosTarjeta(
                tarjeta
            );


            modalTitle.textContent =
                "Editar espacio";


            modalDescription.textContent =
                "Modifica los datos del estacionamiento.";


            submitModal.textContent =
                "Guardar cambios";


            publicarMensaje.textContent =
                "";


            modal.classList.add(
                "show"
            );

        }


        /* =====================
           GESTIONAR
           DISPONIBILIDAD
        ===================== */

        if (
            event.target.classList.contains(
                "btn-primary"
            )
        ) {

            modoModal =
                "disponibilidad";


            tarjetaActual =
                tarjeta;


            habilitarTodosLosCampos();


            cargarDatosTarjeta(
                tarjeta
            );


            bloquearCamposGenerales();


            modalTitle.textContent =
                "Gestionar disponibilidad";


            modalDescription.textContent =
                "Actualiza la disponibilidad, cantidad y horario del espacio.";


            submitModal.textContent =
                "Guardar disponibilidad";


            publicarMensaje.textContent =
                "";


            modal.classList.add(
                "show"
            );

        }

    }
);


/* =========================
   VALIDAR HORARIO
========================= */

function horarioValido() {

    if (
        !horaInicioInput.value ||
        !horaFinInput.value
    ) {

        publicarMensaje.textContent =
            "Selecciona un horario válido.";


        publicarMensaje.style.color =
            "#B42318";


        return false;

    }


    if (
        horaInicioInput.value >=
        horaFinInput.value
    ) {

        publicarMensaje.textContent =
            "La hora de cierre debe ser posterior a la hora de apertura.";


        publicarMensaje.style.color =
            "#B42318";


        return false;

    }


    return true;

}


/* =========================
   GUARDAR
========================= */

publicarForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        publicarMensaje.textContent =
            "";


        if (!horarioValido()) {

            return;

        }


        /* =====================
           CREAR ESPACIO
        ===================== */

        if (
            modoModal ===
            "crear"
        ) {

            const nuevaTarjeta =
                document.createElement(
                    "article"
                );


            const disponible =
                disponibilidadInput.value ===
                "Disponible";


            nuevaTarjeta.className =
                "espacio-card";


            nuevaTarjeta.dataset.cantidad =
                cantidadInput.value;


            nuevaTarjeta.dataset.disponible =
                disponible
                    ? "true"
                    : "false";


            nuevaTarjeta.innerHTML = `

                <div class="espacio-image">

                    <img
                        src="assets/images/logo-autopark.png"
                        alt="AutoPark"
                    >

                </div>


                <div class="espacio-info">

                    <h2>
                        ${nombreInput.value.trim()}
                    </h2>

                    <p>
                        ${ubicacionInput.value.trim()}
                    </p>

                    <p>
                        $${precioInput.value} MXN / hora
                    </p>

                    <p>
                        Horario:
                        ${horaInicioInput.value}
                        –
                        ${horaFinInput.value}
                    </p>

                    <p class="cantidad-texto">
                        ${cantidadInput.value}
                        espacios disponibles
                    </p>

                </div>


                <div class="espacio-actions">

                    <span
                        class="status ${
                            disponible
                                ? "disponible"
                                : "no-disponible"
                        }"
                    >
                        ${disponibilidadInput.value}
                    </span>


                    <button
                        type="button"
                        class="btn-secondary"
                    >
                        Editar
                    </button>


                    <button
                        type="button"
                        class="btn-primary"
                    >
                        Gestionar disponibilidad
                    </button>

                </div>
            `;


            espaciosList.appendChild(
                nuevaTarjeta
            );


            actualizarResumen();


            cerrarModal();


            return;

        }


        /* =====================
           EDITAR ESPACIO
        ===================== */

        if (
            modoModal ===
            "editar" &&
            tarjetaActual
        ) {

            const titulo =
                tarjetaActual.querySelector(
                    ".espacio-info h2"
                );


            const textos =
                tarjetaActual.querySelectorAll(
                    ".espacio-info p"
                );


            titulo.textContent =
                nombreInput.value.trim();


            textos[0].textContent =
                ubicacionInput.value.trim();


            textos[1].textContent =
                `$${precioInput.value} MXN / hora`;


            textos[2].textContent =
                `Horario: ${horaInicioInput.value} – ${horaFinInput.value}`;


            const cantidadTexto =
                tarjetaActual.querySelector(
                    ".cantidad-texto"
                );


            cantidadTexto.textContent =
                `${cantidadInput.value} espacios disponibles`;


            tarjetaActual.dataset.cantidad =
                cantidadInput.value;


            actualizarEstadoTarjeta(
                tarjetaActual,
                disponibilidadInput.value
            );


            actualizarResumen();


            cerrarModal();


            return;

        }


        /* =====================
           RF08
           GESTIONAR
           DISPONIBILIDAD
        ===================== */

        if (
            modoModal ===
            "disponibilidad" &&
            tarjetaActual
        ) {

            const textos =
                tarjetaActual.querySelectorAll(
                    ".espacio-info p"
                );


            /*
                Actualizar horario.
            */

            textos[2].textContent =
                `Horario: ${horaInicioInput.value} – ${horaFinInput.value}`;


            /*
                Actualizar cantidad.
            */

            tarjetaActual.dataset.cantidad =
                cantidadInput.value;


            const cantidadTexto =
                tarjetaActual.querySelector(
                    ".cantidad-texto"
                );


            cantidadTexto.textContent =
                `${cantidadInput.value} espacios disponibles`;


            /*
                Actualizar disponibilidad.
            */

            actualizarEstadoTarjeta(
                tarjetaActual,
                disponibilidadInput.value
            );


            /*
                Si la cantidad llega a 0,
                automáticamente se considera
                no disponible.
            */

            if (
                Number(
                    cantidadInput.value
                ) === 0
            ) {

                disponibilidadInput.value =
                    "No disponible";


                actualizarEstadoTarjeta(
                    tarjetaActual,
                    "No disponible"
                );

            }


            /*
                Actualizar resumen.
            */

            actualizarResumen();


            cerrarModal();

        }

    }
);


/* =========================
   INICIO
========================= */

actualizarResumen();