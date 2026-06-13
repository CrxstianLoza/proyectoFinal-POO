import { Router } from "express";
import PreguntaController from "../controllers/PreguntaController";

const router = Router();

router.post("/", PreguntaController.crear);
router.get("/", PreguntaController.listar);

export default router;