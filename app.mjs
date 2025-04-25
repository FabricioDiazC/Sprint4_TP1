import express from 'express';
import { connectDB } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import expressLayouts from 'express-ejs-layouts';

const app = express();
const PORT = process.env.PORT || 3000;


// Obtener la ruta absoluta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar la carpeta de vistas
app.set('views', path.join(__dirname, 'views'));

//Configuracion de EJS como motor de vistas de la aplicacion
app.set('view engine', 'ejs');
//Configurar EJS como motor de plantillas
app.set('views', path.resolve('./views'));

//Configurar express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layout'); // Archivo base de layout

//Servir archivos estáticos
app.use(express.static(path.resolve('./public')));

//Middleware para parsear JSON
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.json());

//Conexion a MongoDB
connectDB();

//Ruta principal
app.get('/', (req, res) => {
    res.render('index', { title: 'Página Principal' });
});

// Ruta para la página Acerca de
app.get('/about', (req, res) => {
    res.render('about', { title: 'Acerca de Nosotros' });
});

// Ruta para la página de Contacto
app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contáctanos' });
});

//Configuracion de rutas
app.use('/api', superHeroRoutes);

//Manejo de errores para rutas no encontradas
app.use((req, res) => {
    res.status(404).send({mensaje: "Ruta no encontrada"});
    
});

//Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

