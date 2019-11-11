import { SalidaProductosComponent } from './salida-productos/salida-productos.component';
import { EntradaProductosComponent } from './entrada-productos/entrada-productos.component';

import { Routes } from '@angular/router';


export const MovimientosRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'entrada',
                component: EntradaProductosComponent
            },
            {
                path: 'salida',
                component: SalidaProductosComponent
            }

        ]
    }
];