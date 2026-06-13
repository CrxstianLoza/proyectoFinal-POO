import { Request, Response } from "express";
import Database from "../config/database";

class ResultadoController {
  public async generar(req: Request, res: Response): Promise<void> {
    try {
      const { idEstudiante } = req.params;

      const db = Database.getInstance().getConnection();

      const [datos]: any = await db.query(
        `
        SELECT
          COUNT(*) AS totalPreguntas,
          SUM(CASE WHEN esCorrecta = 1 THEN 1 ELSE 0 END) AS correctas,
          SUM(puntajeObtenido) AS puntajeTotal
        FROM respuestas
        WHERE idEstudiante = ?
        `,
        [idEstudiante]
      );

      const totalPreguntas = Number(datos[0].totalPreguntas) || 0;
      const correctas = Number(datos[0].correctas) || 0;
      const puntajeTotal = Number(datos[0].puntajeTotal) || 0;

      await db.query(
        `
        INSERT INTO resultados
        (
          idEstudiante,
          totalPreguntas,
          correctas,
          puntajeTotal
        )
        VALUES (?, ?, ?, ?)
        `,
        [
          idEstudiante,
          totalPreguntas,
          correctas,
          puntajeTotal
        ]
      );

      res.status(201).json({
        mensaje: "Resultado generado",
        idEstudiante,
        totalPreguntas,
        correctas,
        puntajeTotal
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        mensaje: "Error al generar resultado",
        error
      });
    }
  }

  public async listarPorEstudiante(req: Request, res: Response): Promise<void> {
    try {
      const { idEstudiante } = req.params;

      const db = Database.getInstance().getConnection();

      const [rows] = await db.query(
        "SELECT * FROM resultados WHERE idEstudiante = ?",
        [idEstudiante]
      );

      res.json(rows);

    } catch (error) {
      console.error(error);

      res.status(500).json({
        mensaje: "Error al listar resultados",
        error
      });
    }
  }
}

export default new ResultadoController();