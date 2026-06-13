const API_URL = "http://localhost:3000";

const ID_PREGUNTA_1 = 1;
const ID_PREGUNTA_2 = 2;
const ID_PREGUNTA_3 = 3;
const ID_PREGUNTA_4 = 4;
const ID_TRAZO_AB = 5;
const ID_TRAZO_CD = 6;
const ID_FIGURA_A_SEGMENTOS = 7;
const ID_FIGURA_A_NOMBRE = 8;
const ID_FIGURA_B_SEGMENTOS = 9;
const ID_FIGURA_B_NOMBRE = 10;
const ID_TRIANGULOS_SELECCION = 11;
const ID_CUADRILATEROS_SELECCION = 12;
const ID_13_ELEMENTO_1 = 13;
const ID_13_ELEMENTO_2 = 14;
const ID_13_ELEMENTO_3 = 15;
const ID_13_TRIANGULO_LADOS = 16;
const ID_13_CUADRILATERO_LADOS = 17;
const ID_13_TRIANGULO_VERTICES = 18;
const ID_13_CUADRILATERO_VERTICES = 19;
const ID_13_TRIANGULO_ANGULOS = 20;
const ID_13_CUADRILATERO_ANGULOS = 21;
const ID_14_FIGURA_A_DIVISION = 22;
const ID_14_FIGURA_B_DIVISION = 23;

let estudianteActivo = null;
let opcionSeleccionada = "";
let resultadoGenerado = false;
let guardandoResultado = false;
let resumenResultado = null;

const respuestasConexion = {
  3: {
    idPregunta: ID_TRAZO_AB,
    respuestaCorrecta: "AB",
    etiqueta: "AB"
  },
  4: {
    idPregunta: ID_TRAZO_CD,
    respuestaCorrecta: "CD",
    etiqueta: "CD"
  }
};

const conexionesSeleccionadas = {
  3: {
    puntos: [],
    segmento: "",
    linea: null
  },
  4: {
    puntos: [],
    segmento: "",
    linea: null
  }
};

const seleccionesFiguras = {
  triangulos: [],
  cuadrilateros: []
};

const respuestasElementos13 = {
  actividad13Elemento1: "",
  actividad13Elemento2: "",
  actividad13Elemento3: ""
};

const divisiones14 = {
  figuraA: [],
  figuraB: []
};

const actividadesEvaluables = [
  {
    id: "pregunta1",
    idPregunta: ID_PREGUNTA_1,
    valor: 1,
    respuestaCorrecta: "linea recta",
    textoCorrecto: "Línea recta",
    obtenerRespuesta: () => document.getElementById("respuesta1").value
  },
  {
    id: "pregunta2",
    idPregunta: ID_PREGUNTA_2,
    valor: 1,
    respuestaCorrecta: "segmento",
    textoCorrecto: "Segmento",
    obtenerRespuesta: () => document.getElementById("respuesta2").value
  },
  {
    id: "pregunta3",
    idPregunta: ID_PREGUNTA_3,
    valor: 1,
    respuestaCorrecta: "dos puntos",
    textoCorrecto: "Dos puntos",
    obtenerRespuesta: () => document.getElementById("respuesta3").value
  },
  {
    id: "actividad2",
    idPregunta: ID_PREGUNTA_4,
    valor: 1,
    respuestaCorrecta: "b",
    obtenerRespuesta: () => opcionSeleccionada
  },
  {
    id: "actividad3",
    idPregunta: ID_TRAZO_AB,
    valor: 1,
    respuestaCorrecta: "AB",
    obtenerRespuesta: () => conexionesSeleccionadas[3].segmento
  },
  {
    id: "actividad4",
    idPregunta: ID_TRAZO_CD,
    valor: 1,
    respuestaCorrecta: "CD",
    obtenerRespuesta: () => conexionesSeleccionadas[4].segmento
  },
  {
    id: "actividad5FiguraASegmentos",
    idPregunta: ID_FIGURA_A_SEGMENTOS,
    valor: 1,
    respuestaCorrecta: "3",
    textoCorrecto: "3 segmentos",
    obtenerRespuesta: () => document.getElementById("actividad5FiguraASegmentos").value
  },
  {
    id: "actividad5FiguraANombre",
    idPregunta: ID_FIGURA_A_NOMBRE,
    valor: 1,
    respuestaCorrecta: "triangulo",
    textoCorrecto: "Triángulo",
    obtenerRespuesta: () => document.getElementById("actividad5FiguraANombre").value
  },
  {
    id: "actividad5FiguraBSegmentos",
    idPregunta: ID_FIGURA_B_SEGMENTOS,
    valor: 1,
    respuestaCorrecta: "4",
    textoCorrecto: "4 segmentos",
    obtenerRespuesta: () => document.getElementById("actividad5FiguraBSegmentos").value
  },
  {
    id: "actividad5FiguraBNombre",
    idPregunta: ID_FIGURA_B_NOMBRE,
    valor: 1,
    respuestaCorrecta: "cuadrilatero",
    textoCorrecto: "Cuadrilátero",
    obtenerRespuesta: () => document.getElementById("actividad5FiguraBNombre").value
  },
  {
    id: "actividadTriangulosSeleccion",
    idPregunta: ID_TRIANGULOS_SELECCION,
    valor: 1,
    respuestaCorrecta: "a,c",
    obtenerRespuesta: () => obtenerSeleccionFiguras("triangulos")
  },
  {
    id: "actividadCuadrilaterosSeleccion",
    idPregunta: ID_CUADRILATEROS_SELECCION,
    valor: 1,
    respuestaCorrecta: "a,b",
    obtenerRespuesta: () => obtenerSeleccionFiguras("cuadrilateros")
  },
  {
    id: "actividad13Elemento1",
    idPregunta: ID_13_ELEMENTO_1,
    valor: 1,
    respuestaCorrecta: "vertice",
    textoCorrecto: "vértice",
    obtenerRespuesta: () => respuestasElementos13.actividad13Elemento1
  },
  {
    id: "actividad13Elemento2",
    idPregunta: ID_13_ELEMENTO_2,
    valor: 1,
    respuestaCorrecta: "lado",
    textoCorrecto: "lado",
    obtenerRespuesta: () => respuestasElementos13.actividad13Elemento2
  },
  {
    id: "actividad13Elemento3",
    idPregunta: ID_13_ELEMENTO_3,
    valor: 1,
    respuestaCorrecta: "angulo",
    textoCorrecto: "ángulo",
    obtenerRespuesta: () => respuestasElementos13.actividad13Elemento3
  },
  {
    id: "actividad13TrianguloLados",
    idPregunta: ID_13_TRIANGULO_LADOS,
    valor: 1,
    respuestaCorrecta: "3",
    textoCorrecto: "3",
    obtenerRespuesta: () => document.getElementById("actividad13TrianguloLados").value
  },
  {
    id: "actividad13CuadrilateroLados",
    idPregunta: ID_13_CUADRILATERO_LADOS,
    valor: 1,
    respuestaCorrecta: "4",
    textoCorrecto: "4",
    obtenerRespuesta: () => document.getElementById("actividad13CuadrilateroLados").value
  },
  {
    id: "actividad13TrianguloVertices",
    idPregunta: ID_13_TRIANGULO_VERTICES,
    valor: 1,
    respuestaCorrecta: "3",
    textoCorrecto: "3",
    obtenerRespuesta: () => document.getElementById("actividad13TrianguloVertices").value
  },
  {
    id: "actividad13CuadrilateroVertices",
    idPregunta: ID_13_CUADRILATERO_VERTICES,
    valor: 1,
    respuestaCorrecta: "4",
    textoCorrecto: "4",
    obtenerRespuesta: () => document.getElementById("actividad13CuadrilateroVertices").value
  },
  {
    id: "actividad13TrianguloAngulos",
    idPregunta: ID_13_TRIANGULO_ANGULOS,
    valor: 1,
    respuestaCorrecta: "3",
    textoCorrecto: "3",
    obtenerRespuesta: () => document.getElementById("actividad13TrianguloAngulos").value
  },
  {
    id: "actividad13CuadrilateroAngulos",
    idPregunta: ID_13_CUADRILATERO_ANGULOS,
    valor: 1,
    respuestaCorrecta: "4",
    textoCorrecto: "4",
    obtenerRespuesta: () => document.getElementById("actividad13CuadrilateroAngulos").value
  },
  {
    id: "actividad14FiguraADivision",
    idPregunta: ID_14_FIGURA_A_DIVISION,
    valor: 1,
    respuestaCorrecta: "techo",
    obtenerRespuesta: () => obtenerDivision14("figuraA")
  },
  {
    id: "actividad14FiguraBDivision",
    idPregunta: ID_14_FIGURA_B_DIVISION,
    valor: 1,
    respuestaCorrecta: "cabina",
    obtenerRespuesta: () => obtenerDivision14("figuraB")
  }
];

async function crearEstudiante() {
  const nombre = document.getElementById("nombreEstudiante").value.trim();
  const mensaje = document.getElementById("mensajeInicio");

  if (nombre === "") {
    mensaje.textContent = "Por favor escribe tu nombre.";
    mensaje.className = "mensaje error";
    return;
  }

  try {
    const respuesta = await fetch(`${API_URL}/estudiantes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nombre })
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      mensaje.textContent = datos.mensaje || "Error al crear estudiante.";
      mensaje.className = "mensaje error";
      console.error("Error del backend:", datos);
      return;
    }

    estudianteActivo = {
      idEstudiante: datos.idEstudiante,
      nombre: datos.nombre || nombre
    };

    mensaje.textContent = "";
    mensaje.className = "mensaje";
    mostrarLeccion();
    actualizarProgresoExamen();
  } catch (error) {
    mensaje.textContent = "No se pudo conectar con el servidor.";
    mensaje.className = "mensaje error";
    console.error("Error al crear estudiante:", error);
  }
}

function mostrarLeccion() {
  const pantallaInicio = document.getElementById("pantallaInicio");
  const leccionCompleta = document.getElementById("leccionCompleta");
  const pantallaResultado = document.getElementById("pantallaResultado");
  const leccion = document.getElementById("leccion");

  pantallaInicio.classList.add("oculto-pagina");
  pantallaResultado.classList.add("oculto-pagina");
  leccionCompleta.classList.remove("oculto-pagina");
  leccionCompleta.classList.remove("modo-revision");
  document.body.classList.remove("modo-revision");

  requestAnimationFrame(() => {
    leccion.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
}

async function enviarRespuesta(idPregunta, respuestaEstudiante) {
  if (!estudianteActivo || !estudianteActivo.idEstudiante) {
    return null;
  }

  try {
    const respuesta = await fetch(`${API_URL}/respuestas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        idEstudiante: estudianteActivo.idEstudiante,
        idPregunta,
        respuestaEstudiante
      })
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      console.error("Error del backend al guardar respuesta:", datos);
      return null;
    }

    return datos;
  } catch (error) {
    console.error("Error al enviar respuesta:", error);
    return null;
  }
}

function seleccionarOpcion(opcion, evento) {
  if (resultadoGenerado) {
    return;
  }

  opcionSeleccionada = opcion;

  const botones = document.querySelectorAll(".opcion");
  botones.forEach(boton => boton.classList.remove("seleccionada"));

  evento.currentTarget.classList.add("seleccionada");
  actualizarProgresoExamen();
}

function seleccionarFiguraMultiple(tipo, figura, evento) {
  if (resultadoGenerado) {
    return;
  }

  const seleccion = seleccionesFiguras[tipo];
  const indice = seleccion.indexOf(figura);

  if (indice >= 0) {
    seleccion.splice(indice, 1);
    evento.currentTarget.classList.remove("seleccionada");
    actualizarProgresoExamen();
    return;
  }

  seleccion.push(figura);
  seleccion.sort();
  evento.currentTarget.classList.add("seleccionada");
  actualizarProgresoExamen();
}

function obtenerSeleccionFiguras(tipo) {
  return seleccionesFiguras[tipo].slice().sort().join(",");
}

function seleccionarElemento13(elemento, respuesta, evento) {
  if (resultadoGenerado) {
    return;
  }

  respuestasElementos13[elemento] = respuesta;

  document.querySelectorAll(`.opcion-elemento[data-elemento="${elemento}"]`).forEach(boton => {
    boton.classList.remove("seleccionada");
  });

  evento.currentTarget.classList.add("seleccionada");
  actualizarProgresoExamen();
}

function seleccionarDivision14(figura, linea, evento) {
  if (resultadoGenerado) {
    return;
  }

  const seleccion = divisiones14[figura];
  const indice = seleccion.indexOf(linea);

  if (indice >= 0) {
    seleccion.splice(indice, 1);
    evento.currentTarget.classList.remove("seleccionada");
    actualizarProgresoExamen();
    return;
  }

  seleccion.push(linea);
  seleccion.sort();
  evento.currentTarget.classList.add("seleccionada");
  actualizarProgresoExamen();
}

function obtenerDivision14(figura) {
  return divisiones14[figura].slice().sort().join(",");
}

function iniciarActividadesConexion() {
  document.querySelectorAll(".plano-conexion").forEach(plano => {
    const puntos = plano.querySelectorAll(".punto-conexion");

    puntos.forEach(punto => {
      punto.addEventListener("click", () => seleccionarPuntoConexion(plano, punto));
    });
  });
}

function iniciarActualizacionProgreso() {
  document.querySelectorAll("select").forEach(select => {
    select.addEventListener("change", actualizarProgresoExamen);
  });
}

function iniciarEventosExamen() {
  iniciarActividadesConexion();
  iniciarActualizacionProgreso();
  actualizarProgresoExamen();
}

function seleccionarPuntoConexion(plano, punto) {
  if (!estudianteActivo || !estudianteActivo.idEstudiante || resultadoGenerado) {
    return;
  }

  const actividad = plano.dataset.actividad;
  const conexion = conexionesSeleccionadas[actividad];

  if (conexion.segmento) {
    return;
  }

  if (punto.classList.contains("seleccionado")) {
    punto.classList.remove("seleccionado");
    conexion.puntos = conexion.puntos.filter(item => item !== punto);
    return;
  }

  if (conexion.puntos.length >= 2) {
    return;
  }

  punto.classList.add("seleccionado");
  conexion.puntos.push(punto);

  if (conexion.puntos.length === 2) {
    registrarConexion(plano, actividad);
    actualizarProgresoExamen();
  }
}

function registrarConexion(plano, actividad) {
  const conexion = conexionesSeleccionadas[actividad];
  const svg = plano.querySelector(".lineas-conexion");
  const punto1 = conexion.puntos[0];
  const punto2 = conexion.puntos[1];

  conexion.segmento = normalizarSegmento(punto1.dataset.punto + punto2.dataset.punto);
  conexion.linea = dibujarLinea(plano, svg, punto1, punto2, "neutra");
}

function volverASeleccionar(actividad) {
  if (resultadoGenerado) {
    return;
  }

  limpiarConexion(actividad);
}

function limpiarConexion(actividad) {
  const plano = document.querySelector(`.plano-conexion[data-actividad="${actividad}"]`);
  const conexion = conexionesSeleccionadas[actividad];

  if (conexion.linea) {
    conexion.linea.remove();
  }

  conexion.puntos.forEach(punto => {
    punto.classList.remove("seleccionado", "correcto", "incorrecto");
  });

  conexion.puntos = [];
  conexion.segmento = "";
  conexion.linea = null;

  if (plano) {
    plano.querySelectorAll(".punto-conexion").forEach(punto => {
      punto.classList.remove("seleccionado", "correcto", "incorrecto");
    });
  }

  actualizarProgresoExamen();
}

function normalizarSegmento(segmento) {
  return String(segmento).toUpperCase().split("").sort().join("");
}

function dibujarLinea(plano, svg, punto1, punto2, estado) {
  const rectPlano = plano.getBoundingClientRect();
  const rect1 = punto1.getBoundingClientRect();
  const rect2 = punto2.getBoundingClientRect();

  const x1 = rect1.left + rect1.width / 2 - rectPlano.left;
  const y1 = rect1.top + rect1.height / 2 - rectPlano.top;
  const x2 = rect2.left + rect2.width / 2 - rectPlano.left;
  const y2 = rect2.top + rect2.height / 2 - rectPlano.top;

  const linea = document.createElementNS("http://www.w3.org/2000/svg", "line");

  linea.setAttribute("x1", x1);
  linea.setAttribute("y1", y1);
  linea.setAttribute("x2", x2);
  linea.setAttribute("y2", y2);
  linea.setAttribute("stroke", obtenerColorLinea(estado));
  linea.setAttribute("stroke-width", "7");
  linea.setAttribute("stroke-linecap", "round");

  svg.appendChild(linea);
  return linea;
}

function obtenerColorLinea(estado) {
  if (estado === "correcta") {
    return "#22c55e";
  }

  if (estado === "incorrecta") {
    return "#f87171";
  }

  return "#0ea5e9";
}

function obtenerRespuestasActuales() {
  return actividadesEvaluables.map(actividad => {
    const respuesta = actividad.obtenerRespuesta();
    const correcta = normalizarValor(respuesta) === normalizarValor(actividad.respuestaCorrecta);

    return {
      ...actividad,
      respuesta,
      correcta
    };
  });
}

function normalizarValor(valor) {
  return String(valor).trim().toLowerCase();
}

function contarRespuestasCompletas(respuestas = obtenerRespuestasActuales()) {
  return respuestas.filter(respuesta => String(respuesta.respuesta).trim() !== "").length;
}

function validarRespuestas(respuestas) {
  return contarRespuestasCompletas(respuestas) === actividadesEvaluables.length;
}

function actualizarProgresoExamen() {
  const progreso = document.getElementById("progresoExamen");

  if (!progreso) {
    return;
  }

  const completas = contarRespuestasCompletas();
  const total = actividadesEvaluables.length;
  progreso.textContent = `Progreso: ${completas} de ${total} respuestas completadas.`;
  progreso.className = completas === total
    ? "progreso-examen progreso-completo"
    : "progreso-examen advertencia-progreso";
}

function calcularResultado(respuestas) {
  const puntosTotales = actividadesEvaluables.reduce((total, actividad) => total + actividad.valor, 0);
  const puntosObtenidos = respuestas.reduce((total, respuesta) => {
    return respuesta.correcta ? total + respuesta.valor : total;
  }, 0);
  const correctas = respuestas.filter(respuesta => respuesta.correcta).length;
  const totalEvaluable = respuestas.length;
  const incorrectas = totalEvaluable - correctas;
  const puntajeEscalado = puntosTotales === 0 ? 0 : (puntosObtenidos / puntosTotales) * 10;
  const puntajeLimitado = Math.max(0, Math.min(10, puntajeEscalado));

  return {
    puntosObtenidos,
    puntosTotales,
    correctas,
    incorrectas,
    totalEvaluable,
    puntaje: redondearPuntaje(puntajeLimitado)
  };
}

function redondearPuntaje(valor) {
  const redondeado = Math.round(valor * 100) / 100;
  return Number.isInteger(redondeado) ? String(redondeado) : redondeado.toFixed(2);
}

async function guardarRespuestas(respuestas) {
  if (guardandoResultado || resultadoGenerado) {
    return null;
  }

  guardandoResultado = true;
  actualizarEstadoBotonResultado(true);

  const guardadas = [];

  for (const respuesta of respuestas) {
    const guardada = await enviarRespuesta(respuesta.idPregunta, respuesta.respuesta);

    if (!guardada) {
      guardandoResultado = false;
      actualizarEstadoBotonResultado(false);
      return null;
    }

    guardadas.push(guardada);
  }

  return guardadas;
}

function actualizarEstadoBotonResultado(guardando) {
  const botonResultado = document.getElementById("btnVerResultado");

  if (!botonResultado) {
    return;
  }

  botonResultado.disabled = guardando;
  botonResultado.textContent = guardando ? "Guardando..." : "Ver resultado";
}

async function mostrarResultadoFinal() {
  const mensaje = document.getElementById("mensajeFinal");

  if (!estudianteActivo || !estudianteActivo.idEstudiante) {
    mensaje.textContent = "Primero debes iniciar la actividad con tu nombre.";
    mensaje.className = "mensaje error";
    return;
  }

  if (resultadoGenerado || guardandoResultado) {
    return;
  }

  const respuestas = obtenerRespuestasActuales();
  actualizarProgresoExamen();

  if (!validarRespuestas(respuestas)) {
    mensaje.textContent = "Completa todas las actividades antes de ver el resultado.";
    mensaje.className = "mensaje error";
    return;
  }

  mensaje.textContent = "";
  mensaje.className = "mensaje";

  const guardadas = await guardarRespuestas(respuestas);

  if (!guardadas) {
    actualizarEstadoBotonResultado(false);
    mensaje.textContent = "No se pudieron guardar todas las respuestas. Intenta nuevamente.";
    mensaje.className = "mensaje error";
    return;
  }

  resumenResultado = calcularResultado(respuestas);
  resumenResultado.respuestas = respuestas;
  resultadoGenerado = true;
  guardandoResultado = false;

  await generarResultadoBackend();
  mostrarPantallaResultado();
}

async function generarResultadoBackend() {
  try {
    const respuesta = await fetch(`${API_URL}/resultados/${estudianteActivo.idEstudiante}`, {
      method: "POST"
    });

    if (!respuesta.ok) {
      const datos = await respuesta.json();
      console.error("Error del backend al generar resultado:", datos);
    }
  } catch (error) {
    console.error("Error al generar resultado:", error);
  }
}

function mostrarPantallaResultado() {
  const leccionCompleta = document.getElementById("leccionCompleta");
  const pantallaResultado = document.getElementById("pantallaResultado");
  const puntajeResultado = document.getElementById("puntajeResultado");
  const circulo = document.getElementById("circuloPuntaje");

  leccionCompleta.classList.add("oculto-pagina");
  pantallaResultado.classList.remove("oculto-pagina");

  puntajeResultado.textContent = resumenResultado.puntaje;
  circulo.style.setProperty("--porcentaje", `${Number(resumenResultado.puntaje) * 10}%`);

  document.getElementById("nombreResultado").textContent = `${estudianteActivo.nombre}, esta es tu nota final.`;
  document.getElementById("correctasResultado").textContent = resumenResultado.correctas;
  document.getElementById("incorrectasResultado").textContent = resumenResultado.incorrectas;
  document.getElementById("totalResultado").textContent = resumenResultado.totalEvaluable;

  pantallaResultado.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function verRespuestas() {
  if (!resumenResultado) {
    return;
  }

  const leccionCompleta = document.getElementById("leccionCompleta");
  const pantallaResultado = document.getElementById("pantallaResultado");

  pantallaResultado.classList.add("oculto-pagina");
  leccionCompleta.classList.remove("oculto-pagina");
  leccionCompleta.classList.add("modo-revision");
  document.body.classList.add("modo-revision");

  aplicarRevision();

  document.querySelector(".encabezado-revision").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function regresarAPuntaje() {
  if (!resumenResultado) {
    return;
  }

  const leccionCompleta = document.getElementById("leccionCompleta");
  const pantallaResultado = document.getElementById("pantallaResultado");

  leccionCompleta.classList.add("oculto-pagina");
  leccionCompleta.classList.remove("modo-revision");
  document.body.classList.remove("modo-revision");
  pantallaResultado.classList.remove("oculto-pagina");

  pantallaResultado.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function aplicarRevision() {
  document.querySelectorAll("select, .opcion, .opcion-figura, .opcion-elemento, .linea-divisor, .punto-conexion, .btn-reset-conexion").forEach(elemento => {
    elemento.disabled = true;
  });

  mostrarRevisionActividad1();
  mostrarRevisionActividad2();
  mostrarRevisionConexion(3);
  mostrarRevisionConexion(4);
  mostrarRevisionActividad5();
  mostrarRevisionSeleccionFiguras("triangulos", "actividadTriangulosSeleccion", "resultadoActividadTriangulos", ["a", "c"], "Correcto. Los triángulos eran las figuras a y c.", "Incorrecto. Los triángulos correctos eran las figuras a y c.");
  mostrarRevisionSeleccionFiguras("cuadrilateros", "actividadCuadrilaterosSeleccion", "resultadoActividadCuadrilateros", ["a", "b"], "Correcto. Los cuadriláteros eran las figuras a y b.", "Incorrecto. Los cuadriláteros correctos eran las figuras a y b.");
  mostrarRevisionActividad13Elementos();
  mostrarRevisionActividad13Cantidades();
  mostrarRevisionActividad14();
}

function mostrarRevisionActividad1() {
  const resultado = document.getElementById("resultadoActividad1");
  const respuestas = resumenResultado.respuestas.filter(respuesta => respuesta.id.startsWith("pregunta"));
  const mensajes = respuestas.map(respuesta => {
    const estado = respuesta.correcta ? "Correcto." : "Incorrecto.";
    return `<span class="${respuesta.correcta ? "correcto" : "error"}">${estado} Respuesta correcta: ${respuesta.textoCorrecto}.</span>`;
  });

  resultado.innerHTML = mensajes.join("<br>");
  resultado.className = "resultado resultado-revision";
}

function mostrarRevisionActividad2() {
  const resultado = document.getElementById("resultadoActividad2");
  const respuesta = resumenResultado.respuestas.find(item => item.id === "actividad2");

  if (respuesta.correcta) {
    resultado.textContent = "Correcto. La opción seleccionada representa un segmento.";
    resultado.className = "resultado correcto";
    return;
  }

  resultado.textContent = "Incorrecto. La respuesta correcta era el segmento limitado por dos puntos.";
  resultado.className = "resultado error";
}

function mostrarRevisionConexion(actividad) {
  const respuesta = resumenResultado.respuestas.find(item => item.id === `actividad${actividad}`);
  const resultado = document.getElementById(`resultadoActividad${actividad}`);
  const conexion = conexionesSeleccionadas[actividad];
  const configuracion = respuestasConexion[actividad];
  const estado = respuesta.correcta ? "correcta" : "incorrecta";

  if (conexion.linea) {
    conexion.linea.setAttribute("stroke", obtenerColorLinea(estado));
  }

  conexion.puntos.forEach(punto => {
    punto.classList.remove("seleccionado");
    punto.classList.add(respuesta.correcta ? "correcto" : "incorrecto");
  });

  if (respuesta.correcta) {
    resultado.textContent = `Correcto, formaste el segmento ${configuracion.etiqueta}.`;
    resultado.className = "resultado-conexion correcto";
    return;
  }

  resultado.textContent = `Incorrecto, ese no es el segmento ${configuracion.etiqueta}.`;
  resultado.className = "resultado-conexion error";
}

function mostrarRevisionActividad5() {
  mostrarRevisionFigura("A", [
    "actividad5FiguraASegmentos",
    "actividad5FiguraANombre"
  ]);
  mostrarRevisionFigura("B", [
    "actividad5FiguraBSegmentos",
    "actividad5FiguraBNombre"
  ]);
}

function mostrarRevisionFigura(figura, ids) {
  const resultado = document.getElementById(`resultadoActividad5Figura${figura}`);
  const mensajes = ids.map(id => {
    const respuesta = resumenResultado.respuestas.find(item => item.id === id);
    const estado = respuesta.correcta ? "Correcto." : "Incorrecto.";
    return `<span class="${respuesta.correcta ? "correcto" : "error"}">${estado} Respuesta correcta: ${respuesta.textoCorrecto}.</span>`;
  });

  resultado.innerHTML = mensajes.join("<br>");
  resultado.className = "resultado resultado-revision";
}

function mostrarRevisionSeleccionFiguras(tipo, idRespuesta, idResultado, correctas, mensajeCorrecto, mensajeIncorrecto) {
  const respuesta = resumenResultado.respuestas.find(item => item.id === idRespuesta);
  const resultado = document.getElementById(idResultado);
  const botones = document.querySelectorAll(`.opcion-figura[data-tipo="${tipo}"]`);

  botones.forEach(boton => {
    const figura = boton.dataset.figura;

    if (correctas.includes(figura)) {
      boton.classList.add("correcta-revision");
    }

    if (seleccionesFiguras[tipo].includes(figura) && !correctas.includes(figura)) {
      boton.classList.add("incorrecta-revision");
    }
  });

  resultado.textContent = respuesta.correcta ? mensajeCorrecto : mensajeIncorrecto;
  resultado.className = respuesta.correcta ? "resultado correcto" : "resultado error";
}

function mostrarRevisionActividad13Elementos() {
  mostrarRevisionElemento13("actividad13Elemento1", "resultadoActividad13Elemento1");
  mostrarRevisionElemento13("actividad13Elemento2", "resultadoActividad13Elemento2");
  mostrarRevisionElemento13("actividad13Elemento3", "resultadoActividad13Elemento3");
}

function mostrarRevisionElemento13(idRespuesta, idResultado) {
  const respuesta = resumenResultado.respuestas.find(item => item.id === idRespuesta);
  const resultado = document.getElementById(idResultado);
  const botones = document.querySelectorAll(`.opcion-elemento[data-elemento="${idRespuesta}"]`);

  botones.forEach(boton => {
    if (boton.dataset.valor === respuesta.respuestaCorrecta) {
      boton.classList.add("correcta-revision");
    }

    if (boton.classList.contains("seleccionada") && boton.dataset.valor !== respuesta.respuestaCorrecta) {
      boton.classList.add("incorrecta-revision");
    }
  });

  const estado = respuesta.correcta ? "Correcto." : "Incorrecto.";
  resultado.textContent = `${estado} Respuesta correcta: ${respuesta.textoCorrecto}.`;
  resultado.className = respuesta.correcta ? "resultado correcto" : "resultado error";
}

function mostrarRevisionActividad13Cantidades() {
  const ids = [
    "actividad13TrianguloLados",
    "actividad13CuadrilateroLados",
    "actividad13TrianguloVertices",
    "actividad13CuadrilateroVertices",
    "actividad13TrianguloAngulos",
    "actividad13CuadrilateroAngulos"
  ];

  ids.forEach(id => {
    const respuesta = resumenResultado.respuestas.find(item => item.id === id);
    const resultado = document.getElementById(`resultado${id}`);
    const estado = respuesta.correcta ? "Correcto." : "Incorrecto.";
    resultado.textContent = `${estado} Respuesta correcta: ${respuesta.textoCorrecto}.`;
    resultado.className = respuesta.correcta ? "resultado resultado-mini correcto" : "resultado resultado-mini error";
  });
}

function mostrarRevisionActividad14() {
  mostrarRevisionDivision14(
    "figuraA",
    "actividad14FiguraADivision",
    "resultadoActividad14FiguraA",
    ["techo"],
    "Correcto. Dividiste la figura en un triángulo y un cuadrilátero.",
    "Incorrecto. La división correcta separaba el triángulo superior de la base cuadrilátera."
  );
  mostrarRevisionDivision14(
    "figuraB",
    "actividad14FiguraBDivision",
    "resultadoActividad14FiguraB",
    ["cabina"],
    "Correcto. Dividiste la figura compuesta en triángulos y cuadriláteros.",
    "Incorrecto. Revisa la línea que separa la cabina del cuerpo principal."
  );
}

function mostrarRevisionDivision14(figura, idRespuesta, idResultado, correctas, mensajeCorrecto, mensajeIncorrecto) {
  const respuesta = resumenResultado.respuestas.find(item => item.id === idRespuesta);
  const resultado = document.getElementById(idResultado);
  const lineas = document.querySelectorAll(`.linea-divisor[data-figura="${figura}"]`);

  lineas.forEach(linea => {
    const valor = linea.dataset.linea;

    if (correctas.includes(valor)) {
      linea.classList.add("correcta-revision");
    }

    if (divisiones14[figura].includes(valor) && !correctas.includes(valor)) {
      linea.classList.add("incorrecta-revision");
    }
  });

  resultado.textContent = respuesta.correcta ? mensajeCorrecto : mensajeIncorrecto;
  resultado.className = respuesta.correcta ? "resultado correcto" : "resultado error";
}

function volverAIntentar() {
  location.reload();
}

window.addEventListener("DOMContentLoaded", () => {
  iniciarEventosExamen();
});
