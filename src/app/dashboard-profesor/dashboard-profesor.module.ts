import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardProfesorPageRoutingModule } from './dashboard-profesor-routing.module';

import { DashboardProfesorPage } from './dashboard-profesor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardProfesorPageRoutingModule
  ],
  declarations: [DashboardProfesorPage]
})
export class DashboardProfesorPageModule {}
