import { AppDataSource } from "../config/data-source";
import { ForgotPassword } from "../entities/forgot-password.entity";
import { Request, Response } from "express";
import { User } from "../entities/user.entity";
import { ForgotPasswordEmailTemplate } from "../email/forgot-password.template";
import { render } from "@react-email/render";
import { EmailService } from "../email/send-email.service";
import { Bar } from "../entities/bar.entity";

export class ForgotPasswordUseCase {
  static async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;

    const forgotPasswordRepository =
      AppDataSource.getRepository(ForgotPassword);

    const userRepository = AppDataSource.getRepository(User);

    const barRepository = AppDataSource.getRepository(Bar);

    const emailService = new EmailService();

    const code = Math.ceil(Math.random() * 10 ** 5).toLocaleString(undefined, {
      minimumIntegerDigits: 5,
      useGrouping: false,
    });

    const expirationTime = 20 * 60 * 1000;
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + expirationTime);

    const html = render(ForgotPasswordEmailTemplate({ code }));

    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
      const userForgotPassword = await forgotPasswordRepository.findOneBy({
        user: { id: existingUser.id },
      });

      if (userForgotPassword) {
        await forgotPasswordRepository.save({
          id: userForgotPassword.id,
          code,
          expirationDate,
        });
      } else {
        await forgotPasswordRepository.save({
          active: true,
          code,
          expirationDate,
          user: { id: existingUser.id },
        });
      }

      const emailContent = {
        to: email,
        text: "Recuperação de senha.",
        subject: "Código para recuperação de senha.",
        html,
      };

      await emailService.sendEmail(emailContent);

      return res.json({
        message:
          "Um e-mail foi enviado com instruções para recuperar sua senha.",
      });
    }

    const existingBar = await barRepository.findOneBy({ email });
    if (existingBar) {
      const barForgotPassword = await forgotPasswordRepository.findOneBy({
        bar: { email },
      });

      if (barForgotPassword) {
        await forgotPasswordRepository.save({
          id: barForgotPassword.id,
          code,
          expirationDate,
        });
      } else {
        await forgotPasswordRepository.save({
          active: true,
          code,
          expirationDate,
          bar: { id: existingBar.id },
        });
      }

      const emailContent = {
        to: email,
        text: "Recuperação de senha.",
        subject: "Código para recuperação de senha.",
        html,
      };

      await emailService.sendEmail(emailContent);

      return res.json({
        message:
          "Um e-mail foi enviado com instruções para recuperar sua senha.",
      });
    }

    return res.status(401).json({
      error: "Credenciais inválidas",
    });
  }
}
