const modal =
    document.getElementById("modalPublicar");

const openModal =
    document.getElementById("openModal");

const closeModal =
    document.getElementById("closeModal");

const cancelModal =
    document.getElementById("cancelModal");

const publicarForm =
    document.getElementById("publicarForm");

const espaciosList =
    document.getElementById("espaciosList");

const totalEspacios =
    document.getElementById("totalEspacios");

const disponiblesHoy =
    document.getElementById("disponiblesHoy");

const publicarMensaje =
    document.getElementById("publicarMensaje");

const modalTitle =
    document.getElementById("modalTitle");

const submitModal =
    document.getElementById("submitModal");


/* =========================
   INPUTS
========================= */

const nombreInput =
    document.getElementById("nombreEspacio");

const ubicacionInput =
    document.getElementById("ubicacion");

const precioInput =
    document.getElementById("precio");

const cantidadInput =
    document.getElementById("cantidad");

const horaInicioInput =
    document.getElementById("horaInicio");

const horaFinInput =
    document.getElementById("horaFin");


/* =========================
   ESTADO
========================= */

let modoModal = "crear";

let tarjetaActual = null;


/* =========================
   HABILITAR CAMPOS
========================= */

function habilitarCamposGenerales() {

    nombreInput.disabled = false;

    ubicacionInput.disabled = false;

    precioInput.disabled = false;

    cantidadInput.disabled = false;

}


/* =========================
   ABRIR PUBLICAR
========================= */

openModal.addEventListener("click", () => {

    modoModal = "crear";

    tarjetaActual = null;

    publicarForm.reset();

    habilitarCamposGenerales();

    modalTitle.textContent =
        "Publicar espacio";

    submitModal.textContent =
        "Publicar espacio";

    publicarMensaje.textContent = "";

    modal.classList.add("show");

});


/* =========================
   CERRAR
========================= */

function cerrarModal() {

    modal.classList.remove("show");

    publicarForm.reset();

    publicarMensaje.textContent = "";

    habilitarCamposGenerales();

    tarjetaActual = null;

}


closeModal.addEventListener(
    "click",
    cerrarModal
);


cancelModal.addEventListener(
    "click",
    cerrarModal
);


/* CERRAR AL HACER CLIC FUERA */

modal.addEventListener("click", event => {

    if (event.target === modal) {

        cerrarModal();

    }

});


/* =========================
   LEER TARJETA
========================= */

function cargarDatosTarjeta(tarjeta) {

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
        tarjeta.dataset.cantidad || 1;


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
   EDITAR / HORARIO
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

            modoModal = "editar";

            tarjetaActual = tarjeta;

            habilitarCamposGenerales();

            cargarDatosTarjeta(
                tarjeta
            );


            modalTitle.textContent =
                "Editar espacio";

            submitModal.textContent =
                "Guardar cambios";

            publicarMensaje.textContent =
                "";

            modal.classList.add(
                "show"
            );

        }


        /* =====================
           GESTIONAR HORARIO
        ===================== */

        if (
            event.target.classList.contains(
                "btn-primary"
            )
        ) {

            modoModal = "horario";

            tarjetaActual = tarjeta;


            habilitarCamposGenerales();

            cargarDatosTarjeta(
                tarjeta
            );


            /* BLOQUEAR CAMPOS */

            nombreInput.disabled = true;

            ubicacionInput.disabled = true;

            precioInput.disabled = true;

            cantidadInput.disabled = true;


            modalTitle.textContent =
                "Gestionar horario";

            submitModal.textContent =
                "Guardar horario";

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


        if (!horarioValido()) {

            return;

        }


        /* =====================
           CREAR ESPACIO
        ===================== */

        if (modoModal === "crear") {

            const nuevaTarjeta =
                document.createElement(
                    "article"
                );


            nuevaTarjeta.className =
                "espacio-card";


            nuevaTarjeta.dataset.cantidad =
                cantidadInput.value;


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

                </div>


                <div class="espacio-actions">

                    <span class="status disponible">
                        Disponible
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
                        Gestionar horario
                    </button>

                </div>
            `;


            espaciosList.appendChild(
                nuevaTarjeta
            );


            totalEspacios.textContent =
                Number(
                    totalEspacios.textContent
                ) + 1;


            disponiblesHoy.textContent =
                Number(
                    disponiblesHoy.textContent
                ) + 1;


            cerrarModal();

            return;

        }



        /* =====================
           EDITAR ESPACIO
        ===================== */

        if (
            modoModal === "editar" &&
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


            tarjetaActual.dataset.cantidad =
                cantidadInput.value;


            cerrarModal();

            return;

        }



        /* =====================
           CAMBIAR HORARIO
        ===================== */

        if (
            modoModal === "horario" &&
            tarjetaActual
        ) {

            const textos =
                tarjetaActual.querySelectorAll(
                    ".espacio-info p"
                );


            textos[2].textContent =
                `Horario: ${horaInicioInput.value} – ${horaFinInput.value}`;


            cerrarModal();

        }

    }
);