import express from "express";
import { AppDataSource } from "./config/data-source";
import { CreateUserUseCase } from "./domain/create-user.use-case";
import { CreateBarUseCase } from "./domain/create-bar.use-case";
import { LoginUseCase } from "./domain/login.use-case";
import "reflect-metadata";
import * as dotenv from "dotenv";
import { ForgotPasswordUseCase } from "./domain/forgot-password.use-case";
import { ResetPasswordUseCase } from "./domain/reset-password.use-case";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req: any, res: any) => {
  res.send("Hello World");
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

app.post("/create-user", CreateUserUseCase.createUser);

app.post("/create-bar", CreateBarUseCase.createBar);

app.post("/login", LoginUseCase.login);

app.post("/forgot-password", ForgotPasswordUseCase.forgotPassword);

app.post("/reset-password", ResetPasswordUseCase.resetPassword);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
