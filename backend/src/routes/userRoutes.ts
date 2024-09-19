import { Router } from 'express';
import { createUser, getUsers, loginUser, getProtectedData } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Rota para criar novo usuário
router.post('/signup', createUser);

// Rota para realizar login
router.post('/login', loginUser);

// Rota para listar todos os usuários (somente usuários autenticados podem acessar)
router.get('/', authMiddleware, getUsers);

// Rota protegida
router.post('/protected-route', authMiddleware, getProtectedData);

export default router;
