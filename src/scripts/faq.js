/**
 * Script de funcionalidade para a seção de FAQ (Perguntas Frequentes).
 * Utilizado no componente FAQSection.astro (e em outros locais que utilizem a classe .faq-item).
 * 
 * Este código gerencia o comportamento de "acordeão" (accordion):
 * - Permite expandir e recolher os itens de pergunta/resposta.
 * - Garante que apenas um item permaneça aberto por vez, fechando os outros automaticamente.
 * - Atualiza os atributos de acessibilidade (aria-expanded) de acordo com o estado do item.
 */

// Aguarda o carregamento completo do documento HTML (DOM) antes de executar
document.addEventListener("DOMContentLoaded", () => {
    // Seleciona todos os elementos que representam itens individuais do FAQ
    const faqItems = document.querySelectorAll(".faq-item");

    // Itera sobre cada item do FAQ encontrado na página
    faqItems.forEach((item) => {
        // Busca o botão que controla a expansão dentro do item atual
        const button = item.querySelector(".faq-button");

        // Adiciona um ouvinte de evento de clique ao botão, caso ele exista (uso do optional chaining '?')
        button?.addEventListener("click", () => {
            // Verifica se o item que foi clicado já se encontra no estado aberto
            const isOpen = item.classList.contains("open");

            // Percorre todos os itens do FAQ para fechá-los, garantindo que apenas um fique aberto
            faqItems.forEach((el) => {
                // Remove a classe 'open' para recolher a resposta
                el.classList.remove("open");
                
                // Atualiza o atributo de acessibilidade indicando que o item está fechado
                el.querySelector(".faq-button")?.setAttribute(
                    "aria-expanded",
                    "false",
                );
            });

            // Se o item clicado não estava aberto anteriormente, nós o abrimos agora
            if (!isOpen) {
                // Adiciona a classe 'open' para exibir a resposta
                item.classList.add("open");
                
                // Atualiza o atributo de acessibilidade indicando que o item está aberto
                button.setAttribute("aria-expanded", "true");
            }
        });
    });
});
