import express from 'express';
import cors from 'cors'; // Importa o CORS
import userRoutes from './routes/userRoutes';
import { errorHandler } from './utils/errorHandler';

const app = express();
const PORT = 5000;

// Use o CORS com opções específicas
app.use(cors({
  origin: 'http://localhost:3000', // Permite apenas o front-end que está rodando nesta URL
  methods: ['GET', 'POST'], // Métodos permitidos
  credentials: true // Se você estiver usando cookies, autenticação, etc.
}));

app.use(express.json());
app.use('/users', userRoutes); // Registra as rotas de usuário
app.use(errorHandler); // Middleware para manipulação de erros

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
