import express from "express";
import cors from "cors";
import routes from "./routes";

console.log("🔥🔥🔥 SERVER INICIADO 🔥🔥🔥");

const app = express();

app.use(cors());
app.use(express.json());

// Monta todas as rotas
app.use(routes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
