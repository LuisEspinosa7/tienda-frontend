import { Marca } from './../../models/Marca';
import { TipoProducto } from './../../models/TipoProducto';
import { MarcaService } from './../../services/marca.service';
import { TipoProductoService } from './../../services/tipo-producto.service';
import { Producto } from './../../models/Producto';
import { ProductoService } from './../../services/producto.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GLOBAL } from './../../models/global';
import swal from 'sweetalert2';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.scss']
})
export class AgregarProductoComponent implements OnInit {

  titulo: string = 'Adicionar Producto';
  adicionarFormGroup: FormGroup;
  nombreModulo: string = GLOBAL.nombreModuloProductos;

  tiposProductosJSON: TipoProducto[] = [];
  marcasJSON: Marca[] = [];

  valorTipoPromocionActual: number;
  valorMarcaActual: number;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private _productoService: ProductoService,
    private _tipoProductoService: TipoProductoService,
    private _marcaService: MarcaService) { }

  ngOnInit() {
    console.log('Iniciando agregar component');
    this.getTiposProductos();
    this.getMarcas();
    this.iniciarFormularioAdicionar();
  }


  iniciarFormularioAdicionar() {
    console.log('Iniciando Formulario para adicionar');

    this.adicionarFormGroup = this.formBuilder.group({
      codigo: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(15)])],
      tipoProducto: [null, Validators.compose([Validators.required])],
      marca: [null, Validators.compose([Validators.required])],
      nombre: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
      descripcion: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(90)])]
    })

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


  confirmarAdicion() {
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
        this.adicionar();
      }
    })
  }


  adicionar() {
    console.log('Adicionando...');

    console.log(this.adicionarFormGroup);

    //new TipoProducto(this.adicionarFormGroup.controls['tipoProducto'].value, null, null, null),

    let objetoProcesado: Producto = new Producto(
      null,
      this.adicionarFormGroup.controls['codigo'].value,
      new TipoProducto(this.valorTipoPromocionActual, null, null, null),
      new Marca(this.valorMarcaActual, null, null, null),
      this.adicionarFormGroup.controls['nombre'].value,
      this.adicionarFormGroup.controls['descripcion'].value,
      GLOBAL.cantidadInicialProducto,
      GLOBAL.estadoActivo);

    console.log('Objeto');
    console.log(objetoProcesado);

    this._productoService.adicionar(objetoProcesado)
      .subscribe(
        response => {
          console.log(response);

          if (response.code === 200) {
            console.log('Se creo correctamente');
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

  cambioTipoProducto(evento){ 
    console.log('Dentro de cambio tipo producto ...');
    console.log(evento.target.value);
    this.valorTipoPromocionActual = evento.target.value; 
  }

  cambioMarca(evento){ 
    console.log('Dentro de cambio marca ...');
    console.log(evento.target.value);
    this.valorMarcaActual = evento.target.value; 
  }

}
