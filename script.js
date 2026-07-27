/* =====================================================
   1. MOBILE MENU (hamburger)
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
updateNavbarStyle();


/* =====================================================
   3. TYPING EFFECT
   ===================================================== */
const typingElement = document.getElementById("typing-text");

let typingPhrases = [
  "Information Systems Graduate",
  "Data Analysis Enthusiast",
  "Problem Solver",
  "UI/UX Design",
];

const TYPING_SPEED = 80;
const DELETING_SPEED = 45;
const PAUSE_AFTER_TYPING = 1800;

let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function typeLoop() {
  const currentPhrase = typingPhrases[phraseIndex];

  if (isDeleting) {
    letterIndex = letterIndex - 1;
  } else {
    letterIndex = letterIndex + 1;
  }

  
  typingElement.textContent = currentPhrase.slice(0, letterIndex);

  let delay = isDeleting ? DELETING_SPEED : TYPING_SPEED;

  if (!isDeleting && letterIndex === currentPhrase.length) {
    delay = PAUSE_AFTER_TYPING;
    isDeleting = true;
  } else if (isDeleting && letterIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % typingPhrases.length;
    delay = 400;
  }

  setTimeout(typeLoop, delay);
}

typeLoop();


/* =====================================================
   4. SCROLL REVEAL
   ===================================================== */
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach(function (element) {
  revealObserver.observe(element);
});


/* =====================================================
   5. ACTIVE MENU LINK HIGHLIGHT
   ===================================================== */
const allSections = document.querySelectorAll("section[id]");

function highlightCurrentSection() {
  const scrollPosition = window.scrollY + 120;

  allSections.forEach(function (section) {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    const sectionId = section.getAttribute("id");
    const menuLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');

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
   ===================================================== */
document.getElementById("current-year").textContent = new Date().getFullYear();


/* =====================================================
   9. LANGUAGE SWITCHER (EN <-> ID)
   ===================================================== */
const languageToggleButton = document.getElementById("lang-toggle");
const languageOptionEn = document.getElementById("lang-en");
const languageOptionId = document.getElementById("lang-id");

const translations = {

  /* --- Navbar --- */
  "nav-home":         { en: "Home", id: "Beranda" },
  "nav-about":        { en: "About", id: "Tentang" },
  "nav-skills":       { en: "Skills", id: "Keahlian" },
  "nav-experience":   { en: "Experience", id: "Pengalaman" },
  "nav-projects":     { en: "Projects", id: "Proyek" },
  "nav-certificates": { en: "Certificates", id: "Sertifikat" },
  "nav-contact":      { en: "Contact", id: "Kontak" },

  /* --- Hero --- */
  "hero-greeting": {
    en: "👋 Hello, my name is",
    id: "👋 Halo, nama saya",
  },
  "hero-description": {
    en: "Information Systems graduate from BINUS University with a passion for data analysis, digital marketing, and building useful digital products. Fast learner, well-organized, and ready to contribute.",
    id: "Lulusan Sistem Informasi dari BINUS University dengan minat pada analisis data, digital marketing, dan pengembangan produk digital yang bermanfaat. Cepat belajar, terorganisir, dan siap berkontribusi.",
  },
  "btn-view-work":   { en: "View My Work", id: "Lihat Karya Saya" },
  "btn-download-cv": { en: "Download CV", id: "Unduh CV" },

  /* --- About --- */
  "about-label": { en: "Get to know me", id: "Kenali saya lebih dekat" },
  "about-title": {
    en: "About <span class='gradient-text'>Me</span>",
    id: "Tentang <span class='gradient-text'>Saya</span>",
  },
  "about-p1": {
    en: "I am an <strong>Information Systems graduate</strong> from BINUS University with a strong interest in technology development and data analysis. I have hands-on experience in data management, digital marketing, and basic application development.",
    id: "Saya <strong>lulusan Sistem Informasi</strong> dari BINUS University dengan minat kuat pada pengembangan teknologi dan analisis data. Saya memiliki pengalaman langsung dalam pengelolaan data, digital marketing, dan pengembangan aplikasi dasar.",
  },
  "about-p2": {
    en: "I am used to working in a structured way, learning quickly, and adapting to dynamic work environments. I enjoy solving problems and turning messy information into something clear and useful.",
    id: "Saya terbiasa bekerja secara terstruktur, cepat belajar, dan mudah beradaptasi di lingkungan kerja yang dinamis. Saya senang memecahkan masalah dan mengubah informasi yang rumit menjadi jelas dan berguna.",
  },
  "fact-location":     { en: "Location", id: "Lokasi" },
  "fact-degree":       { en: "Degree", id: "Pendidikan" },
  "fact-degree-value": { en: "S1 Information Systems", id: "S1 Sistem Informasi" },
  "fact-gpa":          { en: "GPA", id: "IPK" },

  /* --- Skills --- */
  "skills-label": { en: "What I can do", id: "Apa yang saya kuasai" },
  "skills-title": {
    en: "My <span class='gradient-text'>Skills</span>",
    id: "<span class='gradient-text'>Keahlian</span> Saya",
  },
  "skills-tech-title": { en: "Technical Skills", id: "Keahlian Teknis" },
  "skills-tech-desc": {
    en: "Languages and tools I use to build websites and mobile applications.",
    id: "Bahasa pemrograman dan tools yang saya gunakan untuk membangun website dan aplikasi mobile.",
  },
  "skills-soft-desc": {
    en: "How I approach problems, people, and deadlines in everyday work.",
    id: "Cara saya menghadapi masalah, bekerja sama, dan mengelola tenggat waktu.",
  },
  "skill-problem-solving":  { en: "Problem Solving", id: "Pemecahan Masalah" },
  "skill-analytical":       { en: "Analytical Thinking", id: "Berpikir Analitis" },
  "skill-communication":    { en: "Communication", id: "Komunikasi" },
  "skill-teamwork":         { en: "Teamwork", id: "Kerja Sama Tim" },
  "skill-fast-learner":     { en: "Fast Learner", id: "Cepat Belajar" },
  "skill-time-management":  { en: "Time Management", id: "Manajemen Waktu" },

  /* --- Experience --- */
  "exp-label": { en: "Where I have worked", id: "Riwayat pengalaman saya" },
  "exp-title": {
    en: "My <span class='gradient-text'>Experience</span>",
    id: "<span class='gradient-text'>Pengalaman</span> Saya",
  },
  "exp1-date": { en: "Aug 2025 — Dec 2025", id: "Agu 2025 — Des 2025" },
  "exp1-b1": {
    en: "Coordinated Global Class events end-to-end: participant registration, activity documentation, and presentation equipment.",
    id: "Mengoordinasikan pelaksanaan berbagai event Global Class secara end-to-end, mencakup registrasi peserta, dokumentasi kegiatan, dan pengoperasian perangkat presentasi.",
  },
  "exp1-b2": {
    en: "Organized and managed Global Class student data to support administration, periodic reporting, and basic program performance analysis.",
    id: "Menyusun dan mengelola data mahasiswa Global Class secara terstruktur untuk mendukung kebutuhan administrasi, pelaporan berkala, dan analisis dasar performa program.",
  },
  "exp2-b1": {
    en: "Applied integrated digital marketing strategies: SEO, social media marketing, and email marketing in a multi-channel campaign simulation.",
    id: "Menerapkan strategi digital marketing terintegrasi mencakup SEO, social media marketing, dan email marketing dalam simulasi kampanye multi-channel.",
  },
  "exp2-b2": {
    en: "Planned content and funnel-based marketing strategies to grow audience reach.",
    id: "Merancang perencanaan konten dan strategi pemasaran digital berbasis funnel engagement untuk memperluas jangkauan audiens.",
  },
  "exp2-b3": {
    en: "Evaluated campaign performance with analytics tools to identify audience behavior patterns.",
    id: "Mengevaluasi performa kampanye digital menggunakan tools analitik guna mengidentifikasi pola perilaku dan respons audiens.",
  },
  "exp2-b4": {
    en: "Wrote copy and produced visual content tailored to each digital platform.",
    id: "Menyusun copywriting dan konten visual untuk kebutuhan promosi lintas platform digital.",
  },

  /* --- Education --- */
  "edu-label":  { en: "My study background", id: "Latar belakang pendidikan" },
  "edu-title": {
    en: "My <span class='gradient-text'>Education</span>",
    id: "<span class='gradient-text'>Pendidikan</span> Saya",
  },
  "edu-degree": { en: "S1 Information Systems", id: "S1 Sistem Informasi" },
  "edu-desc": {
    en: "Studied how technology, data, and business work together — from systems analysis and databases to application development. Graduated with a GPA of <strong>3.37</strong>.",
    id: "Mempelajari bagaimana teknologi, data, dan bisnis saling terhubung — mulai dari analisis sistem dan basis data hingga pengembangan aplikasi. Lulus dengan IPK <strong>3.37</strong>.",
  },

  /* --- Projects --- */
  "proj-label": { en: "Things I have built", id: "Karya yang pernah saya buat" },
  "proj-title": {
    en: "My <span class='gradient-text'>Projects</span>",
    id: "<span class='gradient-text'>Proyek</span> Saya",
  },
  "proj-wob-desc": {
    en: "A website concept that introduces Indonesian batik culture with the help of an AI chatbot. Designed as an interactive prototype in Figma.",
    id: "Konsep website yang memperkenalkan budaya batik Indonesia dengan bantuan chatbot AI. Dirancang sebagai prototipe interaktif di Figma.",
  },
  "proj-wob-link": { en: "View Prototype", id: "Lihat Prototipe" },
  "proj-wheel-desc": {
    en: "A car dealership website built as a university project — featuring a product catalog, promotions, and a clean dark interface.",
    id: "Website dealer mobil yang dibuat sebagai proyek kuliah — menampilkan katalog produk, halaman promo, dan tampilan gelap yang bersih.",
  },
  "proj-wheel-status": { en: "University Project", id: "Proyek Kuliah" },
  "proj-gajian-desc": {
    en: "A personal finance app for tracking income, expenses, budgets, bills, and savings — published on the Google Play Store.",
    id: "Aplikasi keuangan pribadi untuk mencatat pemasukan, pengeluaran, anggaran, tagihan, dan tabungan — telah dirilis di Google Play Store.",
  },
  "proj-gajian-link": { en: "View on Google Play", id: "Lihat di Google Play" },

  /* --- Certificates --- */
  "cert-label": { en: "Proof of learning", id: "Bukti pembelajaran" },
  "cert-title": {
    en: "My <span class='gradient-text'>Certificates</span>",
    id: "<span class='gradient-text'>Sertifikat</span> Saya",
  },
  "cert1-title": { en: "Rapid Developer Certification", id: "Sertifikasi Rapid Developer" },
  "cert1-desc": {
    en: "Certification in rapid application development.",
    id: "Sertifikasi dalam pengembangan aplikasi secara cepat.",
  },
  "cert2-title": { en: "Independent Study Certificate", id: "Sertifikat Studi Independen" },
  "cert2-desc": {
    en: "Certified Specific Independent Study — digital marketing program at BINUS.",
    id: "Certified Specific Independent Study — program digital marketing di BINUS.",
  },
  "cert3-title": { en: "Organization Certification", id: "Sertifikasi Organisasi" },
  "cert3-desc": {
    en: "Recognition for active involvement in campus organization activities.",
    id: "Penghargaan atas keterlibatan aktif dalam kegiatan organisasi kampus.",
  },
  "cert-view": { en: "View PDF", id: "Lihat PDF" },

  /* --- Contact --- */
  "contact-label": { en: "Let's connect", id: "Mari terhubung" },
  "contact-title": {
    en: "Get In <span class='gradient-text'>Touch</span>",
    id: "Hubungi <span class='gradient-text'>Saya</span>",
  },
  "contact-intro": {
    en: "I am open to job opportunities, internships, and collaborations. Feel free to reach out through any of the channels below — I will reply as soon as I can.",
    id: "Saya terbuka untuk peluang kerja, magang, dan kolaborasi. Silakan hubungi saya melalui salah satu kanal di bawah ini — saya akan membalas secepatnya.",
  },

  /* --- Footer --- */
  "footer-rights": { en: "All rights reserved.", id: "Hak cipta dilindungi." },
};

const typingPhrasesByLanguage = {
  en: [
    "Information Systems Graduate",
    "Data Analysis Enthusiast",
    "Problem Solver",
    "UI/UX Design",
  ],
  id: [
    "Lulusan Sistem Informasi",
    "Antusias Analisis Data",
    "Pemecah Masalah",
    "Desain UI/UX",
  ],
};

let currentLanguage = localStorage.getItem("language") || "en";

function applyLanguage(language) {
  const translatableElements = document.querySelectorAll("[data-i18n]");

  translatableElements.forEach(function (element) {
    const key = element.getAttribute("data-i18n");
    const translation = translations[key];

    if (translation) {
      element.innerHTML = translation[language];
    }
  });

  typingPhrases = typingPhrasesByLanguage[language];
  phraseIndex = 0;
  letterIndex = 0;
  isDeleting = false;

  languageOptionEn.classList.toggle("active", language === "en");
  languageOptionId.classList.toggle("active", language === "id");

  localStorage.setItem("language", language);
  document.documentElement.lang = language;
  currentLanguage = language;
}

languageToggleButton.addEventListener("click", function () {
  if (currentLanguage === "en") {
    applyLanguage("id");
  } else {
    applyLanguage("en");
  }
});

applyLanguage(currentLanguage);
