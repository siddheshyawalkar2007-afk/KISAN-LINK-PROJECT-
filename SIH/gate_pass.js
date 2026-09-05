/* =========================================
   KisanLink GATE PASS DASHBOARD
========================================= */


/* =========================================
   GATE OFFICER DATA
========================================= */

let gateOfficer = JSON.parse(
    localStorage.getItem("gateOfficer")
) || {

    id: "GATE-001",

    name: "Gate Officer",

    designation: "Gate Pass Officer",

    email: "gate@KisanLink.com",

    mobile: "9876543210",

    center: "Pimpri Government Collection Center"

};


/* =========================================
   FARMER DATA
   IMPORTANT:
   SAME LOCAL STORAGE AS GOVERNMENT DASHBOARD
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

        date: "30 August 2026",

        bookingTime: "10:30 AM",

        status: "Pending"
    },

    {
        id: "F002",

        name: "Mahesh Jadhav",

        mobile: "9876500022",

        age: 38,

        crop: "Rice",

        quantity: "750 kg",

        date: "30 August 2026",

        bookingTime: "11:15 AM",

        status: "Arrived"
    },

    {
        id: "F003",

        name: "Sunil Shinde",

        mobile: "9876500033",

        age: 50,

        crop: "Soybean",

        quantity: "350 kg",

        date: "31 August 2026",

        bookingTime: "09:45 AM",

        status: "Pending"
    },

    {
        id: "F004",

        name: "Vijay Pawar",

        mobile: "9876500044",

        age: 42,

        crop: "Maize",

        quantity: "620 kg",

        date: "31 August 2026",

        bookingTime: "02:20 PM",

        status: "Arrived"
    }

];


/* =========================================
   CURRENT SELECTED FARMER
========================================= */

let selectedFarmer = null;


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

        updateDashboard();

        updateRecentActivity();

        setCurrentDate();

    }
);


/* =========================================
   SAVE FARMERS
========================================= */

function saveFarmers() {

    localStorage.setItem(
        "governmentFarmers",
        JSON.stringify(farmers)
    );

}


/* =========================================
   CURRENT DATE
========================================= */

function setCurrentDate() {

    const date = new Date();

    const options = {

        weekday: "short",

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
   PROFILE INITIALIZATION
========================================= */

function initializeProfile() {

    document.getElementById(
        "sidebarAvatar"
    ).textContent = "GP";


    document.getElementById(
        "topAvatar"
    ).textContent = "GP";


    document.getElementById(
        "profileAvatar"
    ).textContent = "GP";


    document.getElementById(
        "sidebarName"
    ).textContent =
        gateOfficer.name;


    document.getElementById(
        "topName"
    ).textContent =
        gateOfficer.name;


    document.getElementById(
        "profileName"
    ).textContent =
        gateOfficer.name;


    document.getElementById(
        "gateId"
    ).textContent =
        gateOfficer.id;


    document.getElementById(
        "infoDesignation"
    ).textContent =
        gateOfficer.designation;


    document.getElementById(
        "infoEmail"
    ).textContent =
        gateOfficer.email;


    document.getElementById(
        "infoMobile"
    ).textContent =
        gateOfficer.mobile;


    document.getElementById(
        "infoCenter"
    ).textContent =
        gateOfficer.center;

}


/* =========================================
   NAVIGATION
========================================= */

function initializeNavigation() {

    document
        .querySelectorAll(
            ".menu-item[data-section]"
        )
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

            showSection("farmers");

            renderFarmers(
                farmers.filter(
                    farmer =>
                        farmer.status === "Arrived"
                )
            );

        }
    );


    document.getElementById(
        "notArrivedCard"
    ).addEventListener(
        "click",
        function () {

            showSection("farmers");

            renderFarmers(
                farmers.filter(
                    farmer =>
                        farmer.status === "Pending"
                )
            );

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
        .querySelectorAll(
            ".menu-item[data-section]"
        )
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


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================
   UPDATE DASHBOARD
========================================= */

function updateDashboard() {

    const total =
        farmers.length;


    const arrived =
        farmers.filter(
            farmer =>
                farmer.status === "Arrived"
        ).length;


    const notArrived =
        farmers.filter(
            farmer =>
                farmer.status !== "Arrived"
        ).length;


    document.getElementById(
        "bookingCount"
    ).textContent =
        total;


    document.getElementById(
        "arrivedCount"
    ).textContent =
        arrived;


    document.getElementById(
        "notArrivedCount"
    ).textContent =
        notArrived;


    document.getElementById(
        "farmerBadge"
    ).textContent =
        total;


    document.getElementById(
        "bookingPageCount"
    ).textContent =
        total;

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


            if (
                farmer.status !== "Arrived"
            ) {

                actionButton = `

                    <button
                        class="arrive-btn"
                        data-arrive-id="${farmer.id}"
                    >

                        <i class="fa-solid fa-check"></i>

                        Confirm Arrival

                    </button>

                `;

            }
            else {

                actionButton = `

                    <button
                        class="arrive-btn"
                        data-details-id="${farmer.id}"
                    >

                        View Details

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
                        data-farmer-id="${farmer.id}"
                    >

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

                        ${farmer.date}

                        &nbsp;&nbsp;

                        <i class="fa-solid fa-clock"></i>

                        ${farmer.bookingTime || "Not Available"}

                    </small>

                </div>


                <span
                    class="status ${farmer.status === "Arrived" ? "arrived" : "pending"}"
                >

                    ${farmer.status === "Arrived"
                        ? "Arrived"
                        : "Not Arrived"
                    }

                </span>


                ${actionButton}

            `;


            container.appendChild(card);

        }
    );


    attachFarmerEvents();

}


/* =========================================
   FARMER EVENTS
========================================= */

function attachFarmerEvents() {


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


    document
        .querySelectorAll("[data-arrive-id]")
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    function () {

                        confirmFarmerArrival(
                            this.dataset.arriveId
                        );

                    }
                );

            }
        );


    document
        .querySelectorAll("[data-details-id]")
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    function () {

                        openFarmerDetails(
                            this.dataset.detailsId
                        );

                    }
                );

            }
        );

}


/* =========================================
   CONFIRM FARMER ARRIVAL
========================================= */

function confirmFarmerArrival(farmerId) {

    const farmer =
        farmers.find(
            item =>
                item.id === farmerId
        );


    if (!farmer) return;


    const confirmation =
        confirm(
            `Confirm that ${farmer.name} has arrived at the collection center?`
        );


    if (!confirmation) return;


    farmer.status = "Arrived";


    const now =
        new Date();


    farmer.arrivalDate =
        now.toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );


    farmer.arrivalTime =
        now.toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );


    saveFarmers();


    renderFarmers(farmers);

    updateDashboard();

    updateRecentActivity();


    alert(
        `${farmer.name} has been successfully marked as Arrived.`
    );

}


/* =========================================
   FARMER DETAILS
   PAYMENT AND BANK DETAILS NOT SHOWN
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


    let arrivalSection = "";


    if (
        selectedFarmer.status === "Arrived"
    ) {

        arrivalSection = `

            <div class="arrival-confirm-box">

                <div>

                    <h4>

                        <i class="fa-solid fa-circle-check"></i>

                        Farmer Already Arrived

                    </h4>

                    <p>

                        Arrival confirmed on
                        ${selectedFarmer.arrivalDate || "Earlier"}

                        at

                        ${selectedFarmer.arrivalTime || "Recorded"}

                    </p>

                </div>


                <span class="status arrived">

                    Arrived

                </span>

            </div>

        `;

    }
    else {

        arrivalSection = `

            <div class="arrival-confirm-box">

                <div>

                    <h4>
                        Confirm Farmer Arrival
                    </h4>

                    <p>
                        Verify the farmer at the gate
                        and confirm their arrival.
                    </p>

                </div>


                <button
                    class="confirm-arrival-btn"
                    id="confirmArrivalBtn"
                >

                    <i class="fa-solid fa-check"></i>

                    Confirm Arrival

                </button>

            </div>

        `;

    }


    container.innerHTML = `

        <div class="details-card">


            <h3>

                <i class="fa-solid fa-user"></i>

                Farmer Information

            </h3>


            <div class="detail-grid">


                <div class="detail-box">

                    <label>
                        Farmer ID
                    </label>

                    <strong>
                        ${selectedFarmer.id}
                    </strong>

                </div>



                <div class="detail-box">

                    <label>
                        Farmer Name
                    </label>

                    <strong>
                        ${selectedFarmer.name}
                    </strong>

                </div>



                <div class="detail-box">

                    <label>
                        Mobile Number
                    </label>

                    <strong>
                        ${selectedFarmer.mobile}
                    </strong>

                </div>



                <div class="detail-box">

                    <label>
                        Age
                    </label>

                    <strong>
                        ${selectedFarmer.age} Years
                    </strong>

                </div>



                <div class="detail-box">

                    <label>
                        Grain Type
                    </label>

                    <strong>
                        ${selectedFarmer.crop}
                    </strong>

                </div>



                <div class="detail-box">

                    <label>
                        Grain Quantity
                    </label>

                    <strong>
                        ${selectedFarmer.quantity}
                    </strong>

                </div>



                <div class="detail-box">

                    <label>
                        Booking Date
                    </label>

                    <strong>
                        ${selectedFarmer.date}
                    </strong>

                </div>



                <div class="detail-box">

                    <label>
                        Booking Time
                    </label>

                    <strong>
                        ${selectedFarmer.bookingTime || "Not Available"}
                    </strong>

                </div>



                <div class="detail-box">

                    <label>
                        Current Status
                    </label>

                    <strong>

                        ${selectedFarmer.status === "Arrived"
                            ? "Arrived"
                            : "Not Arrived"
                        }

                    </strong>

                </div>


            </div>


            ${arrivalSection}


        </div>

    `;


    const confirmButton =
        document.getElementById(
            "confirmArrivalBtn"
        );


    if (confirmButton) {

        confirmButton.addEventListener(
            "click",
            function () {

                confirmFarmerArrival(
                    selectedFarmer.id
                );


                openFarmerDetails(
                    selectedFarmer.id
                );

            }
        );

    }


    showSection("farmerDetails");

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
                event.target.value
                    .toLowerCase()
                    .trim();


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

    }
);


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

                <i class="fa-solid fa-door-open"></i>

            </div>


            <div>

                <strong>
                    Gate Dashboard Active
                </strong>

                <span>
                    Farmer arrival verification system is active.
                </span>

            </div>


            <small>
                Now
            </small>

        </div>

    `;


    const arrivedFarmers =
        farmers.filter(
            farmer =>
                farmer.status === "Arrived"
        );


    arrivedFarmers
        .slice(0, 4)
        .forEach(
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

                                ${farmer.name}
                                has been verified at the gate.

                            </span>

                        </div>


                        <small>

                            ${farmer.arrivalTime || "Recent"}

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

            renderFarmers(farmers);

        }
    );


    document.getElementById(
        "logoutBtn"
    ).addEventListener(
        "click",
        function () {

            const confirmation =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (confirmation) {

                alert(
                    "Logged out successfully!"
                );

            }

        }
    );

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