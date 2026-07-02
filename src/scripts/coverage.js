document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".coverage-section");
  const buttons = document.querySelectorAll(".tab-buttons button");
  const contents = document.querySelectorAll(".tab-content");

  if (!section) return;

  const paths = {
    mapMetro: section.getAttribute("data-map-metro") || "",
    mapBeach: section.getAttribute("data-map-beach") || "",
  };

  const mainMap = document.getElementById("main-map");

  const initialActiveBtn = document.querySelector(
    ".tab-buttons button.active",
  );
  if (mainMap && initialActiveBtn) {
    const initialTarget = initialActiveBtn.getAttribute("data-target");
    if (initialTarget === "metro") {
      mainMap.setAttribute("src", paths.mapMetro);
    } else if (initialTarget === "litoral") {
      mainMap.setAttribute("src", paths.mapBeach);
    }
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => {
        btn.classList.remove("active");
        btn.setAttribute("aria-selected", "false");
      });
      contents.forEach((content) => content.classList.remove("active"));

      button.classList.add("active");
      button.setAttribute("aria-selected", "true");

      const targetId = button.getAttribute("data-target");
      if (targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.classList.add("active");
        }

        if (mainMap) {
          if (targetId === "metro") {
            mainMap.setAttribute("src", paths.mapMetro);
          } else if (targetId === "litoral") {
            mainMap.setAttribute("src", paths.mapBeach);
          }
        }
      }
    });
  });
});
