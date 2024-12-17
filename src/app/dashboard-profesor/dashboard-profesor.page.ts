import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router'; // Importamos el Router


@Component({
  selector: 'app-dashboard-profesor',
  templateUrl: './dashboard-profesor.page.html',
  styleUrls: ['./dashboard-profesor.page.scss'],
})
export class DashboardProfesorPage implements OnInit {
  mostrarClase = false;  // Variable para mostrar/ocultar las clases
  alumnoSeleccionado: string = '';  // Almacenamos el alumno seleccionado
  nombreAlumnoSeleccionado: string = '';  // Almacenamos el nombre del alumno seleccionado
  clase: string = 'ingles';  // La clase que seleccionó el profesor (en este caso Inglés)
  
  alumnos: any[] = []; // Lista de alumnos registrada en la base de datos
  asistencia: any[] = []; // Asistencia de los 15 días del alumno seleccionado

  constructor(private apiService: ApiService, private router: Router) {}  // Inyectamos ApiService

  ngOnInit() {
    this.cargarAlumnos();
  }

  // Cargar lista de alumnos desde la API
  cargarAlumnos() {
    this.apiService.getAlumnos().subscribe(
      (data) => {
        this.alumnos = data;  // Asignamos los datos de los alumnos a la variable
      },
      (error) => {
        console.error('Error al cargar los alumnos', error);  // Manejo de errores
      }
    );
  }

  // Esta es la función que se ejecuta cuando se hace clic en la tarjeta de la clase
  verClase() {
    this.mostrarClase = !this.mostrarClase;  // Al hacer clic, mostramos la lista de alumnos
  }

  // Seleccionar un alumno y cargar su asistencia
  seleccionarAlumno(alumnoId: string) {
    this.alumnoSeleccionado = alumnoId;
    const alumno = this.alumnos.find(a => a.id === alumnoId);
    this.nombreAlumnoSeleccionado = alumno ? alumno.usuario : '';  // Asignamos el nombre del alumno seleccionado
    this.cargarAsistencia(alumnoId);  // Cargamos la asistencia de este alumno
  }

  // Cargar la asistencia del alumno desde el localStorage
  cargarAsistencia(alumnoId: string) {
    const asistenciaGuardada = JSON.parse(localStorage.getItem('asistenciaAlumnos') || '[]');
    const asistenciaAlumno = asistenciaGuardada.find((asistencia: any) => asistencia.alumnoId === alumnoId);

    if (asistenciaAlumno) {
      this.asistencia = asistenciaAlumno.clases;  // Asignamos la asistencia del alumno
    } else {
      this.asistencia = [];  // Si no hay asistencia registrada, mostramos una lista vacía
    }
  }

  // Modificar la asistencia de un día
  modificarAsistencia(index: number, valor: boolean | null) {
    this.asistencia[index].asistio = valor;  // Actualizamos el valor de asistencia
  }

  // Guardar la asistencia (simulada)
  guardarAsistencia() {
    // Actualizamos la asistencia guardada en localStorage
    const asistenciaGuardada = JSON.parse(localStorage.getItem('asistenciaAlumnos') || '[]');
    const index = asistenciaGuardada.findIndex((a: any) => a.alumnoId === this.alumnoSeleccionado);

    if (index !== -1) {
      asistenciaGuardada[index].clases = this.asistencia;  // Actualizamos la asistencia del alumno
    } else {
      // Si no existe, agregamos una nueva entrada
      asistenciaGuardada.push({
        alumnoId: this.alumnoSeleccionado,
        clases: this.asistencia,
        fechaGeneracion: new Date()
      });
    }

    // Guardamos la asistencia actualizada en localStorage
    localStorage.setItem('asistenciaAlumnos', JSON.stringify(asistenciaGuardada));

    console.log('Asistencia guardada:', this.asistencia);  // Simulamos el guardado
  }
  regresar() {
    this.router.navigate(['/login']);  // Redirige a la página de login
  }
}
