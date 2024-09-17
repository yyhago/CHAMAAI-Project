import express from 'express'; // Importa o Express
import userRoutes from './routes/user.routes'; // Importa as rotas de usuário

const app = express(); // Cria uma instância do Express

app.use(express.json()); // Middleware para parsear JSON no corpo da requisição

app.use('/api', userRoutes); // Usa as rotas de usuário com o prefixo '/api'

// Inicia o servidor na porta 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
