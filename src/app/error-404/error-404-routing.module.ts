import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Error404Page } from './error-404.page';

const routes: Routes = [
  {
    path: '',
    component: Error404Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Error404PageRoutingModule {}
