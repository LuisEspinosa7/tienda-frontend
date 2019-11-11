import { Marca } from './../models/Marca';
import { Injectable } from '@angular/core';

import { GLOBAL } from './../models/global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MarcaService {

  private urlApi = GLOBAL.urlBackend + '/marca/';

  constructor(private http: HttpClient) { }

  cargarDisponibles(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.get(this.urlApi + '/disponibles', {headers});
  }

}
