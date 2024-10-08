# API Documentation

## Base URL

http://localhost:5000/users

## Authentication

### Login
**POST /login**
- **Request Body**:
```json
{
  "email": "string",
  "password": "string"
}
```
- **Responses**:
  - **200 OK**: Retorna o usuário e o token JWT.
  - **401 Unauthorized**: Credenciais inválidas.

### Create User
**POST /users**
- **Request Body**:
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```
- **Responses**:
  - **201 Created**: Retorna o usuário criado e o token JWT.
  - **400 Bad Request**: Erro na validação dos dados (email ou username já em uso).

### Refresh Token
**POST /refresh-token**
- **Headers**:
  - Authorization: Bearer token
- **Responses**:
  - **200 OK**: Retorna um novo token JWT.
  - **401 Unauthorized**: Usuário não autenticado.

## User Routes

### Get Users
**GET /users**
- **Headers**:
  - Authorization: Bearer token
- **Responses**:
  - **200 OK**: Retorna a lista de usuários.
  - **401 Unauthorized**: Usuário não autenticado.

### Get Protected Data
**GET /protected**
- **Headers**:
  - Authorization: Bearer token
- **Responses**:
  - **200 OK**: Retorna dados do usuário autenticado.
  - **401 Unauthorized**: Usuário não autenticado.

## Error Responses

- **400 Bad Request**: Erro de validação de entrada.
- **401 Unauthorized**: Token inválido ou não fornecido.
- **404 Not Found**: Recurso não encontrado.
- **500 Internal Server Error**: Erro interno do servidor.

## Notes

- O token JWT deve ser enviado no cabeçalho Authorization como Bearer {token}.
- As senhas são armazenadas de forma segura usando bcrypt.
- Qualquer dúvida consulte as rotas em: src/routes/userRoutes.ts