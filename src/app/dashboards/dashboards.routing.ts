import { Routes } from '@angular/router';

import { Dashboard1Component } from './dashboard1/dashboard1.component';
//import { Dashboard2Component } from './dashboard2/dashboard2.component';
//import {Dashboard3Component} from './dashboard3/dashboard3.component';


export const DashboardsRoutes: Routes = [
  {
    path: '',
    children: [
      /** Colocar todos las dashboard disponibles aqui **/
      {
        path: 'dashboard1',
        component: Dashboard1Component       
      },
      
      /** Colocar todos los modulos administrativos aqui **/
      {
        path: 'productos',
        loadChildren: '../productos/productos.module#ProductosModule'
      },
      {
        path: 'movimientos',
        loadChildren: '../movimientos/movimientos.module#MovimientosModule'
      },
    ]
  }
];
