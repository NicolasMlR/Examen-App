import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardEstudiantePageRoutingModule } from './dashboard-estudiante-routing.module';

import { DashboardEstudiantePage } from './dashboard-estudiante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardEstudiantePageRoutingModule
  ],
  declarations: [DashboardEstudiantePage]
})
export class DashboardEstudiantePageModule {}
