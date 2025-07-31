document.addEventListener("DOMContentLoaded", function () {
  // ============================================================
  // Buka overlay dan main muzik
  // ============================================================
  const toggleBtn = document.getElementById("toggle-content");
  toggleBtn?.addEventListener("click", function () {
    const wrapper = document.querySelector(".wrapper");
    const card = document.querySelector(".card");

    if (wrapper && card) {
      wrapper.classList.add("hidden");
      wrapper.addEventListener(
        "transitionend",
        function () {
          wrapper.style.display = "none";
          card.style.display = "block";
        },
        { once: true }
      );
    }

    const audioPlayer = document.getElementById("audio-player");
    audioPlayer?.play().catch((e) => {
      console.log("Audio autoplay disekat: ", e);
    });
  });

  // ============================================================
  // Toggle Menu
  // ============================================================
  const toggleButtons = {
    "location-btn": "location-menu",
    "music-btn": "music-menu",
    "rsvp-btn": "rsvp-menu",
    "ucapan-btn": "ucapan-menu",
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
