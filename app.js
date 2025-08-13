// Importa el framework Express para crear el servidor
import express from 'express';
// Importa el enrutador principal desde el archivo index.routes.js
import indexRouter from './routes/index.routes.js';
// Crea una instancia de la aplicación Express
const app = express();

// Configura el puerto en el que escuchará el servidor (3050)
app.set('port', 3050);

// Establece el prefijo '/api' para todas las rutas definidas en indexRouter
app.use('/api', indexRouter);

// Inicia el servidor en el puerto configurado
app.listen(app.get('port'), () => {
  // Mensaje de confirmación cuando el servidor está en funcionamiento
  console.log('Server on port ' + app.get('port'));
});