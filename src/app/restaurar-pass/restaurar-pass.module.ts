import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurarPassPageRoutingModule } from './restaurar-pass-routing.module';

import { RestaurarPassPage } from './restaurar-pass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurarPassPageRoutingModule
  ],
  declarations: [RestaurarPassPage]
})
export class RestaurarPassPageModule {}
