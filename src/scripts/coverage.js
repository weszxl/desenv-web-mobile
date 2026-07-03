/**
 * ==========================================
 * coverage.js
 * ==========================================
 * ONDE ESTÁ SENDO USADO:
 * Importado diretamente no componente `src/components/Coverage.astro`.
 * 
 * O QUE ELE FAZ:
 * Este script gerencia a interatividade da seção "Área de operação":
 * - Controla a alternância das abas (Tabs) entre "Região Metropolitana" e "Litoral Gaúcho".
 * - Oculta/Exibe os cartões de texto corretos quando o usuário clica nas abas.
 * - Substitui dinamicamente a imagem do mapa (à esquerda) com base na aba ativa.
 * - Lê as URLs das imagens diretamente de atributos de dados (`data-map-metro` 
 *   e `data-map-beach`) inseridos no HTML pelo Astro, permitindo que as 
 *   imagens sejam tratadas pelo bundler do framework de forma dinâmica.
 * ==========================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // Captura os principais elementos do DOM da seção de cobertura
  const section = document.querySelector(".coverage-section");
  const buttons = document.querySelectorAll(".tab-buttons button"); // Os botões das abas
  const contents = document.querySelectorAll(".tab-content"); // O conteúdo (cartões) de cada aba

  // Se a seção não existir na página atual, o script não precisa fazer nada
  if (!section) return;

  // Recupera as URLs das imagens dos mapas gravadas no HTML via Astro
  const paths = {
    mapMetro: section.getAttribute("data-map-metro") || "",
    mapBeach: section.getAttribute("data-map-beach") || "",
  };

  // Pega a tag <img> onde o mapa é exibido
  const mainMap = document.getElementById("main-map");

  // Localiza qual botão das abas começa com a classe 'active' por padrão
  const initialActiveBtn = document.querySelector(".tab-buttons button.active");
  
  // Define o mapa correto na inicialização com base no botão que já está ativo
  if (mainMap && initialActiveBtn) {
    const initialTarget = initialActiveBtn.getAttribute("data-target");
    if (initialTarget === "metro") {
      mainMap.setAttribute("src", paths.mapMetro);
    } else if (initialTarget === "litoral") {
      mainMap.setAttribute("src", paths.mapBeach);
    }
  }

  // Adiciona um evento de clique para CADA botão de aba
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      
      // 1. Reseta o estado (Remove o 'active' de todos os botões)
      buttons.forEach((btn) => {
        btn.classList.remove("active");
        btn.setAttribute("aria-selected", "false"); // Boa prática de Acessibilidade
      });
      // Reseta também o conteúdo (Oculta todos os cartões)
      contents.forEach((content) => content.classList.remove("active"));

      // 2. Aplica o estado ativo APENAS no botão que foi clicado
      button.classList.add("active");
      button.setAttribute("aria-selected", "true"); // Boa prática de Acessibilidade

      // 3. Descobre qual conteúdo essa aba clicada deve revelar
      const targetId = button.getAttribute("data-target");
      if (targetId) {
        // Encontra a div de conteúdo com o ID correspondente (ex: id="metro" ou id="litoral")
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          // Exibe o cartão na tela
          targetElement.classList.add("active");
        }

        // 4. Troca o arquivo da imagem do mapa para refletir a nova região
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
