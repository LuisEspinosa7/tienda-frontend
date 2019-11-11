import { MovimientosProductosService } from './services/movimientos-productos.service';
import { MarcaService } from './services/marca.service';
import { TipoProductoService } from './services/tipo-producto.service';
import { ProductoService } from './services/producto.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './layouts/landing/landing.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { SidebarComponent } from './layouts/dashboard/sidebar/sidebar.component';
import { TopbarComponent } from './layouts/dashboard/topbar/topbar.component';
import { FooterComponent } from './layouts/dashboard/footer/footer.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalPreviewProductoComponent } from './modales/producto/modal-preview-producto/modal-preview-producto.component';
import { EntradaProductoComponent } from './modales/movimientos/entrada-producto/entrada-producto.component';
import { ModalSalidaProductoComponent } from './modales/movimientos/modal-salida-producto/modal-salida-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    DashboardComponent,
    SidebarComponent,
    TopbarComponent,
    FooterComponent,
    ModalPreviewProductoComponent,
    EntradaProductoComponent,
    ModalSalidaProductoComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [
    ProductoService,
    TipoProductoService,
    MarcaService,
    MovimientosProductosService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalPreviewProductoComponent,
    EntradaProductoComponent,
    ModalSalidaProductoComponent
  ]
})
export class AppModule { }
