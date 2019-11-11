import { Producto } from './../models/Producto';
import { Injectable } from '@angular/core';

import { GLOBAL } from './../models/global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable()
export class ProductoService {

  private urlApi = GLOBAL.urlBackend + '/producto/';

  constructor(private http: HttpClient) { }

  cargarDisponibles(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.get(this.urlApi + '/disponibles', {headers});
  }

  adicionar(producto: Producto): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.urlApi, producto, { headers });
  }

  delete(codigo): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.delete(this.urlApi + codigo, {headers});
  }  

  modificar(producto: Producto): Observable<any> {
    let headers =  new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.put(this.urlApi, producto, {headers});
  }

  obtenerXID(id: string): Observable<any> {
    let headers =  new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.get(this.urlApi + id, {headers});
  }
  
}
