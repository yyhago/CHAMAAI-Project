import { Request, Response, NextFunction } from 'express';
import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; // O token vem no formato "Bearer <token>"
  
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const secretKey = process.env.JWT_SECRET || 'segredoJWT'; // Chave secreta
    const decoded = jwt.verify(token, secretKey ) as { userId: number };
    (req as any).user = decoded; // Salvando os dados do usuário no request
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token." });
  }
};
