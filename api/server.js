const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json()); // Para leer datos JSON enviados en las peticiones

// Ruta para obtener los alumnos
app.get('/alumnos', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./api/db.json')); // Leer el archivo db.json
  res.json(data.alumnos); // Enviar los datos de los alumnos
});

// Ruta para obtener los profesores
app.get('/profesores', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./api/db.json')); // Leer el archivo db.json
  res.json(data.profesores); // Enviar los datos de los profesores
});

// Ruta para agregar un nuevo alumno
app.post('/alumnos', (req, res) => {
  const newAlumno = req.body; // Obtener los datos enviados en el cuerpo de la petición
  const data = JSON.parse(fs.readFileSync('./api/db.json')); // Leer el archivo db.json
  const id = (data.alumnos.length + 1).toString(); // Generar un nuevo ID basado en el número de alumnos existentes
  newAlumno.id = id; // Asignar el nuevo ID al alumno
  data.alumnos.push(newAlumno); // Agregar el nuevo alumno al arreglo de alumnos
  fs.writeFileSync('./api/db.json', JSON.stringify(data, null, 2)); // Escribir los datos actualizados en db.json
  res.status(201).json(newAlumno); // Enviar respuesta con el nuevo alumno creado
});

// Ruta para agregar un nuevo profesor
app.post('/profesores', (req, res) => {
  const newProfesor = req.body; // Obtener los datos enviados en el cuerpo de la petición
  const data = JSON.parse(fs.readFileSync('./api/db.json')); // Leer el archivo db.json
  const id = (data.profesores.length + 1).toString(); // Generar un nuevo ID basado en el número de profesores existentes
  newProfesor.id = id; // Asignar el nuevo ID al profesor
  data.profesores.push(newProfesor); // Agregar el nuevo profesor al arreglo de profesores
  fs.writeFileSync('./api/db.json', JSON.stringify(data, null, 2)); // Escribir los datos actualizados en db.json
  res.status(201).json(newProfesor); // Enviar respuesta con el nuevo profesor creado
});

// Iniciar el servidor en el puerto 3000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
