import { Router } from "express";
import RespuestaController from "../controllers/RespuestaController";

const router = Router();

router.post("/", RespuestaController.crear);
router.get("/", RespuestaController.listar);

export default router;