import { Router } from "express";
import ResultadoController from "../controllers/ResultadoController";

const router = Router();

router.post("/:idEstudiante", ResultadoController.generar);
router.get("/:idEstudiante", ResultadoController.listarPorEstudiante);

export default router;