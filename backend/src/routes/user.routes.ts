import { Router } from 'express'; // Importa o roteador do Express
import { signup, login, getAllUsers } from '../controllers/user.controller'; // Importa as funções do controlador de usuários

const router = Router(); // Cria uma instância do roteador

// Rota para registro de usuário
router.post('/signup', signup);
// Rota para login de usuário
router.post('/login', login);
// Rota para listar todos os usuários
router.get('/users', getAllUsers);

export default router; // Exporta o roteador para uso no app
