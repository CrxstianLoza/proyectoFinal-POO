import express from "express";
import cors from "cors";
import usuarioRoutes from "./routes/usuarioRoutes";
import productoRoutes from "./routes/productoRoutes";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/usuarios", usuarioRoutes);
app.use("/productos", productoRoutes);

export default app;

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});