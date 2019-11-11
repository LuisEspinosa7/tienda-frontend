import { ModalPreviewProductoComponent } from './../../modales/producto/modal-preview-producto/modal-preview-producto.component';
import { ProductoService } from './../../services/producto.service';
import { Producto } from './../../models/Producto';
import { Component, OnInit } from '@angular/core';

import { GLOBAL } from './../../models/global';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DataTablesResponse } from '../../models/datatableResponse';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit {

  titulo: string = 'Listado Productos';
  nombreModulo: string = GLOBAL.nombreModuloProductos;

  dtOptions: DataTables.Settings = {};
  productos: Producto[];

  modalOptions: NgbModalOptions;

  //parametros de la tabla con AJAX
  dataTablesParameters: any;
  callback: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _productoService: ProductoService,
    private modalService: NgbModal
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }
  }

  ngOnInit() {
    console.log('Iniciando listado component');
    this.createDataTable();
  }

  createDataTable() {
    console.log('Iniciando la tabla...');
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      language: {
        url: "assets/data/datatables/spanish.json"
      },
      ajax: (dataTablesParameters: any, callback) => {

        this.dataTablesParameters = dataTablesParameters;
        this.callback = callback;
        this.renderDataTable(dataTablesParameters, callback);

      },

      columns: [
        { data: 'id' },
        { data: 'codigo' },
        { data: 'tipoProducto.nombre' },
        { data: 'marca.nombre' },
        { data: 'nombre' },
        { data: 'stock' }
      ],
      responsive: true,
    };

  }


  renderDataTable(dataTablesParameters: any, callback) {
    console.log('Renderizando la tabla...');

    this.http
      .post<DataTablesResponse>(
        GLOBAL.urlBackend + '/producto/datatable',
        dataTablesParameters, {}
      ).subscribe(resp => {

        console.log('Imprimir datos');
        console.log(resp);
        this.productos = resp.data;

        callback({
          recordsTotal: resp.recordsTotal,
          recordsFiltered: resp.recordsFiltered,
          data: []
        });
      });

  }


  confirmarEliminacion(id) {
    console.log('Confirmando...');

    swal({
      title: 'Esta seguro?',
      text: "Una vez eliminado, no se podra recuperar!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: GLOBAL.primaryColor,
      cancelButtonColor: GLOBAL.accentColor,
      confirmButtonText: 'Si'
    }).then((result) => {

      console.log(result);
      if (result.value) {
        console.log('Eliminar si');
        this.eliminar(id);
      }
    })
  }


  eliminar(id) {
    console.log('Eliminando usuario');

    console.log('ID: ' + id);

    this._productoService.delete(id)
      .subscribe(
        response => {
          console.log(response);

          if (response.code === 200) {
            console.log('Se elimino');
            this.renderDataTable(this.dataTablesParameters, this.callback);
            this.mostrarRespuesta('success', 'Respuesta', response.mensaje, 'Ok');

          } else {
            console.log('Algo paso pero no hubo error');
            this.mostrarRespuesta('warning', 'Advertencia', response.mensaje, 'Ok');
          }

        },
        error => {
          console.log(<any>error);
          console.log('Ocurrio un error');
          this.mostrarRespuesta('error', 'Error', GLOBAL.mensajeErrorInterno, 'Ok');
        }
      );

  }


  mostrarRespuesta(type, title, message, accion) {
    console.log('Mostrando Respuesta....');
    swal({
      title: title,
      text: message,
      type: type,
      showCancelButton: false,
      confirmButtonColor: GLOBAL.primaryColor,
      confirmButtonText: 'Ok'
    });
  }


  openPreview(id) {
    console.log('Abriendo Preview');

    const modalRef = this.modalService.open(ModalPreviewProductoComponent);
    modalRef.componentInstance.id = id;
  }

}
