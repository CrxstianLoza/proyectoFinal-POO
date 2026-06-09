class Producto {
    private idProducto?: number;
    private nombre: string;
    private precio: number;
    private imagen: string | null;

    constructor(nombre: string, precio: number, imagen: string | null, idProducto?: number) {
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.idProducto = idProducto;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getPrecio(): number {
        return this.precio;
    }

    public getImagen(): string | null {
        return this.imagen;
    }

    public getIdProducto(): number | undefined {
        return this.idProducto;
    }
}

export default Producto;