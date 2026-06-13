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

      let pregunta = preguntas[0];

      if (preguntas.length === 0) {
        const preguntasConexion: Record<number, any> = {
          5: {
            seccion: "Actividad 3",
            enunciado: "Traza el segmento AB",
            tipo: "texto",
            respuestaCorrecta: "AB",
            puntaje: 1
          },
          6: {
            seccion: "Actividad 4",
            enunciado: "Traza el segmento CD",
            tipo: "texto",
            respuestaCorrecta: "CD",
            puntaje: 1
          },
          7: {
            seccion: "Actividad 5",
            enunciado: "Cantidad de segmentos de la Figura A",
            tipo: "texto",
            respuestaCorrecta: "3",
            puntaje: 1
          },
          8: {
            seccion: "Actividad 5",
            enunciado: "Nombre de la Figura A",
            tipo: "texto",
            respuestaCorrecta: "triangulo",
            puntaje: 1
          },
          9: {
            seccion: "Actividad 5",
            enunciado: "Cantidad de segmentos de la Figura B",
            tipo: "texto",
            respuestaCorrecta: "4",
            puntaje: 1
          },
          10: {
            seccion: "Actividad 5",
            enunciado: "Nombre de la Figura B",
            tipo: "texto",
            respuestaCorrecta: "cuadrilatero",
            puntaje: 1
          },
          11: {
            seccion: "Actividad 5",
            enunciado: "Selección de triángulos",
            tipo: "texto",
            respuestaCorrecta: "a,c",
            puntaje: 1
          },
          12: {
            seccion: "Actividad 5",
            enunciado: "Selección de cuadriláteros",
            tipo: "texto",
            respuestaCorrecta: "a,b",
            puntaje: 1
          },
          13: {
            seccion: "Actividad 1.3",
            enunciado: "Elemento señalado 1",
            tipo: "texto",
            respuestaCorrecta: "vertice",
            puntaje: 1
          },
          14: {
            seccion: "Actividad 1.3",
            enunciado: "Elemento señalado 2",
            tipo: "texto",
            respuestaCorrecta: "lado",
            puntaje: 1
          },
          15: {
            seccion: "Actividad 1.3",
            enunciado: "Elemento señalado 3",
            tipo: "texto",
            respuestaCorrecta: "angulo",
            puntaje: 1
          },
          16: {
            seccion: "Actividad 1.3",
            enunciado: "Lados del triángulo",
            tipo: "texto",
            respuestaCorrecta: "3",
            puntaje: 1
          },
          17: {
            seccion: "Actividad 1.3",
            enunciado: "Lados del cuadrilátero",
            tipo: "texto",
            respuestaCorrecta: "4",
            puntaje: 1
          },
          18: {
            seccion: "Actividad 1.3",
            enunciado: "Vértices del triángulo",
            tipo: "texto",
            respuestaCorrecta: "3",
            puntaje: 1
          },
          19: {
            seccion: "Actividad 1.3",
            enunciado: "Vértices del cuadrilátero",
            tipo: "texto",
            respuestaCorrecta: "4",
            puntaje: 1
          },
          20: {
            seccion: "Actividad 1.3",
            enunciado: "Ángulos del triángulo",
            tipo: "texto",
            respuestaCorrecta: "3",
            puntaje: 1
          },
          21: {
            seccion: "Actividad 1.3",
            enunciado: "Ángulos del cuadrilátero",
            tipo: "texto",
            respuestaCorrecta: "4",
            puntaje: 1
          },
          22: {
            seccion: "Actividad 1.4",
            enunciado: "División de la Figura A",
            tipo: "texto",
            respuestaCorrecta: "techo",
            puntaje: 1
          },
          23: {
            seccion: "Actividad 1.4",
            enunciado: "División de la Figura B",
            tipo: "texto",
            respuestaCorrecta: "cabina",
            puntaje: 1
          }
        };

        const preguntaConexion = preguntasConexion[idPreguntaNumero];

        if (!preguntaConexion) {
          res.status(404).json({
            mensaje: "Pregunta no encontrada"
          });
          return;
        }

        await db.query(
          `
          INSERT INTO preguntas
          (
            idPregunta,
            seccion,
            enunciado,
            tipo,
            respuestaCorrecta,
            puntaje
          )
          VALUES (?, ?, ?, ?, ?, ?)
          `,
          [
            idPreguntaNumero,
            preguntaConexion.seccion,
            preguntaConexion.enunciado,
            preguntaConexion.tipo,
            preguntaConexion.respuestaCorrecta,
            preguntaConexion.puntaje
          ]
        );

        pregunta = preguntaConexion;
      }

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
