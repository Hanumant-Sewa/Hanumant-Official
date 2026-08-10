// =====================================================
// HANUMANT SEVA - DONATION SYSTEM
// FRONTEND ONLY
// =====================================================


// =====================================================
// PASSWORD SHOW / HIDE
// =====================================================

function togglePassword(inputId, button) {

    const passwordInput = document.getElementById(inputId);

    if (!passwordInput) {
        return;
    }

    const icon = button.querySelector("i");

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        if (icon) {
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
        }

    } else {

        passwordInput.type = "password";

        if (icon) {
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");
        }
    }
}


// =====================================================
// LOGIN
// =====================================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document
            .getElementById("loginEmail")
            .value
            .trim();

        const password = document
            .getElementById("loginPassword")
            .value
            .trim();

        const message =
            document.getElementById("loginMessage");


        // Validation
        if (email === "" || password === "") {

            message.textContent =
                "Please enter email and password.";

            message.style.color = "red";
            message.style.display = "block";

            return;
        }


        // Save login information

        localStorage.setItem(
            "isLoggedIn",
            "true"
        );

        localStorage.setItem(
            "userEmail",
            email
        );


        // Success message

        message.textContent =
            "Sign in successful! Opening payment...";

        message.style.color = "green";
        message.style.display = "block";


        // Open payment page

        setTimeout(function () {

            window.location.href =
                "payment.html";

        }, 700);

    });
}


// =====================================================
// CREATE ACCOUNT
// =====================================================

const signupForm =
    document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document
                .getElementById("signupName")
                .value
                .trim();


        const email =
            document
                .getElementById("signupEmail")
                .value
                .trim();


        const phone =
            document
                .getElementById("signupPhone")
                .value
                .trim();


        const password =
            document
                .getElementById("signupPassword")
                .value;


        const confirmPassword =
            document
                .getElementById("confirmPassword")
                .value;


        const message =
            document.getElementById("signupMessage");


        // =================================================
        // CHECK ALL FIELDS
        // =================================================

        if (
            name === "" ||
            email === "" ||
            phone === "" ||
            password === "" ||
            confirmPassword === ""
        ) {

            message.textContent =
                "Please fill all fields.";

            message.style.color = "red";
            message.style.display = "block";

            return;
        }


        // =================================================
        // PASSWORD CHECK
        // =================================================

        if (password !== confirmPassword) {

            message.textContent =
                "Passwords do not match.";

            message.style.color = "red";
            message.style.display = "block";

            return;
        }


        // =================================================
        // SAVE ACCOUNT INFORMATION
        // =================================================

        localStorage.setItem(
            "userName",
            name
        );

        localStorage.setItem(
            "userEmail",
            email
        );

        localStorage.setItem(
            "userPhone",
            phone
        );

        localStorage.setItem(
            "isLoggedIn",
            "true"
        );


        // =================================================
        // SUCCESS MESSAGE
        // =================================================

        message.textContent =
            "Account created successfully! Opening payment...";

        message.style.color = "green";
        message.style.display = "block";


        // =================================================
        // OPEN PAYMENT PAGE
        // =================================================

        setTimeout(function () {

            window.location.href =
                "payment.html";

        }, 700);

    });
}


// =====================================================
// FORGOT PASSWORD
// =====================================================

const forgotForm =
    document.getElementById("forgotForm");

if (forgotForm) {

    forgotForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const email =
            document
                .getElementById("forgotEmail")
                .value
                .trim();


        const message =
            document.getElementById("forgotMessage");


        // =================================================
        // VALIDATION
        // =================================================

        if (email === "") {

            message.textContent =
                "Please enter your email address.";

            message.style.color = "red";
            message.style.display = "block";

            return;
        }


        // =================================================
        // SAVE EMAIL
        // =================================================

        localStorage.setItem(
            "userEmail",
            email
        );

        localStorage.setItem(
            "isLoggedIn",
            "true"
        );


        // =================================================
        // SUCCESS MESSAGE
        // =================================================

        message.textContent =
            "Email accepted! Opening payment...";

        message.style.color = "green";
        message.style.display = "block";


        // =================================================
        // OPEN PAYMENT
        // =================================================

        setTimeout(function () {

            window.location.href =
                "payment.html";

        }, 700);

    });
}


// =====================================================
// QUICK DONATION AMOUNT
// =====================================================

function setAmount(amount) {

    const amountInput =
        document.getElementById("donationAmount");

    if (!amountInput) {
        return;
    }

    amountInput.value = amount;
}


// =====================================================
// PAYMENT METHOD DETAILS
// =====================================================

const paymentOptions =
    document.querySelectorAll(
        'input[name="paymentMethod"]'
    );


const paymentDetails =
    document.getElementById(
        "paymentDetails"
    );


// =====================================================
// DISPLAY PAYMENT FIELDS
// =====================================================

if (
    paymentOptions.length > 0 &&
    paymentDetails
) {

    paymentOptions.forEach(function (option) {

        option.addEventListener(
            "change",
            function () {

                const method =
                    this.value;


                // =================================================
                // UPI
                // =================================================

                if (method === "UPI") {

                    paymentDetails.innerHTML = `

                        <div class="input-group">

                            <label>UPI ID</label>

                            <div class="input-box">

                                <i class="fa-solid fa-mobile-screen-button"></i>

                                <input
                                    type="text"
                                    id="upiId"
                                    placeholder="example@upi"
                                    autocomplete="off"
                                >

                            </div>

                        </div>

                    `;
                }


                // =================================================
                // DEBIT / CREDIT CARD
                // =================================================

                else if (method === "Card") {

                    paymentDetails.innerHTML = `

                        <div class="input-group">

                            <label>Card Number</label>

                            <div class="input-box">

                                <i class="fa-solid fa-credit-card"></i>

                                <input
                                    type="text"
                                    id="cardNumber"
                                    placeholder="1234 5678 9012 3456"
                                    maxlength="19"
                                    inputmode="numeric"
                                    autocomplete="off"
                                >

                            </div>

                        </div>


                        <div class="input-group">

                            <label>Card Holder Name</label>

                            <div class="input-box">

                                <i class="fa-solid fa-user"></i>

                                <input
                                    type="text"
                                    id="cardHolder"
                                    placeholder="Enter card holder name"
                                    autocomplete="off"
                                >

                            </div>

                        </div>


                        <div class="card-row">

                            <div class="input-group">

                                <label>Expiry Date</label>

                                <div class="input-box">

                                    <i class="fa-solid fa-calendar"></i>

                                    <input
                                        type="text"
                                        id="expiryDate"
                                        placeholder="MM/YY"
                                        maxlength="5"
                                        inputmode="numeric"
                                        autocomplete="off"
                                    >

                                </div>

                            </div>


                            <div class="input-group">

                                <label>CVV</label>

                                <div class="input-box">

                                    <i class="fa-solid fa-lock"></i>

                                    <input
                                        type="password"
                                        id="cvv"
                                        placeholder="CVV"
                                        maxlength="3"
                                        inputmode="numeric"
                                        autocomplete="off"
                                    >

                                </div>

                            </div>

                        </div>

                    `;
                }


                // =================================================
                // NET BANKING
                // =================================================

                else if (
                    method === "Net Banking"
                ) {

                    paymentDetails.innerHTML = `

                        <div class="input-group">

                            <label>Select Bank</label>

                            <div class="input-box">

                                <i class="fa-solid fa-building-columns"></i>

                                <select id="bankName">

                                    <option value="">
                                        Select your bank
                                    </option>

                                    <option value="SBI">
                                        State Bank of India
                                    </option>

                                    <option value="HDFC">
                                        HDFC Bank
                                    </option>

                                    <option value="ICICI">
                                        ICICI Bank
                                    </option>

                                    <option value="Axis">
                                        Axis Bank
                                    </option>

                                    <option value="Kotak">
                                        Kotak Mahindra Bank
                                    </option>

                                    <option value="Other">
                                        Other Bank
                                    </option>

                                </select>

                            </div>

                        </div>


                        <div class="input-group">

                            <label>Account Holder Name</label>

                            <div class="input-box">

                                <i class="fa-solid fa-user"></i>

                                <input
                                    type="text"
                                    id="accountHolder"
                                    placeholder="Enter account holder name"
                                    autocomplete="off"
                                >

                            </div>

                        </div>

                    `;
                }

            }
        );

    });


    // =================================================
    // SHOW UPI BY DEFAULT
    // =================================================

    const defaultUPI =
        document.querySelector(
            'input[name="paymentMethod"][value="UPI"]:checked'
        );


    if (defaultUPI) {

        defaultUPI.dispatchEvent(
            new Event("change")
        );
    }
}


// =====================================================
// PROCESS DONATION
// =====================================================

function processDonation() {

    const amountInput =
        document.getElementById(
            "donationAmount"
        );


    const message =
        document.getElementById(
            "paymentMessage"
        );


    // =================================================
    // CHECK AMOUNT FIELD
    // =================================================

    if (!amountInput) {

        return;
    }


    const amount =
        amountInput.value.trim();


    // =================================================
    // AMOUNT VALIDATION
    // =================================================

    if (
        amount === "" ||
        Number(amount) <= 0
    ) {

        message.textContent =
            "Please enter a valid donation amount.";

        message.style.color = "red";
        message.style.display = "block";

        return;
    }


    // =================================================
    // GET SELECTED PAYMENT METHOD
    // =================================================

    const selectedPayment =
        document.querySelector(
            'input[name="paymentMethod"]:checked'
        );


    if (!selectedPayment) {

        message.textContent =
            "Please select a payment method.";

        message.style.color = "red";
        message.style.display = "block";

        return;
    }


    const method =
        selectedPayment.value;


    // =================================================
    // UPI VALIDATION
    // =================================================

    if (method === "UPI") {

        const upiInput =
            document.getElementById("upiId");


        if (!upiInput) {

            message.textContent =
                "Please enter your UPI ID.";

            message.style.color = "red";
            message.style.display = "block";

            return;
        }


        const upiId =
            upiInput.value.trim();


        if (upiId === "") {

            message.textContent =
                "Please enter your UPI ID.";

            message.style.color = "red";
            message.style.display = "block";

            upiInput.focus();

            return;
        }


        // Basic UPI format validation

        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/.test(upiId)) {

            message.textContent =
                "Please enter a valid UPI ID. Example: name@upi";

            message.style.color = "red";
            message.style.display = "block";

            upiInput.focus();

            return;
        }
    }


    // =================================================
    // CARD VALIDATION
    // =================================================

    if (method === "Card") {

        const cardNumber =
            document
                .getElementById("cardNumber")
                .value
                .trim();


        const cardHolder =
            document
                .getElementById("cardHolder")
                .value
                .trim();


        const expiryDate =
            document
                .getElementById("expiryDate")
                .value
                .trim();


        const cvv =
            document
                .getElementById("cvv")
                .value
                .trim();


        // Card number

        if (cardNumber === "") {

            message.textContent =
                "Please enter your card number.";

            message.style.color = "red";
            message.style.display = "block";

            document
                .getElementById("cardNumber")
                .focus();

            return;
        }


        // Remove spaces

        const cleanCardNumber =
            cardNumber.replace(/\s/g, "");


        if (
            !/^\d{16}$/.test(
                cleanCardNumber
            )
        ) {

            message.textContent =
                "Please enter a valid 16-digit card number.";

            message.style.color = "red";
            message.style.display = "block";

            document
                .getElementById("cardNumber")
                .focus();

            return;
        }


        // Card holder

        if (cardHolder === "") {

            message.textContent =
                "Please enter card holder name.";

            message.style.color = "red";
            message.style.display = "block";

            document
                .getElementById("cardHolder")
                .focus();

            return;
        }


        // Expiry

        if (
            !/^\d{2}\/\d{2}$/.test(
                expiryDate
            )
        ) {

            message.textContent =
                "Please enter expiry date in MM/YY format.";

            message.style.color = "red";
            message.style.display = "block";

            document
                .getElementById("expiryDate")
                .focus();

            return;
        }


        // CVV

        if (
            !/^\d{3}$/.test(cvv)
        ) {

            message.textContent =
                "Please enter a valid 3-digit CVV.";

            message.style.color = "red";
            message.style.display = "block";

            document
                .getElementById("cvv")
                .focus();

            return;
        }
    }


    // =================================================
    // NET BANKING VALIDATION
    // =================================================

    if (method === "Net Banking") {

        const bankName =
            document
                .getElementById("bankName")
                .value;


        const accountHolder =
            document
                .getElementById("accountHolder")
                .value
                .trim();


        // Bank validation

        if (bankName === "") {

            message.textContent =
                "Please select your bank.";

            message.style.color = "red";
            message.style.display = "block";

            document
                .getElementById("bankName")
                .focus();

            return;
        }


        // Account holder validation

        if (accountHolder === "") {

            message.textContent =
                "Please enter account holder name.";

            message.style.color = "red";
            message.style.display = "block";

            document
                .getElementById("accountHolder")
                .focus();

            return;
        }
    }


    // =================================================
    // SAVE DONATION AMOUNT
    // =================================================

    localStorage.setItem(
        "donationAmount",
        amount
    );


    // =================================================
    // SAVE PAYMENT METHOD
    // =================================================

    localStorage.setItem(
        "paymentMethod",
        method
    );


    // =================================================
    // GENERATE TRANSACTION ID
    // =================================================

    const transactionId =
        "HNS" +
        Date.now()
            .toString()
            .slice(-8);


    localStorage.setItem(
        "transactionId",
        transactionId
    );


    // =================================================
    // SUCCESS MESSAGE
    // =================================================

    message.textContent =
        "Payment processed successfully! Opening confirmation...";

    message.style.color = "green";
    message.style.display = "block";


    // =================================================
    // OPEN SUCCESS PAGE
    // =================================================

    setTimeout(function () {

        window.location.href =
            "success.html";

    }, 1000);
}


// =====================================================
// SUCCESS PAGE
// =====================================================

const successAmount =
    document.getElementById(
        "successAmount"
    );


const successMethod =
    document.getElementById(
        "successMethod"
    );


const transactionIdElement =
    document.getElementById(
        "transactionId"
    );


if (
    successAmount ||
    successMethod ||
    transactionIdElement
) {

    // =================================================
    // GET SAVED DONATION AMOUNT
    // =================================================

    const amount =
        localStorage.getItem(
            "donationAmount"
        );


    // =================================================
    // GET SAVED PAYMENT METHOD
    // =================================================

    const method =
        localStorage.getItem(
            "paymentMethod"
        );


    // =================================================
    // GET SAVED TRANSACTION ID
    // =================================================

    const savedTransactionId =
        localStorage.getItem(
            "transactionId"
        );


    // =================================================
    // DISPLAY AMOUNT
    // =================================================

    if (
        successAmount &&
        amount
    ) {

        successAmount.textContent =
            "₹" + amount;
    }


    // =================================================
    // DISPLAY PAYMENT METHOD
    // =================================================

    if (
        successMethod &&
        method
    ) {

        successMethod.textContent =
            method;
    }


    // =================================================
    // DISPLAY TRANSACTION ID
    // =================================================

    if (transactionIdElement) {

        if (savedTransactionId) {

            transactionIdElement.textContent =
                savedTransactionId;

        } else {

            transactionIdElement.textContent =
                "HNS" +
                Date.now()
                    .toString()
                    .slice(-8);
        }
    }
}