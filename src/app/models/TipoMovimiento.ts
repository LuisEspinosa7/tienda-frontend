export class TipoMovimiento {

    id: number;
    nombre: string;
    estado: number;

    constructor(
        id: number,
        nombre: string,
        estado: number
    ) {
        this.id = id;
        this.nombre = nombre;
        this.estado = estado;
    }
}