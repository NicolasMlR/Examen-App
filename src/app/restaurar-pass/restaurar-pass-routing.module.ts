import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurarPassPage } from './restaurar-pass.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurarPassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurarPassPageRoutingModule {}
