import { Router } from "express";
import { upload } from "../conf/multer";
import UsuarioController from "../controllers/UsuarioController";

const router = Router();

// router.post("/", UsuarioController.crear);
router.get("/", UsuarioController.listar);
router.put("/:id", UsuarioController.actualizar);
router.delete("/:id", UsuarioController.eliminar);

router.post("/",upload.single("foto"), UsuarioController.crear
);
export default router;