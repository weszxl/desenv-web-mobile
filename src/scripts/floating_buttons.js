document.addEventListener("DOMContentLoaded", () => {
  const floatingWrapper = document.getElementById("floating-actions");
  const backToTopBtn = document.getElementById("btn-back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > window.innerHeight * 0.8) {
      floatingWrapper?.classList.remove("hidden");
    } else {
      floatingWrapper?.classList.add("hidden");
    }
  });

  backToTopBtn?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
