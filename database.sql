CREATE DATABASE IF NOT EXISTS db_appfirst CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE db_appfirst;

CREATE TABLE IF NOT EXISTS estudiantes (
  idEstudiante INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL
);

CREATE TABLE IF NOT EXISTS preguntas (
  idPregunta INT PRIMARY KEY,
  seccion VARCHAR(100) NOT NULL,
  enunciado TEXT NOT NULL,
  tipo VARCHAR(50) NOT NULL,
  respuestaCorrecta VARCHAR(255) NOT NULL,
  puntaje DECIMAL(5,2) NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS respuestas (
  idRespuesta INT AUTO_INCREMENT PRIMARY KEY,
  idEstudiante INT NOT NULL,
  idPregunta INT NOT NULL,
  respuestaEstudiante VARCHAR(255) NOT NULL,
  esCorrecta BOOLEAN NOT NULL,
  puntajeObtenido DECIMAL(5,2) NOT NULL DEFAULT 0,
  fechaRespuesta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_respuesta_estudiante_pregunta (idEstudiante, idPregunta),
  CONSTRAINT fk_respuestas_estudiantes FOREIGN KEY (idEstudiante) REFERENCES estudiantes(idEstudiante) ON DELETE CASCADE,
  CONSTRAINT fk_respuestas_preguntas FOREIGN KEY (idPregunta) REFERENCES preguntas(idPregunta) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS resultados (
  idResultado INT AUTO_INCREMENT PRIMARY KEY,
  idEstudiante INT NOT NULL,
  totalPreguntas INT NOT NULL,
  correctas INT NOT NULL,
  puntajeTotal DECIMAL(5,2) NOT NULL DEFAULT 0,
  fechaResultado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_resultados_estudiantes FOREIGN KEY (idEstudiante) REFERENCES estudiantes(idEstudiante) ON DELETE CASCADE
);

SET @unique_respuesta_exists = (
  SELECT COUNT(*)
  FROM information_schema.statistics
  WHERE table_schema = DATABASE()
    AND table_name = 'respuestas'
    AND index_name = 'unique_respuesta_estudiante_pregunta'
);

SET @unique_respuesta_sql = IF(
  @unique_respuesta_exists = 0,
  'ALTER TABLE respuestas ADD UNIQUE KEY unique_respuesta_estudiante_pregunta (idEstudiante, idPregunta)',
  'SELECT 1'
);

PREPARE unique_respuesta_stmt FROM @unique_respuesta_sql;
EXECUTE unique_respuesta_stmt;
DEALLOCATE PREPARE unique_respuesta_stmt;

INSERT INTO preguntas
(idPregunta, seccion, enunciado, tipo, respuestaCorrecta, puntaje)
VALUES
(1, 'Actividad 1', 'La calle por donde pasa la motocicleta representa una', 'texto', 'linea recta', 1),
(2, 'Actividad 1', 'El camino entre la casa de Antonio y la casa de Marta representa un', 'texto', 'segmento', 1),
(3, 'Actividad 1', 'Un segmento está limitado por', 'texto', 'dos puntos', 1),
(4, 'Actividad 2', 'Identifica cuál figura representa un segmento', 'texto', 'b', 1),
(5, 'Actividad 3', 'Traza el segmento AB', 'texto', 'AB', 1),
(6, 'Actividad 4', 'Traza el segmento CD', 'texto', 'CD', 1),
(7, 'Actividad 5', 'Cantidad de segmentos de la Figura A', 'texto', '3', 1),
(8, 'Actividad 5', 'Nombre de la Figura A', 'texto', 'triangulo', 1),
(9, 'Actividad 5', 'Cantidad de segmentos de la Figura B', 'texto', '4', 1),
(10, 'Actividad 5', 'Nombre de la Figura B', 'texto', 'cuadrilatero', 1),
(11, 'Actividad 6', 'Selección de triángulos', 'texto', 'a,c', 1),
(12, 'Actividad 7', 'Selección de cuadriláteros', 'texto', 'a,b', 1),
(13, 'Actividad 8', 'Elemento señalado 1', 'texto', 'vertice', 1),
(14, 'Actividad 8', 'Elemento señalado 2', 'texto', 'lado', 1),
(15, 'Actividad 8', 'Elemento señalado 3', 'texto', 'angulo', 1),
(16, 'Actividad 9', 'Lados del triángulo', 'texto', '3', 1),
(17, 'Actividad 9', 'Lados del cuadrilátero', 'texto', '4', 1),
(18, 'Actividad 9', 'Vértices del triángulo', 'texto', '3', 1),
(19, 'Actividad 9', 'Vértices del cuadrilátero', 'texto', '4', 1),
(20, 'Actividad 9', 'Ángulos del triángulo', 'texto', '3', 1),
(21, 'Actividad 9', 'Ángulos del cuadrilátero', 'texto', '4', 1),
(22, 'Actividad 10', 'División de la Figura A', 'texto', 'techo', 1),
(23, 'Actividad 10', 'División de la Figura B', 'texto', 'cabina', 1)
ON DUPLICATE KEY UPDATE
  seccion = VALUES(seccion),
  enunciado = VALUES(enunciado),
  tipo = VALUES(tipo),
  respuestaCorrecta = VALUES(respuestaCorrecta),
  puntaje = VALUES(puntaje);
