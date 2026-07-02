document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(
    "#coleta-accordion .accordion-card",
  );
  if (!cards.length) return;

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      if (window.innerWidth >= 1024) {
        cards.forEach((c) => c.classList.remove("active"));
        card.classList.add("active");
      }
    });
  });
});
