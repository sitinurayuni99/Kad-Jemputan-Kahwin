/*============================================================================================
    # Wrapper Overlay
============================================================================================*/
// document.getElementById("toggle-content").addEventListener("click", function () {
//     // Hide the overlay
//     const overlay = document.getElementById("overlay");
//     overlay.style.display = "none";

    // Play the audio
//    const audioPlayer = document.getElementById("audio-player");
//    audioPlayer.play();  // Start playing the audio
// });

document.getElementById("toggle-content").addEventListener("click", function () {
    var wrapper = document.querySelector(".wrapper"); // Change to wrapper
    var card = document.querySelector(".card");

    // Add the 'hidden' class to start the fade out transition
    wrapper.classList.add("hidden");

    // Wait for the transition to complete
    wrapper.addEventListener("transitionend", function () {
        // After fade out is complete, hide the wrapper and show the card
        wrapper.style.display = "none"; // Hide the wrapper
        card.style.display = "block";   // Show the card
    }, { once: true });

    // Play the audio
    const audioPlayer = document.getElementById("audio-player");
    audioPlayer.play();  // Start playing the audio
});



/** =====================================================
 *  Location for Google and Waze
  ======================================================= */
function openGoogleMaps() {
    const latitude = 3.1927426;
    const longitude = 101.5504211;
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

    window.open(googleMapsUrl, "_blank");  // Open in a new tab
}

function openWaze() {
    const latitude = 3.1927426;
    const longitude = 101.5504211;
    //const wazeUrl = `https://waze.com/ul?ll=3.199700,101.620800&navigate=yes`;
    const wazeUrl = `waze://?ll=${latitude},${longitude}&navigate=yes`

    window.open(wazeUrl, "_blank");  // Open in a new tab
}



/** =====================================================
    Contact
  ======================================================= */
function openWhatsApp(phoneNumber) {
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, "_blank"); // Buka dalam tab baru
}

function makePhoneCall(phoneNumber) {
    const callUrl = `tel:${phoneNumber}`;
    window.location.href = callUrl;  // Opens the phone dialer
}







/** =====================================================
 *  Animation
  ======================================================= */
function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 10;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}

window.addEventListener("scroll", reveal);





/** =====================================================
 *  Background Animation
  ======================================================= */
const petalContainer = document.querySelector('.petal-container');

const maxPetals = 70; // Maximum number of petals allowed at once
const petalInterval = 100; // Interval for creating petals (100 milliseconds)

function createPetal() {
    if (petalContainer.childElementCount < maxPetals) {
        const petal = document.createElement('div');
        petal.className = 'petal';

        const startY = Math.random() * 100; // Randomized vertical start position
        const duration = 4 + Math.random() * 2; // Randomized animation duration (4 to 6 seconds)

        const petalSize = 5 + Math.random() * 10; // Random size between 5px and 20px

        // Randomize the opacity between 0.3 and 0.8 for varied transparency
        const petalOpacity = 0.3 + Math.random() * 0.5; // Randomized opacity

        petal.style.top = `${startY}%`; // Randomized starting vertical position
        petal.style.width = `${petalSize}px`;
        petal.style.height = `${petalSize}px`;
        petal.style.opacity = petalOpacity; // Set the random opacity
        petal.style.animationDuration = `${duration}s`; // Randomized animation duration

        // Randomize the final translation for X and Y for varied movement
        const translateX = 300 + Math.random() * 120; // TranslateX with some randomness
        const translateY = 300 + Math.random() * 120; // TranslateY with some randomness

        petal.style.setProperty('--translate-x', `${translateX}px`); // Set variable for translation X
        petal.style.setProperty('--translate-y', `${translateY}px`); // Set variable for translation Y

        petalContainer.appendChild(petal);

        // Ensure the petal is removed only after the animation completes
        setTimeout(() => {
            petalContainer.removeChild(petal);
        }, duration * 1000); // Convert duration to milliseconds
    }
}

// Create petals at a shorter interval with the defined interval time
setInterval(createPetal, petalInterval); // Create petals every 100 milliseconds




/** =====================================================
 *  Toggle Menu
 ======================================================= */

// Mapping butang ke ID menu masing-masing
const toggleButtons = {
    'location-btn': 'location-menu',
    'music-btn': 'music-menu',
    'contact-btn': 'contact-menu',
};

// Fungsi buka/tutup menu
function toggleMenu(menuId, event) {
    event.stopPropagation();
    const menu = document.getElementById(menuId);

    if (menu.classList.contains('open')) {
        menu.classList.remove('open');
    } else {
        closeAllMenus();
        menu.classList.add('open');
    }
}

// Tutup semua menu
function closeAllMenus() {
    for (const menuId of Object.values(toggleButtons)) {
        const menu = document.getElementById(menuId);
        if (menu.classList.contains('open')) {
            menu.classList.remove('open');
        }
    }

    // Tutup RSVP & ucapan juga
    const rsvp = document.getElementById("rsvp-menu");
    const ucapan = document.getElementById("ucapan-menu");
    if (rsvp) rsvp.classList.remove("open");
    if (ucapan) ucapan.classList.remove("open");
}

// Tambah event listener ke semua butang toggle
for (const [buttonId, menuId] of Object.entries(toggleButtons)) {
    const button = document.getElementById(buttonId);
    button.addEventListener('click', (event) => toggleMenu(menuId, event));
}

// Klik luar kawasan menu => tutup semua menu
document.addEventListener('click', () => closeAllMenus());

// Jangan tutup kalau klik dalam menu
for (const menuId of Object.values(toggleButtons)) {
    const menu = document.getElementById(menuId);
    menu.addEventListener('click', (event) => event.stopPropagation());
}

// Tutup menu tertentu
function closeMenu(menuId) {
    const menu = document.getElementById(menuId);
    if (menu.classList.contains('open')) {
        menu.classList.remove('open');
    }
}

// Butang tutup ucapan menu
const closeButton = document.querySelector('#ucapan-menu .tutup');
if (closeButton) {
    closeButton.addEventListener('click', (event) => {
        event.stopPropagation();
        closeMenu('ucapan-menu');
    });
}

/** =====================================================
 *  Sahkan Kehadiran - Open RSVP Menu
 ======================================================= */
const kehadiranBtn = document.getElementById("kehadiran-btn");
const rsvpMenu = document.getElementById("rsvp-menu");

if (kehadiranBtn && rsvpMenu) {
    kehadiranBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        closeAllMenus(); // Tutup semua dulu
        rsvpMenu.classList.add("open");
    });
}

/** =====================================================
 *  Berikan Ucapan - Open Ucapan Menu
 ======================================================= */
const ucapanBtn = document.getElementById("ucapan-btn");
const ucapanMenu = document.getElementById("ucapan-menu");

if (ucapanBtn && ucapanMenu) {
    ucapanBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        closeAllMenus();
        ucapanMenu.classList.add("open");
    });
}

/** =====================================================
 *  Submit Ucapan Form
 ======================================================= */
document.getElementById("form-ucapan").addEventListener("submit", function (event) {
    event.preventDefault();

    const form = document.getElementById("form-ucapan");
    const formData = new FormData(form);
    const actionUrl = form.action;

    fetch(actionUrl, {
        method: "POST",
        body: formData,
    })
    .then(response => response.ok ? response.text() : Promise.reject("Form submission failed"))
    .then(result => {
        const successMenu = document.getElementById("success-menu");
        successMenu.innerHTML = "<div class='success-message'><i class='bx bx-check'></i><p>Mesej anda berjaya dihantar!</p></div>";
        successMenu.classList.add("open");

        closeMenu('ucapan-menu');
        form.reset();
    })
    .catch(error => {
        console.error("Error:", error);
    });
});

/** =====================================================
 *  Handle Kehadiran Count
 ======================================================= */
function incrementCount(endpoint, successMessage, iconClass, closeMenuId) {
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'action=increment',
    })
    .then(response => response.ok ? response.json() : Promise.reject("Request failed"))
    .then(data => {
        if (data.attend) {
            const successMenu = document.getElementById("success-menu");
            successMenu.innerHTML = `<div class='success-message'><i class='${iconClass}'></i><p>${successMessage}</p></div>`;
            successMenu.classList.add("open");

            if (closeMenuId) closeMenu(closeMenuId);
        } else {
            console.error("Increment error:", data.error);
            alert("Terjadi kesilapan: " + data.error);
        }
    })
    .catch(error => {
        console.error("AJAX error:", error);
        alert("Error processing the request.");
    });
}

// Event untuk butang hadir dan tidak hadir
document.getElementById("btn-hadir").onclick = function () {
    incrementCount('count_hadir.php', "Kami menantikan kedatangan anda!", 'bx bxs-wink-smile', 'rsvp-menu');
};

document.getElementById("btn-tidak-hadir").onclick = function () {
    incrementCount('count_tidak_hadir.php', "Maaf, mungkin lain kali.", 'bx bxs-sad', 'rsvp-menu');
};

/** =====================================================
 *  WhatsApp & Call Buttons (Contact)
 ======================================================= */
function openWhatsApp(phoneNumber) {
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, "_blank");
}

function makePhoneCall(phoneNumber) {
    window.location.href = `tel:${phoneNumber}`;
}
