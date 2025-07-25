/* ============================================================
 * Buka overlay dan main muzik
 * ========================================================== */
document.getElementById("toggle-content").addEventListener("click", function () {
    var wrapper = document.querySelector(".wrapper");
    var card = document.querySelector(".card");

    wrapper.classList.add("hidden");

    wrapper.addEventListener("transitionend", function () {
        wrapper.style.display = "none";
        card.style.display = "block";
    }, { once: true });

    const audioPlayer = document.getElementById("audio-player");
    audioPlayer.play().catch(e => {
        console.log("Audio autoplay disekat: ", e);
    });
});


/* ============================================================
 * Lokasi: Google Maps & Waze
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


/* ============================================================
 * Toggle Menu Function
 * ========================================================== */
function toggleMenu(menuId) {
    const menu = document.getElementById(menuId);

    if (menu) {
        const isOpen = menu.classList.contains('open');

        // Tutup semua dahulu
        document.querySelectorAll('.toggle-menu.open, .form-section').forEach(el => {
            el.classList.remove('open');
            el.style.display = 'none';
        });

        // Buka kalau belum buka
        if (!isOpen) {
            menu.classList.add('open');
            menu.style.display = 'block';
        }
    }
}


/* ============================================================
 * Toggle Butang: Footer (Location, Music, Contact)
 * ========================================================== */
document.getElementById('location-btn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu('location-menu');
});

document.getElementById('music-btn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu('music-menu');
});

document.getElementById('contact-btn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu('contact-menu');
});


/* ============================================================
 * Toggle Butang: RSVP & Ucapan
 * ========================================================== */
document.getElementById('kehadiran-btn')?.addEventListener('click', (e) => {
    e.stopPropagation();

    const rsvpForm = document.getElementById('rsvp-form');
    const ucapanForm = document.getElementById('ucapan-form');

    rsvpForm.style.display = rsvpForm.style.display === 'block' ? 'none' : 'block';
    ucapanForm.style.display = 'none';
});

document.getElementById('ucapan-btn')?.addEventListener('click', (e) => {
    e.stopPropagation();

    const rsvpForm = document.getElementById('rsvp-form');
    const ucapanForm = document.getElementById('ucapan-form');

    ucapanForm.style.display = ucapanForm.style.display === 'block' ? 'none' : 'block';
    rsvpForm.style.display = 'none';
});


/* ============================================================
 * Klik luar akan tutup semua menu
 * ========================================================== */
document.addEventListener('click', () => {
    document.querySelectorAll('.toggle-menu.open, .form-section').forEach(el => {
        el.classList.remove('open');
        el.style.display = 'none';
    });
});
