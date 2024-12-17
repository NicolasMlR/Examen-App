import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';  // Importar ApiService
import { AlertController } from '@ionic/angular'; // Para mostrar alertas
import { Router } from '@angular/router'; // Para redirigir al login

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {

  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  userType: 'alumno' | 'profesor' = 'alumno'; // Puede ser alumno o profesor

  constructor(
    private apiService: ApiService,
    private alertController: AlertController,
    private router: Router
  ) {}

  async registrarUsuario() {
    if (this.password !== this.confirmPassword) {
      this.showAlert('Error', 'Las contraseñas no coinciden');
      return;
    }

    const nuevoUsuario = {
      usuario: this.username,
      contrasena: this.password
    };

    try {
      // Registrar como alumno o profesor según el tipo seleccionado
      if (this.userType === 'alumno') {
        await this.apiService.addAlumno(nuevoUsuario).toPromise();
      } else {
        await this.apiService.addProfesor(nuevoUsuario).toPromise();
      }

      this.showAlert('Éxito', `Usuario ${this.username} registrado exitosamente.`);
      this.router.navigate(['/login']); // Redirigir a la página de login
    } catch (error) {
      this.showAlert('Error', 'Hubo un problema al registrar el usuario');
    }
  }

  // Función para mostrar alertas
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  volverA() {
    this.router.navigate(['/home']);
  }
}
