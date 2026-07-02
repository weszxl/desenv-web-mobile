document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".feature-card");
  const dynamicImage = document.getElementById(
    "dynamic-feature-image",
  );

  if (!cards.length) return;

  function activateCard(card) {
    cards.forEach((el) => {
      el.classList.remove("active");
      el.querySelector(".card-header")?.setAttribute(
        "aria-expanded",
        "false",
      );
    });

    card.classList.add("active");
    card.querySelector(".card-header")?.setAttribute("aria-expanded", "true");

    if (dynamicImage) {
      const newImageSrc = card.getAttribute("data-image");
      if (newImageSrc) {
        dynamicImage.style.opacity = "0.3";
        setTimeout(() => {
          dynamicImage.src = newImageSrc;
          dynamicImage.style.opacity = "1";
        }, 200);
      }
    }
  }

  cards.forEach((card) => {
    const header = card.querySelector(".card-header");

    header?.addEventListener("click", () => {
      const isActive = card.classList.contains("active");

      if (isActive && window.innerWidth >= 992) {
        return;
      }

      if (isActive && window.innerWidth < 992) {
        card.classList.remove("active");
        header.setAttribute("aria-expanded", "false");
        return;
      }

      activateCard(card);
    });
  });

  const mediaQuery = window.matchMedia("(min-width: 992px)");

  mediaQuery.addEventListener("change", (e) => {
    if (e.matches) {
      const hasActive = Array.from(cards).some((card) =>
        card.classList.contains("active"),
      );

      if (!hasActive) {
        activateCard(cards[0]);
      }
    }
  });
});
