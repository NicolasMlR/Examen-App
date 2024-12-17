import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';  // Importar ApiService
import { Router } from '@angular/router'; // Importamos el Router


interface Clase {
  fecha: string;
  asistio: boolean | null;
}

@Component({
  selector: 'app-dashboard-estudiante',
  templateUrl: './dashboard-estudiante.page.html',
  styleUrls: ['./dashboard-estudiante.page.scss'],
})
export class DashboardEstudiantePage implements OnInit {
  mostrarClase = false;  // Variable para mostrar/ocultar las clases
  usuario: string = '';  // El usuario debe obtenerse del login (localStorage, servicio de autenticación, etc.)
  clases: Clase[] = []; // Para almacenar las clases generadas
  alumnos: any[] = []; // Lista de alumnos obtenida de la API
  asistenciaAlumno: any; // Asistencia del alumno específico

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.usuario = this.obtenerUsuarioLogueado();  // Obtener el usuario desde el almacenamiento local o servicio de login
    this.cargarAlumnos();
  }

  // Obtener el nombre de usuario del sistema de autenticación o del localStorage
  obtenerUsuarioLogueado(): string {
    // Simulación de obtener el nombre del usuario desde el localStorage o desde un servicio de autenticación
    return localStorage.getItem('usuario') || '';  // Asume que el usuario logueado se guarda en localStorage
  }

  // Obtener la lista de alumnos desde la API
  cargarAlumnos() {
    this.apiService.getAlumnos().subscribe(
      (data) => {
        this.alumnos = data; // Guardamos los alumnos en la variable
        this.generarAsistenciaParaAlumno();  // Generamos la asistencia solo para el alumno actual
      },
      (error) => {
        console.error('Error al cargar los alumnos:', error);
      }
    );
  }

  // Generar la asistencia solo para el alumno que ha iniciado sesión, solo una vez
  generarAsistenciaParaAlumno() {
    const today = new Date();

    // Buscar al alumno que ha iniciado sesión (usamos 'this.usuario' para obtener al alumno logueado)
    const alumno = this.alumnos.find(a => a.usuario === this.usuario);

    if (alumno) {
      // Verificar si ya existe la asistencia de este alumno en localStorage
      const storedAsistencia = localStorage.getItem('asistenciaAlumnos');
      let asistencia = storedAsistencia ? JSON.parse(storedAsistencia) : [];

      // Eliminar la asistencia de cualquier otro alumno que esté guardada en el localStorage
      // Esto asegura que no se mantengan las asistencias de otros usuarios cuando se hace login
      asistencia = asistencia.filter((a: any) => a.alumnoId === alumno.id);

      // Si no existe asistencia para el alumno, generamos una nueva
      if (asistencia.length === 0) {
        const clases = this.generarClases();
        const nuevaAsistencia = {
          alumnoId: alumno.id,
          alumnoNombre: alumno.usuario,
          clases: clases,
          fechaGeneracion: today
        };

        // Guardamos solo la asistencia del alumno actual en el localStorage
        asistencia.push(nuevaAsistencia); // Añadimos la nueva asistencia para el alumno
        localStorage.setItem('asistenciaAlumnos', JSON.stringify(asistencia)); // Guardamos todas las asistencias en el localStorage
        this.asistenciaAlumno = nuevaAsistencia; // Asignamos la asistencia para mostrarla en el template
      } else {
        // Si ya existe asistencia, usamos la asistencia almacenada para este alumno
        this.asistenciaAlumno = asistencia[0]; // Asignamos la asistencia para mostrarla en el template
      }
    } else {
      console.error('Usuario no encontrado');
    }
  }

  // Generar clases (asistencia) aleatorias para el alumno
  generarClases() {
    const clases: Clase[] = [];
    let currentDate = new Date();
    let counter = 0;

    // Retrocedemos 14 días hábiles (sin contar fines de semana)
    while (counter < 14) {
      currentDate.setDate(currentDate.getDate() - 1);
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) { // Excluir sábado (6) y domingo (0)
        clases.push({
          fecha: this.formatDate(currentDate),
          asistio: Math.random() < 0.5 // Aleatorio: 50% posibilidad de haber asistido
        });
        counter++;
      }
    }

    // El día 15 será el que podrá ser modificado por el profesor
    clases.push({
      fecha: this.formatDate(new Date()), // Día 15 es el día actual
      asistio: null // El día 15 es pendiente
    });

    // Ordenamos las clases de menor a mayor (de la fecha más antigua a la más reciente)
    clases.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

    return clases;
  }

  // Formatear la fecha de las clases
  formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const dayOfWeek = date.toLocaleString('default', { weekday: 'long' });

    return `${dayOfWeek}, ${day}/${month}/${year}`;
  }

  regresar() {
    this.router.navigate(['/login']);  // Redirige a la página de login
  }
  // Función para mostrar/ocultar las clases
  verClase() {
    this.mostrarClase = !this.mostrarClase;  // Alterna el valor de mostrarClase
  }

}
