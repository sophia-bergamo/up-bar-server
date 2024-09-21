import { AppDataSource } from "../config/data-source";
import { Bar } from "../entities/bar.entity";
import { User } from "../entities/user.entity";
import { Request, Response } from "express";

function validaEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export class LoginUseCase {
  static async login(req: Request, res: Response) {
    const barRepository = AppDataSource.getRepository(Bar);
    const userRepository = AppDataSource.getRepository(User);

    const { email, password } = req.body;

    if (!validaEmail(email)) {
      return res.json({ message: "O formato do email está errado." });
    }

    const existingBar = await barRepository.findOneBy({ email });
    if (existingBar) {
      if (existingBar.password === password) {
        return res.json({
          message: "Login bem-sucedido como Bar",
          userType: "Bar",
          bar: existingBar,
        });
      } else {
        return res.status(401).json({
          message: "Credenciais inválidas para o Bar.",
        });
      }
    }

    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
      if (existingUser.password === password) {
        return res.json({
          message: "Login bem-sucedido como Usuário",
          userType: "User",
          user: existingUser,
        });
      } else {
        return res.status(401).json({
          message: "Credenciais inválidas para o Usuário.",
        });
      }
    }
  }
}
