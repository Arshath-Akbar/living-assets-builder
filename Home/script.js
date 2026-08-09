"use strict";

/*==================================================
STICKY HEADER
==================================================*/
const header = document.querySelector(".header");

if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      header.style.background = "rgba(8,60,84,.98)";
      header.style.boxShadow = "0 10px 35px rgba(0,0,0,.15)";
    } else {
      header.style.background = "rgba(13,92,128,.92)";
      header.style.boxShadow = "none";
    }
  });
}


/*==================================================
MOBILE MENU
==================================================*/
const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");

if (menuBtn && navbar) {
  menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("show-menu");
    menuBtn.classList.toggle("active");
  });
}

/*==================================================
SMOOTH SCROLL
==================================================*/
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  });
});

/*==================================================
BUTTON EFFECT
==================================================*/
const buttons = document.querySelectorAll(".btn-primary,.submit-btn");

buttons.forEach((button) => {
  button.addEventListener("mouseenter", () => {
    button.style.transform = "translateY(-4px) scale(1.02)";
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "";
  });
});

/*==================================================
PARALLAX SHAPES
==================================================*/
const shapes = document.querySelectorAll(".shape");

window.addEventListener("mousemove", (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 12;
    shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
});

/*==================================================
SCROLL REVEAL
==================================================*/
const revealItems = document.querySelectorAll(
  ".hero-left,.hero-right,.hero-stats,.hero-buttons,.highlight-box"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => {
  item.style.opacity = "0";
  item.style.transform = "translateY(60px)";
  item.style.transition = ".8s ease";
  revealObserver.observe(item);
});

/*==================================================
INPUT FOCUS EFFECT
==================================================*/
document
  .querySelectorAll(".input-group input,.input-group textarea,.input-group select")
  .forEach((input) => {
    input.addEventListener("focus", () => {
      input.parentElement.style.transform = "translateY(-3px)";
    });

    input.addEventListener("blur", () => {
      input.parentElement.style.transform = "translateY(0)";
    });
  });

/*==================================================
HERO FORM
==================================================*/
const heroForm = document.querySelector(".hero-form");

if (heroForm) {
  heroForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const button = heroForm.querySelector(".submit-btn");
    button.innerHTML = "Submitting...";
    button.disabled = true;

    setTimeout(() => {
      button.innerHTML = "Request Sent ✓";
      button.style.background = "#28a745";
    }, 1500);
  });
}

/*==================================================
NUMBER COUNT-UP
==================================================*/
const stats = document.querySelectorAll(".stat h2");

const countAnimation = () => {
  stats.forEach((stat) => {
    const text = stat.textContent;
    const target = parseInt(text.replace(/\D/g, ""));
    let count = 0;
    const increment = Math.ceil(target / 80);

    const interval = setInterval(() => {
      count += increment;

      if (count >= target) {
        stat.textContent = text;
        clearInterval(interval);
      } else {
        stat.textContent = count + "+";
      }
    }, 20);
  });
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      countAnimation();
      statsObserver.disconnect();
    }
  });
});

if (document.querySelector(".hero-stats")) {
  statsObserver.observe(document.querySelector(".hero-stats"));
}

/*==================================================
ACHIEVEMENTS
==================================================*/
const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = Number(counter.dataset.target);
      let current = 0;
      const increment = Math.ceil(target / 120);

      const updateCounter = () => {
        current += increment;

        if (current >= target) {
          counter.textContent = target.toLocaleString();
        } else {
          counter.textContent = current.toLocaleString();
          requestAnimationFrame(updateCounter);
        }
      };

      updateCounter();
      counterObserver.unobserve(counter);
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => {
  counterObserver.observe(counter);
});

const achievementCards = document.querySelectorAll(".achievement-card");

const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show-card");
        cardObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

achievementCards.forEach((card, index) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(80px)";
  card.style.transition = `all .8s ease ${index * 0.12}s`;
  cardObserver.observe(card);
});

achievementCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = (x - rect.width / 2) / 18;
    const rotateX = (rect.height / 2 - y) / 18;

    card.style.transform = `
      perspective(1200px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-10px)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = `
      perspective(1200px)
      rotateX(0)
      rotateY(0)
      translateY(0)
    `;
  });
});

const style = document.createElement("style");
style.innerHTML = `
  .show-card {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

/*==================================================
ABOUT US
==================================================*/
const aboutImage = document.querySelector(".about-image");

if (aboutImage) {
  aboutImage.addEventListener("mousemove", (e) => {
    const rect = aboutImage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = (x - rect.width / 2) / 22;
    const rotateX = (rect.height / 2 - y) / 22;

    aboutImage.style.transform = `
      perspective(1600px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.02)
    `;
  });

  aboutImage.addEventListener("mouseleave", () => {
    aboutImage.style.transform = `
      perspective(1600px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
  });
}

const aboutItems = document.querySelectorAll(
  ".about-left,.about-right,.feature-item,.experience-box,.customer-box"
);

const aboutObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("about-show");
        aboutObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

aboutItems.forEach((item, index) => {
  item.style.opacity = "0";
  item.style.transform = "translateY(60px)";
  item.style.transition = `all .8s ease ${index * 0.12}s`;
  aboutObserver.observe(item);
});

document.querySelectorAll(".feature-item").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = (rect.height / 2 - y) / 28;
    const ry = (x - rect.width / 2) / 28;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rx}deg)
      rotateY(${ry}deg)
      translateY(-8px)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
  });
});

const floatingBoxes = document.querySelectorAll(".experience-box,.customer-box");

floatingBoxes.forEach((box, index) => {
  box.animate(
    [
      { transform: "translateY(0px)" },
      { transform: "translateY(-12px)" },
      { transform: "translateY(0px)" },
    ],
    {
      duration: 3000 + index * 500,
      iterations: Infinity,
      easing: "ease-in-out",
    }
  );
});

const aboutStyle = document.createElement("style");
aboutStyle.innerHTML = `
  .about-show {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(aboutStyle);

/*==================================================
WHY CHOOSE US
==================================================*/
const whyCards = document.querySelectorAll(".why-card");

const whyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("why-show");
        whyObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

whyCards.forEach((card, index) => {
  card.style.transition = `all .8s ease ${index * 0.12}s`;
  whyObserver.observe(card);
});

whyCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = (x - rect.width / 2) / 18;
    const rotateX = (rect.height / 2 - y) / 18;

    card.style.transform = `
      perspective(1200px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-12px)
      scale(1.02)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = `
      perspective(1200px)
      rotateX(0deg)
      rotateY(0deg)
      translateY(0)
      scale(1)
    `;
  });
});

/*==================================================
WHY ICON EFFECT
==================================================*/
document.querySelectorAll(".why-icon").forEach((icon) => {
  icon.addEventListener("mousemove", (e) => {
    const rect = icon.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const moveX = (x - rect.width / 2) / 8;
    const moveY = (y - rect.height / 2) / 8;

    icon.style.transform = `translate(${moveX}px,${moveY}px) rotateY(360deg)`;
  });

  icon.addEventListener("mouseleave", () => {
    icon.style.transform = "translate(0,0)";
  });
});

/*==================================================
WHY CARD LIGHT EFFECT
==================================================*/
whyCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(13,92,128,.10), #ffffff 45%)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.background = "#ffffff";
  });
});

/*==================================================
WHY CARD FLOAT
==================================================*/
whyCards.forEach((card, index) => {
  card.animate(
    [
      { transform: "translateY(0px)" },
      { transform: "translateY(-8px)" },
      { transform: "translateY(0px)" },
    ],
    {
      duration: 3500 + index * 250,
      iterations: Infinity,
      easing: "ease-in-out",
    }
  );
});

/*==================================================
WHY SHOW STYLE
==================================================*/
const whyStyle = document.createElement("style");
whyStyle.innerHTML = `
  .why-show {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(whyStyle);

/*==================================================
NEARBY CONNECTIVITY — GUDUVANCHERI 10 KM EXPLORER
(first implementation)
==================================================*/
document.addEventListener("DOMContentLoaded", () => {
  const connectivitySection = document.querySelector(".connectivity");
  if (!connectivitySection) return;

  /*==================================================
  CONNECTIVITY DATA
  ==================================================*/
  const connectivityData = {
    education: {
      title: "Education",
      subcategories: {
        schools: {
          title: "Schools Near Guduvancheri",
          description: "Explore schools located within approximately 10 KM of Guduvancheri.",
          icon: "fa-school",
          subtitle: "Nearby Schools",
          places: [
            {
              name: "School Name",
              type: "CBSE School",
              location: "Guduvancheri",
              distance: "-- KM",
              time: "Approx. -- Min",
              tag: "CBSE",
              icon: "fa-graduation-cap",
            },
            {
              name: "School Name",
              type: "School",
              location: "Guduvancheri",
              distance: "-- KM",
              time: "Approx. -- Min",
              tag: "School",
              icon: "fa-school",
            },
            {
              name: "School Name",
              type: "Matriculation School",
              location: "Guduvancheri",
              distance: "-- KM",
              time: "Approx. -- Min",
              tag: "Matriculation",
              icon: "fa-graduation-cap",
            },
          ],
        },
        colleges: {
          title: "Colleges Near Guduvancheri",
          description: "Explore colleges and higher education institutions around Guduvancheri.",
          icon: "fa-building-columns",
          subtitle: "Nearby Colleges",
          places: [
            {
              name: "College Name",
              type: "College",
              location: "Guduvancheri",
              distance: "-- KM",
              time: "Approx. -- Min",
              tag: "College",
              icon: "fa-building-columns",
            },
            {
              name: "College Name",
              type: "Engineering College",
              location: "Near Guduvancheri",
              distance: "-- KM",
              time: "Approx. -- Min",
              tag: "Engineering",
              icon: "fa-building-columns",
            },
          ],
        },
        universities: {
          title: "Universities Near Guduvancheri",
          description: "Explore universities accessible from Guduvancheri and the surrounding area.",
          icon: "fa-graduation-cap",
          subtitle: "Nearby Universities",
          places: [
            {
              name: "University Name",
              type: "University",
              location: "Near Guduvancheri",
              distance: "-- KM",
              time: "Approx. -- Min",
              tag: "University",
              icon: "fa-graduation-cap",
            },
          ],
        },
        preschools: {
          title: "Preschools Near Guduvancheri",
          description: "Explore preschool and early-learning options around Guduvancheri.",
          icon: "fa-child-reaching",
          subtitle: "Early Education",
          places: [
            {
              name: "Preschool Name",
              type: "Preschool",
              location: "Guduvancheri",
              distance: "-- KM",
              time: "Approx. -- Min",
              tag: "Preschool",
              icon: "fa-child-reaching",
            },
          ],
        },
      },
    },

    healthcare: {
      title: "Healthcare",
      subcategories: {
        hospitals: {
          title: "Hospitals Near Guduvancheri",
          description: "Explore hospitals and medical facilities around Guduvancheri.",
          icon: "fa-hospital",
          subtitle: "Hospitals & Care",
          places: [
            {
              name: "Hospital Name",
              type: "Hospital",
              location: "Guduvancheri",
              distance: "-- KM",
              time: "Approx. -- Min",
              tag: "Healthcare",
              icon: "fa-hospital",
            },
            {
              name: "Clinic Name",
              type: "Clinic",
              location: "Guduvancheri",
              distance: "-- KM",
              time: "Approx. -- Min",
              tag: "Clinic",
              icon: "fa-stethoscope",
            },
          ],
        },
        pharmacies: {
          title: "Pharmacies Near Guduvancheri",
          description: "Explore pharmacies and medicine stores around Guduvancheri.",
          icon: "fa-prescription-bottle-medical",
          subtitle: "Pharmacies",
          places: [
            {
              name: "Pharmacy Name",
              type: "Pharmacy",
              location: "Guduvancheri",
              distance: "-- KM",
              time: "Approx. -- Min",
              tag: "Pharmacy",
              icon: "fa-prescription-bottle-medical",
            },
          ],
        },
      },
    },

    shopping: {
      title: "Shopping",
      subcategories: {
        supermarkets: {
          title: "Supermarkets Near Guduvancheri",
          description: "Explore supermarkets and everyday shopping options.",
          icon: "fa-cart-shopping",
          subtitle: "Daily Shopping",
          places: [
            {
              name: "Supermarket Name",
              type: "Supermarket",
              location: "Guduvancheri",
              distance: "-- KM",
              time: "Approx. -- Min",
              tag: "Shopping",
              icon: "fa-cart-shopping",
            },
          ],
        },
        malls: {
          title: "Shopping Destinations Near Guduvancheri",
          description: "Explore shopping and retail destinations around Guduvancheri.",
          icon: "fa-bag-shopping",
          subtitle: "Retail & Malls",
          places: [
            {
              name: "Shopping Destination",
              type: "Shopping",
              location: "Near Guduvancheri",
              distance: "-- KM",
              time: "Approx. -- Min",
              tag: "Retail",
              icon: "fa-bag-shopping",
            },
          ],
        },
      },
    },

    transport: {
      title: "Transport",
      subcategories: {
        railway: {
          title: "Railway Connectivity",
          description: "Explore railway connectivity around Guduvancheri.",
          icon: "fa-train",
          subtitle: "Railway Stations",
          places: [
            {
              name: "Guduvancheri Railway Station",
              type: "Railway Station",
              location: "Guduvancheri",
              distance: "-- KM",
              time: "Approx. -- Min",
              tag: "Rail",
              icon: "fa-train",
            },
          ],
        },
        bus: {
          title: "Bus Connectivity",
          description: "Explore bus stops and public transport around Guduvancheri.",
          icon: "fa-bus",
          subtitle: "Bus Connectivity",
          places: [
            {
              name: "Bus Stop / Bus Stand",
              type: "Bus Transport",
              location: "Guduvancheri",
              distance: "-- KM",
              time: "Approx. -- Min",
              tag: "Bus",
              icon: "fa-bus",
            },
          ],
        },
        roads: {
          title: "Road Connectivity",
          description: "Explore major roads and highway access around Guduvancheri.",
          icon: "fa-road",
          subtitle: "Road Access",
          places: [
            {
              name: "GST Road",
              type: "Major Road",
              location: "Guduvancheri",
              distance: "-- KM",
              time: "Approx. -- Min",
              tag: "Road",
              icon: "fa-road",
            },
          ],
        },
      },
    },

    dining: {
      title: "Dining",
      subcategories: {
        restaurants: {
          title: "Restaurants Near Guduvancheri",
          description: "Explore restaurants and dining options around Guduvancheri.",
          icon: "fa-utensils",
          subtitle: "Nearby restaurants",
          places: [
            {
              name: "Restaurant Name",
              type: "Restaurant",
              location: "Guduvancheri",
              distance: "-- KM",
              time: "Approx. -- Min",
              tag: "Dining",
              icon: "fa-utensils",
            },
          ],
        },
        cafes: {
          title: "Cafés Near Guduvancheri",
          description: "Explore cafés and coffee destinations around Guduvancheri.",
          icon: "fa-mug-hot",
          subtitle: "Cafés & coffee",
          places: [
            {
              name: "Cafe Name",
              type: "Cafe",
              location: "Guduvancheri",
              distance: "-- KM",
              time: "Approx. -- Min",
              tag: "Cafe",
              icon: "fa-mug-hot",
            },
          ],
        },
        bakeries: {
          title: "Bakeries Near Guduvancheri",
          description: "Explore bakeries and quick-bite destinations around Guduvancheri.",
          icon: "fa-bread-slice",
          subtitle: "Bakeries",
          places: [
            {
              name: "Bakery Name",
              type: "Bakery",
              location: "Guduvancheri",
              distance: "-- KM",
              time: "Approx. -- Min",
              tag: "Bakery",
              icon: "fa-bread-slice",
            },
          ],
        },
      },
    },

    entertainment: {
      title: "Entertainment",
      subcategories: {
        cinemas: {
          title: "Cinemas Near Guduvancheri",
          description: "Explore cinemas and entertainment destinations around Guduvancheri.",
          icon: "fa-film",
          subtitle: "Cinema & movies",
          places: [
            {
              name: "Cinema Name",
              type: "Cinema",
              location: "Near Guduvancheri",
              distance: "-- KM",
              time: "Approx. -- Min",
              tag: "Cinema",
              icon: "fa-film",
            },
          ],
        },
        recreation: {
          title: "Recreation Near Guduvancheri",
          description: "Explore recreation and entertainment options accessible from Guduvancheri.",
          icon: "fa-ticket",
          subtitle: "Entertainment",
          places: [
            {
              name: "Entertainment Centre",
              type: "Recreation",
              location: "Near Guduvancheri",
              distance: "-- KM",
              time: "Approx. -- Min",
              tag: "Entertainment",
              icon: "fa-ticket",
            },
          ],
        },
      },
    },

    leisure: {
      title: "Leisure",
      subcategories: {
        parks: {
          title: "Parks Near Guduvancheri",
          description: "Explore parks and green spaces around Guduvancheri.",
          icon: "fa-tree",
          subtitle: "Parks & green spaces",
          places: [
            {
              name: "Park Name",
              type: "Park",
              location: "Guduvancheri",
              distance: "-- KM",
              time: "Approx. -- Min",
              tag: "Park",
              icon: "fa-tree",
            },
          ],
        },
        fitness: {
          title: "Fitness Near Guduvancheri",
          description: "Explore gyms and fitness facilities around Guduvancheri.",
          icon: "fa-dumbbell",
          subtitle: "Gyms & fitness",
          places: [
            {
              name: "Fitness Centre",
              type: "Fitness",
              location: "Guduvancheri",
              distance: "-- KM",
              time: "Approx. -- Min",
              tag: "Fitness",
              icon: "fa-dumbbell",
            },
          ],
        },
        sports: {
          title: "Sports Near Guduvancheri",
          description: "Explore sports and recreation facilities around Guduvancheri.",
          icon: "fa-person-running",
          subtitle: "Sports facilities",
          places: [
            {
              name: "Sports Facility",
              type: "Sports",
              location: "Near Guduvancheri",
              distance: "-- KM",
              time: "Approx. -- Min",
              tag: "Sports",
              icon: "fa-person-running",
            },
          ],
        },
      },
    },

    work: {
      title: "Work",
      subcategories: {
        itparks: {
          title: "IT Parks Near Guduvancheri",
          description: "Explore IT parks and technology employment hubs accessible from Guduvancheri.",
          icon: "fa-laptop-code",
          subtitle: "IT & technology",
          places: [
            {
              name: "IT Park",
              type: "IT Hub",
              location: "Near Guduvancheri",
              distance: "-- KM",
              time: "Approx. -- Min",
              tag: "IT Park",
              icon: "fa-laptop-code",
            },
          ],
        },
        business: {
          title: "Business Hubs Near Guduvancheri",
          description: "Explore business and employment destinations accessible from Guduvancheri.",
          icon: "fa-building",
          subtitle: "Business hubs",
          places: [
            {
              name: "Business Park",
              type: "Business Hub",
              location: "Near Guduvancheri",
              distance: "-- KM",
              time: "Approx. -- Min",
              tag: "Business",
              icon: "fa-building",
            },
          ],
        },
        industrial: {
          title: "Industrial Hubs Near Guduvancheri",
          description: "Explore industrial and manufacturing areas accessible from Guduvancheri.",
          icon: "fa-industry",
          subtitle: "Industrial areas",
          places: [
            {
              name: "Industrial Area",
              type: "Industrial Hub",
              location: "Near Guduvancheri",
              distance: "-- KM",
              time: "Approx. -- Min",
              tag: "Industrial",
              icon: "fa-industry",
            },
          ],
        },
      },
    },
  };

  /*==================================================
  CONNECTIVITY ELEMENTS
  ==================================================*/
  const categoryTabs = connectivitySection.querySelectorAll(".connectivity-tab");
  const categoryTitle = connectivitySection.querySelector("#connectivityCategoryTitle");
  const subcategoryContainer = connectivitySection.querySelector("#connectivitySubcategories");
  const detailsLabel = connectivitySection.querySelector("#connectivityDetailsLabel");
  const detailsTitle = connectivitySection.querySelector("#connectivityDetailsTitle");
  const detailsDescription = connectivitySection.querySelector("#connectivityDetailsDescription");
  const resultsContainer = connectivitySection.querySelector("#connectivityResults");

  /*==================================================
  SUBCATEGORY DISPLAY NAMES
  ==================================================*/
  function getSubcategoryName(key) {
    const names = {
      schools: "Schools",
      colleges: "Colleges",
      universities: "Universities",
      preschools: "Preschools",
      hospitals: "Hospitals",
      clinics: "Clinics",
      diagnostics: "Diagnostics",
      pharmacies: "Pharmacies",
      supermarkets: "Supermarkets",
      shoppingcentres: "Shopping Centres",
      markets: "Local Markets",
      essentials: "Daily Essentials",
      railway: "Railway",
      bus: "Bus",
      roads: "Major Roads",
      restaurants: "Restaurants",
      cafes: "Cafés",
      bakeries: "Bakeries",
      cinemas: "Cinemas",
      recreation: "Recreation",
      parks: "Parks",
      fitness: "Fitness",
      sports: "Sports",
      itparks: "IT Parks",
      business: "Business Hubs",
      industrial: "Industrial Hubs",
    };

    return names[key] || key;
  }

  /*==================================================
  CREATE SUBCATEGORY BUTTON
  ==================================================*/
  function createSubcategoryButton(key, data, active = false) {
    return `
      <button class="connectivity-subcategory ${active ? "active" : ""}" type="button" data-subcategory="${key}">
        <div class="subcategory-icon">
          <i class="fa-solid ${data.icon}"></i>
        </div>
        <div class="subcategory-text">
          <strong>${getSubcategoryName(key)}</strong>
          <span>${data.subtitle}</span>
        </div>
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    `;
  }

  /*==================================================
  CREATE RESULT CARD
  ==================================================*/
  function createResultCard(place, index) {
    const number = String(index + 1).padStart(2, "0");

    return `
      <article class="connectivity-result-card">
        <div class="result-number">${number}</div>
        <div class="result-content">
          <div class="result-top">
            <div>
              <span class="result-type">${place.type}</span>
              <h4>${place.name}</h4>
            </div>
            <div class="result-distance">
              <strong>${place.distance}</strong>
              <span>Distance</span>
            </div>
          </div>
          <div class="result-location">
            <i class="fa-solid fa-location-dot"></i>
            <span>${place.location}</span>
          </div>
          <div class="result-meta">
            <div>
              <i class="fa-solid fa-car"></i>
              <span>${place.time}</span>
            </div>
            <div>
              <i class="fa-solid ${place.icon}"></i>
              <span>${place.tag}</span>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  /*==================================================
  SHOW SUBCATEGORY RESULTS
  ==================================================*/
  function showSubcategory(categoryKey, subcategoryKey) {
    const category = connectivityData[categoryKey];
    if (!category) return;

    const subcategory = category.subcategories[subcategoryKey];
    if (!subcategory) return;

    if (detailsLabel) detailsLabel.textContent = getSubcategoryName(subcategoryKey);
    if (detailsTitle) detailsTitle.textContent = subcategory.title;
    if (detailsDescription) detailsDescription.textContent = subcategory.description;

    if (resultsContainer) {
      resultsContainer.innerHTML = subcategory.places
        .map((place, index) => createResultCard(place, index))
        .join("");
    }

    const subcategoryButtons = subcategoryContainer?.querySelectorAll(".connectivity-subcategory");

    subcategoryButtons?.forEach((button) => {
      button.classList.toggle("active", button.dataset.subcategory === subcategoryKey);
    });
  }

  /*==================================================
  SHOW CATEGORY
  ==================================================*/
  function showCategory(categoryKey) {
    const category = connectivityData[categoryKey];
    if (!category) return;

    if (categoryTitle) categoryTitle.textContent = category.title;

    categoryTabs.forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.category === categoryKey);
    });

    const subcategories = Object.entries(category.subcategories);
    if (!subcategories.length) return;

    if (subcategoryContainer) {
      subcategoryContainer.innerHTML = subcategories
        .map(([key, data], index) => createSubcategoryButton(key, data, index === 0))
        .join("");
    }

    const firstSubcategoryKey = subcategories[0][0];
    showSubcategory(categoryKey, firstSubcategoryKey);

    const newSubcategoryButtons = subcategoryContainer?.querySelectorAll(".connectivity-subcategory");

    newSubcategoryButtons?.forEach((button) => {
      button.addEventListener("click", () => {
        const subcategoryKey = button.dataset.subcategory;
        showSubcategory(categoryKey, subcategoryKey);
      });
    });
  }

  /*==================================================
  CATEGORY TAB EVENTS
  ==================================================*/
  categoryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const categoryKey = tab.dataset.category;
      showCategory(categoryKey);
    });
  });

  /*==================================================
  INITIAL CATEGORY
  ==================================================*/
  showCategory("education");

  /*==================================================
  CONNECTIVITY SCROLL REVEAL
  ==================================================*/
  const connectivityRevealItems = connectivitySection.querySelectorAll(
    ".connectivity-title,.connectivity-tabs,.connectivity-sidebar,.connectivity-details"
  );

  if ("IntersectionObserver" in window && connectivityRevealItems.length) {
    const connectivityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("connectivity-show");
            connectivityObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    connectivityRevealItems.forEach((item, index) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(45px)";
      item.style.transition = `opacity .7s ease ${index * 0.08}s, transform .7s ease ${index * 0.08}s`;
      connectivityObserver.observe(item);
    });
  }

  /*==================================================
  CONNECTIVITY SHOW STYLE
  ==================================================*/
  const connectivityStyle = document.createElement("style");
  connectivityStyle.innerHTML = `
    .connectivity-show {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(connectivityStyle);
});

/*==================================================
PROPERTY INFORMATION
==================================================*/
const propertyCards = document.querySelectorAll(".property-card");

const propertyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("property-show");
        propertyObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

propertyCards.forEach((card, index) => {
  card.style.transition = `all .8s ease ${index * 0.12}s`;
  propertyObserver.observe(card);
});

/*==========================================
PROPERTY 3D TILT
==========================================*/
propertyCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = (x - rect.width / 2) / 20;
    const rotateX = (rect.height / 2 - y) / 20;

    card.style.transform = `
      perspective(1400px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-12px)
      scale(1.02)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = `
      perspective(1400px)
      rotateX(0deg)
      rotateY(0deg)
      translateY(0)
      scale(1)
    `;
  });
});

/*==========================================
PROPERTY IMAGE PARALLAX
==========================================*/
document.querySelectorAll(".property-image").forEach((image) => {
  image.addEventListener("mousemove", (e) => {
    const rect = image.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const moveX = (x - rect.width / 2) / 30;
    const moveY = (y - rect.height / 2) / 30;
    const img = image.querySelector("img");
    if (!img) return;

    img.style.transform = `scale(1.12) translate(${moveX}px,${moveY}px)`;
  });

  image.addEventListener("mouseleave", () => {
    const img = image.querySelector("img");
    if (!img) return;

    img.style.transform = "scale(1)";
  });
});

/*==========================================
PROPERTY LIGHT FOLLOW EFFECT
==========================================*/
propertyCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(13,92,128,.08), #ffffff 50%)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.background = "#ffffff";
  });
});

/*==========================================
PROPERTY BUTTON EFFECT
==========================================*/
document.querySelectorAll(".property-btn").forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    btn.style.gap = "18px";
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.gap = "12px";
  });
});

/*==========================================
PROPERTY SHOW CLASS
==========================================*/
const propertyStyle = document.createElement("style");
propertyStyle.innerHTML = `
  .property-show {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(propertyStyle);

/*==================================================
LATEST BLOGS
==================================================*/
const blogCards = document.querySelectorAll(".blog-card");

const blogObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("blog-show");
        blogObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

blogCards.forEach((card, index) => {
  card.style.transition = `all .8s ease ${index * 0.12}s`;
  blogObserver.observe(card);
});

/*==========================================
BLOG 3D TILT EFFECT
==========================================*/
blogCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = (x - rect.width / 2) / 20;
    const rotateX = (rect.height / 2 - y) / 20;

    card.style.transform = `
      perspective(1400px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-12px)
      scale(1.02)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = `
      perspective(1400px)
      rotateX(0deg)
      rotateY(0deg)
      translateY(0)
      scale(1)
    `;
  });
});

/*==========================================
BLOG IMAGE PARALLAX
==========================================*/
document.querySelectorAll(".blog-image").forEach((image) => {
  image.addEventListener("mousemove", (e) => {
    const rect = image.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const moveX = (x - rect.width / 2) / 30;
    const moveY = (y - rect.height / 2) / 30;
    const img = image.querySelector("img");
    if (!img) return;

    img.style.transform = `scale(1.12) translate(${moveX}px,${moveY}px)`;
  });

  image.addEventListener("mouseleave", () => {
    const img = image.querySelector("img");
    if (!img) return;

    img.style.transform = "scale(1)";
  });
});

/*==========================================
BLOG DATE FLOATING
==========================================*/
document.querySelectorAll(".blog-date").forEach((date, index) => {
  date.animate(
    [
      { transform: "translateY(0px)" },
      { transform: "translateY(-8px)" },
      { transform: "translateY(0px)" },
    ],
    {
      duration: 2500 + index * 300,
      iterations: Infinity,
      easing: "ease-in-out",
    }
  );
});

/*==========================================
BLOG LIGHT FOLLOW EFFECT
==========================================*/
blogCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(13,92,128,.08), #ffffff 50%)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.background = "#ffffff";
  });
});

/*==========================================
BLOG BUTTON EFFECT
==========================================*/
document.querySelectorAll(".blog-btn").forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    btn.style.gap = "18px";
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.gap = "12px";
  });
});

/*==================================================
CONTACT SECTION
==================================================*/
"use strict";

/*==========================================
CONTACT REVEAL
==========================================*/
const contactItems = document.querySelectorAll(
  ".contact-item, .contact-form, .contact-left, .contact-form-box"
);

const contactObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("contact-show");
        contactObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

contactItems.forEach((item, index) => {
  item.style.transition = `all .8s ease ${index * 0.12}s`;
  contactObserver.observe(item);
});

/*==========================================
CONTACT FORM 3D TILT
==========================================*/
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("mousemove", (e) => {
    const rect = contactForm.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = (x - rect.width / 2) / 40;
    const rotateX = (rect.height / 2 - y) / 40;

    contactForm.style.transform = `
      perspective(1600px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-6px)
    `;
  });

  contactForm.addEventListener("mouseleave", () => {
    contactForm.style.transform = `
      perspective(1600px)
      rotateX(0deg)
      rotateY(0deg)
      translateY(0)
    `;
  });
}

/*==========================================
CONTACT CARD HOVER
==========================================*/
document.querySelectorAll(".contact-item").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,.18), rgba(255,255,255,.08) 60%)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.background = "rgba(255,255,255,.08)";
  });
});

/*==========================================
INPUT ANIMATION
==========================================*/
document
  .querySelectorAll(".contact-form input,.contact-form select,.contact-form textarea")
  .forEach((input) => {
    input.addEventListener("focus", () => {
      if (input.parentElement) input.parentElement.style.transform = "translateX(8px)";
    });

    input.addEventListener("blur", () => {
      if (input.parentElement) input.parentElement.style.transform = "translateX(0)";
    });
  });

/*==========================================
BUTTON RIPPLE
==========================================*/
const contactBtn = document.querySelector(".contact-btn");

if (contactBtn) {
  contactBtn.addEventListener("click", (e) => {
    const circle = document.createElement("span");
    const diameter = Math.max(contactBtn.clientWidth, contactBtn.clientHeight);

    circle.style.width = diameter + "px";
    circle.style.height = diameter + "px";
    circle.style.position = "absolute";
    circle.style.borderRadius = "50%";
    circle.style.background = "rgba(255,255,255,.35)";
    circle.style.pointerEvents = "none";
    circle.style.transform = "scale(0)";
    circle.style.left = e.offsetX - diameter / 2 + "px";
    circle.style.top = e.offsetY - diameter / 2 + "px";
    circle.style.animation = "contactRipple .7s linear";

    contactBtn.appendChild(circle);

    setTimeout(() => {
      circle.remove();
    }, 700);
  });
}

/*==========================================
FORM SUBMIT DEMO
==========================================*/
const contactSectionForm = document.querySelector(".contact-form");

if (contactSectionForm) {
  contactSectionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!contactBtn) return;

    contactBtn.innerHTML = "Sending...";
    contactBtn.disabled = true;

    setTimeout(() => {
      contactBtn.innerHTML = "Enquiry Sent ✓";
      contactBtn.style.background = "#28a745";
    }, 1800);
  });
}

/*==========================================
CONTACT STYLE
==========================================*/
const contactCSS = document.createElement("style");
contactCSS.innerHTML = `
  .contact-show {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }

  @keyframes contactRipple {
    from {
      transform: scale(0);
      opacity: 1;
    }
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(contactCSS);

/*==================================================
PREMIUM FOOTER
==================================================*/

/*==========================================
FOOTER REVEAL
==========================================*/
const footerColumns = document.querySelectorAll(".footer-column");

const footerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("footer-show");
        footerObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

footerColumns.forEach((column, index) => {
  column.style.transition = `all .8s ease ${index * 0.15}s`;
  footerObserver.observe(column);
});

/*==========================================
SOCIAL 3D EFFECT
==========================================*/
document.querySelectorAll(".footer-social a").forEach((icon) => {
  icon.addEventListener("mousemove", (e) => {
    const rect = icon.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const moveX = (x - rect.width / 2) / 6;
    const moveY = (y - rect.height / 2) / 6;

    icon.style.transform = `
      perspective(800px)
      translate(${moveX}px,${moveY}px)
      rotateY(360deg)
      scale(1.1)
    `;
  });

  icon.addEventListener("mouseleave", () => {
    icon.style.transform = "translate(0,0) scale(1)";
  });
});

/*==========================================
FOOTER PARALLAX
==========================================*/
const footer = document.querySelector(".footer");

if (footer) {
  footer.addEventListener("mousemove", (e) => {
    const rect = footer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    footer.style.background = `
      radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,.08), transparent 35%),
      linear-gradient(135deg, #062F43, #0D5C80, #1F7DB2)
    `;
  });

  footer.addEventListener("mouseleave", () => {
    footer.style.background = "linear-gradient(135deg, #062F43, #0D5C80, #1F7DB2)";
  });
}

/*==========================================
CONTACT ICON FLOAT
==========================================*/
document.querySelectorAll(".footer-contact i").forEach((icon, index) => {
  icon.animate(
    [
      { transform: "translateY(0px)" },
      { transform: "translateY(-6px)" },
      { transform: "translateY(0px)" },
    ],
    {
      duration: 2200 + index * 250,
      iterations: Infinity,
      easing: "ease-in-out",
    }
  );
});

/*==========================================
COPYRIGHT YEAR
==========================================*/
const year = document.querySelector(".footer-bottom p");

if (year) {
  year.innerHTML = `&copy; ${new Date().getFullYear()} Living Assets Builder. All Rights Reserved.`;
}

/*==========================================
BACK TO TOP BUTTON
==========================================*/
const topButton = document.createElement("button");
topButton.className = "back-to-top";
topButton.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
document.body.appendChild(topButton);

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    topButton.classList.add("show-top");
  } else {
    topButton.classList.remove("show-top");
  }
});

topButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/*==========================================
BACK TO TOP STYLE
==========================================*/
const footerStyle = document.createElement("style");
footerStyle.innerHTML = `
  .footer-show {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }

  .back-to-top {
    position: fixed;
    right: 30px;
    bottom: 30px;
    width: 55px;
    height: 55px;
    border: none;
    border-radius: 50%;
    background: #0D5C80;
    color: #fff;
    cursor: pointer;
    font-size: 18px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(30px);
    transition: .35s;
    box-shadow: 0 15px 35px rgba(13,92,128,.35);
    z-index: 999;
  }

  .back-to-top:hover {
    background: #1F7DB2;
    transform: translateY(-5px);
  }

  .show-top {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;
document.head.appendChild(footerStyle);

/*==================================================
NEARBY CONNECTIVITY
(second implementation — kept as-is)
==================================================*/
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".connectivity");
  if (!section) return;

  const data = {
    education: {
      title: "Education",
      items: {
        schools: {
          name: "Schools",
          subtitle: "Nearby schools",
          icon: "fa-school",
          title: "Schools Near Guduvancheri",
          description: "Explore schools located within approximately 10 KM of Guduvancheri.",
          places: [
           {
              name: "Bharathiyar Matriculation Higher Secondary School",
              type: "Matriculation School",
              location: "Guduvancheri",
              distance: "0.6 KM",
              time: "Approx. 3 Min",
              tag: "Matriculation",
            },
             {
              name: "St. Mary's Matriculation School",
              type: "Matriculation School",
              location: "Nandhivaram, Guduvancheri",
              distance: "1 KM",
              time: "Approx. 5 Min",
              tag: "Matriculation",
            },
            {
              name: "SRM Public School",
              type: "School",
              location: "Nandhivaram, Guduvancheri",
              distance: "2 KM",
              time: "Approx. 5 Min",
              tag: "School",
            },
            
            {
              name: "Velammal Vidhyashram",
              type: "CBSE School",
              location: "Moolakazhani, Guduvancheri",
              distance: "3 KM",
              time: "Approx. 7 Min",
              tag: "CBSE",
            },
            {
              name: "Crescent School",
              type: "School",
              location: "Vandalur",
              distance: "4.4 KM",
              time: "Approx. 10 Min",
              tag: "School",
            },
          ],
        },
        colleges: {
          name: "Colleges",
          subtitle: "Nearby colleges",
          icon: "fa-building-columns",
          title: "Colleges & Universities Near Guduvancheri",
          description: "Explore colleges and universities located around Guduvancheri.",
          places: [
            {
              name: "SRM Institute of Science and Technology",
              type: "University",
              location: "Kattankulathur",
              distance: "2.8 KM",
              time: "Approx. 7 Min",
              tag: "University",
            },
            {
              name: "Valliammai Engineering College",
              type: "Engineering College",
              location: "Kattankulathur",
              distance: "2.9 KM",
              time: "Approx. 7 Min",
              tag: "Engineering",
            },
            {
              name: "B. S. Abdur Rahman Crescent Institute of Science and Technology",
              type: "University",
              location: "Vandalur",
              distance: "4.3 KM",
              time: "Approx. 10 Min",
              tag: "University",
            },
            {
            name: "Apollo Arts and Science College",
            type: "Arts & Science College",
            location: "Guduvanchery",
            distance: " 6 KM",
            time: "Approx. 12 Min",
            tag: "Arts & Science",
            },
            {
            name: "VIT Chennai",
            type: "University",
            location: "Vandalur–Kelambakkam Road",
            distance: " 12 KM",
            time: "Approx. 20 Min",
            tag: "University",
            },
          ],
        },
      },
    },

    healthcare: {
      title: "Healthcare",
      items: {
        hospitals: {
          name: "Hospitals",
          subtitle: "Hospitals & care",
          icon: "fa-hospital",
          title: "Hospitals Near Guduvancheri",
          description: "Explore hospitals and healthcare facilities around Guduvancheri.",
          places: [
            {
              name: "Deepam Multispeciality Hospitals",
              type: "Hospital",
              location: "GST Road, Guduvancheri",
              distance: "0.5 KM",
              time: "Approx. 3 Min",
              tag: "Hospital",
            },
            {
            name: "R V Clinic",
            type: "Children's Hospital",
            location: "Guduvancheri",
            distance: ". 0.7 KM",
            time: "Approx. 4 Min",
            tag: "Hospital",
            },
            {
              name: "SRM General Hospital",
              type: "Hospital",
              location: "GST Road, Guduvancheri",
              distance: "2 KM",
              time: "Approx. 7 Min",
              tag: "Hospital",
            },
            {
            name: "OneHealth 24x7 Emergency Centre",
            type: "Emergency Hospital",
            location: "GST Road, Guduvancheri",
            distance: " 2 KM",
            time: "Approx. 6 Min",
            tag: "Hospital",
            },

            {
            name: "SG Clinic ",
            type: "Gynecology Clinic",
            location: "Puthu kovil, Guduvancheri",
            distance: " 2 KM",
            time: "Approx. 6 Min",
            tag: "Clinic",
            },
          ],
        },
      },
    },

    shopping: {
      title: "Shopping",
      items: {
        supermarkets: {
          name: "Supermarkets",
          subtitle: "Daily shopping",
          icon: "fa-cart-shopping",
          title: "Supermarkets Near Guduvancheri",
          description: "Explore supermarkets and everyday shopping options around Guduvancheri.",
          places: [
            {
              name: "Udayam Super Market",
              type: "Supermarket",
              location: "GST Road, Guduvancheri",
              distance: "0.3 KM",
              time: "Approx. 2 Min",
              tag: "Shopping",
            },
            {
              name: "Mithran Super Stores",
              type: "Supermarket",
              location: "GST Road, Nellikuppam Road",
              distance: "0.8 KM",
              time: "Approx. 4 Min",
              tag: "Shopping",
            },
            {
              name: "Rogers Family Mart",
              type: "Supermarket",
              location: "GST Road, Guduvancheri",
              distance: "0.9 KM",
              time: "Approx. 4 Min",
              tag: "Shopping",
            },
            {
              name: "More",
              type: "Supermarket",
              location: "Kayarambedu, Guduvancheri",
              distance: "4 KM",
              time: "Approx. 10 Min",
              tag: "Shopping",
            },
            
          ],
        },
       
      },
    },

    transport: {
      title: "Transport",
      items: {
        railway: {
          name: "Railway",
          subtitle: "Rail connectivity",
          icon: "fa-train",
          title: "Railway Connectivity",
          description: "Explore railway connectivity around Guduvancheri.",
          places: [
            {
              name: "Guduvancheri Railway Station",
              type: "Railway Station",
              location: "Guduvancheri",
              distance: "0.6 KM",
              time: "Approx. 1 Min",
              tag: "Rail",
            },
            {
  name: "Potheri Railway Station",
  type: "Railway Station",
  location: "Potheri",
  distance: " 3 KM",
  time: "Approx. 6 Min",
  tag: "Rail",
},

{
  name: "Urappakkam Railway Station",
  type: "Railway Station",
  location: "Urapakkam",
  distance: " 4 KM",
  time: "Approx. 9 Min",
  tag: "Rail",
},
{
  name: "Kilambakkam Railway Station",
  type: "Upcoming Railway Station",
  location: "Kilambakkam",
  distance: " 5 KM",
  time: "Approx. 10 Min",
  tag: "Upcoming Rail",
},

{
  name: "Perungalathur Railway Station",
  type: "Railway Station",
  location: "Perungalathur",
  distance: " 9 KM",
  time: "Approx. 20 Min",
  tag: "Rail",
},
            
          ],
        },
        bus: {
          name: "Bus",
          subtitle: "Bus connectivity",
          icon: "fa-bus",
          title: "Bus Connectivity",
          description: "Explore bus connectivity around Guduvancheri.",
          places: [
              {
              name: "Kilambakkam New Bus Stand",
              type: "Bus Terminus",
              location: "Kilambakkam, Urapakkam",
              distance: "5.7 KM",
              time: "Approx. 13 Min",
              tag: "Bus",
            },
            {
              name: "Guduvancheri Bus Stand",
              type: "Bus Stand",
              location: "Nandhivaram, Guduvancheri",
              distance: "0.4 KM",
              time: "Approx. 2 Min",
              tag: "Bus",
            },
          
            {
              name: "maraimailnagar ",
              type: "Bus Terminus",
              location: "Chengalpattu",
              distance: "8 KM",
              time: "Approx. 18 Min",
              tag: "Bus",
            },
          ],
        },
      },
    },

    dining: {
      title: "Dining",
      items: {
        restaurants: {
          name: "Restaurants",
          subtitle: "Nearby dining",
          icon: "fa-utensils",
          title: "Restaurants Near Guduvancheri",
          description: "Explore restaurants and dining destinations around Guduvancheri.",
          places: [
            {
              name: "KFC",
              type: "Restaurant",
              location: "GST Road, near Maraimalai Nagar",
              distance: "2.8 KM",
              time: "Approx. 9 Min",
              tag: "Dining",
            },
            {
              name: "Mani's Dum Biryani",
              type: "Restaurant",
              location: "GST Road, near Maraimalai Nagar",
              distance: "2.8 KM",
              time: "Approx. 9 Min",
              tag: "Dining",
            },
            {
              name: "A2B - Adyar Ananda Bhavan",
              type: "Restaurant",
              location: "GST Road, near Maraimalai Nagar",
              distance: "2.8 KM",
              time: "Approx. 9 Min",
              tag: "Dining",
            },
            {
  name: "Burger King",
  type: "Fast Food Restaurant",
  location: "GST Road, Thailavaram",
  distance: " 2.5 KM",
  time: "Approx. 9 Min",
  tag: "Dining",
},

{
  name: "McDonald's",
  type: "Fast Food Restaurant",
  location: "GST Road, Maraimalai Nagar",
  distance: " 8 KM",
  time: "Approx. 15 Min",
  tag: "Dining",
},
          ],
        },
      },
    },

    entertainment: {
      title: "Entertainment",
      items: {
        cinemas: {
          name: "Cinemas",
          subtitle: "Movies & entertainment",
          icon: "fa-film",
          title: "Entertainment & Recreation Near Guduvancheri",
          description: "Explore cinemas, gaming zones, and sports clubs around Guduvancheri.",
          places: [
            {
              name: "SVT Cinemas",
              type: "Cinema",
              location: "Nandhivaram, Guduvancheri",
              distance: "0.6 KM",
              time: "Approx. 4 Min",
              tag: "Cinema",
            },
            {
              name: "MVR Cinemas",
              type: "Cinema",
              location: "Nandhivaram, Guduvancheri",
              distance: "1.8 KM",
              time: "Approx. 6 Min",
              tag: "Cinema",
            },

            {
              name: "Infinity Gaming",
              type: "Gaming Zone",
              location: "Urapakkam",
              distance: "3 KM",
              time: "Approx. 8 Min",
              tag: "Gaming",
            },
            {
              name: "Seven Screen Cinemas",
              type: "Cinema",
              location: "Vandalur",
              distance: "4 KM",
              time: "Approx. 10 Min",
              tag: "Cinema",
            },
          ],
        },
      },
    },

    leisure: {
      title: "Leisure",
      items: {
        parks: {
          name: "Parks",
          subtitle: "Green spaces",
          icon: "fa-tree",
          title: "Parks Near Guduvancheri",
          description: "Explore parks and leisure spaces around Guduvancheri.",
          places: [
             {
              name: "Professor K. Anbazhagan Park",
              type: "Park",
              location: "Mahalakshmi Nagar, Guduvancheri",
              distance: "1.7 KM",
              time: "Approx. 6 Min",
              tag: "Leisure",
            },
            {
              name: "Anna Children's Park",
              type: "Park",
              location: "Guduvancheri",
              distance: "2.3 KM",
              time: "Approx. 7 Min",
              tag: "Leisure",
            },
            
            {
              name: "Nandhivaram Lake Park",
              type: "Lake",
              location: "Nandhivaram, Guduvancheri",
              distance: "3.2 KM",
              time: "Approx. 10 Min",
              tag: "Leisure",
            },
            {
              name: "Adhanur Lake",
              type: "Lake",
              location: "Adhanur, Guduvancheri",
              distance: "4.4 KM",
              time: "Approx. 13 Min",
              tag: "Leisure",
            },
            
           
            {
              name: "Arignar Anna Zoological Park",
              type: "Zoo & Park",
              location: "Vandalur",
              distance: "6.5 KM",
              time: "Approx. 18 Min",
              tag: "Leisure",
            },
          ],
        },
      },
    },

    work: {
      title: "Work",
      items: {
        itparks: {
          name: "IT Parks",
          subtitle: "Technology hubs",
          icon: "fa-laptop-code",
          title: "IT Parks Near Guduvancheri",
          description: "Explore major employment and technology hubs accessible from Guduvancheri.",
          places: [
            {
              name: "Zoho Corporation",
              type: "IT Park",
              location: "Estancia IT Park, Maraimalai Nagar",
              distance: "2.8 KM",
              time: "Approx. 9 Min",
              tag: "Work",
            },
            {
              name: "Estancia IT Park",
              type: "IT Park",
              location: "Maraimalai Nagar",
              distance: "2.8 KM",
              time: "Approx. 9 Min",
              tag: "Work",
            },
        
            {
              name: "Mahindra World City",
              type: "Business Hub",
              location: "Chengalpattu",
              distance: "17 KM",
              time: "Approx. 25 Min",
              tag: "Work",
            },
            {
              name: "Infosys",
              type: "IT Company",
              location: "Mahindra World City, Chengalpattu",
              distance: "18 KM",
              time: "Approx. 26 Min",
              tag: "Work",
            },
          ],
        },
      },
    },
  };

  const tabs = section.querySelectorAll(".connectivity-tab");
  const categoryTitle = section.querySelector("#connectivityCategoryTitle");
  const subcategories = section.querySelector("#connectivitySubcategories");
  const detailsLabel = section.querySelector("#connectivityDetailsLabel");
  const detailsTitle = section.querySelector("#connectivityDetailsTitle");
  const detailsDescription = section.querySelector("#connectivityDetailsDescription");
  const results = section.querySelector("#connectivityResults");

  function renderResults(item) {
    detailsTitle.textContent = item.title;
    detailsDescription.textContent = item.description;

    results.innerHTML = item.places
      .map((place, index) => {
        return `
          <article class="connectivity-result-card">
            <div class="result-number">${String(index + 1).padStart(2, "0")}</div>
            <div class="result-content">
              <div class="result-top">
                <div>
                  <span class="result-type">${place.type}</span>
                  <h4>${place.name}</h4>
                </div>
                <div class="result-distance">
                  <strong>${place.distance}</strong>
                  <span>Distance</span>
                </div>
              </div>
              <div class="result-location">
                <i class="fa-solid fa-location-dot"></i>
                ${place.location}
              </div>
              <div class="result-meta">
                <div>
                  <i class="fa-solid fa-car"></i>
                  ${place.time}
                </div>
                <div>
                  <i class="fa-solid fa-location-dot"></i>
                  ${place.tag}
                </div>
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function renderCategory(categoryKey) {
    const category = data[categoryKey];
    if (!category) return;

    categoryTitle.textContent = category.title;
    detailsLabel.textContent = category.title.toUpperCase();

    tabs.forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.category === categoryKey);
    });

    const entries = Object.entries(category.items);

    subcategories.innerHTML = entries
      .map(([key, item], index) => {
        return `
          <button class="connectivity-subcategory ${index === 0 ? "active" : ""}" type="button" data-item="${key}">
            <span class="subcategory-icon">
              <i class="fa-solid ${item.icon}"></i>
            </span>
            <span class="subcategory-text">
              <strong>${item.name}</strong>
              <span>${item.subtitle}</span>
            </span>
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        `;
      })
      .join("");

    const firstItem = entries[0][1];
    renderResults(firstItem);

    subcategories.querySelectorAll(".connectivity-subcategory").forEach((button) => {
      button.addEventListener("click", () => {
        subcategories
          .querySelectorAll(".connectivity-subcategory")
          .forEach((btn) => btn.classList.remove("active"));

        button.classList.add("active");

        const item = category.items[button.dataset.item];
        renderResults(item);
      });
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      renderCategory(tab.dataset.category);
    });
  });

  renderCategory("education");
});

/* ========================================
   ABOUT IMAGE - SCROLL REVEAL
======================================== */
const aboutReveal = document.querySelector(".reveal-about");

if (aboutReveal) {
  const aboutRevealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // Run only once
        }
      });
    },
    { threshold: 0.25 }
  );

  aboutRevealObserver.observe(aboutReveal);
}