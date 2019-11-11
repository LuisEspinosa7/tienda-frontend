import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { Routes } from '@angular/router';


export const ProductosRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'lista',
                component: ListaProductosComponent
            },
            {
                path: 'agregar',
                component: AgregarProductoComponent
            },
            {
                path: 'editar/:id',
                component: EditarProductoComponent
            }   

        ]
    }
];