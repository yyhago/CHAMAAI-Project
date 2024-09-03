# CHAMAAI

CHAMAAI é uma aplicação web de troca de mensagens em tempo real, desenvolvida com Node.js, TypeScript e React. O projeto oferece uma plataforma segura para comunicação rápida, com funcionalidades de cadastro, login e envio de mensagens.

## Screenshots
# FIGMA (Protótipov0.1)
![Primeira Tela](/pictureScreen/image.png)

## Funcionalidades

* **Cadastro e Login de Usuários:** Sistema de autenticação utilizando JWT para garantir a segurança dos dados dos usuários.
* **Troca de Mensagens em Tempo Real:** Envio e recebimento de mensagens entre usuários cadastrados, com atualização em tempo real.
* **Adição de Contatos:** Possibilidade de adicionar novos usuários à lista de contatos utilizando o ID único de cada usuário.

## Tecnologias Utilizadas

* **Backend:**
   * Node.js
   * TypeScript
   * Express.js
   * JWT para autenticação
   * Prisma ou TypeORM para interação com o banco de dados
* **Frontend:**
   * React
   * Axios para requisições HTTP
   * Context API para gerenciamento de estado
   * CSS (ou Tailwind CSS) para estilização

## Estrutura do Projeto

* **Backend:**
   * `src/`
      * `controllers/`
      * `middlewares/`
      * `models/`
      * `routes/`
      * `services/`
      * `app.ts`
* **Frontend:**
   * `src/`
      * `components/`
      * `pages/`
      * `hooks/`
      * `context/`
      * `styles/`
      * `App.tsx`

## Como Rodar o Projeto

1. **Clone o repositório:**

```bash
git clone https://github.com/yyhago/CHAMAAI.git
```

2. **Backend:**
   * Navegue até a pasta do backend:

```bash
cd backend
```

   * Instale as dependências:

```bash
npm install
```

   * Configure as variáveis de ambiente no arquivo `.env`.
   * Inicie o servidor:

```bash
npm run dev
```

3. **Frontend:**
   * Navegue até a pasta do frontend:

```bash
cd frontend
```

   * Instale as dependências:

```bash
npm install
```

   * Inicie o aplicativo React:

```bash
npm start
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e enviar pull requests.

## Licença

Este projeto está licenciado sob a MIT License.