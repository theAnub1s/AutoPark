const registroForm =
    document.getElementById("registroForm");

const password =
    document.getElementById("password");

const confirmPassword =
    document.getElementById("confirmPassword");

const mensaje =
    document.getElementById("registroMensaje");

const accountOptions =
    document.querySelectorAll(".account-option");


/* =========================
   TIPO DE CUENTA
========================= */

accountOptions.forEach(option => {

    option.addEventListener("click", () => {

        accountOptions.forEach(item => {

            item.classList.remove("selected");

        });


        option.classList.add("selected");

    });

});


/* =========================
   REGISTRO
========================= */

registroForm.addEventListener("submit", event => {

    event.preventDefault();


    mensaje.textContent = "";


    /* VALIDAR CONTRASEÑAS */

    if (password.value !== confirmPassword.value) {

        mensaje.textContent =
            "Las contraseñas no coinciden.";

        mensaje.style.color = "#B42318";

        return;

    }


    /* VALIDAR LONGITUD */

    if (password.value.length < 8) {

        mensaje.textContent =
            "La contraseña debe tener mínimo 8 caracteres.";

        mensaje.style.color = "#B42318";

        return;

    }


    /*
        Más adelante aquí conectaremos
        el formulario con el backend.
    */

    mensaje.textContent =
        "Los datos ingresados son válidos.";

    mensaje.style.color = "#475467";

});