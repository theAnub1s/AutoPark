
// getElementById: obtiene los elementos únicos que se necesitan para las interacciones.
const campoBusqueda = document.getElementById("busquedaEstacionamiento");
const botonAlternar = document.getElementById("btnAlternarResultados");
const botonLimpiar = document.getElementById("btnLimpiarBusqueda");
const contenedorResultados = document.getElementById("listaEstacionamientos");
const mensajeResultados = document.getElementById("mensajeResultados");
const mensajeSinResultados = document.getElementById("mensajeSinResultados");

// querySelector: obtiene el primer elemento que coincide con el selector CSS.
const primerEstacionamiento = document.querySelector(".estacionamiento-item");

// querySelectorAll: obtiene todas las tarjetas que se pueden filtrar.
const estacionamientos = document.querySelectorAll(".estacionamiento-item");

// Busca por nombre o ubicación usando el texto escrito.
function buscarEstacionamientos() {
    const texto = campoBusqueda.value.trim().toLowerCase();
    let encontrados = 0;

    estacionamientos.forEach(function(estacionamiento) {
        const nombre = estacionamiento.dataset.nombre || "";
        const ubicacion = estacionamiento.dataset.ubicacion || "";
        const coincide = nombre.includes(texto) || ubicacion.includes(texto);

        // toggle muestra la tarjeta si coincide y la oculta si no coincide.
        estacionamiento.classList.toggle("d-none", !coincide);

        if (coincide) {
            encontrados++;
        }
    });

    mensajeResultados.textContent = encontrados === 1
        ? "Se encontró 1 estacionamiento."
        : `Se encontraron ${encontrados} estacionamientos.`;

    mensajeSinResultados.classList.toggle("d-none", encontrados !== 0);
}

// Alterna la visibilidad del contenedor de resultados.
function alternarResultados() {
    const ocultos = contenedorResultados.classList.toggle("d-none");

    botonAlternar.textContent = ocultos
        ? "Mostrar resultados"
        : "Ocultar resultados";

    botonAlternar.setAttribute("aria-expanded", String(!ocultos));
}

// Limpia el campo y vuelve a mostrar todas las tarjetas.
function limpiarBusqueda() {
    campoBusqueda.value = "";

    estacionamientos.forEach(function(estacionamiento) {
        estacionamiento.classList.remove("d-none");
    });

    mensajeSinResultados.classList.add("d-none");
    mensajeResultados.textContent = "Se muestran todos los estacionamientos.";

    contenedorResultados.classList.remove("d-none");
    botonAlternar.textContent = "Ocultar resultados";
    botonAlternar.setAttribute("aria-expanded", "true");

    campoBusqueda.focus();
}

// Evento keyup: ejecuta la búsqueda al escribir o borrar texto.
campoBusqueda.addEventListener("keyup", buscarEstacionamientos);

// Evento click registrado en JavaScript, no mediante onclick en HTML.
botonAlternar.addEventListener("click", alternarResultados);
botonLimpiar.addEventListener("click", limpiarBusqueda);

// Inicializa los resultados al cargar la página.
document.addEventListener("DOMContentLoaded", function() {
    if (primerEstacionamiento) {
        buscarEstacionamientos();
    }
});
