document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const subjectSelect = document.getElementById("subject");
  const collectionTypeGroup = document.getElementById("agendar-fields");
  const collectionTypeSelect = document.getElementById("collection-type");
  const litersInput = document.getElementById("liters");
  const addressInput = document.getElementById("address");
  const addressNumberInput = document.getElementById("address-number");

  const messageGroup = document.getElementById("message-group");
  const messageInput = document.getElementById("message");
  const messageLabelSpan = document.getElementById("message-required-span");
  const messageLabel = document.getElementById("message-label");

  if (subjectSelect) {
    subjectSelect.addEventListener("change", (e) => {
      const val = e.target.value;

      if (!val) {
        collectionTypeGroup.classList.remove("active");
        messageGroup.classList.remove("active");
        return;
      }

      if (val === "agendar_coleta") {
        collectionTypeGroup.classList.add("active");
        collectionTypeSelect.setAttribute("required", "required");
        litersInput.setAttribute("required", "required");
        addressInput.setAttribute("required", "required");
        addressNumberInput.setAttribute("required", "required");

        messageGroup.classList.add("active");
        messageInput.removeAttribute("required");
        messageLabelSpan.style.display = "none";

        messageLabel.innerHTML = 'Instruções para coleta';
      } else {
        collectionTypeGroup.classList.remove("active");
        collectionTypeSelect.removeAttribute("required");
        litersInput.removeAttribute("required");
        addressInput.removeAttribute("required");
        addressNumberInput.removeAttribute("required");

        collectionTypeSelect.value = "";
        litersInput.value = "";
        addressInput.value = "";
        addressNumberInput.value = "";

        messageGroup.classList.add("active");
        messageInput.setAttribute("required", "required");
        messageLabelSpan.style.display = "inline";

        messageLabel.innerHTML = 'Mensagem <span id="message-required-span">*</span>';
      }
    });
  }

});
