import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardsRoutes } from './dashboards.routing';
import { DataTablesModule } from 'angular-datatables';

import { Dashboard1Component } from './dashboard1/dashboard1.component';
//import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DataTablesModule,
    RouterModule.forChild(DashboardsRoutes)
  ],
  declarations: [Dashboard1Component]
})
export class DashboardsModule {}