import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Função para registrar um novo usuário
export const registerUser = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const userData = {
    email,
    password: hashedPassword,
  } as Prisma.UserCreateInput;

  return prisma.user.create({
    data: userData,
  });
};

// Função para encontrar um usuário pelo email
export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

// Função para encontrar todos os usuários
export const findAllUsers = async () => {
  return prisma.user.findMany();
};