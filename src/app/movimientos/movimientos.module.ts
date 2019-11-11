import { MovimientosRoutes } from './movimientos.routing';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { EntradaProductosComponent } from './entrada-productos/entrada-productos.component';
import { SalidaProductosComponent } from './salida-productos/salida-productos.component';




@NgModule({
    imports: [
        CommonModule,
        DataTablesModule,
        ReactiveFormsModule,
        RouterModule.forChild(MovimientosRoutes)
    ],
    declarations: [
        EntradaProductosComponent,
        SalidaProductosComponent
    ],
    providers: [
        
    ]
})
export class MovimientosModule { }