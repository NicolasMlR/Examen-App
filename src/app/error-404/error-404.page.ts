// error-404.page.ts
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular'; // Importamos AlertController
import { Router } from '@angular/router'; // Para navegar a otras páginas

@Component({
  selector: 'app-error-404',
  templateUrl: './error-404.page.html',
  styleUrls: ['./error-404.page.scss'],
})
export class Error404Page {

  constructor(
    private alertController: AlertController, // Inyectamos AlertController
    private router: Router // Inyectamos Router para redirigir
  ) {}

  // Mostrar alerta al cargar la página
  async ngOnInit() {
    const alert = await this.alertController.create({
      header: 'Error 404',
      message: 'Página no encontrada',
      buttons: ['OK']
    });

    await alert.present();
  }

  // Redirigir al usuario a la página de inicio
  goHome() {
    this.router.navigate(['/home']);
  }
}
