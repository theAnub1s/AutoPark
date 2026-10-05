const loginForm =
    document.getElementById("loginForm");

const email =
    document.getElementById("email");

const password =
    document.getElementById("password");

const loginMessage =
    document.getElementById("loginMessage");


loginForm.addEventListener("submit", event => {

    event.preventDefault();


    loginMessage.textContent = "";


    if (
        email.value.trim() === "" ||
        password.value.trim() === ""
    ) {

        loginMessage.textContent =
            "Completa todos los campos.";

        loginMessage.style.color =
            "#B42318";

        return;

    }


    /*
        Aquí posteriormente enviaremos
        correo y contraseña al backend.
    */

    loginMessage.textContent =
        "Datos ingresados correctamente.";

    loginMessage.style.color =
        "#475467";

});