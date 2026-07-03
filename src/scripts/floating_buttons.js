/**
 * Script responsável pelo comportamento dos botões flutuantes.
 * Utilizado primariamente pelo componente FloatingButtons.astro.
 * 
 * Funcionalidades principais:
 * - Controla a visibilidade dos botões: eles ficam ocultos inicialmente e 
 *   só aparecem quando o usuário rola a página para baixo.
 * - Gerencia a ação do botão "Voltar ao topo", realizando uma animação
 *   suave de rolagem (smooth scroll) até o início da página.
 */

// Aguarda o carregamento completo do documento (DOM) antes de buscar os elementos e adicionar os eventos
document.addEventListener("DOMContentLoaded", () => {
  // Seleciona o container principal que envolve os botões (WhatsApp e Voltar ao Topo)
  const floatingWrapper = document.getElementById("floating-actions");
  
  // Seleciona o botão específico cuja função é voltar para o topo
  const backToTopBtn = document.getElementById("btn-back-to-top");

  // Adiciona um ouvinte para o evento de rolagem (scroll) na janela do navegador
  window.addEventListener("scroll", () => {
    // Calcula se a rolagem atual (scrollY) ultrapassou 80% da altura visível da tela (innerHeight)
    if (window.scrollY > window.innerHeight * 0.8) {
      // Se rolou o suficiente, remove a classe 'hidden' para fazer os botões aparecerem
      // O símbolo '?' (optional chaining) previne erros caso o elemento não exista na página
      floatingWrapper?.classList.remove("hidden");
    } else {
      // Se o usuário estiver perto do topo da página, readiciona a classe 'hidden' para ocultá-los
      floatingWrapper?.classList.add("hidden");
    }
  });

  // Adiciona um evento de clique no botão de "Voltar ao topo"
  backToTopBtn?.addEventListener("click", () => {
    // Usa o método scrollTo para mover a janela de volta para a coordenada (0,0)
    window.scrollTo({
      top: 0, // Posição zero no eixo Y (topo absoluto da página)
      behavior: "smooth", // Faz com que a rolagem seja animada e suave, e não um salto abrupto
    });
  });
});
