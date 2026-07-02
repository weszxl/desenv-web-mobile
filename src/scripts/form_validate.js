document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form[data-validate='true']");

  function checkValidity(input) {
    if (input.offsetParent === null) return true;
    if (!input.hasAttribute("required") && input.value.trim() === "") return true;

    let isValid = input.value.trim() !== "";
    if (isValid && input.type === "email") {
      isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
    }
    if (isValid && input.type === "tel") {
      isValid = input.value.replace(/\D/g, "").length >= 10;
    }
    return isValid;
  }

  function handleInputValidation(input) {
    if (!input) return;
    if (input.dataset.touched === "true") {
      if (!checkValidity(input)) {
        input.classList.add("invalid");
      } else {
        input.classList.remove("invalid");
      }
    }
  }

  forms.forEach((form) => {
    const inputs = form.querySelectorAll("input, select, textarea");
    const submitBtn = form.querySelector("button[type='submit']");
    const btnText = submitBtn ? submitBtn.querySelector(".btn-text") : null;
    const originalBtnText = btnText ? btnText.textContent : "";

    inputs.forEach((input) => {
      if (input.classList.contains("honey-field")) return;

      input.addEventListener("blur", () => {
        input.dataset.touched = "true";
        handleInputValidation(input);
      });
      input.addEventListener("input", () => {
        handleInputValidation(input);
      });
      input.addEventListener("change", () => {
        handleInputValidation(input);
      });

      if (input.type === "tel") {
        input.addEventListener("input", () => {
          let v = input.value.replace(/\D/g, "");
          if (v.length > 11) v = v.slice(0, 11);
          if (v.length > 10) {
            v = v.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
          } else if (v.length > 6) {
            v = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
          } else if (v.length > 2) {
            v = v.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
          }
          input.value = v;
          handleInputValidation(input);
        });
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let allValid = true;
      inputs.forEach((input) => {
        if (input.classList.contains("honey-field")) return;
        if (input.offsetParent !== null) {
          input.dataset.touched = "true";
          handleInputValidation(input);
          if (!checkValidity(input)) allValid = false;
        }
      });

      if (!allValid) return;

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      if (data.website) return;

      const submitType = form.dataset.submitType || "mock";

      if (submitType === "whatsapp") {
        let text = `Olá, meu nome é ${data.name}. `;
        if (data.subject) {
          text += `Assunto: ${data.subject === 'agendar_coleta' ? 'Agendar coleta' : data.subject}. `;
        }
        
        if (data.subject === 'agendar_coleta') {
          text += `Tipo de coleta: ${data['collection-type']}. `;
          text += `Quantidade aproximada: ${data.liters} litros. `;
          text += `Endereço: ${data.address}, Nº ${data['address-number']}. `;
        }
        
        if (data.message) {
          if (data.subject === 'agendar_coleta') {
            text += `Instruções: ${data.message}`;
          } else {
            text += `Mensagem: ${data.message}`;
          }
        }

        const waNumber = form.dataset.whatsapp || "5511999999999"; 
        const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
        form.reset();
        
        inputs.forEach(input => {
           input.dataset.touched = "false";
           input.classList.remove("invalid");
        });

      } else if (submitType === "mock") {
        if (submitBtn) {
          submitBtn.disabled = true;
          if (btnText) btnText.textContent = "Enviando...";
        }

        const formContainer = document.getElementById("form-container");
        const successState = document.getElementById("success-state");

        setTimeout(() => {
          if (formContainer && successState) {
            form.style.display = "none";
            document.querySelector(".contact-note").style.display = "none";
            successState.classList.remove("hidden");
          }
          form.reset();

          if (submitBtn) {
            submitBtn.disabled = false;
            if (btnText) btnText.textContent = originalBtnText;
          }
        }, 800);
      }
    });
  });
});
