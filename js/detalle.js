"use strict";

/* =========================
   ESTACIONAMIENTO
========================= */

// Recupera el estacionamiento seleccionado desde la búsqueda.
function obtenerEstacionamiento(){
    try{
        const guardado=sessionStorage.getItem("estacionamientoSeleccionado");
        if(guardado){
            const datos=JSON.parse(guardado);
            if(datos&&datos.id)return datos;
        }
    }catch(error){
        console.error("Error al recuperar el estacionamiento:",error);
    }
    return {
        id:1,
        nombre:"Estacionamiento Centro",
        ubicacion:"Centro de Pachuca",
        precio:20,
        disponibles:5,
        distancia:0.8
    };
}

const estacionamiento=obtenerEstacionamiento();

const detallesExtra={
    1:{minutos:8,horario:"07:00 – 23:00",tipo:"Exterior",acceso:"Automóvil y motocicleta",entrada:"Entrada sobre Av. principal",descripcion:"Zona iluminada · Acceso amplio",servicios:["Iluminación","Vigilancia","Acceso amplio"]},
    2:{minutos:12,horario:"08:00 – 21:00",tipo:"Exterior",acceso:"Automóvil y motocicleta",entrada:"Entrada por zona universitaria",descripcion:"Acceso rápido · Zona transitada",servicios:["Iluminación","Vigilancia","Acceso amplio"]},
    3:{minutos:10,horario:"07:00 – 22:00",tipo:"Cubierto",acceso:"Automóvil",entrada:"Entrada sobre Av. principal",descripcion:"Zona cubierta · Acceso controlado",servicios:["Área cubierta","Vigilancia","Iluminación"]},
    4:{minutos:15,horario:"08:00 – 20:00",tipo:"Exterior",acceso:"Automóvil y motocicleta",entrada:"Entrada norte",descripcion:"Espacio amplio · Fácil acceso",servicios:["Iluminación","Acceso amplio"]},
    5:{minutos:13,horario:"08:00 – 22:00",tipo:"Cubierto",acceso:"Automóvil",entrada:"Entrada por Plaza Universidad",descripcion:"Zona cubierta · Vigilancia",servicios:["Área cubierta","Vigilancia","Iluminación"]},
    6:{minutos:18,horario:"07:00 – 22:00",tipo:"Exterior",acceso:"Automóvil y motocicleta",entrada:"Acceso Las Torres",descripcion:"Acceso amplio · Área iluminada",servicios:["Iluminación","Acceso amplio"]}
};

const extra=detallesExtra[estacionamiento.id]||detallesExtra[1];

/* =========================
   SELECTORES DEL DOM
========================= */

// getElementById: campos únicos. querySelector: contenedor. querySelectorAll: botones.
const parkingName=document.getElementById("parkingName");
const parkingLocation=document.getElementById("parkingLocation");
const parkingEntrance=document.getElementById("parkingEntrance");
const parkingDescription=document.getElementById("parkingDescription");
const parkingAvailability=document.getElementById("parkingAvailability");
const parkingSchedule=document.getElementById("parkingSchedule");
const parkingType=document.getElementById("parkingType");
const parkingAccess=document.getElementById("parkingAccess");
const parkingPrice=document.getElementById("parkingPrice");
const servicesList=document.getElementById("servicesList");
const serviceDescription=document.getElementById("serviceDescription");
const reservationForm=document.getElementById("reservationForm");
const fecha=document.getElementById("fecha");
const horaEntrada=document.getElementById("horaEntrada");
const horaSalida=document.getElementById("horaSalida");
const totalEstimado=document.getElementById("totalEstimado");
const reservationMessage=document.getElementById("reservationMessage");
const durationOutput=document.getElementById("duracionReserva");
const durationControl=document.querySelector("#durationControl");
const durationButtons=document.querySelectorAll("#durationControl [data-duration-action]");
const reservationCard=document.querySelector(".reservation-card");
const btnFavorite=document.getElementById("btnFavorito");
const btnCopyLocation=document.getElementById("btnCopiarUbicacion");

/* =========================
   NOTIFICACIONES BOOTSTRAP
========================= */

function mostrarToast(mensaje){
    document.getElementById("mensajeToast").textContent=mensaje;
    bootstrap.Toast.getOrCreateInstance(document.getElementById("toastAutoPark"),{delay:3000}).show();
}

/* =========================
   INFORMACIÓN DEL ESTACIONAMIENTO
========================= */

function mostrarInformacion(){
    parkingName.textContent=estacionamiento.nombre;
    parkingLocation.textContent=estacionamiento.ubicacion+" · A "+extra.minutos+" min de tu ubicación";
    parkingEntrance.textContent=extra.entrada;
    parkingDescription.textContent=extra.descripcion;
    parkingAvailability.textContent=estacionamiento.disponibles+" espacios";
    parkingSchedule.textContent=extra.horario;
    parkingType.textContent=extra.tipo;
    parkingAccess.textContent=extra.acceso;
    parkingPrice.textContent="$"+Number(estacionamiento.precio).toFixed(2)+" MXN / hora";
    mostrarServicios();
}
function mostrarServicios(){
    servicesList.replaceChildren();
    extra.servicios.forEach(function crearBotonServicio(servicio){
        const boton=document.createElement("button");
        boton.type="button";
        boton.className="service-item";
        boton.dataset.servicio=servicio;
        boton.textContent=servicio;
        servicesList.appendChild(boton);
    });
}

/* =========================
   DELEGACIÓN DE EVENTOS
========================= */

// Un solo event listener en el padre para todos los botones de servicios.
function seleccionarServicio(evento){
    const boton=evento.target.closest("button[data-servicio]");
    if(!boton||!servicesList.contains(boton))return;
    servicesList.querySelectorAll("button[data-servicio]").forEach(function quitarSeleccion(item){
        item.classList.remove("active");
    });
    boton.classList.add("active");
    serviceDescription.textContent="Servicio disponible: "+boton.dataset.servicio+".";
}

/* =========================
   FECHA Y HORARIO
========================= */

function establecerFecha(){
    const hoy=new Date();
    const anio=hoy.getFullYear();
    const mes=String(hoy.getMonth()+1).padStart(2,"0");
    const dia=String(hoy.getDate()).padStart(2,"0");
    const fechaActual=`${anio}-${mes}-${dia}`;

    fecha.min=fechaActual;

    if(!fecha.value||fecha.value<fechaActual){
        fecha.value=fechaActual;
    }
}

function convertirAMinutos(hora){
    const partes=hora.split(":");
    return Number(partes[0])*60+Number(partes[1]);
}

function calcularTotal(){
    actualizarContadorHoras();
    reservationMessage.textContent="";
    reservationMessage.style.color="#475467";

    if(!horaEntrada.value||!horaSalida.value){
        totalEstimado.textContent="$0 MXN";
        return 0;
    }

    const entrada=convertirAMinutos(horaEntrada.value);
    const salida=convertirAMinutos(horaSalida.value);

    if(salida<=entrada){
        totalEstimado.textContent="$0 MXN";
        reservationMessage.textContent="La hora de salida debe ser posterior a la entrada.";
        reservationMessage.style.color="#B42318";
        return 0;
    }

    // Cada fracción de hora se cobra como una hora completa.
    const horas=Math.ceil((salida-entrada)/60);
    const total=horas*Number(estacionamiento.precio);

    totalEstimado.textContent=`$${total.toFixed(2)} MXN`;
    return total;
}

/* =========================
   COTIZADOR DINÁMICO RF06
========================= */

function formatearHora(minutos){
    return String(Math.floor(minutos/60)).padStart(2,"0")+":"+
           String(minutos%60).padStart(2,"0");
}

function actualizarContadorHoras(){
    const entrada=horaEntrada.value?convertirAMinutos(horaEntrada.value):NaN;
    const salida=horaSalida.value?convertirAMinutos(horaSalida.value):NaN;
    const horas=Number.isFinite(entrada)&&Number.isFinite(salida)&&salida>entrada
        ?Math.ceil((salida-entrada)/60):0;
    const maximo=Number.isFinite(entrada)?Math.floor((1439-entrada)/60):0;
    durationOutput.textContent=horas?horas+(horas===1?" hora":" horas"):"— horas";
    durationButtons.forEach(function sincronizarBoton(boton){
        boton.disabled=boton.dataset.durationAction==="decrease"
            ?horas<=1:maximo<1||horas>=maximo;
    });
}

function manejarClickDuracion(evento){
    const boton=evento.target.closest("button[data-duration-action]");
    if(!boton||!durationControl.contains(boton)||boton.disabled||!horaEntrada.value)return;
    const entrada=convertirAMinutos(horaEntrada.value);
    const salida=horaSalida.value?convertirAMinutos(horaSalida.value):NaN;
    const horasActuales=Number.isFinite(salida)&&salida>entrada
        ?Math.ceil((salida-entrada)/60):0;
    const variacion=boton.dataset.durationAction==="increase"?1:-1;
    const nuevaCantidad=Math.max(1,horasActuales+variacion);
    const nuevaSalida=entrada+nuevaCantidad*60;
    if(nuevaSalida>=1440)return;
    horaSalida.value=formatearHora(nuevaSalida);
    horaSalida.setCustomValidity("");
    calcularTotal();
    validarCampo({target:horaSalida});
}

/* =========================
   VALIDACIÓN
========================= */

function validarCampo(evento){
    const campo=evento.target;

    if(campo===fecha){
        campo.setCustomValidity(fecha.value&&fecha.value>=fecha.min?"":"Selecciona una fecha válida.");
    }

    if(campo===horaSalida){
        const horarioValido=horaEntrada.value&&horaSalida.value&&convertirAMinutos(horaSalida.value)>convertirAMinutos(horaEntrada.value);
        campo.setCustomValidity(horarioValido?"":"La salida debe ser posterior a la entrada.");
    }

    if(campo===horaEntrada){
        campo.setCustomValidity(campo.value?"":"Selecciona la hora de entrada.");
        horaSalida.setCustomValidity("");
    }

    if(campo.checkValidity()){
        campo.classList.add("is-valid");
        campo.classList.remove("is-invalid");
    }else{
        campo.classList.add("is-invalid");
        campo.classList.remove("is-valid");
    }
}

function validarReserva(){
    establecerFecha();

    [fecha,horaEntrada,horaSalida].forEach(function(campo){
        validarCampo({target:campo});
    });

    return reservationForm.checkValidity();
}

/* =========================
   MODAL DE CONFIRMACIÓN
========================= */

function crearModalConfirmacion(){
    let modal=document.getElementById("modalConfirmarReserva");

    if(modal)return modal;

    modal=document.createElement("div");
    modal.id="modalConfirmarReserva";
    modal.className="modal fade";
    modal.tabIndex=-1;
    modal.setAttribute("aria-labelledby","tituloConfirmacion");
    modal.setAttribute("aria-hidden","true");

    modal.innerHTML=`
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title fs-5" id="tituloConfirmacion">Confirmar reserva</h2>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <p id="resumenConfirmacion"></p>
                    <p>¿Deseas guardar esta reserva?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Revisar datos</button>
                    <button type="button" class="btn btn-primary" id="btnConfirmarReserva">Confirmar</button>
                </div>
            </div>
        </div>`;

    document.body.appendChild(modal);
    return modal;
}

let reservaTemporal=null;

function abrirConfirmacion(){
    const modal=crearModalConfirmacion();
    document.getElementById("resumenConfirmacion").textContent=
        estacionamiento.nombre+". Fecha: "+fecha.value+
        ". Horario: "+horaEntrada.value+" a "+horaSalida.value+
        ". Total: $"+reservaTemporal.total.toFixed(2)+" MXN.";
    bootstrap.Modal.getOrCreateInstance(modal).show();
}

function confirmarDesdeModal(){
    if(!reservaTemporal)return;

    const reservas=obtenerReservas();
    reservas.unshift(reservaTemporal);

    if(!guardarReservas(reservas))return;

    reservaTemporal=null;

    const modal=document.getElementById("modalConfirmarReserva");
    bootstrap.Modal.getOrCreateInstance(modal).hide();

    mostrarToast("Reserva guardada correctamente.");

    setTimeout(redirigirAReservas,800);
}

/* =========================
   SESIÓN Y RESERVAS
========================= */

function obtenerReservas(){
    try{
        const datos=JSON.parse(localStorage.getItem("autoparkReservas")||"[]");
        return Array.isArray(datos)?datos:[];
    }catch(error){
        console.error("Error al leer las reservas:",error);
        return [];
    }
}

function guardarReservas(reservas){
    try{
        localStorage.setItem("autoparkReservas",JSON.stringify(reservas));
        return true;
    }catch(error){
        console.error("Error al guardar la reserva:",error);
        mostrarToast("No fue posible guardar la reserva.");
        return false;
    }
}

function enviarFormulario(evento){
    evento.preventDefault();

    reservationForm.classList.add("was-validated");

    if(!validarReserva()){
        reservationMessage.textContent="Revisa los campos marcados antes de continuar.";
        reservationMessage.style.color="#B42318";
        mostrarToast("Revisa la fecha y el horario.");
        return;
    }

    const total=calcularTotal();

    if(total<=0)return;

    const sesionActiva=localStorage.getItem("sesionActiva")==="true";

    if(!sesionActiva){
        sessionStorage.setItem("redirectAfterLogin","detalle.html");
        mostrarToast("Necesitas iniciar sesión para reservar.");

        setTimeout(redirigirALogin,900);

        return;
    }

    // Formato compatible con las pantallas de reservas trabajadas anteriormente.
    reservaTemporal={
        id:Date.now(),
        nombre:estacionamiento.nombre,
        estacionamiento:estacionamiento,
        estacionamientoId:estacionamiento.id,
        ubicacion:estacionamiento.ubicacion,
        zona:estacionamiento.zona||"centro",
        fecha:fecha.value,
        entrada:horaEntrada.value,
        salida:horaSalida.value,
        horaEntrada:horaEntrada.value,
        horaSalida:horaSalida.value,
        precioHora:Number(estacionamiento.precio),
        total:Number(total.toFixed(2)),
        estado:"activa"
    };

    abrirConfirmacion();
}

/* =========================
   INICIO
========================= */

function redirigirAReservas(){window.location.href="reservas.html";}
function redirigirALogin(){window.location.href="login.html";}

function alternarFavorito(){
    const activo=btnFavorite.getAttribute("aria-pressed")==="true";
    btnFavorite.setAttribute("aria-pressed",String(!activo));
    btnFavorite.textContent=activo?"♡ Agregar a favoritos":"♥ Agregado a favoritos";
    mostrarToast(activo?"Se quitó de favoritos.":"Se agregó a favoritos.");
}

async function copiarUbicacion(){
    try{
        await navigator.clipboard.writeText(estacionamiento.ubicacion);
        mostrarToast("Ubicación copiada.");
    }catch(error){
        mostrarToast("Ubicación: "+estacionamiento.ubicacion);
    }
}

function realzarReserva(){reservationCard.classList.add("reservation-highlight");}
function quitarRealce(){reservationCard.classList.remove("reservation-highlight");}

function manejarConfirmacionDelegada(evento){
    if(evento.target.closest("#btnConfirmarReserva"))confirmarDesdeModal();
}

function iniciarAplicacion(){
    mostrarInformacion();
    establecerFecha();
    calcularTotal();
    horaEntrada.addEventListener("input",calcularTotal);
    horaSalida.addEventListener("input",calcularTotal);
    horaEntrada.addEventListener("change",calcularTotal);
    horaSalida.addEventListener("change",calcularTotal);
    [fecha,horaEntrada,horaSalida].forEach(function registrarValidacion(campo){
        campo.addEventListener("blur",validarCampo);
        campo.addEventListener("change",validarCampo);
    });
    reservationForm.addEventListener("submit",enviarFormulario);
    servicesList.addEventListener("click",seleccionarServicio);
    durationControl.addEventListener("click",manejarClickDuracion);
    btnFavorite.addEventListener("click",alternarFavorito);
    btnCopyLocation.addEventListener("click",copiarUbicacion);
    reservationCard.addEventListener("mouseenter",realzarReserva);
    reservationCard.addEventListener("mouseleave",quitarRealce);
    document.addEventListener("click",manejarConfirmacionDelegada);
}

document.addEventListener("DOMContentLoaded",iniciarAplicacion);
