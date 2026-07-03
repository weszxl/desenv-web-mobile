/**
 * Script responsável pelo comportamento interativo do cabeçalho (Header).
 * Utilizado primariamente no componente Header.astro.
 * 
 * Funcionalidades principais:
 * - Controle do menu Mobile (hambúrguer): abrir, fechar, e bloquear a rolagem da página quando aberto.
 * - Animação da barra de navegação no scroll: altera a cor de fundo (classe 'scrolled') 
 *   e oculta a barra ao rolar para baixo, exibindo-a novamente ao rolar para cima (classe 'hidden-nav').
 * - Fechamento automático do menu mobile ao clicar fora dele, clicar em um link, rolar o mouse ou tocar na tela.
 */

// Seleção dos elementos chave do DOM (navbar, botão do menu mobile, container do menu e ícones)
const navbar = document.getElementById("main-nav");
const mobileBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = document.querySelector(".menu-icon");
const closeIcon = document.querySelector(".close-icon");

// Armazena a última posição de rolagem vertical para comparar com a atual (usado para ocultar/mostrar a navbar)
let lastScrollY = window.scrollY;

/**
 * Função utilitária para fechar o menu mobile.
 * Reverte as classes de estado e destrava a rolagem do corpo da página (overflow = "").
 */
function closeMobileMenu() {
  if (mobileMenu?.classList.contains("open")) {
    mobileMenu.classList.remove("open");
    navbar?.classList.remove("menu-open");
    
    // Alterna os ícones: mostra o hambúrguer, esconde o "X"
    menuIcon?.classList.remove("hidden");
    closeIcon?.classList.add("hidden");
    
    // Restaura a rolagem nativa da página
    document.body.style.overflow = "";
  }
}

// Seleciona todos os links de navegação dentro do menu mobile, incluindo o botão CTA
const mobileNavLinks = document.querySelectorAll(
  ".mobile-nav-link, .btn-cta-mobile",
);

// Adiciona um listener de clique a cada link para fechar o menu automaticamente após o usuário fazer uma escolha
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMobileMenu();
  });
});

/**
 * Função executada a cada evento de scroll.
 * Responsável por aplicar as classes de background e esconder/mostrar a navbar baseada na direção do scroll.
 */
function updateNavbar() {
  const currentScrollY = window.scrollY;
  const isMenuOpen = mobileMenu?.classList.contains("open");

  // Se a página rolou mais de 50 pixels, adiciona a classe 'scrolled' (ativa background, troca a logo, etc)
  if (currentScrollY > 50) {
    navbar?.classList.add("scrolled");
  } else {
    navbar?.classList.remove("scrolled");
  }

  // Se o usuário rolou para baixo (current > last), passou de 100px e o menu mobile não está aberto:
  // Esconde a barra de navegação adicionando a classe 'hidden-nav' (geralmente faz translate-y -100%)
  if (currentScrollY > lastScrollY && currentScrollY > 100 && !isMenuOpen) {
    navbar?.classList.add("hidden-nav");
  } else {
    // Se rolou para cima (ou está no topo), mostra a barra novamente
    navbar?.classList.remove("hidden-nav");
  }

  // Atualiza a posição de rolagem para a próxima verificação
  lastScrollY = currentScrollY;
}

// Atrela a função updateNavbar ao evento de scroll da janela
window.addEventListener("scroll", updateNavbar);
// Executa a função imediatamente ao carregar o script para garantir o estado inicial correto ao recarregar a página
updateNavbar();

/**
 * Alterna entre abrir e fechar o menu mobile ao clicar no botão hambúrguer.
 */
function toggleMenu(e) {
  // Previne que o clique no botão se propague até o documento e acione o evento document.click que fecha o menu
  e.stopPropagation();
  
  const isOpening = !mobileMenu?.classList.contains("open");

  if (isOpening) {
    // Abre o menu, trava a rolagem da página e troca o ícone de hambúrguer para "X"
    mobileMenu?.classList.add("open");
    navbar?.classList.add("menu-open");
    menuIcon?.classList.add("hidden");
    closeIcon?.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  } else {
    // Se já estava aberto, fecha o menu
    closeMobileMenu();
  }
}

// Vincula a função toggle ao botão hambúrguer
mobileBtn?.addEventListener("click", toggleMenu);

// Fecha o menu mobile se o usuário clicar em qualquer lugar da tela FORA da navbar
document.addEventListener("click", (e) => {
  if (
    mobileMenu?.classList.contains("open") &&
    !navbar?.contains(e.target) // Verifica se o clique não ocorreu dentro do cabeçalho
  ) {
    closeMobileMenu();
  }
});

// Fecha o menu mobile se o usuário tentar rolar a página com a rodinha do mouse (wheel)
document.addEventListener(
  "wheel",
  () => {
    if (mobileMenu?.classList.contains("open")) {
      closeMobileMenu();
    }
  },
  { passive: true }, // passive: true melhora a performance informando ao browser que o evento não usará preventDefault
);

// Fecha o menu mobile se o usuário tentar arrastar/scrollar a tela no celular (touchmove)
// ignorando os toques que ocorrerem estritamente na própria navbar.
document.addEventListener(
  "touchmove",
  (e) => {
    if (
      mobileMenu?.classList.contains("open") &&
      !navbar?.contains(e.target)
    ) {
      closeMobileMenu();
    }
  },
  { passive: true },
);
