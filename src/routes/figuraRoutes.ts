import { Router } from "express";
import FiguraController from "../controllers/FiguraController";
import { upload } from "../conf/multer";

const router = Router();

router.post("/", upload.single("imagen"), FiguraController.crear);
router.get("/", FiguraController.listar);
router.put("/:idFigura", upload.single("imagen"), FiguraController.actualizar);
router.delete("/:idFigura", FiguraController.eliminar);

export default router;