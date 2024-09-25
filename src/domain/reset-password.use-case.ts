import { AppDataSource } from "../config/data-source";
import { ForgotPassword } from "../entities/forgot-password.entity";
import { Request, Response } from "express";
import { User } from "../entities/user.entity";
import { Bar } from "../entities/bar.entity";

export class ResetPasswordUseCase {
  static async resetPassword(req: Request, res: Response) {
    const forgotPasswordRepository =
      AppDataSource.getRepository(ForgotPassword);

    const userRepository = AppDataSource.getRepository(User);

    const barRepository = AppDataSource.getRepository(Bar);

    const { email, code, newPassword } = req.body;

    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
      const forgotPassword = await forgotPasswordRepository.findOneBy({
        user: { id: existingUser.id },
      });

      if (!forgotPassword) {
        return res
          .status(400)
          .json({ error: "Requisição de senha não encontrada." });
      }

      const compareCode = forgotPassword && forgotPassword.code === code;

      if (!compareCode) {
        return res.status(400).json({ error: "Código inválido." });
      }

      if (forgotPassword.expirationDate < new Date()) {
        return res
          .status(400)
          .json({ error: "Código de recuperação de senha expirado." });
      }

      await userRepository.save({ id: existingUser.id, password: newPassword });

      return res.json({
        message: "Senha alterada com sucesso.",
      });
    }

    const existingBar = await barRepository.findOneBy({ email });
    if (existingBar) {
      const forgotPassword = await forgotPasswordRepository.findOneBy({
        bar: { id: existingBar.id },
      });

      if (!forgotPassword) {
        return res
          .status(400)
          .json({ error: "Requisição de senha não encontrada." });
      }

      const compareCode = forgotPassword && forgotPassword.code === code;

      if (!compareCode) {
        return res.status(400).json({ error: "Código inválido." });
      }

      if (forgotPassword.expirationDate < new Date()) {
        return res
          .status(400)
          .json({ error: "Código de recuperação de senha expirado." });
      }

      await barRepository.save({ id: existingBar.id, password: newPassword });

      return res.json({
        message: "Senha alterada com sucesso.",
      });
    }

    if (!existingBar || !existingUser) {
      return res.status(400).json({ error: "Credenciais inválidas." });
    }
  }
}
