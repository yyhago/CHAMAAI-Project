import { User } from "@prisma/client"; 
import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: User; // Adicionando a propriedade user do tipo User
  }
}
