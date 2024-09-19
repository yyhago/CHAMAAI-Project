import { Request, Response } from 'express';
import prisma from '../prisma/prismaClient';

export const createUser = async (req: Request, res: Response) => {
  try {
    // Desestruture os dados do corpo da requisição
    const { username, email, password } = req.body;

    // Verifique se todos os campos estão presentes
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Username, email, and password are required." });
    }

    // Crie um novo usuário
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });

    // Retorne o usuário criado
    res.status(201).json(user);
  } catch (error) {
    // Retorne um erro 500 em caso de exceção
    res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
