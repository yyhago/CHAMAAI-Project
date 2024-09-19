import { Request, Response } from 'express';
import prisma from '../prisma/prismaClient';
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken';

export const createUser = async (req: Request, res: Response) => {
  try {
    // Desestruture os dados do corpo da requisição
    const { username, email, password } = req.body;

    // Verifique se todos os campos estão presentes
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Username, email, and password are required." });
    }

    // Verifica se o usuário já existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if(existingUser){
      return res.status(400).json({ error: "Email already in use." });
    }

    // Criptografar antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10)

    // Crie um novo usuário
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Criação token jwt
    const token = jwt.sign({ userId: user.id }, 'segredoJWT', { expiresIn: '1h' });

    // Retorne o usuário criado
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {

    const { email, password } = req.body
  
    // Verifica se os campos obrigatórios foram preenchidos
    if(!email || !password){
      return res.status(400).json({ error: 'Email and password are required!' })
    }

    // Busca o usuário no banco de dados
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Verifica se a senha está correta
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Gera o token JWT
    const token = jwt.sign({ userId: user.id }, 'segredoJWT', { expiresIn: '1h' });

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Retornar todos Users cadastrados
export const getUsers = async (req: Request, res: Response) => {
  try {
    res.json({ message: 'Lista de usuários', users: [] });
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getProtectedData = (req: Request, res: Response) => {
  // Verificar se req.user existe antes de acessá-lo
  if ((req as any).user) {
    res.json({
      message: 'Acesso autorizado à rota protegida',
      user: (req as any).user,
    });
  } else {
    res.status(401).json({ error: 'User not found' });
  }
};