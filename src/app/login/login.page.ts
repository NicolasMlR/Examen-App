import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'; // Importamos Router
import { ApiService } from '../services/api.service'; // Asegúrate de que ApiService esté correctamente importado

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginProfePage {
  username: string = '';
  password: string = '';

  constructor(
    private alertController: AlertController, 
    private router: Router,
    private apiService: ApiService // Inyectamos ApiService para obtener los datos de la API
  ) {}

  // Método para validar las credenciales
  async login() {
    try {
      // Obtenemos los profesores y estudiantes desde la API
      this.apiService.getProfesores().subscribe((profesores: any[]) => {
        console.log('Profesores obtenidos:', profesores); // Verifica la respuesta del API

        // Compara las credenciales de manera normalizada (minusculas, sin espacios)
        const profeValido = profesores.find(
          (profe) => 
            profe.usuario.trim().toLowerCase() === this.username.trim().toLowerCase() && 
            profe.contrasena.trim() === this.password.trim()
        );

        if (profeValido) {
          // Si es un profesor válido
          console.log('Profesor válido', profeValido);
          this.showAlert('Bienvenido Profesor', `Ingreso exitoso como ${this.username}`);
          localStorage.setItem('usuario', this.username);
          localStorage.setItem('rol', 'profesor'); // Guardamos el rol como 'profesor'
          this.router.navigate(['/dashboard-profesor']);
        } else {
          // Si no encontramos un profesor con esas credenciales, verificamos como estudiante
          this.apiService.getAlumnos().subscribe((alumnos: any[]) => {
            console.log('Estudiantes obtenidos:', alumnos); // Verifica la respuesta del API

            const estudianteValido = alumnos.find(
              (est) => 
                est.usuario.trim().toLowerCase() === this.username.trim().toLowerCase() && 
                est.contrasena.trim() === this.password.trim()
            );

            if (estudianteValido) {
              console.log('Estudiante válido', estudianteValido);
              this.showAlert('Bienvenido Estudiante', `Ingreso exitoso como ${this.username}`);
              localStorage.setItem('usuario', this.username);
              localStorage.setItem('rol', 'estudiante'); // Guardamos el rol como 'estudiante'
              this.router.navigate(['/dashboard-estudiante']); // Redirige al dashboard del alumno
            } else {
              // Si las credenciales no son válidas en ningún caso
              this.showAlert('Error', 'Usuario o contraseña incorrectos');
            }
          });
        }
      });
    } catch (error) {
      // Si hay un error al hacer la petición
      this.showAlert('Error', 'Hubo un problema al verificar las credenciales');
    }
  }

  // Método para mostrar una alerta
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  // Redirige a la página de restauración de contraseña
  restA() {
    this.router.navigate(['/restaurar-pass']);
  }

  // Redirige al inicio de sesión
  goBack() {
    this.router.navigate(['/home']);
  }
}
