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

  
// ============================================================
// Fungsi Luar DOMContentLoaded (boleh kekal di luar)
// ============================================================
function openGoogleMaps() {
  const lat = 3.1927426;
  const lng = 101.5504211;
  window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, "_blank");
}

function openWaze() {
  const lat = 3.1927426;
  const lng = 101.5504211;
  window.open(`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`, "_blank");
}

function openWhatsApp(phoneNumber) {
  window.open(`https://wa.me/${phoneNumber}`, "_blank");
}

function makePhoneCall(phoneNumber) {
  window.location.href = `tel:${phoneNumber}`;
}


  // ============================================================
  // Scroll Reveal
  // ============================================================
  function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach((el) => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 10;

      if (elementTop < windowHeight - elementVisible) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", reveal);

  // ============================================================
  // Background Bunga (Petal)
  // ============================================================
  const petalContainer = document.querySelector(".petal-container");
  const maxPetals = 70;
  const petalInterval = 100;

  function createPetal() {
    if (petalContainer && petalContainer.childElementCount < maxPetals) {
      const petal = document.createElement("div");
      petal.className = "petal";

      const startY = Math.random() * 100;
      const duration = 4 + Math.random() * 2;
      const petalSize = 5 + Math.random() * 10;
      const petalOpacity = 0.3 + Math.random() * 0.5;

      petal.style.top = `${startY}%`;
      petal.style.width = `${petalSize}px`;
      petal.style.height = `${petalSize}px`;
      petal.style.opacity = petalOpacity;
      petal.style.animationDuration = `${duration}s`;

      const translateX = 300 + Math.random() * 120;
      const translateY = 300 + Math.random() * 120;

      petal.style.setProperty("--translate-x", `${translateX}px`);
      petal.style.setProperty("--translate-y", `${translateY}px`);

      petalContainer.appendChild(petal);

      setTimeout(() => {
        petal.remove();
      }, duration * 1000);
    }
  }

  setInterval(createPetal, petalInterval);
});


// ============================================================
  // Toggle Menu
  // ============================================================
  const toggleButtons = {
    "location-btn": "location-menu",
    "music-btn": "music-menu",
    "rsvp-btn": "rsvp-menu",
    "contact-btn": "contact-menu",
    "kehadiran-btn": "rsvp-menu",
    "btn-hadir": "success-menu",
  };

  // Function to toggle a menu open/close
function toggleMenu(menuId, event) {
    event.stopPropagation(); // Prevent click from propagating
    const menu = document.getElementById(menuId);

    if (menu.classList.contains('open')) {
        menu.classList.remove('open'); // Close the menu
    } else {
        // Close all other menus first
        closeAllMenus();
        menu.classList.add('open'); // Open the menu
    }
}

// Function to close all menus
function closeAllMenus() {
    for (const menuId of Object.values(toggleButtons)) {
        const menu = document.getElementById(menuId);
        if (menu.classList.contains('open')) {
            menu.classList.remove('open'); // Close the menu
        }
    }
}

// Add click event listeners to all toggle buttons
for (const [buttonId, menuId] of Object.entries(toggleButtons)) {
    const button = document.getElementById(buttonId);
    button.addEventListener('click', (event) => toggleMenu(menuId, event));
}

// Add a global click handler to close all menus when clicking outside
document.addEventListener('click', () => closeAllMenus());

// Prevent clicks within menus from closing them
for (const menuId of Object.values(toggleButtons)) {
    const menu = document.getElementById(menuId);
    menu.addEventListener('click', (event) => event.stopPropagation());
}

// Function to close a specific menu
function closeMenu(menuId) {
    const menu = document.getElementById(menuId);
    if (menu.classList.contains('open')) {
        menu.classList.remove('open'); // Close the menu
    }
}

// Add event listener for the close button inside the ucapan menu
const closeButton = document.querySelector('#ucapan-menu .tutup');
if (closeButton) {
    closeButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent this from propagating and triggering other closures
        closeMenu('ucapan-menu'); // Close the specific menu
    });
}

// Function to open RSVP
const kehadiranBtn = document.getElementById("kehadiran-btn");



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
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Request failed");
        }
    })
    .then(data => {
        if (data.attend) {
            // Display the success message
            const successMenu = document.getElementById("success-menu");
            successMenu.innerHTML = `<div class='success-message'><i class='${iconClass}'></i><p>${successMessage}</p></div>`;
            successMenu.classList.add("open"); // Open the success menu

            // Optionally close other menu
            if (closeMenuId) {
                closeMenu(closeMenuId); // Close the specified menu
            }
        } else {
            console.error("Increment count error:", data.error);
            alert("Terjadi kesilapan: " + data.error);
        }
    })
    .catch(error => {
        console.error("AJAX error:", error);
        alert("Error processing the request.");
    });
}

// Attach the click event to the "Hadir" and "Tidak Hadir" buttons
document.getElementById("btn-hadir").onclick = function() {
    incrementCount('count_hadir.php', "Kami menantikan kedatangan anda!", 'bx bxs-wink-smile', 'rsvp-menu'); // Success message and optionally close RSVP menu
};

document.getElementById("btn-tidak-hadir").onclick = function() {
    incrementCount('count_tidak_hadir.php', "Maaf, mungkin lain kali.", 'bx bxs-sad', 'rsvp-menu'); // Success message and optionally close RSVP menu
};





/** =====================================================
 *  Image Carousel
  ======================================================= */
