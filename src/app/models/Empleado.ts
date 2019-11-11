export class Empleado {

    id: number;
    codigo: string;
    nombres: string;
    apellidos: string;
    identificacion: number;

    constructor(
        id: number,
        codigo: string,
        nombres: string,
        apellidos: string,
        identificacion: number
    ) {
        this.id = id;
        this.codigo = codigo;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.identificacion = identificacion;
    }
}