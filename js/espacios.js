"use strict";

/* Datos de demostración: posteriormente pueden venir de la base de datos. */
const estacionamientos=[
{id:1,nombre:"Plaza Juárez",zona:"centro",ubicacion:"Centro de Pachuca",precio:22,disponibles:4,total:10,distancia:0.8},
{id:2,nombre:"Universidad",zona:"upp",ubicacion:"Zona UPP",precio:18,disponibles:8,total:15,distancia:1.2},
{id:3,nombre:"Estacionamiento Hidalgo",zona:"centro",ubicacion:"Centro de Pachuca",precio:20,disponibles:6,total:12,distancia:1.5},
{id:4,nombre:"Campus Norte",zona:"norte",ubicacion:"Norte de Pachuca",precio:15,disponibles:12,total:20,distancia:2.1},
{id:5,nombre:"Plaza Universidad",zona:"upp",ubicacion:"Zona UPP",precio:25,disponibles:3,total:10,distancia:1.7},
{id:6,nombre:"Las Torres",zona:"norte",ubicacion:"Norte de Pachuca",precio:17,disponibles:9,total:14,distancia:2.8}
];

/* getElementById obtiene los elementos que se utilizarán en la página. */
const resultados=document.getElementById("resultados");
const contadorResultados=document.getElementById("contadorResultados");
const sinResultados=document.getElementById("sinResultados");
const busqueda=document.getElementById("busqueda");
const zona=document.getElementById("zona");
const ordenar=document.getElementById("ordenar");
const formBusqueda=document.getElementById("formBusqueda");
const btnLimpiar=document.getElementById("btnLimpiar");
const btnReiniciar=document.getElementById("btnReiniciar");
const btnTema=document.getElementById("btnTema");
const formReserva=document.getElementById("formReserva");
const fechaReserva=document.getElementById("fechaReserva");
const horaEntrada=document.getElementById("horaEntrada");
const horaSalida=document.getElementById("horaSalida");
const totalEstimado=document.getElementById("totalEstimado");
const detalleHoras=document.getElementById("detalleHoras");
const errorHorario=document.getElementById("errorHorario");
const toastElemento=document.getElementById("toastAutoPark");
const toastMensaje=document.getElementById("toastMensaje");

/* querySelector obtiene un elemento; querySelectorAll obtiene todos los filtros. */
const botonFiltros=document.querySelectorAll(".filter-btn");
const etiquetaTema=document.querySelector("#btnTema");

/* Estado de la interfaz. */
let estacionamientosFiltrados=[...estacionamientos];
let estacionamientoSeleccionado=null;
let modalDetalles=null;
let modalReserva=null;
let toastAutoPark=null;

/* Prepara los componentes de Bootstrap. */
function inicializarComponentes(){
modalDetalles=new bootstrap.Modal(document.getElementById("modalDetalles"));
modalReserva=new bootstrap.Modal(document.getElementById("modalReserva"));
toastAutoPark=bootstrap.Toast.getOrCreateInstance(toastElemento,{delay:3500});
}

/* Obtiene la fecha local. */
function obtenerFechaLocal(){
const hoy=new Date();
const anio=hoy.getFullYear();
const mes=String(hoy.getMonth()+1).padStart(2,"0");
const dia=String(hoy.getDate()).padStart(2,"0");
return `${anio}-${mes}-${dia}`;
}

/* Establece la fecha mínima y el valor inicial del formulario. */
function inicializarFecha(){
fechaReserva.min=obtenerFechaLocal();
fechaReserva.value=obtenerFechaLocal();
}

/* Muestra notificaciones con Bootstrap Toast. */
function mostrarNotificacion(mensaje){
toastMensaje.textContent=mensaje;
toastAutoPark.show();
}

/* Renderiza las tarjetas y actualiza el contador de resultados. */
function mostrarEstacionamientos(lista){
resultados.replaceChildren();
contadorResultados.textContent=`${lista.length} estacionamiento(s) encontrado(s).`;

/* toggle muestra el mensaje cuando la lista está vacía y lo oculta cuando hay resultados. */
sinResultados.classList.toggle("d-none",lista.length!==0);

lista.forEach(crearTarjetaEstacionamiento);
}

/* Construye cada tarjeta sin atributos onclick. */
function crearTarjetaEstacionamiento(estacionamiento){
const columna=document.createElement("div");
columna.className="col-12 col-md-6 col-xl-4";
const tarjeta=document.createElement("article");
tarjeta.className="parking-card";
const porcentaje=Math.round(estacionamiento.disponibles/estacionamiento.total*100);

tarjeta.innerHTML=`
<div class="parking-top">
<div class="parking-icon"><img src="logoAuto.png" alt="" aria-hidden="true"></div>
<div class="parking-info">
<h3 class="parking-name"></h3>
<p class="parking-location"></p>
</div>
<span class="available-badge"></span>
</div>
<div class="parking-details">
<div class="detail-item">
<span class="detail-label">Precio por hora</span>
<span class="detail-value"></span>
</div>
<div class="detail-item">
<span class="detail-label">Disponibilidad</span>
<span class="detail-value">${porcentaje}%</span>
</div>
</div>
<div class="parking-footer">
<span class="distance"></span>
<button type="button" class="btn-details" data-action="detalle" data-id="${estacionamiento.id}">Ver detalle</button>
</div>`;

tarjeta.querySelector(".parking-name").textContent=estacionamiento.nombre;
tarjeta.querySelector(".parking-location").textContent=estacionamiento.ubicacion;
tarjeta.querySelector(".available-badge").textContent=`${estacionamiento.disponibles} espacios libres`;
tarjeta.querySelector(".detail-value").textContent=`$${estacionamiento.precio} MXN`;
tarjeta.querySelector(".distance").textContent=`${estacionamiento.distancia} km de distancia`;

columna.appendChild(tarjeta);
resultados.appendChild(columna);
}

/* Busca por nombre, ubicación y zona seleccionada. */
function realizarBusqueda(evento){
if(evento)evento.preventDefault();

const texto=busqueda.value.trim().toLocaleLowerCase("es");
const zonaSeleccionada=zona.value;

estacionamientosFiltrados=estacionamientos.filter(function(estacionamiento){
const coincideTexto=`${estacionamiento.nombre} ${estacionamiento.ubicacion} ${estacionamiento.zona}`.toLocaleLowerCase("es").includes(texto);
const coincideZona=zonaSeleccionada==="todas"||estacionamiento.zona===zonaSeleccionada;
return coincideTexto&&coincideZona;
});

ordenarResultados();
}

/* Ordena los resultados según el criterio seleccionado. */
function ordenarResultados(){
const criterio=ordenar.value;

if(criterio==="disponibilidad"){
estacionamientosFiltrados.sort((a,b)=>b.disponibles-a.disponibles);
}else if(criterio==="precio"){
estacionamientosFiltrados.sort((a,b)=>a.precio-b.precio);
}else if(criterio==="distancia"){
estacionamientosFiltrados.sort((a,b)=>a.distancia-b.distancia);
}

mostrarEstacionamientos(estacionamientosFiltrados);
}

/* Sincroniza los botones de filtro con el selector de zona. */
function actualizarFiltroActivo(zonaSeleccionada){
botonFiltros.forEach(function(boton){
const activo=boton.dataset.zone===zonaSeleccionada;
boton.classList.toggle("active",activo);
boton.setAttribute("aria-pressed",String(activo));
});
}

/* Delegación de eventos para los botones de zona. */
function manejarClickFiltros(evento){
const boton=evento.target.closest("button[data-zone]");
if(!boton)return;

zona.value=boton.dataset.zone;
actualizarFiltroActivo(zona.value);
realizarBusqueda();
}

/* Delegación de eventos para los botones de las tarjetas. */
function manejarClickResultados(evento){
const boton=evento.target.closest("button[data-action]");
if(!boton)return;

const id=Number(boton.dataset.id);
const estacionamiento=estacionamientos.find(function(item){
return item.id===id;
});

if(!estacionamiento)return;

if(boton.dataset.action==="detalle"){
abrirDetalleEstacionamiento(estacionamiento);
}
}

/* Muestra los datos del estacionamiento seleccionado. */
function abrirDetalleEstacionamiento(estacionamiento){
estacionamientoSeleccionado=estacionamiento;
document.getElementById("modalTitulo").textContent=estacionamiento.nombre;
document.getElementById("modalUbicacion").textContent=estacionamiento.ubicacion;
document.getElementById("modalZona").textContent=nombreZona(estacionamiento.zona);
document.getElementById("modalPrecio").textContent=`$${estacionamiento.precio} MXN`;
document.getElementById("modalDisponibles").textContent=`${estacionamiento.disponibles} espacios`;
document.getElementById("modalDistancia").textContent=`${estacionamiento.distancia} km`;
modalDetalles.show();
}

/* Convierte las claves de zona en nombres visibles. */
function nombreZona(clave){
const zonas={centro:"Centro",upp:"Zona UPP",norte:"Norte"};
return zonas[clave]||clave;
}

/* Abre el formulario de reserva. */
function abrirFormularioReserva(){
if(!estacionamientoSeleccionado)return;

document.getElementById("reservaEstacionamiento").textContent=estacionamientoSeleccionado.nombre;
formReserva.reset();
fechaReserva.min=obtenerFechaLocal();
fechaReserva.value=obtenerFechaLocal();
horaEntrada.value="18:00";
horaSalida.value="20:00";
formReserva.querySelectorAll(".is-valid,.is-invalid").forEach(limpiarEstadoCampo);
formReserva.classList.remove("was-validated");
errorHorario.classList.add("d-none");
actualizarTotal();
modalDetalles.hide();
modalReserva.show();
}

/* Elimina los estados visuales de validación. */
function limpiarEstadoCampo(campo){
campo.classList.remove("is-valid","is-invalid");
}

/* Calcula el precio de la reserva. */
function calcularImporte(){
if(!horaEntrada.value||!horaSalida.value)return null;

const [he,me]=horaEntrada.value.split(":").map(Number);
const [hs,ms]=horaSalida.value.split(":").map(Number);
const minutosEntrada=he*60+me;
const minutosSalida=hs*60+ms;

if(minutosSalida<=minutosEntrada)return null;

const horas=Math.ceil((minutosSalida-minutosEntrada)/60);
return {horas,total:horas*estacionamientoSeleccionado.precio};
}

/* Actualiza el total y muestra los errores de horario. */
function actualizarTotal(){
const calculo=estacionamientoSeleccionado?calcularImporte():null;
const horarioIncorrecto=Boolean(horaEntrada.value&&horaSalida.value&&!calculo);

totalEstimado.textContent=calculo?`$${calculo.total} MXN`:"$0 MXN";
detalleHoras.textContent=calculo?`${calculo.horas} hora(s) facturada(s) a $${estacionamientoSeleccionado.precio} MXN por hora.`:"La salida debe ser posterior a la entrada.";
errorHorario.classList.toggle("d-none",!horarioIncorrecto);
horaSalida.classList.toggle("is-invalid",horarioIncorrecto);

if(horarioIncorrecto){
horaSalida.setAttribute("aria-invalid","true");
}else{
horaSalida.removeAttribute("aria-invalid");
}
}

/* Valida los campos en tiempo real y al perder el foco. */
function validarCampo(evento){
const campo=evento.target;
if(!campo.matches("#fechaReserva,#horaEntrada,#horaSalida"))return;

let valido=campo.checkValidity();

if(campo===fechaReserva){
valido=Boolean(campo.value)&&campo.value>=obtenerFechaLocal();
}

if(campo===horaSalida&&horaEntrada.value&&horaSalida.value){
valido=Boolean(calcularImporte());
}

campo.classList.toggle("is-valid",valido);
campo.classList.toggle("is-invalid",!valido);
}

/* Recupera las reservas almacenadas en el navegador. */
function obtenerReservasGuardadas(){
try{
const datos=JSON.parse(localStorage.getItem("autoparkReservas")||"[]");
return Array.isArray(datos)?datos:[];
}catch(error){
console.error("No se pudieron leer las reservas:",error);
return [];
}
}

/* Guarda una reserva para consultarla después en Mis reservas. */
function guardarReserva(reserva){
try{
const reservas=obtenerReservasGuardadas();
reservas.push(reserva);
localStorage.setItem("autoparkReservas",JSON.stringify(reservas));
return true;
}catch(error){
console.error("No se pudo guardar la reserva:",error);
mostrarNotificacion("No fue posible guardar la reserva en este navegador.");
return false;
}
}

/* Valida y procesa la reserva. */
function confirmarReserva(evento){
evento.preventDefault();
formReserva.classList.add("was-validated");

const fechaValida=Boolean(fechaReserva.value)&&fechaReserva.value>=obtenerFechaLocal();
const calculo=calcularImporte();

if(!fechaValida){
fechaReserva.classList.add("is-invalid");
fechaReserva.focus();
return;
}

if(!calculo){
horaSalida.classList.add("is-invalid");
errorHorario.classList.remove("d-none");
horaSalida.focus();
return;
}

if(!estacionamientoSeleccionado){
mostrarNotificacion("Selecciona un estacionamiento.");
return;
}

const reserva={
id:Date.now(),
estacionamientoId:estacionamientoSeleccionado.id,
nombre:estacionamientoSeleccionado.nombre,
ubicacion:estacionamientoSeleccionado.ubicacion,
zona:nombreZona(estacionamientoSeleccionado.zona),
fecha:fechaReserva.value,
entrada:horaEntrada.value,
salida:horaSalida.value,
total:calculo.total,
estado:"Confirmada",
precioHora:estacionamientoSeleccionado.precio
};

if(!guardarReserva(reserva))return;

modalReserva.hide();
mostrarNotificacion("Reserva guardada correctamente. Consulta Mis reservas.");
}

/* Cambia el tema claro u oscuro. */
function cambiarTema(){
const documento=document.documentElement;
const temaActual=documento.getAttribute("data-bs-theme");
const nuevoTema=temaActual==="dark"?"light":"dark";

documento.setAttribute("data-bs-theme",nuevoTema);
btnTema.setAttribute("aria-pressed",String(nuevoTema==="dark"));
etiquetaTema.textContent=nuevoTema==="dark"?"☀ Tema claro":"☾ Tema oscuro";

try{
localStorage.setItem("autoparkTema",nuevoTema);
}catch(error){
console.warn("No se pudo guardar la preferencia de tema.");
}
}

/* Recupera el tema preferido cuando se carga la página. */
function cargarTema(){
try{
const temaGuardado=localStorage.getItem("autoparkTema");

if(temaGuardado==="dark"){
document.documentElement.setAttribute("data-bs-theme","dark");
btnTema.setAttribute("aria-pressed","true");
etiquetaTema.textContent="☀ Tema claro";
}
}catch(error){
console.warn("Se utilizará el tema predeterminado.");
}
}

/* Limpia los campos y muestra todos los estacionamientos. */
function limpiarFiltros(){
busqueda.value="";
zona.value="todas";
ordenar.value="disponibilidad";
actualizarFiltroActivo("todas");
realizarBusqueda();
}

/* Registra los eventos con funciones con nombre y addEventListener. */
function registrarEventos(){
formBusqueda.addEventListener("submit",realizarBusqueda);

/* keyup ejecuta la búsqueda cuando el usuario suelta una tecla. */
busqueda.addEventListener("keyup",realizarBusqueda);

zona.addEventListener("change",function(){
actualizarFiltroActivo(zona.value);
realizarBusqueda();
});

ordenar.addEventListener("change",ordenarResultados);

/* Delegación: un solo listener atiende todos los botones de zona. */
document.querySelector(".filter-buttons").addEventListener("click",manejarClickFiltros);
resultados.addEventListener("click",manejarClickResultados);

btnLimpiar.addEventListener("click",limpiarFiltros);
btnReiniciar.addEventListener("click",limpiarFiltros);
btnTema.addEventListener("click",cambiarTema);

document.getElementById("btnAbrirReserva").addEventListener("click",abrirFormularioReserva);

formReserva.addEventListener("input",validarCampo);
formReserva.addEventListener("blur",validarCampo,true);
horaEntrada.addEventListener("change",actualizarTotal);
horaSalida.addEventListener("change",actualizarTotal);
formReserva.addEventListener("submit",confirmarReserva);
}

/* Inicializa la aplicación. */
function iniciarAplicacion(){
inicializarComponentes();
inicializarFecha();
cargarTema();
registrarEventos();
realizarBusqueda();
}

document.addEventListener("DOMContentLoaded",iniciarAplicacion);