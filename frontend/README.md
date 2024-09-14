<div align='center'>
  <h1 align='center'>
  <img src="/frontend/src/images/logo.png" alt="Dois livros empilhados ao lado da palavra HeinzenBooks.">
  </h1>
</div>
<br />
<p align="center">
<img loading="lazy" src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge"/>
</p>

[Read this in English](README_en.md)

HeinzenBooks é um projeto de e-commerce de livros desenvolvido em React no front-end e Node.js no back-end. O objetivo do projeto é oferecer uma plataforma onde os usuários podem navegar por categorias de livros, favoritar, adicionar à prateleira e visualizar mais detalhes sobre os livros disponíveis.

## Funcionalidades

- Listagem de livros com detalhes e imagens
- Funcionalidade de favoritar/desfavoritar livros
- Integração com API para manipulação de dados de livros
- Rotas para navegação entre diferentes seções do site (ex: categorias, favoritos, prateleira)
- Design responsivo utilizando Styled Components

## Tecnologias Utilizadas

- **Front-end**: React, Styled Components, Axios, React Router DOM
- **Back-end**: Node.js, Express, CORS, Nodemon
- **Outras dependências**: Babel, Testing Library (Jest, React)

## Inspiração para o Projeto

- HeinzenBooks é um projeto inspirado no AluraBooks, página desenvolvida durante a formação "Full stack JavaScript: crie um projeto com React e Node.js", ministrada por Bernardo Severo da Silveira na plataforma Alura Cursos online de Tecnologia.

## Como Rodar o Projeto Localmente

1. Clone o repositório:

   ```bash
   git clone https://github.com/thiagoheinzen/heinzenbooks.git
   ```

2. Navegue até a pasta do back-end:

   ```bash
   cd heinzenbooks/backend
   ```

   Instale as dependências do back-end:

   ```bash
   npm install
   ```

3. Navegue até a pasta do front-end:

   ```bash
   cd heinzenbooks/frontend
   ```

   Instale as dependências do front-end:

   ```bash
   npm install
   ```

4. Para rodar o projeto localmente, utilize o comando para rodar o front-end e o back-end simultaneamente:

   ```bash
   npm run start
   ```

5. Acesse a aplicação em:

   - http://localhost:3000

## Como Contribuir

1. Faça um fork do projeto

2. Crie uma nova branch com sua feature:

   ```bash
   git checkout -b minha-feature
   ```

3. Commit suas alterações:

   ```bash
   git commit -m 'Adicionei minha feature'
   ```

4. Envie para a branch principal:

   ```bash
   git push origin minha-feature
   ```

5. Abra um Pull Request
