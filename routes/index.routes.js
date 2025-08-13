// Importa el framework Express para crear rutas
import express from 'express';
// Importa las funciones controladoras desde el archivo index.controller.js
import {index, index2} from '../controllers/index.controller.js';
// Crea un enrutador de Express
const router = express.Router();

// Define una ruta GET para '/' que ejecutará la función index
router.get('/', index);
// Define una ruta GET para '/2' que ejecutará la función index2
router.get('/2', index2);

// Exporta el enrutador para ser usado en otros archivos
export default router;