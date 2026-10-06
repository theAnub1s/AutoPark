/* =========================
   ELEMENTOS
========================= */

const btnPublicar =
    document.getElementById(
        "btnPublicar"
    );


const btnDetalle =
    document.getElementById(
        "btnDetalle"
    );


/* =========================
   PUBLICAR ESPACIO
========================= */

btnPublicar.addEventListener(
    "click",
    () => {

        /*
        ==========================================
        IMPORTANTE - BACKEND
        ==========================================

        La comprobación de sesión mediante
        localStorage es únicamente temporal.

        Cuando exista backend deberá reemplazarse
        por la autenticación real del usuario.

        ==========================================
        */


        const sesionActiva =
            localStorage.getItem(
                "sesionActiva"
            ) === "true";


        if (sesionActiva) {

            window.location.href =
                "espacios.html";

        } else {

            sessionStorage.setItem(
                "redirectAfterLogin",
                "espacios.html"
            );


            window.location.href =
                "login.html";

        }

    }
);


/* =========================
   VER DETALLE
========================= */

btnDetalle.addEventListener(
    "click",
    () => {

        /*
            Datos temporales del estacionamiento
            mostrado en la Landing.

            Posteriormente deberán provenir
            del backend.
        */

        const estacionamiento = {

            id: 3,

            nombre:
                "Centro Pachuca",

            zona:
                "centro",

            ubicacion:
                "Zona Centro",

            precio:
                25,

            disponibles:
                6,

            total:
                12,

            distancia:
                1,

            abiertoAhora:
                true,

            cubierto:
                true

        };


        sessionStorage.setItem(
            "estacionamientoSeleccionado",
            JSON.stringify(
                estacionamiento
            )
        );


        window.location.href =
            "detalle.html";

    }
);
