"use strict";

/*==========================================================
DOM SELECTORS
==========================================================*/
const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const header = $(".header");
const menuBtn = $(".menu-btn");
const navbar = $(".navbar");
const hero = $(".contact-hero");
const cards = $$(".contact-card");
const enquiryCard = $(".enquiry-card");
const faqItems = $$(".faq-item");
const form = $(".contact-form");
const officeSection = $(".office-section");
const officeMap = $(".office-map");
const officeContent = $(".office-content");
const officeCards = $$(".office-info-grid .office-item");
const directionBtn = $(".office-content .btn-primary");

// Enquiry card EXCLUDED from tilt - keeps form static
const allTiltCards = [...cards, ...officeCards];

let lastScroll = 0;
let ticking = false;

/*==========================================================
AOS INITIALIZATION
==========================================================*/
if (window.AOS) {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: "ease-in-out"
    });
}

/*==========================================================
SCROLL UTILITIES
==========================================================*/
function updateHeader() {
    header?.classList.toggle("sticky", window.scrollY > 80);
}

function hideHeader() {
    const current = window.pageYOffset;
    if (current > 120) {
        header.style.transform = current > lastScroll ? "translateY(-100%)" : "translateY(0)";
    } else {
        header.style.transform = "translateY(0)";
    }
    lastScroll = current;
}

const progress = document.createElement("div");
progress.className = "progress-bar";
document.body.appendChild(progress);

function updateProgress() {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (window.scrollY / total) * 100 + "%";
}

const backTop = document.createElement("button");
backTop.className = "back-top";
backTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
document.body.appendChild(backTop);

backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

function updateBackTop() {
    backTop.classList.toggle("show", window.scrollY > 500);
}

function updateScrollDirection() {
    const current = window.scrollY;
    document.body.dataset.scroll = current > lastScroll ? "down" : "up";
}

function onScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateHeader();
            hideHeader();
            updateProgress();
            updateBackTop();
            updateScrollDirection();
            heroParallax();
            updateOfficeParallax();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener("scroll", onScroll, { passive: true });

/*==========================================================
MOBILE MENU
==========================================================*/
if (menuBtn && navbar) {
    menuBtn.addEventListener("click", () => {
        menuBtn.classList.toggle("active");
        navbar.classList.toggle("active");
        document.body.classList.toggle("menu-open");
    });

    $$(".navbar a").forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("active");
            menuBtn.classList.remove("active");
            document.body.classList.remove("menu-open");
        });
    });
}

/*==========================================================
HERO EFFECTS
==========================================================*/
function heroParallax() {
    if (!hero) return;
    hero.style.backgroundPosition = `center ${window.scrollY * 0.35}px`;
}

if (hero) {
    let zoom = 100;
    (function heroZoom() {
        zoom += 0.002;
        if (zoom >= 108) zoom = 100;
        hero.style.backgroundSize = zoom + "%";
        requestAnimationFrame(heroZoom);
    })();
}

const circles = $$(".hero-circle");
let mouseX = 0, mouseY = 0;

window.addEventListener("mousemove", e => {
    mouseX = (e.clientX - window.innerWidth / 2) / 40;
    mouseY = (e.clientY - window.innerHeight / 2) / 40;
});

(function animateHero() {
    circles.forEach((circle, index) => {
        const speed = index === 0 ? 1 : 1.5;
        circle.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
    });
    requestAnimationFrame(animateHero);
})();

/*==========================================================
SMOOTH SCROLL
==========================================================*/
$$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
        const target = $(anchor.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 90, behavior: "smooth" });
    });
});

/*==========================================================
FAQ ACCORDION
==========================================================*/
faqItems.forEach(item => {
    const button = $(".faq-question", item);
    const answer = $(".faq-answer", item);

    if (item.classList.contains("active")) {
        answer.style.maxHeight = answer.scrollHeight + "px";
    }

    button.addEventListener("click", () => {
        faqItems.forEach(other => {
            if (other !== item) {
                other.classList.remove("active");
                $(".faq-answer", other).style.maxHeight = null;
            }
        });

        item.classList.toggle("active");
        answer.style.maxHeight = item.classList.contains("active") ? answer.scrollHeight + "px" : null;
    });
});

/*==========================================================
CARD TILT EFFECT (Excludes enquiry-card)
==========================================================*/
allTiltCards.forEach(card => {
    let frame;

    card.addEventListener("mousemove", e => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const rotateY = (e.clientX - rect.left - rect.width / 2) / 18;
            const rotateX = (rect.height / 2 - (e.clientY - rect.top)) / 18;
            card.style.transform = `perspective(1800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(15px) scale(1.02)`;
        });
    });

    card.addEventListener("mouseleave", () => {
        card.style.transition = ".45s";
        card.style.transform = "perspective(1800px) rotateX(0deg) rotateY(0deg) translateZ(0) scale(1)";
    });
});

/*==========================================================
ENQUIRY CARD - COMPLETELY STATIC
==========================================================*/
if (enquiryCard) {
    // No tilt, no transform, no movement
    enquiryCard.addEventListener("mousemove", e => {
        const rect = enquiryCard.getBoundingClientRect();
        enquiryCard.style.setProperty("--x", `${e.clientX - rect.left}px`);
        enquiryCard.style.setProperty("--y", `${e.clientY - rect.top}px`);
    });
}

/*==========================================================
CARD SPOTLIGHT & GLOW (Contact cards only)
==========================================================*/
cards.forEach(card => {
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--y", `${e.clientY - rect.top}px`);
    });
});

allTiltCards.forEach(card => {
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        card.style.background = `radial-gradient(circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(255,255,255,.35), rgba(255,255,255,.9) 45%)`;
    });
    card.addEventListener("mouseleave", () => {
        card.style.background = "";
    });

    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
        card.style.boxShadow = `${-x}px ${-y}px 80px rgba(13,92,128,.18)`;
    });
    card.addEventListener("mouseleave", () => {
        card.style.boxShadow = "";
    });

    let offset = Math.random() * 1000;
    (function floating() {
        offset += 0.02;
        card.style.translate = `0 ${Math.sin(offset) * 4}px`;
        requestAnimationFrame(floating);
    })();

    const glow = document.createElement("span");
    glow.className = "card-glow";
    card.appendChild(glow);

    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        glow.style.left = e.clientX - rect.left + "px";
        glow.style.top = e.clientY - rect.top + "px";
        glow.style.opacity = 1;
    });
    card.addEventListener("mouseleave", () => {
        glow.style.opacity = 0;
    });
});

/*==========================================================
MAGNETIC BUTTONS (Excluding submit-btn)
==========================================================*/
$$(".btn-primary, .btn-light").forEach(button => {
    let frame;

    button.addEventListener("mousemove", e => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
            const rect = button.getBoundingClientRect();
            const moveX = (e.clientX - rect.left - rect.width / 2) / 7;
            const moveY = (e.clientY - rect.top - rect.height / 2) / 7;
            button.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    button.addEventListener("mouseleave", () => {
        button.style.transform = "translate(0,0)";
    });

    button.addEventListener("mousedown", () => button.style.scale = ".96");
    button.addEventListener("mouseup", () => button.style.scale = "1");
    button.addEventListener("mouseleave", () => button.style.scale = "1");

    button.addEventListener("mouseenter", () => button.classList.add("shine"));
    button.addEventListener("animationend", () => button.classList.remove("shine"));
});

/*==========================================================
SUBMIT BUTTON - ABSOLUTELY STATIC
==========================================================*/
const submitBtn = $(".submit-btn");
if (submitBtn) {
    // Only subtle press effect
    submitBtn.addEventListener("mousedown", () => submitBtn.style.scale = ".98");
    submitBtn.addEventListener("mouseup", () => submitBtn.style.scale = "1");
    submitBtn.addEventListener("mouseleave", () => submitBtn.style.scale = "1");
}

/*==========================================================
RIPPLE EFFECT (Excluding submit-btn)
==========================================================*/
$$(".btn-primary, .btn-light").forEach(button => {
    button.addEventListener("click", e => {
        const circle = document.createElement("span");
        const size = Math.max(button.clientWidth, button.clientHeight);
        circle.className = "ripple";
        circle.style.width = size + "px";
        circle.style.height = size + "px";
        circle.style.left = e.clientX - button.getBoundingClientRect().left - size / 2 + "px";
        circle.style.top = e.clientY - button.getBoundingClientRect().top - size / 2 + "px";
        button.querySelector(".ripple")?.remove();
        button.appendChild(circle);
    });
});

/*==========================================================
REVEAL ON SCROLL
==========================================================*/
const revealElements = $$(".fade-up, [data-reveal]");
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: "0px 0px -80px 0px" });

revealElements.forEach(el => revealObserver.observe(el));

/*==========================================================
COUNTER ANIMATION
==========================================================*/
const counters = $$("[data-count]");
const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const counter = entry.target;
        const target = parseInt(counter.dataset.count);
        const duration = 1800;
        const start = performance.now();

        (function animate(now) {
            const progress = Math.min((now - start) / duration, 1);
            counter.textContent = Math.floor(target * progress) + "+";
            if (progress < 1) requestAnimationFrame(animate);
        })(start);

        counterObserver.unobserve(counter);
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

/*==========================================================
FORM VALIDATION
==========================================================*/
if (form) {
    const required = $$("input[required], textarea[required]", form);

    required.forEach(input => {
        input.addEventListener("input", () => {
            if (input.value.trim()) {
                input.parentElement.classList.add("filled");
                input.style.borderColor = "#0D5C80";
            } else {
                input.parentElement.classList.remove("filled");
                input.style.borderColor = "";
            }
        });
    });

    form.addEventListener("submit", e => {
        e.preventDefault();
        let valid = true;

        required.forEach(input => {
            if (!input.value.trim()) {
                valid = false;
                input.style.borderColor = "#ff4d4f";
                input.focus();
            }
        });

        if (!valid) return;

        const btn = $(".submit-btn");
        btn.disabled = true;
        btn.innerHTML = "Sending...";

        setTimeout(() => {
            btn.innerHTML = "Message Sent ✓";
            btn.style.background = "#16a34a";
            form.reset();
            setTimeout(() => {
                btn.innerHTML = "Get Free Consultation";
                btn.style.background = "";
                btn.disabled = false;
            }, 2500);
        }, 1200);
    });
}

/*==========================================================
ACTIVE NAVIGATION
==========================================================*/
const sections = $$("section[id]");
const navLinks = $$(".navbar a");

function activeNav() {
    let current = "";
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 180) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", activeNav, { passive: true });

/*==========================================================
INPUT GLOW
==========================================================*/
$$(".input-group input, .input-group textarea, .input-group select").forEach(input => {
    input.addEventListener("focus", () => input.parentElement.classList.add("focus"));
    input.addEventListener("blur", () => input.parentElement.classList.remove("focus"));
});

/*==========================================================
LAZY IMAGE REVEAL
==========================================================*/
const images = $$("img");
const imageObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const img = entry.target;
        img.style.opacity = "1";
        img.style.transform = "scale(1)";
        imageObserver.unobserve(img);
    });
}, { threshold: 0.15 });

images.forEach(img => {
    img.style.opacity = "0";
    img.style.transform = "scale(1.08)";
    img.style.transition = "opacity .8s ease, transform 1.2s ease";
    imageObserver.observe(img);
});

/*==========================================================
MOUSE SPOTLIGHT
==========================================================*/
const spotlight = document.createElement("div");
spotlight.className = "mouse-light";
document.body.appendChild(spotlight);

let mx = 0, my = 0, tx = 0, ty = 0;

window.addEventListener("mousemove", e => {
    tx = e.clientX;
    ty = e.clientY;
});

(function animateSpotlight() {
    mx += (tx - mx) * 0.12;
    my += (ty - my) * 0.12;
    spotlight.style.transform = `translate(${mx}px, ${my}px)`;
    requestAnimationFrame(animateSpotlight);
})();

/*==========================================================
MAGNETIC ICONS
==========================================================*/
$$(".contact-icon").forEach(icon => {
    icon.addEventListener("mousemove", e => {
        const rect = icon.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 4;
        const y = (e.clientY - rect.top - rect.height / 2) / 4;
        icon.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
    });
    icon.addEventListener("mouseleave", () => {
        icon.style.transform = "translate(0,0) scale(1)";
    });
});

/*==========================================================
OFFICE SECTION
==========================================================*/
function updateOfficeParallax() {
    if (!officeContent) return;
    const rect = officeContent.getBoundingClientRect();
    const offset = rect.top - window.innerHeight;
    officeContent.style.transform = `translateY(${offset * -0.03}px)`;
}

if (officeMap) {
    let mapFrame;
    officeMap.addEventListener("mousemove", e => {
        cancelAnimationFrame(mapFrame);
        mapFrame = requestAnimationFrame(() => {
            const rect = officeMap.getBoundingClientRect();
            const rotateY = (e.clientX - rect.left - rect.width / 2) / 40;
            const rotateX = (rect.height / 2 - (e.clientY - rect.top)) / 40;
            officeMap.style.transform = `perspective(1800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });
    });

    officeMap.addEventListener("mouseleave", () => {
        officeMap.style.transform = "perspective(1800px) rotateX(0) rotateY(0) translateY(0)";
    });

    officeMap.addEventListener("click", e => {
        const rect = officeMap.getBoundingClientRect();
        const ripple = document.createElement("span");
        ripple.className = "map-ripple";
        ripple.style.left = e.clientX - rect.left + "px";
        ripple.style.top = e.clientY - rect.top + "px";
        officeMap.appendChild(ripple);
        setTimeout(() => ripple.remove(), 1000);
    });

    officeMap.addEventListener("dblclick", () => {
        window.open("https://maps.google.com/?q=Living+Assets+Builder+Private+Limited", "_blank");
    });
}

const officeGrid = $(".office-info-grid");
if (officeGrid) {
    const officeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                officeCards.forEach((card, index) => {
                    setTimeout(() => card.classList.add("show"), index * 120);
                });
                officeObserver.disconnect();
            }
        });
    }, { threshold: 0.2 });
    officeObserver.observe(officeGrid);
}

officeCards.forEach(card => {
    let cardFrame;
    card.addEventListener("mousemove", e => {
        cancelAnimationFrame(cardFrame);
        cardFrame = requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const rotateY = (e.clientX - rect.left - rect.width / 2) / 18;
            const rotateX = (rect.height / 2 - (e.clientY - rect.top)) / 18;
            card.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
    });
});

officeCards.forEach(card => {
    const icon = card.querySelector("i");
    if (!icon) return;
    card.addEventListener("mouseenter", () => {
        icon.animate([
            { transform: "translateY(0) rotate(0)" },
            { transform: "translateY(-8px) rotate(-8deg)" },
            { transform: "translateY(0)" }
        ], { duration: 500, easing: "ease" });
    });
});

const [addressCard, phoneCard, emailCard, hoursCard] = officeCards;

if (addressCard) {
    addressCard.style.cursor = "pointer";
    addressCard.addEventListener("click", () => {
        window.open("https://maps.google.com/?q=Living+Assets+Builder+Private+Limited", "_blank");
    });
}

if (phoneCard) {
    phoneCard.style.cursor = "pointer";
    phoneCard.addEventListener("click", () => {
        window.location.href = "tel:+919884467898";
    });
}

if (emailCard) {
    emailCard.style.cursor = "pointer";
    emailCard.addEventListener("click", () => {
        window.location.href = "mailto:info@livingassetsbuilder.com";
    });
}

if (hoursCard) {
    const now = new Date();
    const hour = now.getHours();
    const status = document.createElement("small");
    status.style.display = "block";
    status.style.marginTop = "10px";
    status.style.fontWeight = "600";
    status.style.color = (hour >= 9 && hour < 18) ? "#16a34a" : "#ef4444";
    status.textContent = (hour >= 9 && hour < 18) ? "● Open Now" : "● Closed";
    hoursCard.appendChild(status);
}

officeCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        officeCards.forEach(item => {
            if (item !== card) {
                item.style.opacity = ".6";
                item.style.scale = ".97";
            }
        });
    });
    card.addEventListener("mouseleave", () => {
        officeCards.forEach(item => {
            item.style.opacity = "1";
            item.style.scale = "1";
        });
    });
});

if (directionBtn) {
    directionBtn.addEventListener("mousemove", e => {
        const rect = directionBtn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 6;
        const y = (e.clientY - rect.top - rect.height / 2) / 6;
        directionBtn.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
    });
    directionBtn.addEventListener("mouseleave", () => {
        directionBtn.style.transform = "";
    });
}

/*==========================================================
PAGE VISIBILITY
==========================================================*/
document.addEventListener("visibilitychange", () => {
    document.documentElement.classList.toggle("page-hidden", document.hidden);
});

window.addEventListener("focus", () => document.body.classList.remove("page-hidden"));
window.addEventListener("blur", () => document.body.classList.add("page-hidden"));

window.addEventListener("load", () => {
    document.body.classList.add("loaded");
    const preloader = $(".preloader");
    if (preloader) {
        preloader.classList.add("hide");
        setTimeout(() => preloader.remove(), 700);
    }
});

window.addEventListener("pageshow", () => {
    updateHeader();
    updateProgress();
    updateBackTop();
    activeNav();
});

/*==========================================================
WINDOW RESIZE
==========================================================*/
window.addEventListener("resize", () => {
    heroParallax();
    activeNav();
});

/*==========================================================
COPYRIGHT YEAR
==========================================================*/
const year = $(".year");
if (year) year.textContent = new Date().getFullYear();

/*==========================================================
INITIALIZE
==========================================================*/
updateHeader();
updateProgress();
updateBackTop();
activeNav();
heroParallax();
document.body.classList.add("js-loaded");
window.dispatchEvent(new Event("scroll"));
window.dispatchEvent(new Event("resize"));

/*==========================================================
CONSOLE BRAND
==========================================================*/
console.log("%cLiving Assets Builder", "color:#0D5C80;font-size:18px;font-weight:bold");
console.log("%cPremium Contact Page Loaded ✓", "color:#16a34a;font-size:14px");
