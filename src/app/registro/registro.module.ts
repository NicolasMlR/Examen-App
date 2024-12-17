import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegistroPageRoutingModule } from './registro-routing.module';
import { RegistroPage } from './registro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroPageRoutingModule  // Asegúrate de que el routing module esté importado
  ],
  declarations: [RegistroPage],
  exports: [RegistroPage]  // Exportar el componente para que se pueda usar en otros módulos
})
export class RegistroPageModule {}
