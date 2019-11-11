import { MarcaService } from './../services/marca.service';
import { TipoProductoService } from './../services/tipo-producto.service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductosRoutes } from './productos.routing';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
//import { ListaCategoriasComponent } from './lista-categorias/lista-categorias.component';
//import { AgregarCategoriaComponent } from './agregar-categoria/agregar-categoria.component';
//import { CategoriaService } from './../services/categoria.service';
//import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';


@NgModule({
    imports: [
        CommonModule,
        DataTablesModule,
        ReactiveFormsModule,
        RouterModule.forChild(ProductosRoutes)
    ],
    declarations: [
        ListaProductosComponent,
        AgregarProductoComponent,
        EditarProductoComponent
    ],
    providers: [
        TipoProductoService,
        MarcaService
    ]
})
export class ProductosModule { }