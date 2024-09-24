import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Criar interface para o tipo de dados decodificados
interface DecodedToken extends JwtPayload {
  userId: number;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // Verificar se o cabeçalho Authorization está presente
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  // Extrair o token do cabeçalho Authorization
  const token = authHeader.split(' ')[1];

  try {
    // Verificar e decodificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

    // Verificar expiração do token
    const currentTime = Math.floor(Date.now() / 1000); // Tempo atual em segundos
    if (decoded.exp && decoded.exp < currentTime) {
      return res.status(401).json({ error: 'Token expirado.' });
    }

    // Salvando os dados do usuário no request
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido.' });
  }
};
