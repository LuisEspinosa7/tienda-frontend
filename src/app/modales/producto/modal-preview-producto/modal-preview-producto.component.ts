import { TipoProducto } from './../../../models/TipoProducto';
import { Marca } from './../../../models/Marca';
import { MarcaService } from './../../../services/marca.service';
import { TipoProductoService } from './../../../services/tipo-producto.service';
import { GLOBAL } from './../../../models/global';
import { ProductoService } from './../../../services/producto.service';
import { Producto } from './../../../models/Producto';
import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

@Component({
  selector: 'app-modal-preview-producto',
  templateUrl: './modal-preview-producto.component.html',
  styleUrls: ['./modal-preview-producto.component.scss']
})
export class ModalPreviewProductoComponent implements OnInit {

  @Input() id;
  producto: Producto;
  formularioPreview: FormGroup;
  titulo: string = 'Vista Previa Producto';

  objetoCargado: boolean;

  tiposProductosJSON: TipoProducto[] = [];
  marcasJSON: Marca[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private _productoService: ProductoService,
    private _tipoProductoService: TipoProductoService,
    private _marcaService: MarcaService) { }

  ngOnInit() {
    console.log('Inicio el modal producto');
    this.getTiposProductos();
    this.getMarcas();
    console.log('ID: ' + this.id);
    this.objetoCargado = false;
    this.cargarObjeto();
  }

  cargarObjeto() {
    console.log('Cargando Objeto...');

    this._productoService.obtenerXID(this.id)
      .subscribe(
        response => {
          console.log(response);

          if (response.code === 200) {
            console.log('Obtenido');
            this.producto = response.data;
            console.log('Producto: ');
            console.log(this.producto);

            //Llenar el formulario
            this.iniciarFormulario();

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

  iniciarFormulario() {
    console.log('Iniciando Formulario preview');

    this.formularioPreview = this.formBuilder.group({
      id: [this.producto.id],
      codigo: [this.producto.codigo],
      tipoProducto: [this.producto.tipoProducto.id],
      marca: [this.producto.marca.id],
      nombre: [this.producto.nombre],
      descripcion: [this.producto.descripcion],
      stock: [this.producto.stock],
      estado: [this.producto.estado]
    })

    this.formularioPreview.controls['id'].disable();
    this.formularioPreview.controls['codigo'].disable();
    this.formularioPreview.controls['tipoProducto'].disable();
    this.formularioPreview.controls['marca'].disable();
    this.formularioPreview.controls['nombre'].disable();
    this.formularioPreview.controls['descripcion'].disable();
    this.formularioPreview.controls['stock'].disable();
    this.formularioPreview.controls['estado'].disable();

    this.objetoCargado = true;
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
    }).then((result) => {
      console.log(result);
      if (result.value) {
        console.log('Confirmo si');

        if (type == 'success') {
          // Redirigir a componente lista
          this.router.navigate(['/dashboard/producto/lista']);
        }
      }
    });
  }


  getTiposProductos() {
    this._tipoProductoService.cargarDisponibles()
      .subscribe(
        response => {
          console.log(response);
          this.tiposProductosJSON = response;         
        },
        error => {
          console.log(<any>error);
        }
      );
  }

  getMarcas() {
    this._marcaService.cargarDisponibles()
      .subscribe(
        response => {
          console.log(response);
          this.marcasJSON = response;         
        },
        error => {
          console.log(<any>error);
        }
      );
  }

}
