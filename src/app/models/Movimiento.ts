import { MovimientoDetalle } from './MovimientoDetalle';
import { Empleado } from './Empleado';
import { TipoMovimiento } from './TipoMovimiento';

export class Movimiento {

    id: number;
    tipoMovimiento: TipoMovimiento;
    empleado: Empleado;
    fechaCreacion: string;
    detalles: MovimientoDetalle[];

    constructor(
        id: number,
        tipoMovimiento: TipoMovimiento,
        empleado: Empleado,
        fechaCreacion: string,
        detalles: MovimientoDetalle[]
    ) {
        this.id = id;
        this.tipoMovimiento = tipoMovimiento;
        this.empleado = empleado;
        this.fechaCreacion = fechaCreacion;
        this.detalles = detalles;
    }
}