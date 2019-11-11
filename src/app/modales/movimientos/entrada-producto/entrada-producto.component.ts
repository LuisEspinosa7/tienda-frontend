import { MovimientoDetalle } from './../../../models/MovimientoDetalle';
import { GLOBAL } from './../../../models/global';
import { ProductoService } from './../../../services/producto.service';
import { Producto } from './../../../models/Producto';
import { Component, OnInit, Input, Output } from '@angular/core';

import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import swal from 'sweetalert2';


@Component({
  selector: 'app-entrada-producto',
  templateUrl: './entrada-producto.component.html',
  styleUrls: ['./entrada-producto.component.scss']
})
export class EntradaProductoComponent implements OnInit {

  @Input() movimientoDetalle;

  producto: Producto;
  formularioEntrada: FormGroup;
  titulo: string = 'Agregar Entrada (Producto)';

  productosCargado: boolean;

  productosJSON: Producto[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private _productoService: ProductoService) { }

  ngOnInit() {
    console.log('Inicio el modal producto');
    this.productosCargado = false;
    this.getProductos();

    this.iniciarFormulario();
  }

  iniciarFormulario() {
    console.log('Iniciando Formulario Entrada');

    this.formularioEntrada = this.formBuilder.group({
      producto: [null, Validators.compose([Validators.required])],
      cantidad: [null, Validators.compose([Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)])]
    })

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


  getProductos() {
    this._productoService.cargarDisponibles()
      .subscribe(
        response => {
          console.log(response);
          this.productosJSON = response;
          this.productosCargado = true;
        },
        error => {
          console.log(<any>error);
        }
      );
  }

  confirmarEntrada() {

    let productoEncontrado: Producto;

    for (let entry of this.productosJSON) {
      console.log('iterando ...');
      console.log('id: ' + entry.id + ' - ' + "nombre: " + entry.nombre + ".");

      if(entry.id == this.formularioEntrada.controls['producto'].value){
        console.log('Encontrado');
        productoEncontrado = entry;
        console.log(productoEncontrado);
      }      
    }

    let objetoProcesado: MovimientoDetalle = new MovimientoDetalle(
      null,
      null,
      productoEncontrado,
      this.formularioEntrada.controls['cantidad'].value
    );

    this.movimientoDetalle = objetoProcesado;
    console.log('OBJETO PROCESADO');
    console.log(this.movimientoDetalle);
    this.activeModal.close(this.movimientoDetalle);
  }

}
