/**
 * ==========================================
 * form_validate.js
 * ==========================================
 * ONDE ESTÁ SENDO USADO:
 * Este script atua em qualquer formulário da página que possua o 
 * atributo `data-validate="true"` (ex: no componente Form.astro).
 * 
 * O QUE ELE FAZ:
 * - Validação de campos (e-mail válido, telefone com dígitos suficientes, campos obrigatórios).
 * - Formatação (máscara) em tempo real para campos de telefone (ex: (11) 99999-9999).
 * - Exibição de mensagens de erro caso o usuário tente enviar o form incompleto.
 * - Lógica de envio (Submit): Intercepta o envio e simula um carregamento ("mock"),
 *   exibindo uma tela de sucesso após a validação.
 * ==========================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // Encontra todos os formulários na página que pedem validação
  const forms = document.querySelectorAll("form[data-validate='true']");

  // Função central para checar se um input específico está válido
  function checkValidity(input) {
    // Se o input estiver oculto na tela (display: none), ignoramos a validação dele
    if (input.offsetParent === null) return true;
    
    // Se não for obrigatório e estiver vazio, também está válido
    if (!input.hasAttribute("required") && input.value.trim() === "") return true;

    // Regra geral: tem que ter algo digitado
    let isValid = input.value.trim() !== "";
    
    // Regra específica para E-mail: precisa ter formato de e-mail (texto@texto.texto)
    if (isValid && input.type === "email") {
      isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
    }
    // Regra específica para Telefone: precisa ter pelo menos 10 números
    if (isValid && input.type === "tel") {
      isValid = input.value.replace(/\D/g, "").length >= 10;
    }
    return isValid;
  }

  // Adiciona ou remove a classe "invalid" (que mostra a borda vermelha)
  function handleInputValidation(input) {
    if (!input) return;
    // Só validamos se o usuário já tocou (interagiu) com o campo
    if (input.dataset.touched === "true") {
      if (!checkValidity(input)) {
        input.classList.add("invalid");
      } else {
        input.classList.remove("invalid");
      }
    }
  }

  // Aplica os eventos de validação e máscara para cada formulário encontrado
  forms.forEach((form) => {
    const inputs = form.querySelectorAll("input, select, textarea");
    const submitBtn = form.querySelector("button[type='submit']");
    const btnText = submitBtn ? submitBtn.querySelector(".btn-text") : null;
    const originalBtnText = btnText ? btnText.textContent : "";

    inputs.forEach((input) => {
      // "Honey-field" é uma técnica anti-spam. Ignoramos a validação visual dele.
      if (input.classList.contains("honey-field")) return;

      // Quando o usuário clica fora do input (blur), marcamos como "tocado" e validamos
      input.addEventListener("blur", () => {
        input.dataset.touched = "true";
        handleInputValidation(input);
      });
      // Enquanto o usuário digita, validamos em tempo real
      input.addEventListener("input", () => {
        handleInputValidation(input);
      });
      // Quando o valor muda (para selects, por exemplo)
      input.addEventListener("change", () => {
        handleInputValidation(input);
      });

      // Máscara automática para inputs de telefone
      if (input.type === "tel") {
        input.addEventListener("input", () => {
          let v = input.value.replace(/\D/g, ""); // Remove tudo que não for número
          if (v.length > 11) v = v.slice(0, 11); // Limita a 11 dígitos no máximo
          
          // Formata no padrão: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
          if (v.length > 10) {
            v = v.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
          } else if (v.length > 6) {
            v = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
          } else if (v.length > 2) {
            v = v.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
          }
          
          input.value = v; // Aplica o valor mascarado de volta no campo
          handleInputValidation(input);
        });
      }
    });

    // Lógica disparada quando o usuário clica em "Enviar"
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // Impede o recarregamento automático da página

      let allValid = true;
      // Varre todos os campos para checar se algum ficou faltando ou inválido
      inputs.forEach((input) => {
        if (input.classList.contains("honey-field")) return;
        // Só valida campos que estão visíveis
        if (input.offsetParent !== null) {
          input.dataset.touched = "true";
          handleInputValidation(input);
          if (!checkValidity(input)) allValid = false; // Se um falhar, barra o envio
        }
      });

      // Se houver algum erro, paramos por aqui (o usuário verá os alertas em vermelho)
      if (!allValid) return;

      // Se passou em tudo, captura os dados preenchidos
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      // Se o "honey-field" oculto (website) foi preenchido, é um bot de spam. Cancelamos.
      if (data.website) return;

      // -------------------------------------------------------------
      // TIPO DE ENVIO: MOCK (Simulação)
      // Usado para demonstrar uma tela de sucesso
      // -------------------------------------------------------------
      if (submitBtn) {
        submitBtn.disabled = true; // Impede duplo clique
        if (btnText) btnText.textContent = "Enviando..."; // Dá feedback visual
      }

      // Busca os elementos no escopo do formulário atual para evitar conflitos
      const wrapper = form.closest(".contact-wrapper") || form.parentElement;
      const formContainer = wrapper.querySelector("#form-container");
      const successState = wrapper.querySelector("#success-state");

      // Simula um tempo de carregamento de 800ms
      setTimeout(() => {
        if (formContainer && successState) {
          form.style.display = "none";
          
          const contactNote = wrapper.querySelector(".contact-note");
          if(contactNote) contactNote.style.display = "none";
          
          successState.classList.remove("hidden"); // Mostra o tick de sucesso
        } else {
          // Fallback visual para outros formulários que não têm o #success-state
          if (submitBtn) {
            btnText.textContent = "Enviado com sucesso!";
            setTimeout(() => {
              if (btnText) btnText.textContent = originalBtnText;
            }, 3000);
          }
        }
        form.reset();
        
        inputs.forEach(input => {
           input.dataset.touched = "false";
           input.classList.remove("invalid");
        });

        if (submitBtn) {
          submitBtn.disabled = false;
          if (btnText) btnText.textContent = originalBtnText;
        }
      }, 800);
    });
  });
});
