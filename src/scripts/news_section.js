document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 24,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });

  // Keep hover active logic if the user still wants it
  const cards = document.querySelectorAll(".swiper-slide");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      cards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
    });
    card.addEventListener("mouseleave", () => {
      card.classList.remove("active");
    });
  });
});
