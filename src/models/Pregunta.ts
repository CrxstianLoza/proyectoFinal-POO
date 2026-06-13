class Pregunta {
  private seccion: string;
  private enunciado: string;
  private tipo: string;
  private respuestaCorrecta: string;
  private puntaje: number;

  constructor(
    seccion: string,
    enunciado: string,
    tipo: string,
    respuestaCorrecta: string,
    puntaje: number
  ) {
    this.seccion = seccion;
    this.enunciado = enunciado;
    this.tipo = tipo;
    this.respuestaCorrecta = respuestaCorrecta;
    this.puntaje = puntaje;
  }

  public getSeccion(): string {
    return this.seccion;
  }

  public getEnunciado(): string {
    return this.enunciado;
  }

  public getTipo(): string {
    return this.tipo;
  }

  public getRespuestaCorrecta(): string {
    return this.respuestaCorrecta;
  }

  public getPuntaje(): number {
    return this.puntaje;
  }
}

export default Pregunta;