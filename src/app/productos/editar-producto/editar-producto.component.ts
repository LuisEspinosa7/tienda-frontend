import { Marca } from './../../models/Marca';
import { TipoProducto } from './../../models/TipoProducto';
import { MarcaService } from './../../services/marca.service';
import { TipoProductoService } from './../../services/tipo-producto.service';
import { ProductoService } from './../../services/producto.service';
import { Producto } from './../../models/Producto';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { GLOBAL } from './../../models/global';
import swal from 'sweetalert2';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.scss']
})
export class EditarProductoComponent implements OnInit {

  id: string;
  producto: Producto;

  titulo: string = 'Modificar Producto';
  editarFormGroup: FormGroup;
  nombreModulo: string = GLOBAL.nombreModuloProductos;
  objetoCargado: boolean;

  tiposProductosJSON: TipoProducto[] = [];
  marcasJSON: Marca[] = [];

  valorTipoPromocionActual: number;
  valorMarcaActual: number;

  constructor(
    private _route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private _productoService: ProductoService,
    private _tipoProductoService: TipoProductoService,
    private _marcaService: MarcaService) { }

  ngOnInit() {
    console.log('Inicio el componente');
    this.objetoCargado = false;

    this._route.params.subscribe(params => {
      if (params['id'] != null) {
        this.id = params['id'];
        this.cargarObjeto();
      } else {
        this.router.navigate(['/dashboard/productos/lista']);
      }
    });
    console.log('ID: ' + this.id);
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

            this.valorTipoPromocionActual = this.producto.tipoProducto.id;
            this.valorMarcaActual = this.producto.marca.id;

            //Llenar el formulario
            this.getTiposProductos();
            this.getMarcas();
            this.iniciarFormularioEditar();

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


  iniciarFormularioEditar() {
    console.log('Iniciando Formulario para editar');

    this.editarFormGroup = this.formBuilder.group({
      id: [this.producto.id, Validators.compose([Validators.required])],
      codigo: [this.producto.codigo, Validators.compose([Validators.required])],
      tipoProducto: [this.producto.tipoProducto.id, Validators.compose([Validators.required])],
      marca: [this.producto.marca.id, Validators.compose([Validators.required])],
      nombre: [this.producto.nombre, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
      descripcion: [this.producto.descripcion, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(90)])],
      stock: [this.producto.stock],
      estado: [this.producto.estado, Validators.compose([Validators.required])]
    });

    this.editarFormGroup.controls['id'].disable();
    this.editarFormGroup.controls['codigo'].disable();
    this.editarFormGroup.controls['stock'].disable();

    this.objetoCargado = true;
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


  confirmarEdicion() {
    console.log('Preguntar si esta seguro');

    swal({
      title: 'Confirmacion?',
      text: "¿Esta seguro?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: GLOBAL.primaryColor,
      cancelButtonColor: GLOBAL.accentColor,
      confirmButtonText: 'Si'
    }).then((result) => {

      console.log(result);
      if (result.value) {
        console.log('Confirmo si');
        this.editar();
      }
    })
  }



  editar() {
    console.log('Editando Objeto...');

    console.log(this.editarFormGroup);

    let objetoProcesado: Producto = new Producto(
      this.producto.id,
      this.producto.codigo,
      new TipoProducto(this.valorTipoPromocionActual, null, null, null),
      new Marca(this.valorMarcaActual, null, null, null),
      this.editarFormGroup.controls['nombre'].value,
      this.editarFormGroup.controls['descripcion'].value,
      this.producto.stock,
      this.editarFormGroup.controls['estado'].value);

    console.log('Objeto');
    console.log(objetoProcesado);

    this._productoService.modificar(objetoProcesado)
      .subscribe(
        response => {
          console.log(response);

          if (response.code === 200) {
            console.log('Obtenido');
            this.producto = response.data;
            this.mostrarRespuesta('success', 'Respuesta', response.mensaje, 'Ok');

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
          this.router.navigate(['/dashboard/productos/lista']);
        }
      }
    });
  }

  cambioTipoProducto(evento) {
    console.log('Dentro de cambio tipo producto ...');
    console.log(evento.target.value);
    this.valorTipoPromocionActual = evento.target.value;
  }

  cambioMarca(evento) {
    console.log('Dentro de cambio marca ...');
    console.log(evento.target.value);
    this.valorMarcaActual = evento.target.value;
  }

}
