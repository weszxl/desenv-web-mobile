const navbar = document.getElementById("main-nav");
const mobileBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = document.querySelector(".menu-icon");
const closeIcon = document.querySelector(".close-icon");

let lastScrollY = window.scrollY;

function closeMobileMenu() {
  if (mobileMenu?.classList.contains("open")) {
    mobileMenu.classList.remove("open");
    navbar?.classList.remove("menu-open");
    menuIcon?.classList.remove("hidden");
    closeIcon?.classList.add("hidden");
    document.body.style.overflow = "";
  }
}

const mobileNavLinks = document.querySelectorAll(
  ".mobile-nav-link, .btn-cta-mobile",
);
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMobileMenu();
  });
});

function updateNavbar() {
  const currentScrollY = window.scrollY;
  const isMenuOpen = mobileMenu?.classList.contains("open");

  if (currentScrollY > 50) {
    navbar?.classList.add("scrolled");
  } else {
    navbar?.classList.remove("scrolled");
  }

  if (currentScrollY > lastScrollY && currentScrollY > 100 && !isMenuOpen) {
    navbar?.classList.add("hidden-nav");
  } else {
    navbar?.classList.remove("hidden-nav");
  }

  lastScrollY = currentScrollY;
}

window.addEventListener("scroll", updateNavbar);
updateNavbar();

function toggleMenu(e) {
  e.stopPropagation();
  const isOpening = !mobileMenu?.classList.contains("open");

  if (isOpening) {
    mobileMenu?.classList.add("open");
    navbar?.classList.add("menu-open");
    menuIcon?.classList.add("hidden");
    closeIcon?.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  } else {
    closeMobileMenu();
  }
}

mobileBtn?.addEventListener("click", toggleMenu);

document.addEventListener("click", (e) => {
  if (
    mobileMenu?.classList.contains("open") &&
    !navbar?.contains(e.target)
  ) {
    closeMobileMenu();
  }
});

document.addEventListener(
  "wheel",
  () => {
    if (mobileMenu?.classList.contains("open")) {
      closeMobileMenu();
    }
  },
  { passive: true },
);

document.addEventListener(
  "touchmove",
  (e) => {
    if (
      mobileMenu?.classList.contains("open") &&
      !navbar?.contains(e.target)
    ) {
      closeMobileMenu();
    }
  },
  { passive: true },
);
