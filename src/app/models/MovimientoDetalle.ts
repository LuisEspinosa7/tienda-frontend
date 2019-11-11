import { Producto } from './Producto';
import { Movimiento } from './Movimiento';

export class MovimientoDetalle {

    id: number;
    movimiento: Movimiento;
    producto: Producto;
    cantidad: number;

    constructor(
        id: number,
        movimiento: Movimiento,
        producto: Producto,
        cantidad: number
    ) {
        this.id = id;
        this.movimiento = movimiento;
        this.producto = producto;
        this.cantidad = cantidad;
    }
}