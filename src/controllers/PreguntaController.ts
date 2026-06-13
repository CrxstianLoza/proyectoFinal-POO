import { Request, Response } from "express";
import Database from "../config/database";
import Pregunta from "../models/Pregunta";

class PreguntaController {
  public async crear(req: Request, res: Response): Promise<void> {
    try {
      const { seccion, enunciado, tipo, respuestaCorrecta, puntaje } = req.body;

      if (!seccion || !enunciado || !tipo || !respuestaCorrecta || puntaje === undefined) {
        res.status(400).json({
          mensaje: "Todos los campos son obligatorios"
        });
        return;
      }

      const pregunta = new Pregunta(
        seccion,
        enunciado,
        tipo,
        respuestaCorrecta,
        Number(puntaje)
      );

      const db = Database.getInstance().getConnection();

      await db.query(
        `
        INSERT INTO preguntas
        (
          seccion,
          enunciado,
          tipo,
          respuestaCorrecta,
          puntaje
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
          pregunta.getSeccion(),
          pregunta.getEnunciado(),
          pregunta.getTipo(),
          pregunta.getRespuestaCorrecta(),
          pregunta.getPuntaje()
        ]
      );

      res.status(201).json({
        mensaje: "Pregunta creada"
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        mensaje: "Error al crear pregunta",
        error
      });
    }
  }

  public async listar(req: Request, res: Response): Promise<void> {
    try {
      const db = Database.getInstance().getConnection();

      const [rows] = await db.query(
        "SELECT * FROM preguntas"
      );

      res.json(rows);

    } catch (error) {
      console.error(error);

      res.status(500).json({
        mensaje: "Error al listar preguntas",
        error
      });
    }
  }
}

export default new PreguntaController();