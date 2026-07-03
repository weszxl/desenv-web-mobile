/**
 * Script responsável pelo componente HowWork (Como Funciona).
 * 
 * Funcionalidades principais:
 * - Controle dos cartões de funcionalidade (Accordion estilo sanfona).
 * - Troca dinâmica da imagem principal exibida ao lado quando um cartão é ativado no desktop.
 * - Gerenciamento de classes e acessibilidade (aria-expanded).
 * - Tratamento diferenciado entre Mobile (abre/fecha livre) e Desktop (um sempre aberto).
 */

document.addEventListener("DOMContentLoaded", () => {
  // Seleciona todos os cartões iterados no Astro
  const cards = document.querySelectorAll(".feature-card");
  // Imagem ilustrativa que muda no desktop
  const dynamicImage = document.getElementById("dynamic-feature-image");

  // Se não existir cartões na página, aborta o script
  if (!cards.length) return;

  /**
   * Função para ativar um cartão específico.
   * Fechando todos os outros e trocando a imagem lateral.
   */
  function activateCard(card) {
    // Remove o estado 'active' de todos os cartões
    cards.forEach((el) => {
      el.classList.remove("active");
      el.querySelector(".card-header")?.setAttribute("aria-expanded", "false");
    });

    // Adiciona o estado 'active' no cartão clicado
    card.classList.add("active");
    card.querySelector(".card-header")?.setAttribute("aria-expanded", "true");

    // Lógica para trocar a imagem da lateral (Desktop)
    if (dynamicImage) {
      const newImageSrc = card.getAttribute("data-image"); // Pega a URL da imagem correspondente
      if (newImageSrc) {
        // Faz um efeito de opacidade rápido (fade) antes de trocar a imagem real
        dynamicImage.style.opacity = "0.3";
        setTimeout(() => {
          dynamicImage.src = newImageSrc;
          dynamicImage.style.opacity = "1";
        }, 200); // 200ms de delay acompanhando a transição do CSS
      }
    }
  }

  // Atribui o evento de clique a todos os cartões
  cards.forEach((card) => {
    const header = card.querySelector(".card-header");

    header?.addEventListener("click", () => {
      const isActive = card.classList.contains("active");

      // No Desktop (>= 992px), se o cartão já está aberto, não faz nada (obriga 1 a ficar sempre aberto para a imagem nunca sumir)
      if (isActive && window.innerWidth >= 992) {
        return;
      }

      // No Mobile (< 992px), permite que o usuário feche o próprio cartão clicando nele mesmo, recolhendo todos
      if (isActive && window.innerWidth < 992) {
        card.classList.remove("active");
        header.setAttribute("aria-expanded", "false");
        return;
      }

      // Caso padrão: ativa o cartão alvo e desativa (recolhe) todos os outros
      activateCard(card);
    });
  });

  // Media Query via JS para monitorar mudanças no tamanho da janela em tempo real (Resize)
  const mediaQuery = window.matchMedia("(min-width: 992px)");

  // Adiciona um listener para quando a janela cruzar o limite Mobile <-> Desktop
  mediaQuery.addEventListener("change", (e) => {
    // Se a janela virou tamanho desktop (e.matches = true)
    if (e.matches) {
      // Verifica se há algum cartão ativo (aberto)
      const hasActive = Array.from(cards).some((card) =>
        card.classList.contains("active"),
      );

      // Se nenhum cartão estava ativo (ex: o usuário fechou todos no celular e depois girou o aparelho),
      // força a abertura do primeiro para não quebrar o layout lateral ficando com a imagem deserta
      if (!hasActive) {
        activateCard(cards[0]);
      }
    }
  });
});
