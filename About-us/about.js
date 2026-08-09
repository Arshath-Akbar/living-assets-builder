/*=========================================================
    ABOUT PAGE – Living Assets Builder
    Corrected & Optimized
=========================================================*/

'use strict';

/*=========================================================
CONFIG
=========================================================*/
const CONFIG = {
    animationDuration: 800,
    counterDuration: 2500,
    revealDistance: 80,
    revealThreshold: 0.15,
    navbarOffset: 120
};

/*=========================================================
HELPERS
=========================================================*/
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

/*=========================================================
PRELOADER (if needed)
=========================================================*/
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

/*=========================================================
SMOOTH SCROLL (internal links)
=========================================================*/
$$('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
        const id = link.getAttribute("href");
        if (id === "#") return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        window.scrollTo({
            top: target.offsetTop - CONFIG.navbarOffset,
            behavior: "smooth"
        });
    });
});

/*=========================================================
SECTION REVEAL (fade-in on scroll)
=========================================================*/
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: CONFIG.revealThreshold });

$$("section").forEach(section => {
    section.classList.add("reveal");
    revealObserver.observe(section);
});

/*=========================================================
STAGGER CARDS (vm-card & journey-card)
=========================================================*/
const cardObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".journey-card, .vm-card");
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add("show");
                }, index * 120);
            });
        }
    });
}, { threshold: 0.2 });

// Observe the timeline wrapper and the vision/mission grid
const journeyTimeline = $(".journey-timeline");
const vmGrid = $(".vm-grid");
if (journeyTimeline) cardObserver.observe(journeyTimeline);
if (vmGrid) cardObserver.observe(vmGrid);

/*=========================================================
HERO PARALLAX
=========================================================*/
const heroImage = $(".hero-image");
if (heroImage) {
    window.addEventListener("scroll", () => {
        const scroll = window.scrollY;
        heroImage.style.transform = `translateY(${scroll * 0.12}px)`;
    });
}

/*=========================================================
BUTTON RIPPLE
=========================================================*/
$$(".btn-primary, .btn-secondary").forEach(button => {
    button.addEventListener("click", function (e) {
        const ripple = document.createElement("span");
        const rect = this.getBoundingClientRect();
        ripple.className = "ripple";
        ripple.style.left = (e.clientX - rect.left) + "px";
        ripple.style.top = (e.clientY - rect.top) + "px";
        this.appendChild(ripple);
        setTimeout(() => {
            ripple.remove();
        }, 700);
    });
});

/*=========================================================
ACTIVE NAV (works when navbar is present)
=========================================================*/
const sections = $$("section");
const navLinks = $$(".navbar a");
window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 160) {
            current = section.id;
        }
    });
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

/*=========================================================
APPLE 3D TILT (on vm-card and journey-card)
=========================================================*/
const tiltCards = document.querySelectorAll(".vm-card, .journey-card");
tiltCards.forEach(card => {
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (centerY - y) / 18;
        const rotateY = (x - centerX) / 18;
        card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.03)`;
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = `perspective(1200px) rotateX(0) rotateY(0) translateY(0) scale(1)`;
    });
});

/*=========================================================
FOUNDER IMAGES FLOAT (applies to all founder photos)
=========================================================*/
const founderImages = document.querySelectorAll(".founder-photo img");
if (founderImages.length > 0) {
    window.addEventListener("mousemove", e => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        founderImages.forEach(img => {
            img.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

/*=========================================================
TIMELINE PROGRESS (journey-timeline)
=========================================================*/
const journey = document.querySelector(".journey-timeline");
if (journey) {
    const progress = document.createElement("div");
    progress.className = "timeline-progress";
    journey.appendChild(progress);
    window.addEventListener("scroll", () => {
        const rect = journey.getBoundingClientRect();
        const total = journey.offsetHeight;
        const visible = Math.min(Math.max(window.innerHeight - rect.top, 0), total);
        progress.style.height = visible + "px";
    });
}

/*=========================================================
PROCESS ROADMAP PROGRESS (roadmap)
=========================================================*/
const roadmap = document.querySelector(".roadmap");
if (roadmap) {
    const line = document.createElement("div");
    line.className = "roadmap-progress";
    roadmap.appendChild(line);
    window.addEventListener("scroll", () => {
        const rect = roadmap.getBoundingClientRect();
        const total = roadmap.offsetHeight;
        const visible = Math.min(Math.max(window.innerHeight - rect.top, 0), total);
        line.style.height = visible + "px";
    });
}

/*=========================================================
SCROLL PROGRESS BAR (top of page)
=========================================================*/
const progressBar = document.createElement("div");
progressBar.className = "scroll-progress";
document.body.appendChild(progressBar);
window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / height) * 100;
    progressBar.style.width = progress + "%";
});

/*=========================================================
BACK TO TOP
=========================================================*/
const backBtn = document.createElement("button");
backBtn.className = "back-to-top";
backBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backBtn);
window.addEventListener("scroll", () => {
    backBtn.classList.toggle("show", window.scrollY > 700);
});
backBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

/*=========================================================
THROTTLE / DEBOUNCE (utility)
=========================================================*/
function throttle(func, limit) {
    let waiting = false;
    return function () {
        if (!waiting) {
            func.apply(this, arguments);
            waiting = true;
            setTimeout(() => { waiting = false; }, limit);
        }
    };
}

function debounce(func, delay) {
    let timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, arguments); }, delay);
    };
}

window.addEventListener("resize", debounce(() => {
    document.body.classList.add("resizing");
    setTimeout(() => { document.body.classList.remove("resizing"); }, 300);
}, 250));

/*=========================================================
KEYBOARD ACCESSIBILITY
=========================================================*/
document.addEventListener("keyup", e => {
    if (e.key === "Tab") {
        document.body.classList.add("keyboard-user");
    }
});

/*=========================================================
PAGE VISIBILITY (pause animations when hidden)
=========================================================*/
document.addEventListener("visibilitychange", () => {
    document.body.classList.toggle("paused", document.hidden);
});

/*=========================================================
INITIALIZATION
=========================================================*/
function init() {
    document.body.classList.add("about-loaded");
    console.log("%cLiving Assets Builder", "color:#0D5C80;font-size:18px;font-weight:bold;");
    console.log("%cPremium About Page Initialized", "color:#1b9ad1;font-size:14px;");
}
document.addEventListener("DOMContentLoaded", init);