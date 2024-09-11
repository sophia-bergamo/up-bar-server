import express from "express";
import bodyParser from "body-parser";
const app = express();
// Middleware
app.use(bodyParser.json());
// Rotas
app.get("/", (req, res) => {
    res.send("Hello World");
});
// Iniciando o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
