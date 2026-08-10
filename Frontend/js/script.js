/*=====================================================
        HANUMANSEVA NGO WEBSITE
        JavaScript
=====================================================*/

document.addEventListener("DOMContentLoaded", () => {
  /*=========================================
                NAVBAR SCROLL
    =========================================*/

  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  /*=========================================
                MOBILE MENU
    =========================================*/

  const menuBtn = document.querySelector(".menu-btn");
  const navMenu = document.querySelector(".nav-menu");

  if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active");

      const icon = menuBtn.querySelector("i");

      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
      }
    });

    document.querySelectorAll(".nav-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        if (icon) {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      });
    });
  }

  /*=========================================
                FAQ ACCORDION
    =========================================*/

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove("active");
        }
      });

      item.classList.toggle("active");
    });
  });

  /*=========================================
            BACK TO TOP BUTTON
    =========================================*/

  const topBtn = document.getElementById("topBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      topBtn.classList.add("show");
    } else {
      topBtn.classList.remove("show");
    }
  });

  if (topBtn) {
    topBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,

        behavior: "smooth",
      });
    });
  }

  /*=========================================
            ACTIVE NAVIGATION
    =========================================*/

  const sections = document.querySelectorAll("section");

  const navLinks = document.querySelectorAll(".nav-menu a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;

      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");

      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });

  /*=========================================
                COUNTER ANIMATION
    =========================================*/

  const counters = document.querySelectorAll(".counter");

  if (counters.length > 0) {
    const speed = 200;

    const startCounter = () => {
      counters.forEach((counter) => {
        const target = +counter.dataset.target;

        let count = 0;

        const update = () => {
          const increment = Math.ceil(target / speed);

          count += increment;

          if (count >= target) {
            counter.innerText = target.toLocaleString() + "+";
          } else {
            counter.innerText = count.toLocaleString();

            requestAnimationFrame(update);
          }
        };

        update();
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounter();

          observer.disconnect();
        }
      });
    });

    observer.observe(document.querySelector(".impact"));
  }

  /*=========================================
                SCROLL REVEAL
    =========================================*/

  const revealElements = document.querySelectorAll(
    ".about-card, .mission-card, .why-box, .service-card, .gallery-item, .event-card, .testimonial-card, .donation-card, .contact-box",
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
    {
      threshold: 0.15,
    },
  );

  revealElements.forEach((el) => {
    el.style.opacity = "0";

    el.style.transform = "translateY(40px)";

    el.style.transition = "all .8s ease";

    revealObserver.observe(el);
  });

  /*=========================================
            CONTACT FORM
    =========================================*/

  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      alert("Thank you! Your message has been received.");

      this.reset();
    });
  }

  /*=========================================
            VOLUNTEER FORM
    =========================================*/

  const volunteerForm = document.querySelector(".volunteer-form form");

  if (volunteerForm) {
    volunteerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      alert("Thank you for volunteering! We'll contact you soon.");

      this.reset();
    });
  }

  /*=========================================
            NEWSLETTER
    =========================================*/

  const newsletter = document.querySelector(".newsletter");

  if (newsletter) {
    newsletter.addEventListener("submit", function (e) {
      e.preventDefault();

      alert("Thank you for subscribing!");

      this.reset();
    });
  }

  /*=========================================
            SMOOTH SCROLL
    =========================================*/

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        e.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});
