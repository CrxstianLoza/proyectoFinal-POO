import { Request, Response } from "express";
import Database from "../config/database";
import Estudiante from "../models/Estudiante";

class EstudianteController {
  public async crear(req: Request, res: Response): Promise<void> {
    try {
      const { nombre } = req.body;

      if (!nombre) {
        res.status(400).json({
          mensaje: "El nombre del estudiante es obligatorio"
        });
        return;
      }

      const estudiante = new Estudiante(nombre);
      const db = Database.getInstance().getConnection();

      const [resultado]: any = await db.query(
        "INSERT INTO estudiantes(nombre) VALUES (?)",
        [estudiante.getNombre()]
      );

      res.status(201).json({
        mensaje: "Estudiante creado",
        idEstudiante: resultado.insertId,
        nombre: estudiante.getNombre()
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        mensaje: "Error al crear estudiante",
        error
      });
    }
  }
  public async listar(req: Request, res: Response): Promise<void> {
    try {
      const db = Database.getInstance().getConnection();

      const [rows] = await db.query(
        "SELECT * FROM estudiantes"
      );

      res.json(rows);

    } catch (error) {
      console.error(error);

      res.status(500).json({
        mensaje: "Error al listar estudiantes",
        error
      });
    }
  }

  public async actualizar(req: Request, res: Response): Promise<void> {
    try {
      const { idEstudiante } = req.params;
      const { nombre } = req.body;

      if (!nombre) {
        res.status(400).json({
          mensaje: "El nombre del estudiante es obligatorio"
        });
        return;
      }

      const db = Database.getInstance().getConnection();

      await db.query(
        "UPDATE estudiantes SET nombre = ? WHERE idEstudiante = ?",
        [nombre, idEstudiante]
      );

      res.json({
        mensaje: "Estudiante actualizado"
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        mensaje: "Error al actualizar estudiante",
        error
      });
    }
  }

  public async eliminar(req: Request, res: Response): Promise<void> {
    try {
      const { idEstudiante } = req.params;

      const db = Database.getInstance().getConnection();

      await db.query(
        "DELETE FROM estudiantes WHERE idEstudiante = ?",
        [idEstudiante]
      );

      res.json({
        mensaje: "Estudiante eliminado"
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        mensaje: "Error al eliminar estudiante",
        error
      });
    }
  }
}

export default new EstudianteController();