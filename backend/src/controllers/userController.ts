import { Request, Response } from 'express';
import prisma from '../prisma/prismaClient';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Definindo interface para o JWT payload
interface JWTPayload {
  userId: number;
}

// Interface para extender o Request
interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
  };
}

// Criar usuário
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Username, email, and password are required." });
    }

    // Verifica se o usuário já existe (email ou username)
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({ 
        error: existingUser.email === email 
          ? "Email already in use." 
          : "Username already in use."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        email: true,
        // Excluímos o password do retorno por segurança
      }
    });

    const token = jwt.sign(
      { userId: user.id }, 
      process.env.JWT_SECRET || 'segredoJWT', 
      { expiresIn: '1h' }
    );

    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Login
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required!' });
    }

    const user = await prisma.user.findUnique({ 
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id }, 
      process.env.JWT_SECRET || 'segredoJWT', 
      { expiresIn: '1h' }
    );

    // Remover o password antes de enviar
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({ 
      user: userWithoutPassword, 
      token 
    });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Listar usuários
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        // Excluímos o password do retorno
      }
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Renovar token
export const refreshToken = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const newToken = jwt.sign(
      { userId: user.userId }, 
      process.env.JWT_SECRET || 'segredoJWT',
      { expiresIn: '1h' }
    );

    res.json({ token: newToken });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Rota protegida
export const getProtectedData = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const userData = await prisma.user.findUnique({
      where: { id: user.userId },
      select: {
        id: true,
        username: true,
        email: true,
      }
    });

    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'Acesso autorizado à rota protegida',
      user: userData
    });
  } catch (error) {
    console.error('Error in protected route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};