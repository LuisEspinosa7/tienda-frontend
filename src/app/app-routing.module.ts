import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './layouts/landing/landing.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [      
      {
        path: '',
        loadChildren: './dashboards/dashboards.module#DashboardsModule'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
