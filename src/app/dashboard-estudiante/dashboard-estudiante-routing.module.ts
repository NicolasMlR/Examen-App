import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardEstudiantePage } from './dashboard-estudiante.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardEstudiantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardEstudiantePageRoutingModule {}
