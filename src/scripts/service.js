/**
 * Script responsável pela interatividade da Seção de Serviços (Service.astro).
 * 
 * Funcionalidade principal:
 * - Em resoluções Desktop (>= 1024px), monitora a posição do mouse (hover/mouseenter).
 * - Quando o usuário passa o mouse por cima de um cartão, este cartão ganha a classe 'active'.
 * - Os outros cartões perdem a classe 'active', permitindo o lindo efeito visual de Acordeão (sanfona) expansível orquestrado pelo CSS Flexbox.
 * - No Mobile, esta lógica é neutralizada pelo CSS e todos os cartões ficam abertos por padrão utilizando o scroll nativo.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Seleciona todos os cartões de serviço gerados no DOM do HTML
  const cards = document.querySelectorAll(
    "#coleta-accordion .accordion-card",
  );
  
  // Se não existirem cartões na página atual, encerra a execução silenciosamente para evitar erros de console
  if (!cards.length) return;

  /**
   * Itera sobre cada cartão detectado, injetando um "escutador" individual de evento de mouse.
   */
  cards.forEach((card) => {
    // "mouseenter" dispara instantaneamente, no exato milissegundo em que o ponteiro do mouse cruza a fronteira do elemento
    card.addEventListener("mouseenter", () => {
      // Verifica dinamicamente se a largura atual da tela equivale ao Desktop (>= 1024px)
      // O Acordeão horizontal hover NÃO deve funcionar em celulares/tablets verticais (telas pequenas)
      if (window.innerWidth >= 1024) {
        // Varre e remove a classe 'active' de TODOS os cartões para "fechar/achatar" sumariamente qualquer um que estivesse aberto antes
        cards.forEach((c) => c.classList.remove("active"));
        // Adiciona a classe 'active' EXCLUSIVAMENTE no cartão atual alvo do mouse, comandando o CSS para expandi-lo
        card.classList.add("active");
      }
    });
  });
});
