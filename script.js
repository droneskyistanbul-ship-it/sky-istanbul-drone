console.log("Sky İstanbul Drone web sitesi hazır.");

/* Scroll animation */
const revealElements = document.querySelectorAll(
    ".services, .why-us, .packages, .package-card, .why-card, .service-card, .stats"
);

revealElements.forEach((el) => {
    el.classList.add("reveal");
});

function revealOnScroll() {
    revealElements.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* Animated counters */
const counters = document.querySelectorAll("[data-count]");
let countersStarted = false;

function animateCounters() {
    const statsSection = document.querySelector(".stats");
    if (!statsSection || countersStarted) return;

    const sectionTop = statsSection.getBoundingClientRect().top;

    if (sectionTop < window.innerHeight - 100) {
        countersStarted = true;

        counters.forEach((counter) => {
            const target = +counter.getAttribute("data-count");
            let current = 0;
            const speed = target / 80;

            const updateCounter = () => {
                current += speed;

                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target === 100 ? "%100" : `+${target}`;
                }
            };

            updateCounter();
        });
    }
}

window.addEventListener("scroll", animateCounters);
window.addEventListener("load", animateCounters);

const particlesContainer = document.getElementById("particles");

if (particlesContainer) {
    particlesContainer.innerHTML = "";

    for (let i = 0; i < 45; i++) {
        const particle = document.createElement("span");

        particle.classList.add("particle");

        const size = Math.random() * 3 + 2;

        particle.style.width = size + "px";
        particle.style.height = size + "px";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.animationDuration = 12 + Math.random() * 18 + "s";
        particle.style.animationDelay = Math.random() * 8 + "s";

        particlesContainer.appendChild(particle);
    }
}
const languageBtn = document.getElementById("languageBtn");
const languageMenu = document.getElementById("languageMenu");

if (languageBtn && languageMenu) {
    languageBtn.addEventListener("click", () => {
        languageMenu.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".language-dropdown")) {
            languageMenu.classList.remove("active");
        }
    });
}

function changeGoogleTranslateLanguage(lang) {
    const select = document.querySelector(".goog-te-combo");

    if (!select) {
        setTimeout(() => changeGoogleTranslateLanguage(lang), 500);
        return;
    }

    select.value = lang;
    select.dispatchEvent(new Event("change"));
}

document.querySelectorAll(".language-menu button").forEach((button) => {
    button.addEventListener("click", () => {
        const lang = button.getAttribute("data-lang");
        changeGoogleTranslateLanguage(lang);
        languageMenu.classList.remove("active");
    });
});