document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".blog-filters .filter-btn");
  const cards = document.querySelectorAll(".blog-card");
  const loadMoreBtn = document.getElementById("load-more-btn");
  
  let currentLimit = 4;

  function applyFilters() {
    const activeBtn = document.querySelector(".blog-filters .filter-btn.active");
    const filterValue = activeBtn ? activeBtn.getAttribute("data-filter") : "all";
    let visibleCount = 0;
    
    cards.forEach((card) => {
      const category = card.getAttribute("data-category");
      const match = (filterValue === "all" || category === filterValue);
      
      if (match) {
        if (visibleCount < currentLimit) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });
    
    if (loadMoreBtn) {
      if (visibleCount > currentLimit) {
        loadMoreBtn.style.display = "inline-block";
      } else {
        loadMoreBtn.style.display = "none";
      }
    }
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked button
      btn.classList.add("active");
      
      currentLimit = 4; // Reset limit when changing filters
      applyFilters();
    });
  });

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      currentLimit += 4; // Load 4 more cards
      applyFilters();
    });
  }

  // Initial load
  applyFilters();
});
