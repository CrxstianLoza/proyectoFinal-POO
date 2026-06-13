class Figura {
  private nombre: string;
  private imagen: string | null;

  constructor(nombre: string, imagen: string | null) {
    this.nombre = nombre;
    this.imagen = imagen;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public getImagen(): string | null {
    return this.imagen;
  }
}

export default Figura;