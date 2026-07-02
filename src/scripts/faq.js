document.addEventListener("DOMContentLoaded", () => {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
        const button = item.querySelector(".faq-button");

        button?.addEventListener("click", () => {
            const isOpen = item.classList.contains("open");

            faqItems.forEach((el) => {
                el.classList.remove("open");
                el.querySelector(".faq-button")?.setAttribute(
                    "aria-expanded",
                    "false",
                );
            });

            if (!isOpen) {
                item.classList.add("open");
                button.setAttribute("aria-expanded", "true");
            }
        });
    });
});
