import multer from "multer";
import path from "path";

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "src/productos")

    },

    filename: (req, file, cb) => {

        const extension = path.extname(
            file.originalname
        );

        const nombreArchivo =
            Date.now() + extension

        cb(null, nombreArchivo);

    }
});

export const upload =multer({
    storage
});