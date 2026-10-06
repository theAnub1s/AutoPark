# AutoPark

Aplicación web multipágina para buscar, consultar, reservar, publicar y administrar espacios de estacionamiento.

## Equipo

**Equipo:** Grey Lancer  
**Líder / integración del repositorio:** Fernando Ruiz Díaz

> Antes de la entrega final, agregar aquí los nombres completos del resto de integrantes exactamente como aparecen en la lista oficial del equipo.

## Objetivo

Desarrollar una aplicación web responsive que permita a los usuarios localizar estacionamientos disponibles, consultar información relevante, realizar reservas y administrar espacios publicados desde una interfaz clara y consistente.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap 5.3.3
- Git
- GitHub
- GitHub Projects / Kanban
- Figma

## Características principales

- Landing pública.
- Registro e inicio de sesión.
- Dashboard de usuario.
- Búsqueda de estacionamientos.
- Consulta de detalle de un estacionamiento.
- Reserva de espacios.
- Cancelación e historial de reservas.
- Publicación y edición de espacios.
- Gestión de disponibilidad, cantidad y horarios.
- Perfil de usuario.
- Cierre de sesión.
- Páginas públicas de Nosotros, Servicios y Contacto.
- Formulario de contacto con validación HTML5.
- Diseño responsive para escritorio y dispositivos móviles.

## Componentes de Bootstrap utilizados

AutoPark integra Bootstrap 5 de forma real, manteniendo la identidad visual definida para el proyecto.

1. **Navbar + Collapse**: navegación responsive reutilizable.
2. **Cards**: tarjetas de servicios, características y contenido.
3. **Modal**: publicación, edición y gestión de disponibilidad de espacios.
4. **Nav Tabs**: cambio entre reservas activas e historial.
5. **Accordion**: preguntas frecuentes en Servicios.
6. **Toast**: confirmación visual del formulario de contacto.
7. **Badges**: disponibilidad, estados y etiquetas.
8. **Forms**: `form-control`, `form-select`, `form-check` y validación.
9. **Buttons**: botones Bootstrap combinados con la paleta de AutoPark.
10. **Grid**: `container`, `row`, `col-*` y utilidades responsive.

## Estructura del proyecto

```text
AutoPark/
├── index.html
├── nosotros.html
├── servicios.html
├── contacto.html
├── registro.html
├── login.html
├── inicio.html
├── busqueda.html
├── detalle.html
├── reservas.html
├── espacios.html
├── perfil.html
├── README.md
│
├── assets/
│   └── images/
│       └── logo-autopark.png
│
├── components/
│   └── navbar/
│       ├── navbar.html
│       ├── navbar.css
│       └── navbar.js
│
├── css/
│   ├── landing.css
│   ├── publicas.css
│   └── ...
│
├── js/
│   ├── landing.js
│   ├── contacto.js
│   └── ...
│
└── docs/
    ├── SRS.tex
    ├── SRS.pdf
    ├── Guia_Diseno.tex
    └── Guia_Diseno.pdf
```

Los archivos SRS y Guía de diseño se elaboran en LaTeX y se incorporan al directorio `docs/` para la entrega final.

## Flujo principal

```text
Landing
  ↓
Buscar
  ↓
Detalle
  ↓
Iniciar sesión (si es necesario)
  ↓
Reservar
  ↓
Mis reservas
  ↓
Cancelar / Historial
```

Los propietarios también pueden acceder a:

```text
Mis espacios
  ↓
Publicar
  ↓
Editar
  ↓
Gestionar disponibilidad
```

## Sesión durante esta etapa

La autenticación actual es una simulación de frontend mediante `localStorage`.

Las páginas privadas son:

- `inicio.html`
- `reservas.html`
- `espacios.html`
- `perfil.html`

La búsqueda y el detalle pueden consultarse sin iniciar sesión. Las acciones que requieren una cuenta redirigen a `login.html`.

> Esta lógica deberá sustituirse por autenticación real cuando se implemente el backend.

## Cómo visualizar el proyecto

1. Clonar el repositorio.
2. Abrir la carpeta en Visual Studio Code.
3. Ejecutar el proyecto mediante **Live Server** o cualquier servidor HTTP local.
4. Abrir `index.html`.

Ejemplo con Live Server:

```text
http://127.0.0.1:5500/index.html
```

No se recomienda abrir los archivos únicamente con `file://`, porque el navbar reutilizable se carga mediante `fetch()`.

## Metodología de trabajo

El proyecto utiliza una rama principal `main` y ramas por funcionalidad.

Ejemplos:

```text
feature/navbar
feature/registro
feature/login
feature/busqueda
feature/detalleEstacionamiento
feature/reservas
feature/rf08-disponibilidad
feature/landing
feature/bootstrap-integration
```

El flujo de integración utilizado es:

```text
Issue → Rama → Commits → Pull Request → Merge → Terminado
```

## Kanban

El tablero de GitHub Projects debe mantener las columnas:

- Backlog
- Por hacer
- En proceso
- En revisión
- Terminado

## Evidencias para la entrega

Antes de la entrega final se deben incorporar evidencias de:

- Landing en escritorio.
- Landing en teléfono móvil.
- Pantalla interna en escritorio.
- Pantalla interna en teléfono móvil.
- Tablero Kanban.
- Historial de commits.
- Pull Requests realizados.

## Documentación

La documentación final se almacenará en `docs/`:

- `SRS.tex`
- `SRS.pdf`
- `Guia_Diseno.tex`
- `Guia_Diseno.pdf`

El SRS y la Guía de diseño se elaborarán en LaTeX como parte de la entrega documental.
