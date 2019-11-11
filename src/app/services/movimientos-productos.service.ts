import { Injectable } from '@angular/core';


import { GLOBAL } from './../models/global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movimiento } from '../models/Movimiento';

@Injectable()
export class MovimientosProductosService {

  private urlApi = GLOBAL.urlBackend + '/movimiento/';

  constructor(private http: HttpClient) { }

  realizarMovimiento(movimiento: Movimiento): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.urlApi, movimiento, { headers });
  }

}
