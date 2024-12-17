import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; 
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  public nombreUsuario: string = '';
  public correo: string = ''; 
  public contrasena: string = '';
  public trato: boolean = false;
  
  constructor(private navCtrl: NavController,private router: Router,private alertController: AlertController) {}

  iniciarSesion() {
    if (this.nombreUsuario && this.correo && this.contrasena) {
      this.navCtrl.navigateForward(['/ingreso-usuario'], { 
        queryParams: { nombreUsuario: this.nombreUsuario }
      });
    } else {
      alert('Por favor ingresa todos los datos: nombre de usuario, correo y contraseña');
    }
  }

  voyB() {
    this.navCtrl.navigateForward('/login');
  }

  irARestablecerContrasena() {                        
    this.navCtrl.navigateForward(['/restablecer-contrasena']);
  }

  generateQRCode() {
    const canvas = document.getElementById('qrCanvas') as HTMLCanvasElement | null;
  
    if (canvas) {
      // Dirección IP de la máquina en la red local
      const ipLocal = '192.168.61.1'; // Sustituye esto por tu IP local
      const qrURL = `http://${ipLocal}:4200/home`;  // Usamos la IP en lugar de localhost
  
      QRCode.toCanvas(canvas, qrURL, function (error: any) {
        if (error) {
          console.error('Error al generar el código QR:', error);
        } else {
          console.log('Código QR generado con éxito');
        }
      });
    } else {
      console.error('No se encontró el canvas');
    }
  }
  
  

  errorSimulado() {
    this.router.navigate(['/error-404']);
  }

  registrarse() {
    this.router.navigate(['/registro']);  // Aquí deberías usar la ruta que apunte a tu página de registro
  }
}
