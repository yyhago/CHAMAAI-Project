import express from 'express';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './utils/errorHandler';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use('/users', userRoutes); // Registra as rotas de usuário
app.use(errorHandler); // Middleware para manipulação de erros

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
