# Projeto de Desenvolvimento Web Mobile

Este é um projeto web desenvolvido com foco em performance, acessibilidade e uma ótima experiência de usuário, voltado principalmente para dispositivos móveis. 

## Sobre o Framework: Astro

O projeto foi construído utilizando o **Astro** ([astro.build](https://astro.build/)), um framework web moderno, rápido e focado em sites de conteúdo.

### Como o Astro funciona?
O grande diferencial do Astro é a sua arquitetura baseada em **"Astro Islands"** (Ilhas Astro). 

Por padrão, o Astro gera um site com **zero JavaScript no lado do cliente**. Ele processa seus componentes durante o build (ou no servidor) e entrega apenas HTML e CSS puros e leves para o navegador do usuário. Isso resulta em um carregamento de página extremamente rápido.

Quando a interatividade é necessária (como um menu mobile ou validação de formulário), o Astro permite que você "hidrate" componentes específicos. Você pode ter um site 90% estático em HTML e apenas uma pequena "ilha" de 10% interativa com JavaScript.

**Principais Características:**
*   **Performance Otimizada:** Envia o mínimo possível de JavaScript para o navegador.
*   **Fácil de Usar:** A sintaxe dos arquivos `.astro` é muito parecida com o HTML padrão.
*   **Roteamento Baseado em Arquivos:** A estrutura de pastas define as rotas do site automaticamente.

## Estrutura de Pastas

O projeto está estruturado de forma organizada, separando responsabilidades para facilitar a manutenção e escalabilidade. Abaixo está a visão geral dos diretórios:

```text
/
├── public/           # Arquivos estáticos (favicon, imagens cruas, robots.txt). Estes arquivos não são processados/otimizados pelo Astro e são copiados diretamente para o build final.
├── src/              # Todo o código-fonte da aplicação vive aqui.
│   ├── assets/       # Imagens e outras mídias que você deseja que o Astro processe e otimize (ex: compressão de imagens).
│   ├── components/   # Pedaços reutilizáveis de código da interface (ex: <Button />, <Header />, <Card />). Geralmente arquivos .astro.
│   ├── layouts/      # Componentes especiais de template que formam a "casca" ou estrutura base de múltiplas páginas (contendo as tags <html>, <head>, <body>).
│   ├── pages/        # Sistema de roteamento. Qualquer arquivo (ex: index.astro, sobre.astro) colocado aqui se transforma automaticamente em uma página da web (ex: seudominio.com/ e seudominio.com/sobre).
│   ├── scripts/      # Arquivos com lógicas e scripts em JavaScript (ex: validação de formulários, interações dinâmicas), que podem ser importados nas páginas ou componentes.
│   └── styles/       # Arquivos de estilo CSS. Podem conter variáveis globais e o reset do CSS, além de estilos divididos por seções.
├── .env              # Variáveis de ambiente sensíveis e configurações locais.
├── astro.config.mjs  # O arquivo de configuração principal do Astro (integrações, opções de build).
└── package.json      # Dependências do projeto (Astro e outros pacotes) e scripts do npm.
```

## Como Executar o Projeto Localmente

1. Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.
2. Clone o repositório ou navegue até a pasta do projeto no seu terminal.
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
5. Abra o navegador e acesse a URL indicada no terminal (geralmente `http://localhost:4321/`).
