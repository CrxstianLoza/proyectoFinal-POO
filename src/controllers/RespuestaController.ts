import { Request, Response } from "express";
import Database from "../config/database";

class RespuestaController {
  public async crear(req: Request, res: Response): Promise<void> {
    try {
      const { idEstudiante, idPregunta, respuestaEstudiante } = req.body;
      const idEstudianteNumero = Number(idEstudiante);
      const idPreguntaNumero = Number(idPregunta);
      const respuestaLimpia = String(respuestaEstudiante ?? "").trim();

      if (
        !Number.isInteger(idEstudianteNumero) ||
        !Number.isInteger(idPreguntaNumero) ||
        respuestaLimpia === ""
      ) {
        res.status(400).json({
          mensaje: "idEstudiante, idPregunta y respuestaEstudiante son obligatorios"
        });
        return;
      }

      const db = Database.getInstance().getConnection();

      const [preguntas]: any = await db.query(
        "SELECT * FROM preguntas WHERE idPregunta = ?",
        [idPreguntaNumero]
      );

      if (preguntas.length === 0) {
        res.status(404).json({
          mensaje: "Pregunta no encontrada. Verifica que database.sql haya sido ejecutado."
        });
        return;
      }

      const pregunta = preguntas[0];

      const respuestaUsuario = respuestaLimpia.toLowerCase();
      const respuestaCorrecta = String(pregunta.respuestaCorrecta).trim().toLowerCase();

      if (pregunta.tipo === "numero" && isNaN(Number(respuestaUsuario))) {
        res.status(400).json({
          mensaje: "La respuesta debe ser un número"
        });
        return;
      }

      const esCorrecta = respuestaUsuario === respuestaCorrecta;
      const puntajeObtenido = esCorrecta ? Number(pregunta.puntaje) : 0;

      const [respuestasExistentes]: any = await db.query(
        "SELECT * FROM respuestas WHERE idEstudiante = ? AND idPregunta = ? LIMIT 1",
        [
          idEstudianteNumero,
          idPreguntaNumero
        ]
      );

      if (respuestasExistentes.length > 0) {
        await db.query(
          `
          UPDATE respuestas
          SET
            respuestaEstudiante = ?,
            esCorrecta = ?,
            puntajeObtenido = ?
          WHERE idEstudiante = ? AND idPregunta = ?
          `,
          [
            respuestaLimpia,
            esCorrecta,
            puntajeObtenido,
            idEstudianteNumero,
            idPreguntaNumero
          ]
        );
      } else {
        await db.query(
          `
          INSERT INTO respuestas
          (
            idEstudiante,
            idPregunta,
            respuestaEstudiante,
            esCorrecta,
            puntajeObtenido
          )
          VALUES (?, ?, ?, ?, ?)
          `,
          [
            idEstudianteNumero,
            idPreguntaNumero,
            respuestaLimpia,
            esCorrecta,
            puntajeObtenido
          ]
        );
      }

      res.status(201).json({
        mensaje: "Respuesta guardada",
        esCorrecta,
        puntajeObtenido,
        respuestaCorrecta: pregunta.respuestaCorrecta
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        mensaje: "Error al guardar respuesta",
        error
      });
    }
  }

  public async listar(req: Request, res: Response): Promise<void> {
    try {
      const db = Database.getInstance().getConnection();

      const [rows] = await db.query(
        "SELECT * FROM respuestas"
      );

      res.json(rows);

    } catch (error) {
      console.error(error);

      res.status(500).json({
        mensaje: "Error al listar respuestas",
        error
      });
    }
  }
}

export default new RespuestaController();
