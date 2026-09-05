/* =========================================
   KisanLink GATE PASS REGISTRATION
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const registrationForm =
    document.getElementById(
        "registrationForm"
    );


const registrationCard =
    document.getElementById(
        "registrationCard"
    );


const verificationCard =
    document.getElementById(
        "verificationCard"
    );


const successCard =
    document.getElementById(
        "successCard"
    );


const fullNameInput =
    document.getElementById(
        "fullName"
    );


const mobileInput =
    document.getElementById(
        "mobile"
    );


const emailInput =
    document.getElementById(
        "email"
    );


const centerNameInput =
    document.getElementById(
        "centerName"
    );


const verificationMobile =
    document.getElementById(
        "verificationMobile"
    );


const verifyOtpBtn =
    document.getElementById(
        "verifyOtpBtn"
    );


const backRegistrationBtn =
    document.getElementById(
        "backRegistrationBtn"
    );


const otpInputs =
    document.querySelectorAll(
        ".otp-input"
    );


/* =========================================
   TEMPORARY REGISTRATION DATA
========================================= */

let registrationData = null;


/* =========================================
   FORM SUBMIT
========================================= */

registrationForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const isValid =
            validateRegistration();


        if (!isValid) {

            return;

        }


        registrationData = {

            name:
                fullNameInput.value.trim(),

            mobile:
                mobileInput.value.trim(),

            email:
                emailInput.value.trim(),

            center:
                centerNameInput.value.trim()

        };


        verificationMobile.textContent =
            "+91 " +
            registrationData.mobile;


        registrationCard.classList.add(
            "hidden"
        );


        verificationCard.classList.remove(
            "hidden"
        );


        otpInputs[0].focus();

    }
);


/* =========================================
   VALIDATE REGISTRATION
========================================= */

function validateRegistration() {

    let isValid = true;


    clearErrors();


    const name =
        fullNameInput.value.trim();


    const mobile =
        mobileInput.value.trim();


    const email =
        emailInput.value.trim();


    const center =
        centerNameInput.value.trim();


    /* NAME */

    if (name.length < 3) {

        showError(
            "nameError",
            "Please enter a valid full name."
        );

        isValid = false;

    }


    /* MOBILE */

    const mobilePattern =
        /^[6-9]\d{9}$/;


    if (
        !mobilePattern.test(mobile)
    ) {

        showError(
            "mobileError",
            "Please enter a valid 10 digit mobile number."
        );

        isValid = false;

    }


    /* EMAIL */

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (
        !emailPattern.test(email)
    ) {

        showError(
            "emailError",
            "Please enter a valid email address."
        );

        isValid = false;

    }


    /* CENTER */

    if (center.length < 3) {

        showError(
            "centerError",
            "Please enter a valid center name."
        );

        isValid = false;

    }


    return isValid;

}


/* =========================================
   SHOW ERROR
========================================= */

function showError(
    elementId,
    message
) {

    const element =
        document.getElementById(
            elementId
        );


    if (element) {

        element.textContent =
            message;

    }

}


/* =========================================
   CLEAR ERRORS
========================================= */

function clearErrors() {

    const errors =
        document.querySelectorAll(
            ".error-message"
        );


    errors.forEach(
        error => {

            error.textContent = "";

        }
    );

}


/* =========================================
   MOBILE INPUT ONLY NUMBERS
========================================= */

mobileInput.addEventListener(
    "input",
    function () {

        this.value =
            this.value.replace(
                /\D/g,
                ""
            );

    }
);


/* =========================================
   OTP INPUT FUNCTIONALITY
========================================= */

otpInputs.forEach(
    (input, index) => {

        input.addEventListener(
            "input",
            function () {

                this.value =
                    this.value.replace(
                        /\D/g,
                        ""
                    );


                if (
                    this.value &&
                    index <
                    otpInputs.length - 1
                ) {

                    otpInputs[
                        index + 1
                    ].focus();

                }

            }
        );


        input.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Backspace" &&
                    !this.value &&
                    index > 0
                ) {

                    otpInputs[
                        index - 1
                    ].focus();

                }

            }
        );


        input.addEventListener(
            "paste",
            function (event) {

                event.preventDefault();


                const pastedData =
                    event.clipboardData
                        .getData("text")
                        .replace(/\D/g, "")
                        .slice(0, 4);


                pastedData
                    .split("")
                    .forEach(
                        (digit, digitIndex) => {

                            if (
                                otpInputs[
                                    digitIndex
                                ]
                            ) {

                                otpInputs[
                                    digitIndex
                                ].value =
                                    digit;

                            }

                        }
                    );


                if (
                    pastedData.length === 4
                ) {

                    otpInputs[3].focus();

                }

            }
        );

    }
);


/* =========================================
   VERIFY OTP
========================================= */

verifyOtpBtn.addEventListener(
    "click",
    function () {

        let otp = "";


        otpInputs.forEach(
            input => {

                otp += input.value;

            }
        );


        const otpError =
            document.getElementById(
                "otpError"
            );


        otpError.textContent = "";


        if (
            otp.length !== 4
        ) {

            otpError.textContent =
                "Please enter the complete 4 digit OTP.";

            return;

        }


        /*
            DEMO OTP
            In real project this should
            come from backend.
        */

        if (otp !== "1234") {

            otpError.textContent =
                "Invalid OTP. Please enter the correct OTP.";

            otpInputs.forEach(
                input => {

                    input.value = "";

                }
            );


            otpInputs[0].focus();

            return;

        }


        createGateOfficer();

    }
);


/* =========================================
   CREATE GATE OFFICER
========================================= */

function createGateOfficer() {

    if (!registrationData) {

        return;

    }


    const gateOfficer = {

        id:
            generateGateOfficerId(),

        name:
            registrationData.name,

        designation:
            "Gate Pass Officer",

        email:
            registrationData.email,

        mobile:
            registrationData.mobile,

        center:
            registrationData.center,

        verified:
            true,

        registeredAt:
            new Date().toISOString()

    };


    /* SAVE DATA */

    localStorage.setItem(
        "gateOfficer",
        JSON.stringify(
            gateOfficer
        )
    );


    /* SHOW SUCCESS */

    verificationCard.classList.add(
        "hidden"
    );


    successCard.classList.remove(
        "hidden"
    );


    /* REDIRECT TO DASHBOARD */

    setTimeout(
        function () {

            window.location.href =
                "gate_pass.html";

        },
        2500
    );

}


/* =========================================
   GENERATE GATE OFFICER ID
========================================= */

function generateGateOfficerId() {

    const randomNumber =
        Math.floor(
            1000 +
            Math.random() * 9000
        );


    return (
        "GATE-" +
        randomNumber
    );

}


/* =========================================
   BACK TO REGISTRATION
========================================= */

backRegistrationBtn.addEventListener(
    "click",
    function () {

        verificationCard.classList.add(
            "hidden"
        );


        registrationCard.classList.remove(
            "hidden"
        );


        otpInputs.forEach(
            input => {

                input.value = "";

            }
        );


        document.getElementById(
            "otpError"
        ).textContent = "";

    }
);


/* =========================================
   ENTER KEY OTP VERIFICATION
========================================= */

otpInputs[
    otpInputs.length - 1
].addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter"
        ) {

            verifyOtpBtn.click();

        }

    }
);