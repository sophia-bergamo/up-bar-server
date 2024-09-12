import express from "express";
import { AppDataSource } from "./config/data-source";
import { CreateUserUseCase } from "./domain/create-user";
import { CreateBarUseCase, upload } from "./domain/create-bar.use-case";

const app = express();

app.get("/", (req: any, res: any) => {
  res.send("Hello World");
});

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

app.post("/create-user", CreateUserUseCase.createUser);

app.post("/create-bar", upload.single("photo"), CreateBarUseCase.createBar);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
