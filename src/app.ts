import express from "express";
import cors from "cors";

import estudianteRoutes from "./routes/estudianteRoutes";
import figuraRoutes from "./routes/figuraRoutes";
import preguntaRoutes from "./routes/preguntaRoutes";
import respuestaRoutes from "./routes/respuestaRoutes";
import resultadoRoutes from "./routes/resultadoRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/estudiantes", estudianteRoutes);
app.use("/figuras", figuraRoutes);
app.use("/preguntas", preguntaRoutes);
app.use("/respuestas", respuestaRoutes);
app.use("/resultados", resultadoRoutes);

export default app;