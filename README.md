# AutoPark

Aplicación web multipágina para buscar, consultar, reservar, publicar y administrar espacios de estacionamiento.

## Equipo

**Equipo:** Grey Lancer  
**Cuatrimestre y grupo:** 4.º Cuatrimestre – Grupo 1  
**Líder / integración del repositorio:** Fernando Ruiz Díaz

### Integrantes

- Fernando Ruiz Díaz
- Daniela Doñu Bolteada
- Guillermo Ruiz Marquez
- Johan Baru Cernates Gonzalez
- Fernanda Itzel Hernandez Perez
- Aritzel Vera Tena
- Mario Camacho

## Objetivo

Desarrollar una aplicación web responsive que permita a los usuarios localizar estacionamientos disponibles, consultar información relevante, realizar reservas y administrar espacios publicados desde una interfaz clara y consistente.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap 5.3.3
- Bootstrap Icons 1.11.3
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
Entrega de capturas de los HTML funcionando correctamente en modalidad Escritorio
En este apartado se elaboraron y recopilaron las capturas de pantalla correspondientes a las evidencias del funcionamiento de las páginas HTML del proyecto AutoPark en modalidad Escritorio. Estas capturas permiten comprobar que cada una de las interfaces desarrolladas se visualiza y funciona correctamente en una computadora, respetando el diseño establecido y mostrando de manera adecuada los diferentes elementos de la aplicación web.
Empezaremos con la parte de el inicio en donde se encuentra un pequeño apartado de bienvenida 
<img width="1595" height="950" alt="image" src="https://github.com/user-attachments/assets/50094a90-ff2e-43eb-86dd-a2a7b43da6c8" />
En esta segunda captura podemos notar la evidencia para la busca de estacionamientos al igual que los disponibles en la zonas correspondiente.
<img width="1592" height="957" alt="image" src="https://github.com/user-attachments/assets/91568a17-cc3a-454d-95cc-6831c1c1498f" />
<img width="1597" height="952" alt="image" src="https://github.com/user-attachments/assets/7eaa022c-8ca5-46ea-ad34-6b5ba33703da" />
<img width="1591" height="962" alt="image" src="https://github.com/user-attachments/assets/09d86818-9ce5-4ff5-a2e0-8262f288b825" />
<img width="1587" height="957" alt="image" src="https://github.com/user-attachments/assets/fa6df7fb-83e9-44dc-bff5-e6171e164c8b" />
<img width="1592" height="961" alt="image" src="https://github.com/user-attachments/assets/912c0d93-b970-4fce-8881-fd04380215b0" />
<img width="1592" height="958" alt="image" src="https://github.com/user-attachments/assets/b301b048-4b0c-4769-a43e-c7b467e471b7" />
En esta parte se muestra lo del perfil del usario
<img width="1887" height="1050" alt="image" src="https://github.com/user-attachments/assets/bc88117f-895f-47f9-8c18-b442322c02d0" />


Entrega de Capturas de los HTML funcionando de una manera correcta este con las capturas en modalidad movil
En esta parte se entrega las capturas del todo el proyecto de como funciona
<img width="475" height="573" alt="image" src="https://github.com/user-attachments/assets/060af83d-1180-4412-8585-395d05049ba5" />
<img width="471" height="569" alt="image" src="https://github.com/user-attachments/assets/57f0c4c9-57a9-47ca-837a-c81659d8c2a8" />
<img width="470" height="567" alt="image" src="https://github.com/user-attachments/assets/dab0f43a-9994-40a3-b1b5-2be57e0cb40c" />
<img width="470" height="572" alt="image" src="https://github.com/user-attachments/assets/f9007aa2-3a7d-4083-a6fa-b95b03313687" />
<img width="470" height="579" alt="image" src="https://github.com/user-attachments/assets/6b409e7f-409f-4679-961e-913a769b93c7" />
<img width="470" height="566" alt="image" src="https://github.com/user-attachments/assets/410426b8-e67c-43c2-8e74-02bd3bc151d6" />
<img width="478" height="570" alt="image" src="https://github.com/user-attachments/assets/182473b8-d422-4da8-a784-613b4bde1767" />
<img width="472" height="570" alt="image" src="https://github.com/user-attachments/assets/0d712ec5-5dbf-450c-9d8d-964b94f94d1a" />
<img width="480" height="569" alt="image" src="https://github.com/user-attachments/assets/acfccebb-0ca8-4f9d-9372-4897a1a251dd" />
<img width="478" height="573" alt="image" src="https://github.com/user-attachments/assets/b54f46d9-aa74-4639-9f57-251169f33c11" />
<img width="476" height="571" alt="image" src="https://github.com/user-attachments/assets/95524bc4-a0bf-4f3a-b2ce-61fdff5ef28a" />
<img width="478" height="576" alt="image" src="https://github.com/user-attachments/assets/98671956-9f2a-493d-85cd-d53921a14152" />
<img width="473" height="574" alt="image" src="https://github.com/user-attachments/assets/cf344aee-ffce-428a-9e85-e9a133d49f93" />
<img width="475" height="570" alt="image" src="https://github.com/user-attachments/assets/55c59ae8-7531-4bdc-b684-2556c8e0b2f7" />
<img width="495" height="573" alt="image" src="https://github.com/user-attachments/assets/208c63f6-1212-4670-9c14-c452867997a7" />
<img width="496" height="569" alt="image" src="https://github.com/user-attachments/assets/29f4cd82-8e79-44ce-b180-9c611dab5f70" />
<img width="496" height="570" alt="image" src="https://github.com/user-attachments/assets/a445557c-5c34-42aa-b9e1-247122302ef1" />
<img width="497" height="570" alt="image" src="https://github.com/user-attachments/assets/ff77036d-4dad-40ba-8e1d-4503e37d8fc4" />


## Documentación

La documentación final se almacenará en `docs/`:

- `SRS.tex`
- `SRS.pdf`
- `Guia_Diseno.tex`
- `Guia_Diseno.pdf`

El SRS y la Guía de diseño se elaborarán en LaTeX como parte de la entrega documental.
