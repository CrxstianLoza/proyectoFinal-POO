class Respuesta {
  private idEstudiante: number;
  private idPregunta: number;
  private respuestaEstudiante: string;

  constructor(
    idEstudiante: number,
    idPregunta: number,
    respuestaEstudiante: string
  ) {
    this.idEstudiante = idEstudiante;
    this.idPregunta = idPregunta;
    this.respuestaEstudiante = respuestaEstudiante;
  }

  public getIdEstudiante(): number {
    return this.idEstudiante;
  }

  public getIdPregunta(): number {
    return this.idPregunta;
  }

  public getRespuestaEstudiante(): string {
    return this.respuestaEstudiante;
  }
}

export default Respuesta;