/* =====================================================
   PORTFOLIO JAVASCRIPT — Austin Pranata

   Each numbered block is one small, independent feature.
   You can delete a whole block and the rest still works.

   Table of contents:
   1. Mobile menu (hamburger)
   2. Navbar background on scroll
   3. Typing effect in the hero
   4. Scroll reveal (Intersection Observer)
   5. Active menu link highlight
   6. Back-to-top button
   7. Button ripple effect
   8. Footer year
   ===================================================== */


/* =====================================================
   1. MOBILE MENU (hamburger)
   Clicking the hamburger opens/closes the menu.
   Clicking any link closes it again.
   ===================================================== */
const hamburgerButton = document.getElementById("hamburger");
const navLinksMenu = document.getElementById("nav-links");

hamburgerButton.addEventListener("click", function () {
  navLinksMenu.classList.toggle("open");
  hamburgerButton.classList.toggle("open");

  // Tell screen readers whether the menu is open or closed
  const isOpen = navLinksMenu.classList.contains("open");
  hamburgerButton.setAttribute("aria-expanded", isOpen);
});

// Close the menu when a navigation link is clicked (nice on mobile)
const allNavLinks = document.querySelectorAll(".nav-link");

allNavLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    navLinksMenu.classList.remove("open");
    hamburgerButton.classList.remove("open");
    hamburgerButton.setAttribute("aria-expanded", "false");
  });
});


/* =====================================================
   2. NAVBAR BACKGROUND ON SCROLL
   The navbar starts transparent. After scrolling a bit,
   we add the "scrolled" class which gives it a glassy
   background (see .navbar.scrolled in style.css).
   ===================================================== */
const navbar = document.getElementById("navbar");

function updateNavbarStyle() {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateNavbarStyle);
updateNavbarStyle(); // run once on page load too


/* =====================================================
   3. TYPING EFFECT
   Types each phrase letter by letter, pauses, deletes it,
   then moves on to the next phrase. Loops forever.
   ===================================================== */
const typingElement = document.getElementById("typing-text");

const typingPhrases = [
  "Information Systems Graduate",
  "Data Analysis Enthusiast",
  "Digital Marketing",
  "UI/UX Design",
];

const TYPING_SPEED = 80;      // milliseconds per letter typed
const DELETING_SPEED = 45;    // milliseconds per letter deleted
const PAUSE_AFTER_TYPING = 1800; // pause when a phrase is complete

let phraseIndex = 0;   // which phrase are we on?
let letterIndex = 0;   // how many letters are shown right now?
let isDeleting = false;

function typeLoop() {
  const currentPhrase = typingPhrases[phraseIndex];

  if (isDeleting) {
    letterIndex = letterIndex - 1;
  } else {
    letterIndex = letterIndex + 1;
  }

  // Show the first "letterIndex" letters of the phrase
  typingElement.textContent = currentPhrase.slice(0, letterIndex);

  let delay = isDeleting ? DELETING_SPEED : TYPING_SPEED;

  if (!isDeleting && letterIndex === currentPhrase.length) {
    // Finished typing the whole phrase → pause, then start deleting
    delay = PAUSE_AFTER_TYPING;
    isDeleting = true;
  } else if (isDeleting && letterIndex === 0) {
    // Finished deleting → move to the next phrase
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % typingPhrases.length; // loops back to 0
    delay = 400;
  }

  setTimeout(typeLoop, delay);
}

typeLoop();


/* =====================================================
   4. SCROLL REVEAL
   Every element with class "reveal" starts hidden (see CSS).
   The Intersection Observer watches them, and when one
   enters the screen we add "reveal-visible" to fade it in.
   ===================================================== */
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        // Stop watching this element — it only needs to animate once
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15, // trigger when 15% of the element is visible
  }
);

revealElements.forEach(function (element) {
  revealObserver.observe(element);
});


/* =====================================================
   5. ACTIVE MENU LINK HIGHLIGHT
   While scrolling, figure out which section is on screen
   and color its menu link (class "active").
   ===================================================== */
const allSections = document.querySelectorAll("section[id]");

function highlightCurrentSection() {
  // A point slightly below the top of the screen
  const scrollPosition = window.scrollY + 120;

  allSections.forEach(function (section) {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    const sectionId = section.getAttribute("id");
    const menuLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');

    // Not every section has a menu link (e.g. Education) — skip those
    if (!menuLink) {
      return;
    }

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      menuLink.classList.add("active");
    } else {
      menuLink.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", highlightCurrentSection);
highlightCurrentSection();


/* =====================================================
   6. BACK-TO-TOP BUTTON
   Appears after scrolling down; clicking it scrolls
   smoothly back to the top.
   ===================================================== */
const backToTopButton = document.getElementById("back-to-top");

function toggleBackToTop() {
  if (window.scrollY > 500) {
    backToTopButton.classList.add("visible");
  } else {
    backToTopButton.classList.remove("visible");
  }
}

window.addEventListener("scroll", toggleBackToTop);

backToTopButton.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


/* =====================================================
   7. BUTTON RIPPLE EFFECT
   When a .button is clicked, we create a small circle
   at the click position and let CSS animate it outward
   (see .ripple in style.css). The circle removes itself
   when the animation ends.
   ===================================================== */
const allButtons = document.querySelectorAll(".button");

allButtons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    const circle = document.createElement("span");
    circle.classList.add("ripple");

    // Position the circle exactly where the user clicked
    const buttonArea = button.getBoundingClientRect();
    const size = Math.max(buttonArea.width, buttonArea.height);

    circle.style.width = size + "px";
    circle.style.height = size + "px";
    circle.style.left = event.clientX - buttonArea.left - size / 2 + "px";
    circle.style.top = event.clientY - buttonArea.top - size / 2 + "px";

    button.appendChild(circle);

    // Clean up the circle once its animation is done
    circle.addEventListener("animationend", function () {
      circle.remove();
    });
  });
});


/* =====================================================
   8. FOOTER YEAR
   Writes the current year so the footer never gets old.
   ===================================================== */
document.getElementById("current-year").textContent = new Date().getFullYear();
