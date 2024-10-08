import { PrismaClient } from '@prisma/client'

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        username: string;
        email: string;
        // Não incluí password por questões de segurança
      } | null;
    }
  }
}

export {}