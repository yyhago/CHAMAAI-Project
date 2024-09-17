import { Request, Response } from 'express'; // Importa tipos para Express
import { registerUser, findUserByEmail, findAllUsers } from '../services/user.service'; // Importa as funções do serviço de usuários
import bcrypt from 'bcryptjs'; // Importa a biblioteca para comparação de senhas
import jwt from 'jsonwebtoken'; // Importa a biblioteca para criação de tokens JWT

const JWT_SECRET = process.env.JWT_SECRET || 'secret key man hehe'; // Chave secreta para JWT

// Função para registrar um novo usuário
export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body; // Obtém email e senha do corpo da requisição

  try {
    // Verifica se o usuário já existe
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' }); // Retorna um erro se o usuário já existir
    }

    // Registra o novo usuário
    const user = await registerUser(email, password);
    res.status(201).json({ user }); // Retorna o usuário criado com sucesso
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' }); // Retorna um erro genérico se algo der errado
  }
};

// Função para fazer login de um usuário
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body; // Obtém email e senha do corpo da requisição

  try {
    // Encontra o usuário pelo email
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // Retorna um erro se o usuário não for encontrado
    }

    // Compara a senha fornecida com a senha hasheada no banco de dados
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' }); // Retorna um erro se as credenciais forem inválidas
    }

    // Gera um token JWT
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token }); // Retorna o token com sucesso
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' }); // Retorna um erro genérico se algo der errado
  }
};

// Função para listar todos os usuários
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await findAllUsers(); // Busca todos os usuários
    res.status(200).json(users); // Retorna a lista de usuários com sucesso
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users' }); // Retorna um erro genérico se algo der errado
  }
};
