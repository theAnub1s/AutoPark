"use strict";

/* Datos de demostración */
const estacionamientos = [
  {
    id: 1,
    nombre: "Plaza Juárez",
    zona: "centro",
    ubicacion: "Centro de Pachuca",
    precio: 22,
    disponibles: 4,
    total: 10,
    distancia: 0.8
  },
  {
    id: 2,
    nombre: "Universidad",
    zona: "upp",
    ubicacion: "Zona UPP",
    precio: 18,
    disponibles: 8,
    total: 15,
    distancia: 1.2
  },
  {
    id: 3,
    nombre: "Estacionamiento Hidalgo",
    zona: "centro",
    ubicacion: "Centro de Pachuca",
    precio: 20,
    disponibles: 6,
    total: 12,
    distancia: 1.5
  },
  {
    id: 4,
    nombre: "Campus Norte",
    zona: "norte",
    ubicacion: "Norte de Pachuca",
    precio: 15,
    disponibles: 12,
    total: 20,
    distancia: 2.1
  },
  {
    id: 5,
    nombre: "Plaza Universidad",
    zona: "upp",
    ubicacion: "Zona UPP",
    precio: 25,
    disponibles: 3,
    total: 10,
    distancia: 1.7
  },
  {
    id: 6,
    nombre: "Las Torres",
    zona: "norte",
    ubicacion: "Norte de Pachuca",
    precio: 17,
    disponibles: 9,
    total: 14,
    distancia: 2.8
  }
];

/* Obtener elementos del HTML */
const resultados = document.getElementById("resultados");
const contadorResultados = document.getElementById("contadorResultados");
const sinResultados = document.getElementById("sinResultados");
const busqueda = document.getElementById("busqueda");
const zona = document.getElementById("zona");
const ordenar = document.getElementById("ordenar");
const formBusqueda = document.getElementById("formBusqueda");
const btnLimpiar = document.getElementById("btnLimpiar");
const btnReiniciar = document.getElementById("btnReiniciar");

const formReserva = document.getElementById("formReserva");
const fechaReserva = document.getElementById("fechaReserva");
const horaEntrada = document.getElementById("horaEntrada");
const horaSalida = document.getElementById("horaSalida");
const totalEstimado = document.getElementById("totalEstimado");
const detalleHoras = document.getElementById("detalleHoras");
const controlDuracionBusqueda = document.getElementById("controlDuracionBusqueda");
const horasDuracionBusqueda = document.getElementById("horasDuracionBusqueda");
const botonesDuracionBusqueda = document.querySelectorAll("#controlDuracionBusqueda [data-duration-action]");
const errorHorario = document.getElementById("errorHorario");

const toastElemento = document.getElementById("toastAutoPark");
const toastMensaje = document.getElementById("toastMensaje");
const botonFiltros = document.querySelectorAll(".filter-btn");

/* Variables de control */
let estacionamientosFiltrados = [...estacionamientos];
let estacionamientoSeleccionado = null;
let modalDetalles = null;
let modalReserva = null;
let toastAutoPark = null;

/* Inicializar componentes de Bootstrap */
function inicializarComponentes() {
  modalDetalles = new bootstrap.Modal(
    document.getElementById("modalDetalles")
  );

  modalReserva = new bootstrap.Modal(
    document.getElementById("modalReserva")
  );

  toastAutoPark = bootstrap.Toast.getOrCreateInstance(
    toastElemento,
    { delay: 3500 }
  );
}

/* Obtener fecha local */
function obtenerFechaLocal() {
  const hoy = new Date();

  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");

  return `${anio}-${mes}-${dia}`;
}

/* Establecer fecha mínima */
function inicializarFecha() {
  fechaReserva.min = obtenerFechaLocal();
  fechaReserva.value = obtenerFechaLocal();
}

/* Mostrar notificaciones */
function mostrarNotificacion(mensaje) {
  toastMensaje.textContent = mensaje;
  toastAutoPark.show();
}

/* FILTRADO:
   Actualiza tarjetas, contador y mensaje sin resultados. */
function mostrarEstacionamientos(lista) {
  resultados.replaceChildren();

  contadorResultados.textContent =
    `${lista.length} estacionamiento(s) encontrado(s).`;

  /* classList.toggle agrega o quita d-none según la condición. */
  sinResultados.classList.toggle("d-none", lista.length !== 0);

  lista.forEach(crearTarjetaEstacionamiento);
}

/* Crear tarjetas dinámicamente */
function crearTarjetaEstacionamiento(estacionamiento) {
  const columna = document.createElement("div");
  columna.className = "col-12 col-md-6 col-xl-4";

  const tarjeta = document.createElement("article");
  tarjeta.className = "parking-card";

  const porcentaje = Math.round(
    estacionamiento.disponibles / estacionamiento.total * 100
  );

  tarjeta.innerHTML = `
    <div class="parking-top">
      <div class="parking-icon">
       <img src="./assets/images/logo-autopark.png" alt="Logo AutoPark">
      </div>

      <div class="parking-info">
        <h3 class="parking-name"></h3>
        <p class="parking-location"></p>
      </div>

      <span class="available-badge"></span>
    </div>

    <div class="parking-details">
      <div class="detail-item">
        <span class="detail-label">Precio por hora</span>
        <span class="detail-value precio"></span>
      </div>

      <div class="detail-item">
        <span class="detail-label">Disponibilidad</span>
        <span class="detail-value">${porcentaje}%</span>
      </div>
    </div>

    <div class="parking-footer">
      <span class="distance"></span>

      <button
        type="button"
        class="btn-details"
        data-action="detalle"
        data-id="${estacionamiento.id}">
        Ver detalle
      </button>
    </div>
  `;

  tarjeta.querySelector(".parking-name").textContent =
    estacionamiento.nombre;

  tarjeta.querySelector(".parking-location").textContent =
    estacionamiento.ubicacion;

  tarjeta.querySelector(".available-badge").textContent =
    `${estacionamiento.disponibles} espacios libres`;

  tarjeta.querySelector(".precio").textContent =
    `$${estacionamiento.precio} MXN`;

  tarjeta.querySelector(".distance").textContent =
    `${estacionamiento.distancia} km de distancia`;

  columna.appendChild(tarjeta);
  resultados.appendChild(columna);
}

/* BÚSQUEDA POR TEXTO Y ZONA */
function realizarBusqueda(evento) {
  if (evento) {
    evento.preventDefault();
  }

  const texto = busqueda.value.trim().toLocaleLowerCase("es");
  const zonaSeleccionada = zona.value;

  estacionamientosFiltrados = estacionamientos.filter(function(item) {
    const textoItem =
      `${item.nombre} ${item.ubicacion} ${item.zona}`
        .toLocaleLowerCase("es");

    const coincideTexto = textoItem.includes(texto);

    const coincideZona =
      zonaSeleccionada === "todas" ||
      item.zona === zonaSeleccionada;

    return coincideTexto && coincideZona;
  });

  ordenarResultados();
}

/* Ordenar por disponibilidad, precio o distancia */
function ordenarResultados() {
  const criterio = ordenar.value;

  if (criterio === "disponibilidad") {
    estacionamientosFiltrados.sort(
      (a, b) => b.disponibles - a.disponibles
    );
  } else if (criterio === "precio") {
    estacionamientosFiltrados.sort(
      (a, b) => a.precio - b.precio
    );
  } else if (criterio === "distancia") {
    estacionamientosFiltrados.sort(
      (a, b) => a.distancia - b.distancia
    );
  }

  mostrarEstacionamientos(estacionamientosFiltrados);
}

/* Actualizar botón de filtro seleccionado */
function actualizarFiltroActivo(zonaSeleccionada) {
  botonFiltros.forEach(function(boton) {
    const activo = boton.dataset.zone === zonaSeleccionada;

    boton.classList.toggle("active", activo);
    boton.setAttribute("aria-pressed", String(activo));
  });
}

/* Delegación de eventos para filtros */
function manejarClickFiltros(evento) {
  const boton = evento.target.closest("button[data-zone]");

  if (!boton) {
    return;
  }

  zona.value = boton.dataset.zone;

  actualizarFiltroActivo(zona.value);
  realizarBusqueda();
}

/* Delegación de eventos para las tarjetas */
function manejarClickResultados(evento) {
  const boton = evento.target.closest("button[data-action]");

  if (!boton) {
    return;
  }

  const id = Number(boton.dataset.id);

  const estacionamiento = estacionamientos.find(function(item) {
    return item.id === id;
  });

  if (!estacionamiento) {
    return;
  }

  if (boton.dataset.action === "detalle") {
    abrirDetalleEstacionamiento(estacionamiento);
  }
}

/* Convertir clave de zona a nombre */
function nombreZona(clave) {
  const zonas = {
    centro: "Centro",
    upp: "Zona UPP",
    norte: "Norte"
  };

  return zonas[clave] || clave;
}

/* Mostrar detalles del estacionamiento */
function abrirDetalleEstacionamiento(estacionamiento) {
  estacionamientoSeleccionado = estacionamiento;

  document.getElementById("modalTitulo").textContent =
    estacionamiento.nombre;

  document.getElementById("modalUbicacion").textContent =
    estacionamiento.ubicacion;

  document.getElementById("modalZona").textContent =
    nombreZona(estacionamiento.zona);

  document.getElementById("modalPrecio").textContent =
    `$${estacionamiento.precio} MXN`;

  document.getElementById("modalDisponibles").textContent =
    `${estacionamiento.disponibles} espacios`;

  document.getElementById("modalDistancia").textContent =
    `${estacionamiento.distancia} km`;

  modalDetalles.show();
}

/* Abrir formulario de reserva */
function abrirFormularioReserva() {
  if (!estacionamientoSeleccionado) {
    return;
  }

  document.getElementById("reservaEstacionamiento").textContent =
    estacionamientoSeleccionado.nombre;

  formReserva.reset();

  fechaReserva.min = obtenerFechaLocal();
  fechaReserva.value = obtenerFechaLocal();
  horaEntrada.value = "18:00";
  horaSalida.value = "20:00";

  formReserva
    .querySelectorAll(".is-valid, .is-invalid")
    .forEach(limpiarEstadoCampo);

  formReserva.classList.remove("was-validated");
  errorHorario.classList.add("d-none");

  actualizarTotal();

  modalDetalles.hide();
  modalReserva.show();
}

/* Duración dinámica de la reserva rápida (RF06).
   Un único listener en el contenedor gestiona los dos botones. */
function minutosDesdeHoraBusqueda(hora) {
  const partes = hora.split(":").map(Number);
  return partes[0] * 60 + partes[1];
}

function formatearHoraBusqueda(minutos) {
  return String(Math.floor(minutos / 60)).padStart(2, "0") +
    ":" + String(minutos % 60).padStart(2, "0");
}

function sincronizarContadorBusqueda() {
  const entrada = horaEntrada.value ? minutosDesdeHoraBusqueda(horaEntrada.value) : NaN;
  const salida = horaSalida.value ? minutosDesdeHoraBusqueda(horaSalida.value) : NaN;
  const horas = Number.isFinite(entrada) && Number.isFinite(salida) && salida > entrada
    ? Math.ceil((salida - entrada) / 60)
    : 0;
  const maxHoras = Number.isFinite(entrada)
    ? Math.floor((1439 - entrada) / 60)
    : 0;

  horasDuracionBusqueda.textContent = horas
    ? horas + (horas === 1 ? " hora" : " horas")
    : "— horas";

  botonesDuracionBusqueda.forEach(function sincronizarBoton(boton) {
    boton.disabled = boton.dataset.durationAction === "decrease"
      ? horas <= 1
      : maxHoras < 1 || horas >= maxHoras;
  });
}

function manejarContadorBusqueda(evento) {
  const boton = evento.target.closest("button[data-duration-action]");
  if (!boton || !controlDuracionBusqueda.contains(boton) || boton.disabled || !horaEntrada.value) {
    return;
  }

  const entrada = minutosDesdeHoraBusqueda(horaEntrada.value);
  const salida = horaSalida.value ? minutosDesdeHoraBusqueda(horaSalida.value) : NaN;
  const horas = Number.isFinite(salida) && salida > entrada
    ? Math.ceil((salida - entrada) / 60)
    : 0;
  const diferencia = boton.dataset.durationAction === "increase" ? 1 : -1;
  const nuevaSalida = entrada + Math.max(1, horas + diferencia) * 60;

  if (nuevaSalida >= 1440) {
    return; // El formulario actual no permite reservas que cruzan medianoche.
  }

  horaSalida.value = formatearHoraBusqueda(nuevaSalida);
  actualizarTotal();
  validarCampo({ target: horaSalida });
}

/* Limpiar estado visual de un campo */
function limpiarEstadoCampo(campo) {
  campo.classList.remove("is-valid", "is-invalid");
}

/* Calcular el costo de la reserva */
function calcularImporte() {
  if (
    !horaEntrada.value ||
    !horaSalida.value ||
    !estacionamientoSeleccionado
  ) {
    return null;
  }

  const [he, me] = horaEntrada.value.split(":").map(Number);
  const [hs, ms] = horaSalida.value.split(":").map(Number);

  const minutosEntrada = he * 60 + me;
  const minutosSalida = hs * 60 + ms;

  if (minutosSalida <= minutosEntrada) {
    return null;
  }

  const horas = Math.ceil(
    (minutosSalida - minutosEntrada) / 60
  );

  return {
    horas,
    total: horas * estacionamientoSeleccionado.precio
  };
}

/* Actualizar importe y validar horario */
function actualizarTotal() {
  sincronizarContadorBusqueda();
  const calculo = calcularImporte();

  const horarioIncorrecto = Boolean(
    horaEntrada.value &&
    horaSalida.value &&
    !calculo
  );

  totalEstimado.textContent = calculo
    ? `$${calculo.total} MXN`
    : "$0 MXN";

  detalleHoras.textContent = calculo
    ? `${calculo.horas} hora(s) facturada(s) a $${estacionamientoSeleccionado.precio} MXN por hora.`
    : "La salida debe ser posterior a la entrada.";

  errorHorario.classList.toggle(
    "d-none",
    !horarioIncorrecto
  );

  horaSalida.classList.toggle(
    "is-invalid",
    horarioIncorrecto
  );

  if (horarioIncorrecto) {
    horaSalida.setAttribute("aria-invalid", "true");
  } else {
    horaSalida.removeAttribute("aria-invalid");
  }
}

/* Validación de campos en tiempo real */
function validarCampo(evento) {
  const campo = evento.target;

  if (!campo.matches("#fechaReserva, #horaEntrada, #horaSalida")) {
    return;
  }

  let valido = campo.checkValidity();

  if (campo === fechaReserva) {
    valido =
      Boolean(campo.value) &&
      campo.value >= obtenerFechaLocal();
  }

  if (
    campo === horaSalida &&
    horaEntrada.value &&
    horaSalida.value
  ) {
    valido = Boolean(calcularImporte());
  }

  campo.classList.toggle("is-valid", valido);
  campo.classList.toggle("is-invalid", !valido);
}

/* Recuperar reservas del navegador */
function obtenerReservasGuardadas() {
  try {
    const datos = JSON.parse(
      localStorage.getItem("autoparkReservas") || "[]"
    );

    return Array.isArray(datos) ? datos : [];
  } catch (error) {
    console.error("No se pudieron leer las reservas:", error);
    return [];
  }
}

/* Guardar reserva */
function guardarReserva(reserva) {
  try {
    const reservas = obtenerReservasGuardadas();

    reservas.push(reserva);

    localStorage.setItem(
      "autoparkReservas",
      JSON.stringify(reservas)
    );

    return true;
  } catch (error) {
    console.error("No se pudo guardar la reserva:", error);

    mostrarNotificacion(
      "No fue posible guardar la reserva en este navegador."
    );

    return false;
  }
}

/* Confirmar reserva */
function confirmarReserva(evento) {
  evento.preventDefault();
  formReserva.classList.add("was-validated");

  const fechaValida =
    Boolean(fechaReserva.value) &&
    fechaReserva.value >= obtenerFechaLocal();

  const calculo = calcularImporte();

  if (!fechaValida) {
    fechaReserva.classList.add("is-invalid");
    fechaReserva.focus();
    return;
  }

  if (!calculo) {
    horaSalida.classList.add("is-invalid");
    errorHorario.classList.remove("d-none");
    horaSalida.focus();
    return;
  }

  if (!estacionamientoSeleccionado) {
    mostrarNotificacion("Selecciona un estacionamiento.");
    return;
  }

  // Mis reservas y Detalle comparten esta estructura. El backend la sustituirá después.
  const reserva = {
    id: Date.now(),
    estacionamiento: { ...estacionamientoSeleccionado },
    estacionamientoId: estacionamientoSeleccionado.id,
    nombre: estacionamientoSeleccionado.nombre,
    ubicacion: estacionamientoSeleccionado.ubicacion,
    zona: estacionamientoSeleccionado.zona,
    fecha: fechaReserva.value,
    horaEntrada: horaEntrada.value,
    horaSalida: horaSalida.value,
    entrada: horaEntrada.value,
    salida: horaSalida.value,
    total: calculo.total,
    estado: "activa",
    precioHora: estacionamientoSeleccionado.precio
  };

  if (!guardarReserva(reserva)) {
    return;
  }

  modalReserva.hide();

  mostrarNotificacion(
    "Reserva guardada correctamente. Consulta Mis reservas."
  );
}

/* Limpiar búsqueda y filtros */
function limpiarFiltros() {
  busqueda.value = "";
  zona.value = "todas";
  ordenar.value = "disponibilidad";

  actualizarFiltroActivo("todas");
  realizarBusqueda();
}

/* Registrar todos los eventos */
function registrarEventos() {
  formBusqueda.addEventListener("submit", realizarBusqueda);

  /* Evento input: busca mientras se escribe. */
  busqueda.addEventListener("input", realizarBusqueda);

  /* Evento keyup: busca al soltar una tecla. */
  busqueda.addEventListener("keyup", realizarBusqueda);

  zona.addEventListener("change", function() {
    actualizarFiltroActivo(zona.value);
    realizarBusqueda();
  });

  ordenar.addEventListener("change", ordenarResultados);

  /* Delegación de eventos para los filtros. */
  document
    .querySelector(".filter-buttons")
    .addEventListener("click", manejarClickFiltros);

  /* Delegación de eventos para las tarjetas. */
  resultados.addEventListener("click", manejarClickResultados);

  btnLimpiar.addEventListener("click", limpiarFiltros);
  btnReiniciar.addEventListener("click", limpiarFiltros);

  document
    .getElementById("btnAbrirReserva")
    .addEventListener("click", abrirFormularioReserva);

  formReserva.addEventListener("input", validarCampo);
  formReserva.addEventListener("blur", validarCampo, true);

  horaEntrada.addEventListener("change", actualizarTotal);
  horaSalida.addEventListener("change", actualizarTotal);
  horaEntrada.addEventListener("input", actualizarTotal);
  horaSalida.addEventListener("input", actualizarTotal);
  controlDuracionBusqueda.addEventListener("click", manejarContadorBusqueda);

  formReserva.addEventListener("submit", confirmarReserva);
}

/* Iniciar aplicación */
function iniciarAplicacion() {
  inicializarComponentes();
  inicializarFecha();
  registrarEventos();
  realizarBusqueda();
}

document.addEventListener(
  "DOMContentLoaded",
  iniciarAplicacion
);