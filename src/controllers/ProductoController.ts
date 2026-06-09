import { Request, Response } from "express";
import Database from "../config/database";

class ProductoController {

    public async crear(
        req: Request,
        res: Response
    ): Promise<void> {

        try {
            const { nombre, precio } = req.body;

            const db = Database.getInstance().getConnection();

            const rutaImagen = req.file
                ? `/src/productos/${req.file.filename}`
                : null;

            await db.query(
                `
                INSERT INTO productos
                (
                    nombre,
                    precio,
                    imagen
                )
                VALUES
                (
                    ?,
                    ?,
                    ?
                )
                `,
                [
                    nombre,
                    precio,
                    rutaImagen
                ]
            );

            res.status(201).json({
                mensaje: "Producto creado",
                imagen: rutaImagen
            });

        } catch (error) {

            res.status(500).json({
                mensaje: "Error interno",
                error
            });

        }
    }

    public async listar(
        req: Request,
        res: Response
    ): Promise<void> {

        try {
            const db = Database.getInstance().getConnection();

            const [rows] = await db.query(
                "SELECT * FROM productos"
            );

            res.json(rows);

        } catch (error) {

            res.status(500).json({
                mensaje: "Error interno",
                error
            });

        }
    }

    public async eliminar(
        req: Request,
        res: Response
    ): Promise<void> {

        try {
            const { idProducto } = req.params;

            const db = Database.getInstance().getConnection();

            await db.query(
                "DELETE FROM productos WHERE idProducto = ?",
                [idProducto]
            );

            res.json({
                mensaje: "Producto eliminado"
            });

        } catch (error) {

            res.status(500).json({
                mensaje: "Error interno",
                error
            });

        }
    }
}

export default new ProductoController();