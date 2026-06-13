import { Request, Response } from "express";
import Database from "../config/database";

class FiguraController {
  public async crear(req: Request, res: Response): Promise<void> {
    try {
      const { nombre } = req.body;

      if (!nombre) {
        res.status(400).json({
          mensaje: "El nombre de la figura es obligatorio"
        });
        return;
      }

      const db = Database.getInstance().getConnection();

      const rutaImagen = req.file
        ? `/src/figuras/${req.file.filename}`
        : null;

      await db.query(
        `
        INSERT INTO figuras
        (
          nombre,
          imagen
        )
        VALUES
        (
          ?,
          ?
        )
        `,
        [nombre, rutaImagen]
      );

      res.status(201).json({
        mensaje: "Figura creada",
        imagen: rutaImagen
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        mensaje: "Error interno",
        error
      });
    }
  }

  public async listar(req: Request, res: Response): Promise<void> {
    try {
      const db = Database.getInstance().getConnection();

      const [rows] = await db.query("SELECT * FROM figuras");

      res.json(rows);

    } catch (error) {
      console.error(error);

      res.status(500).json({
        mensaje: "Error interno",
        error
      });
    }
  }

  public async actualizar(req: Request, res: Response): Promise<void> {
    try {
      const { idFigura } = req.params;
      const { nombre } = req.body;

      if (!nombre) {
        res.status(400).json({
          mensaje: "El nombre de la figura es obligatorio"
        });
        return;
      }

      const db = Database.getInstance().getConnection();

      const rutaImagen = req.file
        ? `/src/figuras/${req.file.filename}`
        : null;

      if (rutaImagen) {
        await db.query(
          `
          UPDATE figuras
          SET nombre = ?, imagen = ?
          WHERE idFigura = ?
          `,
          [nombre, rutaImagen, idFigura]
        );
      } else {
        await db.query(
          `
          UPDATE figuras
          SET nombre = ?
          WHERE idFigura = ?
          `,
          [nombre, idFigura]
        );
      }

      res.json({
        mensaje: "Figura actualizada",
        imagen: rutaImagen
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        mensaje: "Error interno",
        error
      });
    }
  }

  public async eliminar(req: Request, res: Response): Promise<void> {
    try {
      const { idFigura } = req.params;

      const db = Database.getInstance().getConnection();

      await db.query(
        "DELETE FROM figuras WHERE idFigura = ?",
        [idFigura]
      );

      res.json({
        mensaje: "Figura eliminada"
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        mensaje: "Error interno",
        error
      });
    }
  }
}

export default new FiguraController();