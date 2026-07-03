/**
 * ==========================================
 * form.js
 * ==========================================
 * ONDE ESTÁ SENDO USADO:
 * Este script é carregado pelo componente "Form.astro" (`src/components/Form.astro`).
 * 
 * O QUE ELE FAZ:
 * Ele é responsável por toda a lógica de exibição condicional do formulário principal
 * da página. O comportamento central é observar o campo "Assunto" (subject) e
 * esconder ou exibir os campos extras dependendo do que for selecionado:
 * - Caso "Agendar Coleta", ele abre campos obrigatórios de endereço e quantidade,
 *   e torna o campo de Mensagem opcional.
 * - Caso outro assunto, ele esconde/limpa os campos de coleta e torna a Mensagem
 *   obrigatória.
 * ==========================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // Captura o elemento principal do formulário
  const form = document.getElementById("contact-form");
  // Se o formulário não existir na página, encerra a execução do script para evitar erros
  if (!form) return;

  // Captura os elementos do DOM referentes aos campos do formulário
  const subjectSelect = document.getElementById("subject"); // Dropdown de Assunto

  // Elementos relacionados à opção "Agendar Coleta"
  const collectionTypeGroup = document.getElementById("agendar-fields"); // Contêiner dos campos de coleta
  const collectionTypeSelect = document.getElementById("collection-type");
  const litersInput = document.getElementById("liters");
  const addressInput = document.getElementById("address");
  const addressNumberInput = document.getElementById("address-number");

  // Elementos relacionados ao campo de "Mensagem"
  const messageGroup = document.getElementById("message-group"); // Contêiner do campo de mensagem
  const messageInput = document.getElementById("message");
  const messageLabelSpan = document.getElementById("message-required-span"); // Asterisco de campo obrigatório
  const messageLabel = document.getElementById("message-label"); // Texto da label (rótulo)

  // Verifica se o seletor de assunto existe
  if (subjectSelect) {
    // Adiciona um ouvinte de evento que dispara toda vez que o assunto é alterado
    subjectSelect.addEventListener("change", (e) => {
      const val = e.target.value;

      // Se nenhum valor válido for selecionado (ex: o usuário voltou para a opção padrão)
      if (!val) {
        // Oculta tanto os campos de agendamento quanto o campo de mensagem
        collectionTypeGroup.classList.remove("active");
        messageGroup.classList.remove("active");
        return;
      }

      // Se o usuário selecionou "Agendar coleta"
      if (val === "agendar_coleta") {
        // 1. Exibe o bloco com os campos de endereço e detalhes da coleta
        collectionTypeGroup.classList.add("active");
        // Torna todos esses campos obrigatórios para o envio
        collectionTypeSelect.setAttribute("required", "required");
        litersInput.setAttribute("required", "required");
        addressInput.setAttribute("required", "required");
        addressNumberInput.setAttribute("required", "required");

        // 2. Exibe o campo de mensagem
        messageGroup.classList.add("active");
        // Porém, a mensagem se torna OPCIONAL (remove o 'required')
        messageInput.removeAttribute("required");
        // Oculta o asterisco que indica obrigatoriedade
        messageLabelSpan.style.display = "none";

        // Altera o título do campo para fazer mais sentido neste contexto
        messageLabel.innerHTML = 'Instruções para coleta';
      }
      // Se o usuário selecionou QUALQUER OUTRA OPÇÃO (Dúvida, Reclamação, Parceria, etc.)
      else {
        // 1. Oculta os campos específicos de coleta
        collectionTypeGroup.classList.remove("active");
        // Remove a obrigatoriedade destes campos para que o form possa ser enviado
        collectionTypeSelect.removeAttribute("required");
        litersInput.removeAttribute("required");
        addressInput.removeAttribute("required");
        addressNumberInput.removeAttribute("required");

        // Limpa os valores inseridos, caso o usuário tenha preenchido e depois trocado de ideia
        collectionTypeSelect.value = "";
        litersInput.value = "";
        addressInput.value = "";
        addressNumberInput.value = "";

        // 2. Exibe o campo de mensagem
        messageGroup.classList.add("active");
        // A mensagem agora é OBRIGATÓRIA
        messageInput.setAttribute("required", "required");
        // Exibe novamente o asterisco
        messageLabelSpan.style.display = "inline";

        // Retorna o rótulo para o texto padrão com o asterisco
        messageLabel.innerHTML = 'Mensagem <span id="message-required-span">*</span>';
      }
    });
  }
});
