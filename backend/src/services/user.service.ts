import { PrismaClient } from "@prisma/client"; // Importa o cliente Prisma para interagir com o banco de dados
import bcrypt from 'bcryptjs'; // Importa a biblioteca para hashing de senhas

const prisma = new PrismaClient(); // Cria uma instância do cliente Prisma

// Função para registrar um novo usuário
export const registerUser = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10); // Gera o hash da senha com um salt de 10
  return prisma.user.create({
    data: {
      email, // Email do usuário
      password: hashedPassword, // Senha hasheada
    },
  });
};

// Função para encontrar um usuário pelo email
export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email }, // Busca um usuário único pelo email
  });
};

// Função para encontrar todos os usuários
export const findAllUsers = async () => {
  return prisma.user.findMany(); // Retorna uma lista de todos os usuários
};
