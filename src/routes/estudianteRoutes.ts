import { Router } from "express";
import EstudianteController from "../controllers/EstudianteController";

const router = Router();

router.post("/", EstudianteController.crear);
router.get("/", EstudianteController.listar);
router.put("/:idEstudiante", EstudianteController.actualizar);
router.delete("/:idEstudiante", EstudianteController.eliminar);

export default router;