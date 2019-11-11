export class Marca {

    id: number;
    nombre: string;
    descripcion: string;
    estado: number;

    constructor(
        id: number,
        nombre: string,
        descripcion: string,
        estado: number
    ) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.estado = estado;
    }
}