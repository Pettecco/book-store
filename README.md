# Book Store API

Node.js: lidando com buscas, filtros, paginação e erros em uma API — projeto criado a partir de um curso da Alura.

Descrição

Uma API REST simples para gerenciar livros e autores. Implementada com Express e MongoDB (Mongoose). Tem suporte a buscas, filtros, paginação e tratamento centralizado de erros.

Principais funcionalidades

- CRUD de livros
- CRUD de autores
- Busca e filtros (título, autor, editora, número de páginas)
- Paginação e ordenação
- Tratamento de erros com respostas padronizadas

Tecnologias

- Node.js
- Express
- MongoDB Atlas (Mongoose)

Como rodar

1. Instale dependências:

```bash
npm install
```

2. Crie um arquivo `.env` a partir do `.env.example` e configure a variável `DB_CONNECTION_STRING` com sua string do MongoDB Atlas.

3. Inicie em modo de desenvolvimento:

```bash
npm run dev
```

Endpoints (resumo)

- GET / — rota de teste
- GET /books — listar livros (suporta query string para paginação: `limit`, `page`, `sort`)
- GET /books/:id — obter livro por id
- POST /books — criar livro
- PUT /books/:id — atualizar livro
- DELETE /books/:id — deletar livro
- GET /authors — listar autores
- GET /authors/:id — obter autor por id
- POST /authors — criar autor
- PUT /authors/:id — atualizar autor
- DELETE /authors/:id — deletar autor
