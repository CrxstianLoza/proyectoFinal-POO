import { Request, Response } from "express";
import Database from "../config/database";
import Usuario from "../models/Usuario";

class UsuarioController {
//   public async crear(req: Request, res: Response) {
//     try {
//       const { nombre, email } = req.body;

//       const usuario = new Usuario(nombre, email);
//       const db = Database.getInstance().getConnection();

//       await db.query(
//         "INSERT INTO usuarios(nombre, email) VALUES (?, ?)",
//         [usuario.getNombre(), usuario.getEmail()]
//       );

//       res.json({ mensaje: "Usuario creado" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ mensaje: "Error al crear usuario", error });
//     }
//   }

  public async listar(req: Request, res: Response) {
    try {
      const db = Database.getInstance().getConnection();
      const [rows] = await db.query("SELECT * FROM usuarios");

      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: "Error al listar usuarios", error });
    }
  }

  public async actualizar(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { nombre, email } = req.body;

    const db = Database.getInstance().getConnection();

    await db.query(
      "UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?",
      [nombre, email, id]
    );

    res.json({ mensaje: "Usuario actualizado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar usuario", error });
  }
}
  public async eliminar(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const db = Database.getInstance().getConnection();

    await db.query(
      "DELETE FROM usuarios WHERE id = ?",
      [id]
    );

    res.json({ mensaje: "Usuario eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar usuario", error });
  }
}

  public async crear(
      req: Request,
      res: Response
  ): Promise<void> {

      try {
          const { nombre, precio } = req.body;

          const db = Database.getInstance().getConnection();

          const rutaImagen = req.file
              ? `/src/uploads/perfiles${req.file.filename}`
              : null;

          await db.query(
              `
              INSERT INTO usuarios
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
}

export default new UsuarioController();