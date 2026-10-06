const contactForm =
    document.getElementById("contactForm");

const contactToast =
    document.getElementById("contactToast");

contactForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();
        event.stopPropagation();

        if (!contactForm.checkValidity()) {
            contactForm.classList.add(
                "was-validated"
            );
            return;
        }

        /*
        ==========================================
        IMPORTANTE - BACKEND
        ==========================================
        El envío es temporal. Cuando exista backend,
        los datos deberán enviarse mediante una API.
        ==========================================
        */

        contactForm.classList.add(
            "was-validated"
        );

        const toast =
            bootstrap.Toast.getOrCreateInstance(
                contactToast
            );

        toast.show();

        contactForm.reset();
        contactForm.classList.remove(
            "was-validated"
        );

    }
);
