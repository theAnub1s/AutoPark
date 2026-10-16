
let espacioSeleccionado = 1;

//usamos las ids para poder manejar controles unicos, como ejemplo el boton para guardar la disponibilidad
const botonGuardar = document.getElementById("btnGuardar");

//al usar query selector podemos obtener el contenedor que agrupa los espacios
const panelGestion = document.querySelector("#panelGestion");

//se asignan a todas las tarjetas un numero 
const tarjetas = document.querySelectorAll(".espacio");



function asignarNumeroEspacios(tarjeta, indice) {
    tarjeta.dataset.espacio = indice + 1;
}

tarjetas.forEach(asignarNumeroEspacios);


const listaEspacios = document.querySelector(".lista-espacios");

listaEspacios.addEventListener("click", manejarClickEspacios);


function manejarClickEspacios(evento) {
    const boton = evento.target.closest(".gestionar");

   
    if (!boton) {
        return;
    }

    const tarjeta = boton.closest(".espacio");
    gestionarEspacio(Number(tarjeta.dataset.espacio));
}


function gestionarEspacio(numero) {
    espacioSeleccionado = numero;

    const horarioActual = document.getElementById(
        "horario" + espacioSeleccionado
    ).textContent.trim();

    const horas = horarioActual.split(" - ");

    document.getElementById("horaInicio").value = horas[0];
    document.getElementById("horaFin").value = horas[1];

    document.getElementById("nuevaDisponibilidad").value =
        document.getElementById(
            "estado" + espacioSeleccionado
        ).textContent.trim();

    bootstrap.Collapse
        .getOrCreateInstance(panelGestion, { toggle: false })
        .show();
}



botonGuardar.addEventListener("click", guardarCambios);

    function guardarCambios() {
    const disponibilidad =
        document.getElementById("nuevaDisponibilidad").value;

    const inicio =
        document.getElementById("horaInicio").value;

    const fin =
        document.getElementById("horaFin").value;

    
    if (inicio >= fin) {
        alert("La hora de inicio debe ser anterior a la hora de fin.");
        return;
    }

    document.getElementById(
        "estado" + espacioSeleccionado
    ).textContent = disponibilidad;

    document.getElementById(
        "horario" + espacioSeleccionado
    ).textContent = inicio + " - " + fin;

    bootstrap.Collapse
    .getOrCreateInstance(panelGestion,{toggle:false})
   .hide();

   mostrarToast("Disponibilidad actualizada correctamente");
}


let tarjetaEditada = null;

const campoNombre = document.getElementById("nombreEstacionamiento");
const campoDireccion = document.getElementById("direccionEstacionamiento");
const campoPrecio = document.getElementById("precioEstacionamiento");
const botonGuardarEdicion = document.getElementById("guardarEdicion");
const modalEditar = document.getElementById("modalEditar");



    function manejarClickEditar(evento) {
    const boton = evento.target.closest(".editar");

    if (!boton) {
        return;
    }

    tarjetaEditada = boton.closest(".espacio");

   
    campoNombre.value = tarjetaEditada
        .querySelector(".nombre-estacionamiento").textContent.trim();

    campoDireccion.value = tarjetaEditada
        .querySelector(".direccion-estacionamiento").textContent.trim();

    campoPrecio.value = tarjetaEditada
        .querySelector(".precio-estacionamiento").textContent.trim();
}

listaEspacios.addEventListener("click", manejarClickEditar);


    function guardarEdicion() {
    const nombre = campoNombre.value.trim();
    const direccion = campoDireccion.value.trim();
    const precioTexto = campoPrecio.value.trim();
    const precio = Number(precioTexto);

    if (nombre === "" || direccion === "") {
        alert("Completa el nombre y la dirección.");
        return;
    }

    if (precioTexto === "" || !Number.isFinite(precio) || precio <= 0) {
        alert("Ingresa un precio mayor que cero.");
        return;
    }

    if (!tarjetaEditada) {
        return;
    }

    tarjetaEditada.querySelector(".nombre-estacionamiento").textContent = nombre;

    tarjetaEditada.querySelector(
        ".direccion-estacionamiento"
    ).textContent = direccion;

    tarjetaEditada.querySelector(
        ".precio-estacionamiento"
    ).textContent = precio;

    bootstrap.Modal.getOrCreateInstance(modalEditar).hide();

    mostrarToast("Estacionamiento actualizado correctamente.");
}

botonGuardarEdicion.addEventListener("click", guardarEdicion);


const elementoToast = document.getElementById("autoparkToast");
const mensajeToast = document.getElementById("mensajeToast");

function mostrarToast(mensaje) {
    mensajeToast.textContent = mensaje;

    const toast = bootstrap.Toast.getOrCreateInstance(elementoToast);
    toast.show();
}




