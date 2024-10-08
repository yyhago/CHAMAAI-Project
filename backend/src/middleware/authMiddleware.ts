import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Interface para estender o Request do Express
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        iat?: number;
        exp?: number;
      };
    }
  }
}

// Interface para o token decodificado
interface DecodedToken extends JwtPayload {
  userId: number;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Token não fornecido.' });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
      return res.status(401).json({ error: 'Erro no formato do token.' });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({ error: 'Token mal formatado.' });
    }

    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'segredoJWT'
    ) as DecodedToken;

    // Verificar expiração do token
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      return res.status(401).json({ 
        error: 'Token expirado.',
        expired: true
      });
    }

    // Atribuir apenas as informações necessárias ao req.user
    req.user = {
      userId: decoded.userId,
      iat: decoded.iat,
      exp: decoded.exp
    };

    return next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Token inválido.' });
    }
    
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ 
        error: 'Token expirado.',
        expired: true
      });
    }

    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};