import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // La URL base de tu API
  private apiUrl = 'http://localhost:3000'; // URL del backend Express

  constructor(private http: HttpClient) {}

  // Obtener todos los profesores
  getProfesores() {
    // Usar la apiUrl definida para obtener los profesores
    return this.http.get<any[]>(`${this.apiUrl}/profesores`);
  }
  
  // Obtener todos los estudiantes
  getAlumnos(){
    return this.http.get<any[]>(`${this.apiUrl}/alumnos`);
  }

  // Agregar un nuevo alumno
  addAlumno(alumno: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/alumnos`, alumno);
  }

  // Agregar un nuevo profesor
  addProfesor(profesor: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/profesores`, profesor);
  }
}
