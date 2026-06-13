class Resultado {
  private idEstudiante: number;
  private totalPreguntas: number;
  private correctas: number;
  private puntajeTotal: number;

  constructor(
    idEstudiante: number,
    totalPreguntas: number,
    correctas: number,
    puntajeTotal: number
  ) {
    this.idEstudiante = idEstudiante;
    this.totalPreguntas = totalPreguntas;
    this.correctas = correctas;
    this.puntajeTotal = puntajeTotal;
  }

  public getIdEstudiante(): number {
    return this.idEstudiante;
  }

  public getTotalPreguntas(): number {
    return this.totalPreguntas;
  }

  public getCorrectas(): number {
    return this.correctas;
  }

  public getPuntajeTotal(): number {
    return this.puntajeTotal;
  }
}

export default Resultado;