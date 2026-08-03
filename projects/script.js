/* =========================================================
   LIVING ASSETS BUILDER
   PROJECTS PAGE JAVASCRIPT
   STATUS + PROPERTY TYPE FILTERS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  const menuBtn = document.getElementById("menuBtn");
  const navbar = document.getElementById("navbar");

  const statusButtons = document.querySelectorAll(".status-filter");
  const typeButtons = document.querySelectorAll(".type-filter");
  const projectCards = document.querySelectorAll(".project-card");

  const visibleCount = document.getElementById("visibleCount");
  const loadMoreBtn = document.getElementById("loadMore");

  let currentStatus = "all";
  let currentCategory = "all";
  let cardsToShow = 9;


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  if (menuBtn && navbar) {
    menuBtn.addEventListener("click", function () {
      navbar.classList.toggle("open");

      menuBtn.setAttribute(
        "aria-expanded",
        navbar.classList.contains("open") ? "true" : "false"
      );
    });

    navbar.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navbar.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }


  /* =======================================================
     CARD DATA HELPERS
  ======================================================= */

  function getValues(card, attribute) {
    return (card.getAttribute(attribute) || "")
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter(Boolean);
  }


  function matchesStatus(card) {
    if (currentStatus === "all") return true;

    return getValues(card, "data-status").includes(currentStatus);
  }


  function matchesCategory(card) {
    if (currentCategory === "all") return true;

    return getValues(card, "data-category").includes(currentCategory);
  }


  function getFilteredProjects() {
    return Array.from(projectCards).filter(function (card) {
      return matchesStatus(card) && matchesCategory(card);
    });
  }


  /* =======================================================
     UPDATE PROJECT GRID
  ======================================================= */

  function updateProjects() {

    const filteredProjects = getFilteredProjects();

    projectCards.forEach(function (card) {
      card.classList.add("filter-hide");
      card.classList.remove("filter-show");
    });


    filteredProjects.forEach(function (card, index) {

      if (index < cardsToShow) {

        card.classList.remove("filter-hide");
        card.classList.add("filter-show");

      }

    });


    const shown = Math.min(
      cardsToShow,
      filteredProjects.length
    );


    /* UPDATE VISIBLE PROJECT COUNT */

    if (visibleCount) {
      visibleCount.textContent = shown;
    }


    /* SHOW / HIDE LOAD MORE */

    if (loadMoreBtn) {

      loadMoreBtn.classList.toggle(
        "is-hidden",
        shown >= filteredProjects.length
      );

    }

  }


  /* =======================================================
     PROJECT STATUS FILTER
  ======================================================= */

  statusButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      statusButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });


      button.classList.add("active");


      currentStatus =
        button.dataset.statusFilter || "all";


      /* RESET PROJECT DISPLAY */

      cardsToShow = 9;


      updateProjects();

    });

  });


  /* =======================================================
     PROPERTY TYPE FILTER
  ======================================================= */

  typeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      typeButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });


      button.classList.add("active");


      currentCategory =
        button.dataset.categoryFilter || "all";


      /* RESET DISPLAY */

      cardsToShow = 9;


      updateProjects();

    });

  });


  /* =======================================================
     AUTOMATIC STATUS COUNTS
  ======================================================= */

  function updateFilterCounts() {

    statusButtons.forEach(function (button) {

      const filter =
        button.dataset.statusFilter || "all";


      const countElement =
        button.querySelector("span");


      if (!countElement) return;


      const count =
        Array.from(projectCards).filter(function (card) {

          if (filter === "all") {
            return true;
          }


          return getValues(
            card,
            "data-status"
          ).includes(filter);

        }).length;


      countElement.textContent = count;

    });


    /* =====================================================
       PROPERTY TYPE COUNTS
    ===================================================== */

    typeButtons.forEach(function (button) {

      const filter =
        button.dataset.categoryFilter || "all";


      const countElement =
        button.querySelector("span");


      if (!countElement) return;


      const count =
        Array.from(projectCards).filter(function (card) {

          const categories =
            getValues(
              card,
              "data-category"
            );


          if (filter === "all") {

            return categories.length > 0;

          }


          return categories.includes(filter);

        }).length;


      countElement.textContent = count;

    });

  }


  /* =======================================================
     LOAD MORE PROJECTS
  ======================================================= */

  if (loadMoreBtn) {

    loadMoreBtn.addEventListener(
      "click",
      function () {

        cardsToShow += 6;

        updateProjects();

      }
    );

  }


  /* =======================================================
     SMOOTH ANCHOR SCROLL
  ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(function (link) {

      link.addEventListener(
        "click",
        function (event) {

          const href =
            link.getAttribute("href");


          if (!href || href === "#") {

            event.preventDefault();

            return;

          }


          const target =
            document.querySelector(href);


          if (!target) return;


          event.preventDefault();


          const header =
            document.querySelector(".header");


          const headerHeight =
            header
              ? header.offsetHeight
              : 0;


          window.scrollTo({

            top:
              target
                .getBoundingClientRect()
                .top +

              window.pageYOffset -

              headerHeight,

            behavior: "smooth"

          });

        }
      );

    });


  /* =======================================================
     HEADER SCROLL EFFECT
  ======================================================= */

  const header =
    document.querySelector(".header");


  function updateHeader() {

    if (!header) return;


    header.style.boxShadow =

      window.scrollY > 40

        ? "0 10px 35px rgba(5,45,64,0.22)"

        : "0 8px 30px rgba(5,45,64,0.12)";

  }


  window.addEventListener(
    "scroll",
    updateHeader
  );


  /* =======================================================
     PROJECT IMAGE ERROR FALLBACK
  ======================================================= */

  document
    .querySelectorAll(".project-image img")
    .forEach(function (image) {

      image.addEventListener(
        "error",
        function () {

          image.style.display = "none";


          const imageContainer =
            image.closest(".project-image");


          if (imageContainer) {

            imageContainer.style.background =

              "linear-gradient(135deg, #083C54, #0D5C80, #1F7DA8)";

          }

        }
      );

    });


  /* =======================================================
     DESKTOP PROJECT CARD 3D TILT
  ======================================================= */

  const canHover =
    window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;


  if (canHover) {

    projectCards.forEach(function (card) {


      card.addEventListener(
        "mousemove",
        function (event) {

          const rect =
            card.getBoundingClientRect();


          const x =
            event.clientX - rect.left;


          const y =
            event.clientY - rect.top;


          const rotateY =
            (x - rect.width / 2) / 45;


          const rotateX =
            (rect.height / 2 - y) / 45;


          card.style.transform = `

            perspective(1200px)

            rotateX(${rotateX}deg)

            rotateY(${rotateY}deg)

            translateY(-6px)

          `;

        }
      );


      card.addEventListener(
        "mouseleave",
        function () {

          card.style.transform = "";

        }
      );

    });

  }


  /* =======================================================
     INITIALIZE PROJECT PAGE
  ======================================================= */

  updateFilterCounts();

  updateProjects();

  updateHeader();

});
