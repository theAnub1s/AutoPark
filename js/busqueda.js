const estacionamientos = [

    {
        id: 1,
        nombre: "Plaza Juárez",
        zona: "centro",
        ubicacion: "Centro",
        precio: 22,
        disponibles: 4,
        total: 10,
        distancia: 0.8,
        abiertoAhora: true,
        cubierto: true
    },

    {
        id: 2,
        nombre: "Universidad",
        zona: "upp",
        ubicacion: "Zona UPP",
        precio: 18,
        disponibles: 8,
        total: 15,
        distancia: 1.2,
        abiertoAhora: true,
        cubierto: false
    },

    {
        id: 3,
        nombre: "Estacionamiento Hidalgo",
        zona: "centro",
        ubicacion: "Centro",
        precio: 20,
        disponibles: 6,
        total: 12,
        distancia: 1.5,
        abiertoAhora: true,
        cubierto: true
    },

    {
        id: 4,
        nombre: "Campus Norte",
        zona: "norte",
        ubicacion: "Norte",
        precio: 15,
        disponibles: 12,
        total: 20,
        distancia: 2.1,
        abiertoAhora: false,
        cubierto: false
    },

    {
        id: 5,
        nombre: "Plaza Universidad",
        zona: "upp",
        ubicacion: "Zona UPP",
        precio: 25,
        disponibles: 3,
        total: 10,
        distancia: 1.7,
        abiertoAhora: true,
        cubierto: true
    },

    {
        id: 6,
        nombre: "Las Torres",
        zona: "norte",
        ubicacion: "Norte",
        precio: 17,
        disponibles: 9,
        total: 14,
        distancia: 2.8,
        abiertoAhora: true,
        cubierto: false
    }

];


/* =========================
   ELEMENTOS
========================= */

const resultados =
    document.getElementById("resultados");

const sinResultados =
    document.getElementById("sinResultados");

const contadorResultados =
    document.getElementById("contadorResultados");

const busqueda =
    document.getElementById("busqueda");

const btnBuscar =
    document.getElementById("btnBuscar");

const btnLimpiar =
    document.getElementById("btnLimpiar");

const botonesFiltro =
    document.querySelectorAll(".filter-btn");

const mapPins =
    document.getElementById("mapPins");


/* =========================
   FILTROS ACTIVOS
========================= */

const filtrosActivos = {
    disponibles: true,
    precio: false,
    ahora: false,
    cubierto: false
};


/* =========================
   MOSTRAR RESULTADOS
========================= */

function mostrarEstacionamientos(lista) {

    resultados.innerHTML = "";

    contadorResultados.textContent =
        `${lista.length} resultado(s)`;


    if (lista.length === 0) {

        sinResultados.classList.remove(
            "hidden"
        );

        mostrarPines([]);

        return;

    }


    sinResultados.classList.add(
        "hidden"
    );


    lista.forEach(estacionamiento => {

        const tarjeta =
            document.createElement(
                "article"
            );


        tarjeta.className =
            "parking-card";


        tarjeta.innerHTML = `

            <div class="parking-image">

                <img
                    src="assets/images/logo-autopark.png"
                    alt="AutoPark"
                >

            </div>


            <div class="parking-content">

                <h2>
                    ${estacionamiento.nombre}
                </h2>


                <p class="parking-location">
                    ${estacionamiento.ubicacion}
                </p>


                <p class="parking-price">
                    $${estacionamiento.precio} MXN / hora
                </p>


                <div class="parking-footer">

                    <span class="available-badge">
                        ${estacionamiento.disponibles}
                        espacios libres
                    </span>


                    <button
                        type="button"
                        class="btn-details"
                        data-id="${estacionamiento.id}"
                    >
                        Ver detalle
                    </button>

                </div>

            </div>
        `;


        resultados.appendChild(
            tarjeta
        );

    });


    mostrarPines(lista);

}


/* =========================
   BUSCAR
========================= */

function realizarBusqueda() {

    const texto =
        busqueda.value
            .trim()
            .toLowerCase();


    const filtrados =
        estacionamientos.filter(
            estacionamiento => {


                /* TEXTO */

                const coincideTexto =
                    texto === "" ||

                    estacionamiento.nombre
                        .toLowerCase()
                        .includes(texto) ||

                    estacionamiento.ubicacion
                        .toLowerCase()
                        .includes(texto) ||

                    estacionamiento.zona
                        .toLowerCase()
                        .includes(texto);


                /* DISPONIBLES */

                const cumpleDisponibilidad =
                    !filtrosActivos.disponibles ||
                    estacionamiento.disponibles > 0;


                /* PRECIO */

                const cumplePrecio =
                    !filtrosActivos.precio ||
                    estacionamiento.precio <= 25;


                /* ABIERTO */

                const cumpleAhora =
                    !filtrosActivos.ahora ||
                    estacionamiento.abiertoAhora;


                /* CUBIERTO */

                const cumpleCubierto =
                    !filtrosActivos.cubierto ||
                    estacionamiento.cubierto;


                return (
                    coincideTexto &&
                    cumpleDisponibilidad &&
                    cumplePrecio &&
                    cumpleAhora &&
                    cumpleCubierto
                );

            }
        );


    mostrarEstacionamientos(
        filtrados
    );

}


/* =========================
   FILTROS
========================= */

botonesFiltro.forEach(boton => {

    boton.addEventListener(
        "click",
        () => {

            const filtro =
                boton.dataset.filter;


            filtrosActivos[filtro] =
                !filtrosActivos[filtro];


            boton.classList.toggle(
                "active",
                filtrosActivos[filtro]
            );


            realizarBusqueda();

        }
    );

});


/* =========================
   BUSCAR BOTÓN
========================= */

btnBuscar.addEventListener(
    "click",
    realizarBusqueda
);


/* ENTER */

busqueda.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            realizarBusqueda();

        }

    }
);


/* =========================
   LIMPIAR
========================= */

btnLimpiar.addEventListener(
    "click",
    () => {

        busqueda.value = "";


        filtrosActivos.disponibles = true;
        filtrosActivos.precio = false;
        filtrosActivos.ahora = false;
        filtrosActivos.cubierto = false;


        botonesFiltro.forEach(
            boton => {

                boton.classList.toggle(
                    "active",
                    boton.dataset.filter ===
                    "disponibles"
                );

            }
        );


        realizarBusqueda();

    }
);


/* =========================
   VER DETALLE
========================= */

resultados.addEventListener(
    "click",
    event => {

        if (
            !event.target.classList.contains(
                "btn-details"
            )
        ) {

            return;

        }


        const id =
            Number(
                event.target.dataset.id
            );


        const estacionamiento =
            estacionamientos.find(
                item => item.id === id
            );


        if (!estacionamiento) {

            return;

        }


        /*
            Guardamos temporalmente el
            estacionamiento seleccionado.

            RF05 leerá estos datos.
        */

        sessionStorage.setItem(
            "estacionamientoSeleccionado",
            JSON.stringify(estacionamiento)
        );


        window.location.href =
            `detalle.html?id=${id}`;

    }
);


/* =========================
   MAPA VISUAL
========================= */

function mostrarPines(lista) {

    mapPins.innerHTML = "";


    const posiciones = [

        { top: 18, left: 28 },

        { top: 48, left: 64 },

        { top: 80, left: 45 },

        { top: 27, left: 77 },

        { top: 66, left: 20 },

        { top: 38, left: 45 }

    ];


    lista.slice(0, 6)
        .forEach(
            (estacionamiento, index) => {

                const pin =
                    document.createElement(
                        "div"
                    );


                pin.className =
                    "map-pin";


                pin.style.top =
                    posiciones[index].top +
                    "%";


                pin.style.left =
                    posiciones[index].left +
                    "%";


                pin.title =
                    estacionamiento.nombre;


                pin.innerHTML =
                    "<span>P</span>";


                mapPins.appendChild(pin);

            }
        );

}


/* =========================
   INICIO
========================= */

document.addEventListener(
    "DOMContentLoaded",
    realizarBusqueda
);