document.addEventListener("DOMContentLoaded", function () {
  // ============================================================
  // Buka Kad Jemputan
  // ============================================================
  const toggleButton = document.getElementById("toggle-content");
  const overlay = document.getElementById("overlay");
  const card = document.querySelector(".card");
  const audioPlayer = document.getElementById("audio-player");
  
  // Sembunyikan kad semasa mula
  if (card) {
    card.style.display = "none";
  }
  
  // Bila klik "Buka"
  if (toggleButton && overlay && card) {
    toggleButton.addEventListener("click", function () {
      overlay.style.display = "none"; // hanya tutup overlay, bukan wrapper
      card.style.display = "block";   // tunjuk kad
  
      if (audioPlayer) {
        audioPlayer.play().catch(e => console.warn("Audio gagal dimainkan:", e));
      }
    });
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

    if (menu.classList.contains('open')) {
      menu.classList.remove('open');
    } else {
      closeAllMenus();
      menu.classList.add('open');
    }
  }

  function closeAllMenus() {
    for (const menuId of Object.values(toggleButtons)) {
      const menu = document.getElementById(menuId);
      if (menu && menu.classList.contains('open')) {
        menu.classList.remove('open');
      }
    }
  }

  for (const [buttonId, menuId] of Object.entries(toggleButtons)) {
    const button = document.getElementById(buttonId);
    if (button) {
      button.addEventListener('click', (event) => toggleMenu(menuId, event));
    }
  }

  document.addEventListener('click', () => closeAllMenus());

  for (const menuId of Object.values(toggleButtons)) {
    const menu = document.getElementById(menuId);
    if (menu) {
      menu.addEventListener('click', (event) => event.stopPropagation());
    }
  }

  function closeMenu(menuId) {
    const menu = document.getElementById(menuId);
    if (menu && menu.classList.contains('open')) {
      menu.classList.remove('open');
    }
  }

  const closeButton = document.querySelector('#ucapan-menu .tutup');
  if (closeButton) {
    closeButton.addEventListener('click', (event) => {
      event.stopPropagation();
      closeMenu('ucapan-menu');
    });
  }

  // ============================================================
  // Kehadiran Count (RSVP)
  // ============================================================
  function incrementCount(endpoint, successMessage, iconClass, closeMenuId) {
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
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
        const successMenu = document.getElementById("success-menu");
        successMenu.innerHTML = `<div class='success-message'><i class='${iconClass}'></i><p>${successMessage}</p></div>`;
        successMenu.classList.add("open");

        if (closeMenuId) closeMenu(closeMenuId);
      } else {
        alert("Terjadi kesilapan: " + data.error);
      }
    })
    .catch(error => {
      console.error("AJAX error:", error);
      alert("Error processing the request.");
    });
  }

  const btnHadir = document.getElementById("btn-hadir");
  const btnTidakHadir = document.getElementById("btn-tidak-hadir");

  if (btnHadir) {
    btnHadir.onclick = function () {
      incrementCount('count_hadir.php', "Kami menantikan kedatangan anda!", 'bx bxs-wink-smile', 'rsvp-menu');
    };
  }

  if (btnTidakHadir) {
    btnTidakHadir.onclick = function () {
      incrementCount('count_tidak_hadir.php', "Maaf, mungkin lain kali.", 'bx bxs-sad', 'rsvp-menu');
    };
  }

  // ============================================================
  // Link ke Google Maps, Waze, WhatsApp, Telefon
  // ============================================================
  window.openGoogleMaps = function () {
    const lat = 3.1927426;
    const lng = 101.5504211;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, "_blank");
  };

  window.openWaze = function () {
    const lat = 3.1927426;
    const lng = 101.5504211;
    window.open(`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`, "_blank");
  };

  window.openWhatsApp = function (phoneNumber) {
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  window.makePhoneCall = function (phoneNumber) {
    window.location.href = `tel:${phoneNumber}`;
  };
});
