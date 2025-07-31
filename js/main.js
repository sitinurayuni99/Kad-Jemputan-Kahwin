  /* ============================================================
   * Buka overlay dan main muzik
   * ========================================================== */
  document.getElementById("toggle-content")?.addEventListener("click", function () {
    var wrapper = document.querySelector(".wrapper");
    var card = document.querySelector(".card");

    if (wrapper && card) {
      wrapper.classList.add("hidden");

      wrapper.addEventListener("transitionend", function () {
        wrapper.style.display = "none";
        card.style.display = "block";
      }, { once: true });
    }

    const audioPlayer = document.getElementById("audio-player");
    audioPlayer?.play().catch(e => {
      console.log("Audio autoplay disekat: ", e);
    });
  });

  /** =====================================================
 *  Toggle Menu
  ======================================================= */
// ================================== Calendar ==================================
// Get all buttons and their corresponding menus
const toggleButtons = {
    'location-btn': 'location-menu',
    'music-btn': 'music-menu',
    'rsvp-btn': 'rsvp-menu',
    'ucapan-btn': 'ucapan-menu',
    'contact-btn': 'contact-menu',
    'kehadiran-btn': 'rsvp-menu',
    'btn-hadir': 'success-menu'
    // Add other button-to-menu mappings here
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



  /* ============================================================
   * Scroll Reveal
   * ========================================================== */
  function reveal() {
    const reveals = document.querySelectorAll(".reveal");

    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;
      const elementVisible = 10;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }
  window.addEventListener("scroll", reveal);

  /* ============================================================
   * Background Bunga (Petal)
   * ========================================================== */
  const petalContainer = document.querySelector('.petal-container');
  const maxPetals = 70;
  const petalInterval = 100;

  function createPetal() {
    if (petalContainer && petalContainer.childElementCount < maxPetals) {
      const petal = document.createElement('div');
      petal.className = 'petal';

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

      petal.style.setProperty('--translate-x', `${translateX}px`);
      petal.style.setProperty('--translate-y', `${translateY}px`);

      petalContainer.appendChild(petal);

      setTimeout(() => {
        petal.remove();
      }, duration * 1000);
    }
  }
  setInterval(createPetal, petalInterval);
});

/* ============================================================
 * Lokasi: Google Maps & Waze (boleh kekal luar DOMContentLoaded)
 * ========================================================== */
function openGoogleMaps() {
  const latitude = 3.1927426;
  const longitude = 101.5504211;
  window.open(`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`, "_blank");
}

function openWaze() {
  const latitude = 3.1927426;
  const longitude = 101.5504211;
  window.open(`waze://?ll=${latitude},${longitude}&navigate=yes`, "_blank");
}

/* ============================================================
 * Hubungi: WhatsApp & Panggilan
 * ========================================================== */
function openWhatsApp(phoneNumber) {
  window.open(`https://wa.me/${phoneNumber}`, "_blank");
}

function makePhoneCall(phoneNumber) {
  window.location.href = `tel:${phoneNumber}`;
}
