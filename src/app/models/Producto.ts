import { Marca } from './Marca';
import { TipoProducto } from './TipoProducto';

export class Producto {

    id: number;
    codigo: string;
    tipoProducto: TipoProducto;
    marca: Marca;
    nombre: string;
    descripcion: string;
    stock: number;
    estado: number;

    constructor(
        id: number,
        codigo: string,
        tipoProducto: TipoProducto,
        marca: Marca,
        nombre: string,
        descripcion: string,
        stock: number,
        estado: number
    ) {
        this.id = id;
        this.codigo = codigo;
        this.tipoProducto = tipoProducto;
        this.marca = marca;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.stock = stock;
        this.estado = estado;
    }
}