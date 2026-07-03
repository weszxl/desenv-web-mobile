/**
 * Script responsável pelo componente NewsSection (Seção de Notícias).
 * 
 * Funcionalidades principais:
 * - Controle de filtro por categorias (ex: "Sustentabilidade", "Eventos").
 * - Sistema de "Carregar Mais" (Load More) para limitar a quantidade inicial de cartões exibidos (Paginação simples via DOM).
 * - Oculta/Exibe dinamicamente os cartões baseando-se nas opções escolhidas, sem precisar recarregar a página.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Mapeamento dos Elementos do DOM
  const filterBtns = document.querySelectorAll(".blog-filters .filter-btn"); // Botões coloridos das categorias
  const cards = document.querySelectorAll(".blog-card"); // Todos os cartões de notícia gerados no HTML
  const loadMoreBtn = document.getElementById("load-more-btn"); // Botão "Carregar Mais"

  // Limite da quantidade de cartões que podem ser exibidos na tela simultaneamente
  let currentLimit = 4;

  /**
   * Função principal que filtra os cartões e controla o comportamento do botão "Carregar Mais".
   * Deve ser invocada sempre que o limite de exibição aumentar ou um novo filtro for clicado.
   */
  function applyFilters() {
    // Descobre qual é o botão de categoria atualmente selecionado no layout
    const activeBtn = document.querySelector(".blog-filters .filter-btn.active");
    // Extrai o valor lógico do filtro ("all", "sustentabilidade", etc) guardado no data-attribute
    const filterValue = activeBtn ? activeBtn.getAttribute("data-filter") : "all";
    
    // Contador temporário para saber quantas notícias passaram no filtro (mesmo que fiquem ocultas pelo limite)
    let visibleCount = 0;

    cards.forEach((card) => {
      // Pega a categoria injetada diretamente na div da notícia atual
      const category = card.getAttribute("data-category");
      // Verifica se a notícia deve aparecer: Ou o usuário quer ver "Todos" (all), ou a categoria bate exatamente.
      const match = (filterValue === "all" || category === filterValue);

      if (match) {
        // Se a notícia faz parte da categoria escolhida, confere se já estourou o limite visual imposto (currentLimit)
        if (visibleCount < currentLimit) {
          card.style.display = "flex"; // Exibe a notícia restituindo o comportamento flexbox
        } else {
          card.style.display = "none"; // Esconde temporariamente a notícia pois ela excede a "página" (limite) atual
        }
        visibleCount++; // Soma no total de notícias ENCONTRADAS na base de dados para aquela categoria específica
      } else {
        card.style.display = "none"; // Oculta severamente a notícia caso a categoria seja diferente da escolhida no menu
      }
    });

    // Inteligência do Botão "Carregar Mais"
    if (loadMoreBtn) {
      // Se houverem mais itens encontrados/compatíveis do que o limite atual mostrado na tela, exibe o botão
      if (visibleCount > currentLimit) {
        loadMoreBtn.style.display = "inline-block";
      } else {
        // Se todas as notícias daquela categoria já estiverem visíveis para o usuário (ou a lista secou), remove o botão
        loadMoreBtn.style.display = "none";
      }
    }
  }

  /**
   * Aplica o gatilho (evento de clique) em todos os botões de Filtro/Categorias.
   */
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Ao clicar, limpa (remove) a classe "active" e a cor verde de todos os botões
      filterBtns.forEach((b) => b.classList.remove("active"));
      // Pinta com a classe "active" (verde) apenas o botão exato que acabou de ser clicado
      btn.classList.add("active");

      // Sempre que trocar abruptamente de categoria, reseta o estado da paginação para voltar a exibir apenas 4 notícias
      currentLimit = 4;
      // Dispara o algoritmo visual para atualizar os cards em tela
      applyFilters();
    });
  });

  /**
   * Aplica o gatilho (evento de clique) no botão utilitário "Carregar Mais".
   */
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      // Ao clicar, joga o limite da tela para cima (+4 notícias exibidas simultaneamente)
      currentLimit += 4;
      // Dispara o algoritmo visual novamente. As próximas 4 notícias que antes caíam no (display: none)
      // agora cairão dentro da regra do (display: flex) sendo reveladas magicamente ao usuário.
      applyFilters();
    });
  }

  // Initial load - Dispara a lógica assim que o script "acorda" pela primeira vez.
  // Isso garante que mesmo se o HTML contiver 100 notícias, apenas as 4 primeiras da categoria "Todos" (all)
  // ficarão visíveis na tela inicial.
  applyFilters();
});
