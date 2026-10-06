/* =========================
   ESTACIONAMIENTO
========================= */

const estacionamientoGuardado =
    sessionStorage.getItem(
        "estacionamientoSeleccionado"
    );


/* SI ABRES DETALLE DIRECTAMENTE */

const estacionamiento =
    estacionamientoGuardado
        ? JSON.parse(estacionamientoGuardado)
        : {
            id: 1,
            nombre: "Estacionamiento Centro",
            ubicacion: "Centro de Pachuca",
            precio: 20,
            disponibles: 5,
            distancia: 0.8
        };


/* =========================
   INFORMACIÓN EXTRA
========================= */

const detallesExtra = {

    1: {
        minutos: 8,
        horario: "07:00 – 23:00",
        tipo: "Exterior",
        acceso: "Automóvil y motocicleta",
        entrada: "Entrada sobre Av. principal",
        descripcion: "Zona iluminada · Acceso amplio",
        servicios: [
            "Iluminación",
            "Vigilancia",
            "Acceso amplio"
        ]
    },

    2: {
        minutos: 12,
        horario: "08:00 – 21:00",
        tipo: "Exterior",
        acceso: "Automóvil y motocicleta",
        entrada: "Entrada por zona universitaria",
        descripcion: "Acceso rápido · Zona transitada",
        servicios: [
            "Iluminación",
            "Vigilancia",
            "Acceso amplio"
        ]
    },

    3: {
        minutos: 10,
        horario: "07:00 – 22:00",
        tipo: "Cubierto",
        acceso: "Automóvil",
        entrada: "Entrada sobre Av. principal",
        descripcion: "Zona cubierta · Acceso controlado",
        servicios: [
            "Área cubierta",
            "Vigilancia",
            "Iluminación"
        ]
    },

    4: {
        minutos: 15,
        horario: "08:00 – 20:00",
        tipo: "Exterior",
        acceso: "Automóvil y motocicleta",
        entrada: "Entrada norte",
        descripcion: "Espacio amplio · Fácil acceso",
        servicios: [
            "Iluminación",
            "Acceso amplio"
        ]
    },

    5: {
        minutos: 13,
        horario: "08:00 – 22:00",
        tipo: "Cubierto",
        acceso: "Automóvil",
        entrada: "Entrada por Plaza Universidad",
        descripcion: "Zona cubierta · Vigilancia",
        servicios: [
            "Área cubierta",
            "Vigilancia",
            "Iluminación"
        ]
    },

    6: {
        minutos: 18,
        horario: "07:00 – 22:00",
        tipo: "Exterior",
        acceso: "Automóvil y motocicleta",
        entrada: "Acceso Las Torres",
        descripcion: "Acceso amplio · Área iluminada",
        servicios: [
            "Iluminación",
            "Acceso amplio"
        ]
    }

};


const extra =
    detallesExtra[estacionamiento.id] ||
    detallesExtra[1];


/* =========================
   ELEMENTOS DEL DETALLE
========================= */

const parkingName =
    document.getElementById("parkingName");

const parkingLocation =
    document.getElementById("parkingLocation");

const parkingEntrance =
    document.getElementById("parkingEntrance");

const parkingDescription =
    document.getElementById("parkingDescription");

const parkingAvailability =
    document.getElementById("parkingAvailability");

const parkingSchedule =
    document.getElementById("parkingSchedule");

const parkingType =
    document.getElementById("parkingType");

const parkingAccess =
    document.getElementById("parkingAccess");

const parkingPrice =
    document.getElementById("parkingPrice");

const servicesList =
    document.getElementById("servicesList");


/* =========================
   MOSTRAR INFORMACIÓN
========================= */

parkingName.textContent =
    estacionamiento.nombre;


parkingLocation.textContent =
    `${estacionamiento.ubicacion} · A ${extra.minutos} min de tu ubicación`;


parkingEntrance.textContent =
    extra.entrada;


parkingDescription.textContent =
    extra.descripcion;


parkingAvailability.textContent =
    `${estacionamiento.disponibles} espacios`;


parkingSchedule.textContent =
    extra.horario;


parkingType.textContent =
    extra.tipo;


parkingAccess.textContent =
    extra.acceso;


parkingPrice.textContent =
    `$${estacionamiento.precio} MXN / hora`;


/* SERVICIOS */

servicesList.innerHTML = "";


extra.servicios.forEach(servicio => {

    const item =
        document.createElement("p");

    item.textContent =
        servicio;

    servicesList.appendChild(item);

});


/* =========================
   FORMULARIO
========================= */

const reservationForm =
    document.getElementById("reservationForm");

const fecha =
    document.getElementById("fecha");

const horaEntrada =
    document.getElementById("horaEntrada");

const horaSalida =
    document.getElementById("horaSalida");

const totalEstimado =
    document.getElementById("totalEstimado");

const reservationMessage =
    document.getElementById("reservationMessage");


/* =========================
   FECHA ACTUAL
========================= */

function establecerFecha() {

    const hoy =
        new Date();


    const anio =
        hoy.getFullYear();


    const mes =
        String(
            hoy.getMonth() + 1
        ).padStart(2, "0");


    const dia =
        String(
            hoy.getDate()
        ).padStart(2, "0");


    const fechaActual =
        `${anio}-${mes}-${dia}`;


    fecha.value =
        fechaActual;


    fecha.min =
        fechaActual;

}


/* =========================
   CONVERTIR HORA
========================= */

function convertirAMinutos(hora) {

    const partes =
        hora.split(":");


    return (
        Number(partes[0]) * 60 +
        Number(partes[1])
    );

}


/* =========================
   CALCULAR TOTAL
========================= */

function calcularTotal() {

    reservationMessage.textContent = "";


    if (
        !horaEntrada.value ||
        !horaSalida.value
    ) {

        totalEstimado.textContent =
            "$0 MXN";

        return 0;

    }


    const minutosEntrada =
        convertirAMinutos(
            horaEntrada.value
        );


    const minutosSalida =
        convertirAMinutos(
            horaSalida.value
        );


    if (
        minutosSalida <=
        minutosEntrada
    ) {

        totalEstimado.textContent =
            "$0 MXN";


        reservationMessage.textContent =
            "La hora de salida debe ser posterior a la hora de entrada.";


        reservationMessage.style.color =
            "#B42318";


        return 0;

    }


    const minutosTotales =
        minutosSalida -
        minutosEntrada;


    /*
        Conservamos la lógica de tu
        compañero: cada fracción de
        hora cuenta como una hora.
    */

    const horas =
        Math.ceil(
            minutosTotales / 60
        );


    const total =
        horas *
        estacionamiento.precio;


    totalEstimado.textContent =
        `$${total} MXN`;


    return total;

}


/* =========================
   EVENTOS
========================= */

horaEntrada.addEventListener(
    "change",
    calcularTotal
);


horaSalida.addEventListener(
    "change",
    calcularTotal
);


/* =========================
   PREPARAR RESERVA
========================= */

reservationForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const total =
            calcularTotal();


        if (!fecha.value) {

            reservationMessage.textContent =
                "Selecciona una fecha.";


            reservationMessage.style.color =
                "#B42318";


            return;

        }


        if (total <= 0) {

            return;

        }


        const reservaPendiente = {

            estacionamiento:
                estacionamiento,

            fecha:
                fecha.value,

            horaEntrada:
                horaEntrada.value,

            horaSalida:
                horaSalida.value,

            total:
                total

        };


        /*
            RF06 leerá esto para
            realizar la reserva.
        */

        sessionStorage.setItem(
            "reservaPendiente",
            JSON.stringify(
                reservaPendiente
            )
        );


        reservationMessage.textContent =
            "Datos de reserva preparados correctamente.";


        reservationMessage.style.color =
            "#475467";

    }
);


/* =========================
   INICIO
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        establecerFecha();

        calcularTotal();

    }
);