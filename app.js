import express from 'express';
import { join } from "path"; 
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { pool, initializeDB } from './config/db.js';
import { fileURLToPath } from 'url';
import authRouter from './routes/auth.routes.js';
import notesRouter from './routes/notes.routes.js';
dotenv.config();
import expressLayouts from 'express-ejs-layouts';
const app = express();

// Configuración de vistas
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(join('public')));
app.use(cookieParser());
app.use(morgan('dev'));


// Rutas
app.use('/', authRouter);
app.use('/notes', notesRouter);

// Inicializar base de datos y servidor
initializeDB().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});