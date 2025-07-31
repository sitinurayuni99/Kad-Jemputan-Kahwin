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

  function toggleMenu(menuId, event) {
    event.stopPropagation();
    const menu = document.getElementById(menuId);
    if (!menu) return;

    if (menu.classList.contains("open")) {
      menu.classList.remove("open");
    } else {
      closeAllMenus();
      menu.classList.add("open");
    }
  }

  function closeAllMenus() {
    for (const id of Object.values(toggleButtons)) {
      const menu = document.getElementById(id);
      menu?.classList.remove("open");
    }
  }

  for (const [btnId, menuId] of Object.entries(toggleButtons)) {
    const button = document.getElementById(btnId);
    button?.addEventListener("click", (e) => toggleMenu(menuId, e));
  }

  document.addEventListener("click", () => closeAllMenus());

  for (const menuId of Object.values(toggleButtons)) {
    const menu = document.getElementById(menuId);
    menu?.addEventListener("click", (e) => e.stopPropagation());
  }

  const closeBtn = document.querySelector("#ucapan-menu .tutup");
  closeBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    document.getElementById("ucapan-menu")?.classList.remove("open");
  });

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
