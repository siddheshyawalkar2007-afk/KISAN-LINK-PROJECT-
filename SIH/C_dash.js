/* =========================================
   GOVERNMENT CENTER DATA
========================================= */

let governmentCenter = JSON.parse(
    localStorage.getItem("governmentCenter")
) || {

    id: "GOV-00001",

    name: "Pimpri Government Grain Collection Center",

    officer: "Government Officer",

    email: "government@KisanLink.com",

    mobile: "9876543210",

    address: "Pimpri",

    district: "Pune",

    state: "Maharashtra",

    pincode: "411018"

};


/* =========================================
   FARMER DATA
========================================= */

let farmers = JSON.parse(
    localStorage.getItem("governmentFarmers")
) || [

    {
        id: "F001",
        name: "Rajesh Patil",
        mobile: "9876500011",
        age: 45,
        crop: "Wheat",
        quantity: "500 kg",

        bookingDate: "30 August 2026",
        bookingTime: "10:30 AM",

        accountHolder: "Rajesh Patil",
        accountNumber: "123456789012",
        bankName: "State Bank of India",
        branchName: "Pimpri Branch",
        ifscCode: "SBIN0001234",
        accountType: "Savings Account",

        status: "Pending",

        paymentAmount: 0
    },

    {
        id: "F002",
        name: "Mahesh Jadhav",
        mobile: "9876500022",
        age: 38,
        crop: "Rice",
        quantity: "750 kg",

        bookingDate: "30 August 2026",
        bookingTime: "02:15 PM",

        accountHolder: "Mahesh Jadhav",
        accountNumber: "987654321098",
        bankName: "Bank of Maharashtra",
        branchName: "Pimpri Branch",
        ifscCode: "MAHB0001234",
        accountType: "Savings Account",

        status: "Arrived",

        paymentAmount: 0
    },

    {
        id: "F003",
        name: "Sunil Shinde",
        mobile: "9876500033",
        age: 50,
        crop: "Soybean",
        quantity: "350 kg",

        bookingDate: "31 August 2026",
        bookingTime: "09:45 AM",

        accountHolder: "Sunil Shinde",
        accountNumber: "456789123456",
        bankName: "HDFC Bank",
        branchName: "Pune Branch",
        ifscCode: "HDFC0001234",
        accountType: "Savings Account",

        status: "Pending",

        paymentAmount: 0
    },

    {
        id: "F004",
        name: "Vijay Pawar",
        mobile: "9876500044",
        age: 42,
        crop: "Maize",
        quantity: "620 kg",

        bookingDate: "31 August 2026",
        bookingTime: "04:20 PM",

        accountHolder: "Vijay Pawar",
        accountNumber: "789456123012",
        bankName: "Punjab National Bank",
        branchName: "Pimpri Branch",
        ifscCode: "PUNB0001234",
        accountType: "Savings Account",

        status: "Arrived",

        paymentAmount: 0
    }

];


/* =========================================
   PAYMENTS
========================================= */

let payments = JSON.parse(
    localStorage.getItem("governmentPayments")
) || [];


/* =========================================
   NOTIFICATIONS
========================================= */

let notifications = JSON.parse(
    localStorage.getItem("governmentNotifications")
) || [];


/* =========================================
   CURRENT FARMER
========================================= */

let selectedFarmer = null;


/* =========================================
   SAVE DATA
========================================= */

function saveData() {

    localStorage.setItem(
        "governmentFarmers",
        JSON.stringify(farmers)
    );

    localStorage.setItem(
        "governmentPayments",
        JSON.stringify(payments)
    );

    localStorage.setItem(
        "governmentNotifications",
        JSON.stringify(notifications)
    );

    localStorage.setItem(
        "governmentCenter",
        JSON.stringify(governmentCenter)
    );

}


/* =========================================
   DATE TIME FUNCTION
========================================= */

function getCurrentDateTime() {

    const now = new Date();

    const date = now.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

    const time = now.toLocaleTimeString(
        "en-IN",
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );

    return {
        date: date,
        time: time
    };

}


/* =========================================
   INITIALIZE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeProfile();

        initializeNavigation();

        initializeButtons();

        initializeMobile();

        renderFarmers(farmers);

        renderArrivedFarmers();

        renderCompletedFarmers();

        renderPayments();

        renderNotifications();

        updateDashboard();

        updateRecentActivity();

        setCurrentDate();

    }
);


/* =========================================
   CURRENT DATE
========================================= */

function setCurrentDate() {

    const date = new Date();

    const options = {
        day: "numeric",
        month: "short",
        year: "numeric"
    };

    const element =
        document.getElementById("currentDate");

    if (element) {

        element.textContent =
            date.toLocaleDateString(
                "en-IN",
                options
            );

    }

}


/* =========================================
   PROFILE
========================================= */

function initializeProfile() {

    const initials = "GC";

    document.getElementById(
        "sidebarAvatar"
    ).textContent = initials;

    document.getElementById(
        "topAvatar"
    ).textContent = initials;

    document.getElementById(
        "profileAvatar"
    ).textContent = initials;

    document.getElementById(
        "sidebarName"
    ).textContent = governmentCenter.name;

    document.getElementById(
        "topName"
    ).textContent = governmentCenter.name;

    document.getElementById(
        "profileName"
    ).textContent = governmentCenter.name;

    document.getElementById(
        "centerId"
    ).textContent = governmentCenter.id;

    document.getElementById(
        "infoName"
    ).textContent = governmentCenter.name;

    document.getElementById(
        "infoOfficer"
    ).textContent = governmentCenter.officer;

    document.getElementById(
        "infoEmail"
    ).textContent = governmentCenter.email;

    document.getElementById(
        "infoMobile"
    ).textContent = governmentCenter.mobile;

    document.getElementById(
        "infoAddress"
    ).textContent = governmentCenter.address;

    document.getElementById(
        "infoDistrict"
    ).textContent = governmentCenter.district;

    document.getElementById(
        "infoState"
    ).textContent = governmentCenter.state;

    document.getElementById(
        "infoPincode"
    ).textContent = governmentCenter.pincode;

}


/* =========================================
   NAVIGATION
========================================= */

function initializeNavigation() {

    document
        .querySelectorAll(".menu-item[data-section]")
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    function () {

                        showSection(
                            this.dataset.section
                        );

                        closeSidebar();

                    }
                );

            }
        );


    document
        .querySelectorAll("[data-go]")
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    function () {

                        showSection(
                            this.dataset.go
                        );

                    }
                );

            }
        );


    document.getElementById(
        "totalBookingsCard"
    ).addEventListener(
        "click",
        function () {

            showSection("farmers");

        }
    );


    document.getElementById(
        "farmersArrivedCard"
    ).addEventListener(
        "click",
        function () {

            showSection("arrivedFarmers");

        }
    );


    document.getElementById(
        "paymentsCompletedCard"
    ).addEventListener(
        "click",
        function () {

            showSection("completedFarmers");

        }
    );


    document.getElementById(
        "topProfileButton"
    ).addEventListener(
        "click",
        function () {

            showSection("profile");

        }
    );


    document.getElementById(
        "notificationButton"
    ).addEventListener(
        "click",
        function () {

            showSection("notifications");

        }
    );

}


/* =========================================
   SHOW SECTION
========================================= */

function showSection(sectionId) {

    document
        .querySelectorAll(".content-section")
        .forEach(
            section => {
                section.classList.remove("active");
            }
        );


    const selectedSection =
        document.getElementById(sectionId);


    if (selectedSection) {

        selectedSection.classList.add("active");

    }


    document
        .querySelectorAll(".menu-item[data-section]")
        .forEach(
            item => {

                item.classList.remove("active");

                if (
                    item.dataset.section === sectionId
                ) {

                    item.classList.add("active");

                }

            }
        );


    if (sectionId === "arrivedFarmers") {
        renderArrivedFarmers();
    }

    if (sectionId === "completedFarmers") {
        renderCompletedFarmers();
    }

    if (sectionId === "payment") {
        renderPayments();
    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   DASHBOARD
========================================= */

function updateDashboard() {

    const totalBookings = farmers.length;

    const arrived =
        farmers.filter(
            farmer =>
                farmer.status === "Arrived"
        ).length;

    const completed =
        farmers.filter(
            farmer =>
                farmer.status === "Completed"
        ).length;


    document.getElementById(
        "bookingCount"
    ).textContent = totalBookings;


    document.getElementById(
        "arrivedCount"
    ).textContent = arrived;


    document.getElementById(
        "completedCount"
    ).textContent = completed;


    document.getElementById(
        "farmerBadge"
    ).textContent = totalBookings;


    document.getElementById(
        "bookingPageCount"
    ).textContent = totalBookings;


    document.getElementById(
        "notificationBadge"
    ).textContent = notifications.length;


    document.getElementById(
        "topNotificationBadge"
    ).textContent = notifications.length;

}


/* =========================================
   RENDER FARMERS
========================================= */

function renderFarmers(farmerList) {

    const container =
        document.getElementById(
            "farmerBookingContainer"
        );

    container.innerHTML = "";


    if (farmerList.length === 0) {

        container.innerHTML = `
            <div class="empty-state">

                <i class="fa-solid fa-users-slash"></i>

                <h3>No Farmers Found</h3>

                <p>
                    No farmer matches your search.
                </p>

            </div>
        `;

        return;

    }


    farmerList.forEach(
        farmer => {

            const card =
                document.createElement("div");

            card.className =
                "farmer-booking-card";


            let actionButton = "";

            if (farmer.status === "Pending") {

                actionButton = `
                    <button
                        class="arrive-btn"
                        data-arrive-id="${farmer.id}">

                        <i class="fa-solid fa-check"></i>

                        Mark Arrived

                    </button>
                `;

            }


            card.innerHTML = `

                <div class="farmer-icon">

                    <i class="fa-solid fa-user"></i>

                </div>


                <div class="farmer-info">

                    <button
                        class="farmer-name-btn"
                        data-farmer-id="${farmer.id}">

                        ${farmer.name}

                    </button>


                    <p>

                        <strong>Crop:</strong>
                        ${farmer.crop}

                        &nbsp; | &nbsp;

                        <strong>Quantity:</strong>
                        ${farmer.quantity}

                    </p>


                    <small>

                        <i class="fa-solid fa-phone"></i>

                        ${farmer.mobile}

                        &nbsp;&nbsp;

                        <i class="fa-solid fa-calendar"></i>

                        Booking: ${farmer.bookingDate}

                        &nbsp;&nbsp;

                        <i class="fa-solid fa-clock"></i>

                        ${farmer.bookingTime}

                    </small>

                </div>


                <span class="status ${farmer.status.toLowerCase()}">

                    ${farmer.status}

                </span>


                ${actionButton}

            `;

            container.appendChild(card);

        }
    );


    attachFarmerDetailEvents();

    attachArrivalEvents();

}


/* =========================================
   FARMER DETAIL EVENTS
========================================= */

function attachFarmerDetailEvents() {

    document
        .querySelectorAll("[data-farmer-id]")
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    function () {

                        openFarmerDetails(
                            this.dataset.farmerId
                        );

                    }
                );

            }
        );

}


/* =========================================
   ARRIVAL EVENTS
========================================= */

function attachArrivalEvents() {

    document
        .querySelectorAll("[data-arrive-id]")
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    function () {

                        markFarmerArrived(
                            this.dataset.arriveId
                        );

                    }
                );

            }
        );

}


/* =========================================
   MARK FARMER ARRIVED
========================================= */

function markFarmerArrived(farmerId) {

    const farmer =
        farmers.find(
            item =>
                item.id === farmerId
        );

    if (!farmer) return;


    const dateTime =
        getCurrentDateTime();


    farmer.status = "Arrived";

    farmer.arrivalDate =
        dateTime.date;

    farmer.arrivalTime =
        dateTime.time;


    notifications.unshift({

        title: "Farmer Arrived",

        message:
            `${farmer.name} has arrived at the government collection center.`,

        time:
            `${dateTime.date}, ${dateTime.time}`

    });


    saveData();

    renderFarmers(farmers);

    renderArrivedFarmers();

    updateDashboard();

    renderNotifications();

    updateRecentActivity();

}


/* =========================================
   RENDER ARRIVED FARMERS
========================================= */

function renderArrivedFarmers() {

    const container =
        document.getElementById(
            "arrivedFarmerContainer"
        );


    const arrivedFarmers =
        farmers.filter(
            farmer =>
                farmer.status === "Arrived"
        );


    container.innerHTML = "";


    if (arrivedFarmers.length === 0) {

        container.innerHTML = `
            <div class="empty-state">

                <i class="fa-solid fa-user-clock"></i>

                <h3>No Farmers Arrived Yet</h3>

                <p>
                    Farmers marked as arrived will appear here.
                </p>

            </div>
        `;

        return;

    }


    arrivedFarmers.forEach(
        farmer => {

            const card =
                document.createElement("div");

            card.className =
                "farmer-booking-card";


            card.innerHTML = `

                <div class="farmer-icon">

                    <i class="fa-solid fa-user-check"></i>

                </div>


                <div class="farmer-info">

                    <button
                        class="farmer-name-btn"
                        data-farmer-id="${farmer.id}">

                        ${farmer.name}

                    </button>


                    <p>

                        <strong>Mobile:</strong>
                        ${farmer.mobile}

                        &nbsp; | &nbsp;

                        <strong>Crop:</strong>
                        ${farmer.crop}

                    </p>


                    <small>

                        <i class="fa-solid fa-calendar"></i>

                        Arrived: ${farmer.arrivalDate || "Previously Marked"}

                        &nbsp;&nbsp;

                        <i class="fa-solid fa-clock"></i>

                        ${farmer.arrivalTime || ""}

                    </small>

                </div>


                <span class="status arrived">

                    <i class="fa-solid fa-circle-check"></i>

                    Arrived

                </span>

            `;


            container.appendChild(card);

        }
    );


    attachFarmerDetailEvents();

}


/* =========================================
   COMPLETED FARMERS
========================================= */

function renderCompletedFarmers() {

    const container =
        document.getElementById(
            "completedFarmerContainer"
        );


    const completedFarmers =
        farmers.filter(
            farmer =>
                farmer.status === "Completed"
        );


    container.innerHTML = "";


    if (completedFarmers.length === 0) {

        container.innerHTML = `
            <div class="empty-state">

                <i class="fa-solid fa-money-bill-transfer"></i>

                <h3>No Completed Payments</h3>

                <p>
                    Completed farmer payments will appear here.
                </p>

            </div>
        `;

        return;

    }


    completedFarmers.forEach(
        farmer => {

            const card =
                document.createElement("div");

            card.className =
                "completed-farmer-card";


            card.innerHTML = `

                <div class="farmer-icon">

                    <i class="fa-solid fa-circle-check"></i>

                </div>


                <div class="completed-info">

                    <h3>${farmer.name}</h3>

                    <p>
                        ${farmer.crop} | ${farmer.quantity}
                    </p>

                    <p>
                        Payment successfully processed
                    </p>

                </div>


                <div class="completed-amount">

                    ₹${Number(
                        farmer.paymentAmount
                    ).toLocaleString("en-IN")}

                </div>

            `;

            container.appendChild(card);

        }
    );

}


/* =========================================
   SEARCH FARMERS
========================================= */

document.addEventListener(
    "input",
    function (event) {

        if (
            event.target.id === "farmerSearch"
        ) {

            const value =
                event.target.value.toLowerCase();


            const filtered =
                farmers.filter(
                    farmer =>
                        farmer.name
                            .toLowerCase()
                            .includes(value)
                        ||
                        farmer.mobile
                            .includes(value)
                );


            renderFarmers(filtered);

        }


        if (
            event.target.id === "arrivedFarmerSearch"
        ) {

            const value =
                event.target.value.toLowerCase();


            const filtered =
                farmers.filter(
                    farmer =>
                        farmer.status === "Arrived"
                        &&
                        (
                            farmer.name
                                .toLowerCase()
                                .includes(value)
                            ||
                            farmer.mobile
                                .includes(value)
                        )
                );


            renderArrivedFarmerSearch(filtered);

        }

    }
);


/* =========================================
   ARRIVED FARMER SEARCH
========================================= */

function renderArrivedFarmerSearch(list) {

    const container =
        document.getElementById(
            "arrivedFarmerContainer"
        );

    container.innerHTML = "";


    if (list.length === 0) {

        container.innerHTML = `
            <div class="empty-state">

                <i class="fa-solid fa-magnifying-glass"></i>

                <h3>No Farmer Found</h3>

                <p>
                    Try another farmer name.
                </p>

            </div>
        `;

        return;

    }


    list.forEach(
        farmer => {

            const card =
                document.createElement("div");

            card.className =
                "farmer-booking-card";


            card.innerHTML = `

                <div class="farmer-icon">

                    <i class="fa-solid fa-user-check"></i>

                </div>


                <div class="farmer-info">

                    <button
                        class="farmer-name-btn"
                        data-farmer-id="${farmer.id}">

                        ${farmer.name}

                    </button>


                    <p>

                        <strong>Mobile:</strong>

                        ${farmer.mobile}

                        &nbsp; | &nbsp;

                        ${farmer.crop}

                    </p>


                    <small>

                        <i class="fa-solid fa-clock"></i>

                        ${farmer.arrivalDate || ""}

                        ${farmer.arrivalTime || ""}

                    </small>

                </div>


                <span class="status arrived">
                    Arrived
                </span>

            `;

            container.appendChild(card);

        }
    );


    attachFarmerDetailEvents();

}


/* =========================================
   FARMER DETAILS
========================================= */

function openFarmerDetails(farmerId) {

    selectedFarmer =
        farmers.find(
            farmer =>
                farmer.id === farmerId
        );

    if (!selectedFarmer) return;


    const container =
        document.getElementById(
            "farmerDetailsContainer"
        );


    container.innerHTML = `

        <div class="details-card">

            <h3>
                <i class="fa-solid fa-user"></i>
                Farmer Information
            </h3>


            <div class="detail-grid">

                <div class="detail-box">
                    <label>Farmer ID</label>
                    <strong>${selectedFarmer.id}</strong>
                </div>

                <div class="detail-box">
                    <label>Farmer Name</label>
                    <strong>${selectedFarmer.name}</strong>
                </div>

                <div class="detail-box">
                    <label>Mobile Number</label>
                    <strong>${selectedFarmer.mobile}</strong>
                </div>

                <div class="detail-box">
                    <label>Age</label>
                    <strong>${selectedFarmer.age} Years</strong>
                </div>

                <div class="detail-box">
                    <label>Grain Type</label>
                    <strong>${selectedFarmer.crop}</strong>
                </div>

                <div class="detail-box">
                    <label>Grain Quantity</label>
                    <strong>${selectedFarmer.quantity}</strong>
                </div>

                <div class="detail-box">
                    <label>Booking Date</label>
                    <strong>${selectedFarmer.bookingDate}</strong>
                </div>

                <div class="detail-box">
                    <label>Booking Time</label>
                    <strong>${selectedFarmer.bookingTime}</strong>
                </div>

                <div class="detail-box">
                    <label>Current Status</label>
                    <strong>${selectedFarmer.status}</strong>
                </div>

            </div>


            <div class="details-divider"></div>


            <h3>
                <i class="fa-solid fa-building-columns"></i>
                Bank Details
            </h3>


            <div class="detail-grid">

                <div class="detail-box">
                    <label>Account Holder</label>
                    <strong>${selectedFarmer.accountHolder}</strong>
                </div>

                <div class="detail-box">
                    <label>Account Number</label>
                    <strong>${selectedFarmer.accountNumber}</strong>
                </div>

                <div class="detail-box">
                    <label>Bank Name</label>
                    <strong>${selectedFarmer.bankName}</strong>
                </div>

                <div class="detail-box">
                    <label>Branch Name</label>
                    <strong>${selectedFarmer.branchName}</strong>
                </div>

                <div class="detail-box">
                    <label>IFSC Code</label>
                    <strong>${selectedFarmer.ifscCode}</strong>
                </div>

                <div class="detail-box">
                    <label>Account Type</label>
                    <strong>${selectedFarmer.accountType}</strong>
                </div>

            </div>


            <button
                class="proceed-btn"
                id="saveAndProceed">

                Proceed to Payment

                <i class="fa-solid fa-arrow-right"></i>

            </button>

        </div>

    `;


    document.getElementById(
        "saveAndProceed"
    ).addEventListener(
        "click",
        function () {

            if (
                selectedFarmer.status === "Pending"
            ) {

                alert(
                    "Please mark the farmer as Arrived before processing payment."
                );

                return;

            }


            if (
                selectedFarmer.status === "Completed"
            ) {

                alert(
                    "Payment for this farmer is already completed."
                );

                return;

            }


            openPaymentProcess();

        }
    );


    showSection("farmerDetails");

}


/* =========================================
   PAYMENT PROCESS
========================================= */

function openPaymentProcess() {

    if (!selectedFarmer) return;


    const container =
        document.getElementById(
            "paymentProcessContainer"
        );


    container.innerHTML = `

        <div class="payment-form">

            <h3>
                Farmer Payment Details
            </h3>


            <div class="detail-grid">

                <div class="detail-box">
                    <label>Farmer Name</label>
                    <strong>${selectedFarmer.name}</strong>
                </div>

                <div class="detail-box">
                    <label>Account Holder</label>
                    <strong>${selectedFarmer.accountHolder}</strong>
                </div>

                <div class="detail-box">
                    <label>Account Number</label>
                    <strong>${selectedFarmer.accountNumber}</strong>
                </div>

                <div class="detail-box">
                    <label>IFSC Code</label>
                    <strong>${selectedFarmer.ifscCode}</strong>
                </div>

                <div class="detail-box">
                    <label>Bank Name</label>
                    <strong>${selectedFarmer.bankName}</strong>
                </div>

                <div class="detail-box">
                    <label>Grain Quantity</label>
                    <strong>${selectedFarmer.quantity}</strong>
                </div>

            </div>


            <div class="payment-input">

                <label>
                    Enter Payment Amount (₹)
                </label>

                <input
                    type="number"
                    id="paymentAmountInput"
                    placeholder="Enter payment amount">

            </div>


            <button
                class="proceed-btn"
                id="paymentProceedBtn">

                Process Government Payment

                <i class="fa-solid fa-money-bill-transfer"></i>

            </button>

        </div>

    `;


    document.getElementById(
        "paymentProceedBtn"
    ).addEventListener(
        "click",
        processPayment
    );


    showSection("paymentProcess");

}


/* =========================================
   PROCESS PAYMENT
========================================= */

function processPayment() {

    const amount =
        document.getElementById(
            "paymentAmountInput"
        ).value;


    if (
        !amount ||
        Number(amount) <= 0
    ) {

        alert(
            "Please enter a valid payment amount."
        );

        return;

    }


    const dateTime =
        getCurrentDateTime();


    const payment = {

        paymentId:
            "PAY-" + Date.now(),

        farmerId:
            selectedFarmer.id,

        farmerName:
            selectedFarmer.name,

        accountHolder:
            selectedFarmer.accountHolder,

        accountNumber:
            selectedFarmer.accountNumber,

        bankName:
            selectedFarmer.bankName,

        branchName:
            selectedFarmer.branchName,

        ifscCode:
            selectedFarmer.ifscCode,

        amount:
            Number(amount),

        governmentStatus:
            "Approved",

        bankStatus:
            "Pending",

        farmerReceived:
            "Processing",

        paymentDate:
            dateTime.date,

        paymentTime:
            dateTime.time

    };


    payments.unshift(payment);


    selectedFarmer.status =
        "Completed";


    selectedFarmer.paymentAmount =
        Number(amount);


    selectedFarmer.paymentDate =
        dateTime.date;


    selectedFarmer.paymentTime =
        dateTime.time;


    notifications.unshift({

        title: "Payment Processed Successfully",

        message:
            `Payment of ₹${Number(amount).toLocaleString("en-IN")} has been processed for ${selectedFarmer.name}.`,

        time:
            `${dateTime.date}, ${dateTime.time}`

    });


    saveData();


    renderPayments();

    renderFarmers(farmers);

    renderArrivedFarmers();

    renderCompletedFarmers();

    renderNotifications();

    updateDashboard();

    updateRecentActivity();


    document.getElementById(
        "successModal"
    ).classList.add("show");

}


/* =========================================
   PAYMENT HISTORY
========================================= */

function renderPayments() {

    const container =
        document.getElementById(
            "paymentContainer"
        );

    container.innerHTML = "";


    if (payments.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <i class="fa-solid fa-money-bill-transfer"></i>

                <h3>No Payment History</h3>

                <p>
                    Processed payments will appear here.
                </p>

            </div>

        `;

        return;

    }


    payments.forEach(
        payment => {

            const card =
                document.createElement("div");

            card.className =
                "payment-card";


            card.innerHTML = `

                <div class="payment-icon">

                    <i class="fa-solid fa-indian-rupee-sign"></i>

                </div>


                <div class="payment-info">

                    <h3>
                        ${payment.farmerName}
                    </h3>

                    <p>
                        Government Payment Processed
                    </p>


                    <div class="payment-date-time">

                        <span>

                            <i class="fa-solid fa-calendar"></i>

                            ${payment.paymentDate || payment.date || ""}

                        </span>


                        <span>

                            <i class="fa-solid fa-clock"></i>

                            ${payment.paymentTime || ""}

                        </span>

                    </div>

                </div>


                <div class="payment-amount">

                    ₹${Number(
                        payment.amount
                    ).toLocaleString("en-IN")}

                </div>

            `;


            card.addEventListener(
                "click",
                function () {

                    openPaymentDetails(
                        payment.paymentId
                    );

                }
            );


            container.appendChild(card);

        }
    );

}


/* =========================================
   PAYMENT DETAILS
========================================= */

function openPaymentDetails(paymentId) {

    const payment =
        payments.find(
            item =>
                item.paymentId === paymentId
        );


    if (!payment) return;


    const container =
        document.getElementById(
            "paymentDetailsContainer"
        );


    container.innerHTML = `

        <div class="status-card">

            <h3>
                Payment Information
            </h3>


            <div class="status-row">

                <span>Payment ID</span>

                <strong>
                    ${payment.paymentId}
                </strong>

            </div>


            <div class="status-row">

                <span>Farmer Name</span>

                <strong>
                    ${payment.farmerName}
                </strong>

            </div>


            <div class="status-row">

                <span>Payment Date</span>

                <strong>
                    ${payment.paymentDate || ""}
                </strong>

            </div>


            <div class="status-row">

                <span>Payment Time</span>

                <strong>
                    ${payment.paymentTime || ""}
                </strong>

            </div>


            <div class="status-row">

                <span>Account Holder</span>

                <strong>
                    ${payment.accountHolder}
                </strong>

            </div>


            <div class="status-row">

                <span>Payment Amount</span>

                <strong>
                    ₹${Number(
                        payment.amount
                    ).toLocaleString("en-IN")}
                </strong>

            </div>


            <div class="status-row">

                <span>Government Approval</span>

                <strong class="approved">

                    <i class="fa-solid fa-circle-check"></i>

                    ${payment.governmentStatus}

                </strong>

            </div>


            <div class="status-row">

                <span>Bank Approval</span>

                <strong class="pending-bank">

                    <i class="fa-solid fa-clock"></i>

                    ${payment.bankStatus}

                </strong>

            </div>


            <div class="status-row">

                <span>Farmer Payment Status</span>

                <strong class="not-received">

                    <i class="fa-solid fa-clock"></i>

                    ${payment.farmerReceived}

                </strong>

            </div>

        </div>

    `;


    showSection("paymentDetails");

}


/* =========================================
   NOTIFICATIONS
========================================= */

function renderNotifications() {

    const container =
        document.getElementById(
            "notificationContainer"
        );

    container.innerHTML = "";


    if (notifications.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <i class="fa-solid fa-bell-slash"></i>

                <h3>No Notifications</h3>

                <p>
                    You are all caught up.
                </p>

            </div>

        `;

        return;

    }


    notifications.forEach(
        notification => {

            const item =
                document.createElement("div");

            item.className =
                "notification-item";


            item.innerHTML = `

                <i class="fa-solid fa-bell"></i>


                <div>

                    <strong>
                        ${notification.title}
                    </strong>

                    <p>
                        ${notification.message}
                    </p>

                    <small>
                        ${notification.time}
                    </small>

                </div>

            `;

            container.appendChild(item);

        }
    );

}


/* =========================================
   RECENT ACTIVITY
========================================= */

function updateRecentActivity() {

    const container =
        document.getElementById(
            "recentActivity"
        );


    let html = `

        <div class="activity-item">

            <div class="activity-icon">

                <i class="fa-solid fa-building-columns"></i>

            </div>

            <div>

                <strong>
                    Government Dashboard Active
                </strong>

                <span>
                    Agriculture procurement management system is ready.
                </span>

            </div>

            <small>
                Now
            </small>

        </div>

    `;


    const arrived =
        farmers.filter(
            farmer =>
                farmer.status === "Arrived"
        );


    arrived.slice(0, 2).forEach(
        farmer => {

            html += `

                <div class="activity-item">

                    <div class="activity-icon">

                        <i class="fa-solid fa-user-check"></i>

                    </div>

                    <div>

                        <strong>
                            Farmer Arrived
                        </strong>

                        <span>
                            ${farmer.name} arrived at the collection center.
                        </span>

                    </div>

                    <small>
                        ${farmer.arrivalTime || "Recent"}
                    </small>

                </div>

            `;

        }
    );


    payments.slice(0, 3).forEach(
        payment => {

            html += `

                <div class="activity-item">

                    <div class="activity-icon">

                        <i class="fa-solid fa-circle-check"></i>

                    </div>

                    <div>

                        <strong>
                            Payment Processed
                        </strong>

                        <span>
                            ₹${Number(
                                payment.amount
                            ).toLocaleString("en-IN")}
                            processed for ${payment.farmerName}
                        </span>

                    </div>

                    <small>
                        ${payment.paymentTime || "Recent"}
                    </small>

                </div>

            `;

        }
    );


    container.innerHTML = html;

}


/* =========================================
   BUTTONS
========================================= */

function initializeButtons() {


    document.getElementById(
        "backToFarmers"
    ).addEventListener(
        "click",
        function () {

            showSection("farmers");

        }
    );


    document.getElementById(
        "backToDetails"
    ).addEventListener(
        "click",
        function () {

            if (selectedFarmer) {

                openFarmerDetails(
                    selectedFarmer.id
                );

            }

        }
    );


    document.getElementById(
        "backToPayment"
    ).addEventListener(
        "click",
        function () {

            showSection("payment");

        }
    );


    document.getElementById(
        "backFromArrived"
    ).addEventListener(
        "click",
        function () {

            showSection("dashboard");

        }
    );


    document.getElementById(
        "successOkBtn"
    ).addEventListener(
        "click",
        function () {

            document.getElementById(
                "successModal"
            ).classList.remove("show");


            showSection("payment");

        }
    );


    document.getElementById(
        "clearNotifications"
    ).addEventListener(
        "click",
        function () {

            notifications = [];


            saveData();

            renderNotifications();

            updateDashboard();

        }
    );


    /* EDIT PROFILE */

    document.getElementById(
        "editProfileBtn"
    ).addEventListener(
        "click",
        function () {

            loadProfileForm();

            showSection("editProfile");

        }
    );


    document.getElementById(
        "backToProfile"
    ).addEventListener(
        "click",
        function () {

            showSection("profile");

        }
    );


    document.getElementById(
        "saveProfileBtn"
    ).addEventListener(
        "click",
        saveProfile
    );


    /* LOGOUT */

    document.getElementById(
        "logoutBtn"
    ).addEventListener(
        "click",
        function () {

            const confirmLogout =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (confirmLogout) {

                alert(
                    "Logged out successfully!"
                );

            }

        }
    );

}


/* =========================================
   LOAD PROFILE FORM
========================================= */

function loadProfileForm() {

    document.getElementById("editName").value =
        governmentCenter.name;

    document.getElementById("editOfficer").value =
        governmentCenter.officer;

    document.getElementById("editMobile").value =
        governmentCenter.mobile;

    document.getElementById("editEmail").value =
        governmentCenter.email;

    document.getElementById("editAddress").value =
        governmentCenter.address;

    document.getElementById("editDistrict").value =
        governmentCenter.district;

    document.getElementById("editState").value =
        governmentCenter.state;

    document.getElementById("editPincode").value =
        governmentCenter.pincode;

}


/* =========================================
   SAVE PROFILE
========================================= */

function saveProfile() {

    governmentCenter.name =
        document.getElementById("editName").value;

    governmentCenter.officer =
        document.getElementById("editOfficer").value;

    governmentCenter.mobile =
        document.getElementById("editMobile").value;

    governmentCenter.email =
        document.getElementById("editEmail").value;

    governmentCenter.address =
        document.getElementById("editAddress").value;

    governmentCenter.district =
        document.getElementById("editDistrict").value;

    governmentCenter.state =
        document.getElementById("editState").value;

    governmentCenter.pincode =
        document.getElementById("editPincode").value;


    const dateTime =
        getCurrentDateTime();


    notifications.unshift({

        title: "Profile Updated",

        message:
            "Government center profile information has been updated successfully.",

        time:
            `${dateTime.date}, ${dateTime.time}`

    });


    saveData();

    initializeProfile();

    renderNotifications();

    updateDashboard();


    showSection("profile");

}


/* =========================================
   MOBILE SIDEBAR
========================================= */

function initializeMobile() {

    document.getElementById(
        "hamburger"
    ).addEventListener(
        "click",
        openSidebar
    );


    document.getElementById(
        "closeSidebar"
    ).addEventListener(
        "click",
        closeSidebar
    );


    document.getElementById(
        "overlay"
    ).addEventListener(
        "click",
        closeSidebar
    );

}


function openSidebar() {

    document.getElementById(
        "sidebar"
    ).classList.add("open");


    document.getElementById(
        "overlay"
    ).classList.add("show");

}


function closeSidebar() {

    document.getElementById(
        "sidebar"
    ).classList.remove("open");


    document.getElementById(
        "overlay"
    ).classList.remove("show");

}