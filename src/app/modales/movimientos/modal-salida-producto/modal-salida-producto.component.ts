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
  selector: 'app-modal-salida-producto',
  templateUrl: './modal-salida-producto.component.html',
  styleUrls: ['./modal-salida-producto.component.scss']
})
export class ModalSalidaProductoComponent implements OnInit {

  @Input() movimientoDetalle;

  producto: Producto;
  formularioSalida: FormGroup;
  titulo: string = 'Agregar Salida (Producto)';

  productosCargado: boolean;
  productoStockPermitido: boolean;
  productoExistenciasDisponibles: boolean;

  productosJSON: Producto[] = [];

  productoEncontrado: Producto;


  constructor(
    public activeModal: NgbActiveModal,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private _productoService: ProductoService) { }

  ngOnInit() {
    console.log('Inicio el modal producto');
    this.productosCargado = false;
    this.productoStockPermitido = true;
    this.productoExistenciasDisponibles = true;
    this.getProductos();

    this.iniciarFormulario();
  }

  iniciarFormulario() {
    console.log('Iniciando Formulario Entrada');

    this.formularioSalida = this.formBuilder.group({
      producto: [null, Validators.compose([Validators.required])],
      cantidad: [null, Validators.compose([Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)])]
    })

    this.formularioSalida.controls['cantidad'].disable();
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

  confirmarSalida() {

    let productoEncontrado: Producto;

    for (let entry of this.productosJSON) {
      console.log('iterando ...');
      console.log('id: ' + entry.id + ' - ' + "nombre: " + entry.nombre + ".");

      if (entry.id == this.formularioSalida.controls['producto'].value) {
        console.log('Encontrado');
        productoEncontrado = entry;
        console.log(productoEncontrado);
      }
    }

    let objetoProcesado: MovimientoDetalle = new MovimientoDetalle(
      null,
      null,
      productoEncontrado,
      this.formularioSalida.controls['cantidad'].value
    );

    this.movimientoDetalle = objetoProcesado;
    console.log('OBJETO PROCESADO');
    console.log(this.movimientoDetalle);
    this.activeModal.close(this.movimientoDetalle);
  }


  validarStockProducto(index){

    //let productoEncontrado: Producto;

    for (let entry of this.productosJSON) {
      console.log('iterando ...');
      console.log('id: ' + entry.id + ' - ' + "nombre: " + entry.nombre + ".");

      if (entry.id == this.formularioSalida.controls['producto'].value) {
        console.log('Encontrado');
        this.productoEncontrado = entry;
        console.log(this.productoEncontrado);
      }
    }

    /**
     * Valida si tiene Stock para salida
     */
    if(this.productoEncontrado.stock < 1){
      console.log('NO SE PERMITE LA SALIDA DE ESTE PRODUCTO, PUES NO TIENE STOCK');
      this.productoStockPermitido = false;
    } else {
      this.productoStockPermitido = true;
      this.formularioSalida.controls['cantidad'].enable();
    }

  }

  validarCantidadStockProducto(){
    console.log('Validando Cantidad Stock Disponible');

    if(this.productoEncontrado.stock < this.formularioSalida.controls['cantidad'].value){
      console.log('Se excedio en la cantidad (No hay mas stock)');
      this.productoExistenciasDisponibles = false;
    } else {
      console.log('Puede seguir aumentando (Si hay mas stock)');
      this.productoExistenciasDisponibles = true;
    }

  }


}
