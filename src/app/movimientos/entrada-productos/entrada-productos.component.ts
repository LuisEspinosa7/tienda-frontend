import { MovimientosProductosService } from './../../services/movimientos-productos.service';
import { Empleado } from './../../models/Empleado';
import { TipoMovimiento } from './../../models/TipoMovimiento';
import { Movimiento } from './../../models/Movimiento';
import { Component, OnInit } from '@angular/core';
import { ProductoService } from './../../services/producto.service';
import { Producto } from './../../models/Producto';
import { GLOBAL } from './../../models/global';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DataTablesResponse } from '../../models/datatableResponse';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { MovimientoDetalle } from 'src/app/models/MovimientoDetalle';
import { EntradaProductoComponent } from 'src/app/modales/movimientos/entrada-producto/entrada-producto.component';


@Component({
  selector: 'app-entrada-productos',
  templateUrl: './entrada-productos.component.html',
  styleUrls: ['./entrada-productos.component.scss']
})
export class EntradaProductosComponent implements OnInit {

  titulo: string = 'Entrada de Productos';
  nombreModulo: string = GLOBAL.nombreModuloMovimientos;

  detallesTemporales: MovimientoDetalle[] = [];

  modalOptions: NgbModalOptions;


  constructor(
    private http: HttpClient,
    private router: Router,
    private _productoService: ProductoService,
    private modalService: NgbModal,
    private _movimientosProductosService: MovimientosProductosService
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }
  }

  ngOnInit() {
    console.log('Iniciando listado component');
  }

  confirmarEliminacion(idx) {
    console.log('Confirmando...');

    swal({
      title: 'Esta seguro?',
      text: "Desea Eliminarlo!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: GLOBAL.primaryColor,
      cancelButtonColor: GLOBAL.accentColor,
      confirmButtonText: 'Si'
    }).then((result) => {

      console.log(result);
      if (result.value) {
        console.log('Eliminar si');
        this.eliminar(idx);
      }
    })
  }


  eliminar(index) {
    console.log('Eliminando');
    console.log('ID: ' + index);

    /**
     * AQUI SE ELIMINA DE LA TABLA TEMPORAL
     */
    if (index > -1) {
      this.detallesTemporales.splice(index, 1);
      //this.dataSource.data = this.itemsTemporales;
    }


  }

  mostrarRespuestaAndReload(type, title, message, accion) {
    console.log('Mostrando Respuesta....');
    swal({
      title: title,
      text: message,
      type: type,
      showCancelButton: false,
      confirmButtonColor: GLOBAL.primaryColor,
      confirmButtonText: 'Ok'
    }).then((result) => {
      console.log(result);
      if (result.value) {
        console.log('Confirmo si');

        if (type == 'success') {
          // Redirigir a componente lista
          //this.router.navigate(['/dashboard/productos/lista']);
          window.location.reload();
        }
      }
    });
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


  openModalAgregarEntrada() {
    console.log('Agregando Entrada');

    let movimientoDetalle: MovimientoDetalle = new MovimientoDetalle(
      null,
      null,
      null,
      null
    );

    const modalRef = this.modalService.open(EntradaProductoComponent);
    modalRef.componentInstance.movimientoDetalle = movimientoDetalle;

    modalRef.result.then((result) => {
      if (result) {
        console.log(result);

        if (result == 'close') {
          console.log('Cerro el modal');
        } else {
          console.log('Modal Correcto');
          this.detallesTemporales.push(result);
        }

      }
    });
  }


  confirmarAdicion() {
    console.log('Preguntar si esta seguro');

    swal({
      title: 'Confirmacion?',
      text: "Por favor confirma para agregar las entradas",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: GLOBAL.primaryColor,
      cancelButtonColor: GLOBAL.accentColor,
      confirmButtonText: 'Si'
    }).then((result) => {

      console.log(result);
      if (result.value) {
        console.log('Confirmo si');
        this.adicionar();
      }
    })
  }


  adicionar() {
    console.log('Adicionando...');

    let objetoProcesado: Movimiento = new Movimiento(
      null,
      new TipoMovimiento(GLOBAL.entrada, null, null),
      new Empleado(GLOBAL.idEmpleadoEjemplo, null, null, null, null),
      null,
      this.detallesTemporales);

    console.log('Objeto');
    console.log(objetoProcesado);


    this._movimientosProductosService.realizarMovimiento(objetoProcesado)
      .subscribe(
        response => {
          console.log(response);

          if (response.code === 200) {
            console.log('Se creo correctamente');
            this.mostrarRespuestaAndReload('success', 'Respuesta', response.mensaje, 'Ok');

          } else {
            console.log('Algo paso pero no hubo error');
            this.mostrarRespuesta('warning', 'Advertencia', response.mensaje, 'Ok');
          }

        },
        error => {
          console.log(<any>error);
          console.log('Ocurrio un error');

          if (error.status === 400) {
            this.mostrarRespuesta('warning', 'Advertencia', error.error.message, 'Ok');
          } else {
            this.mostrarRespuesta('error', 'Error', GLOBAL.mensajeErrorInterno, 'Ok');
          }

        }
      );

  }



}
