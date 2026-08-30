import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import routes from './routes/route.js'; // rotas externas
import campeonatoRoutes from './routes/CampeonatoRoutes.js'; // rotas externas
import clubeRoutes from './routes/ClubeRoutes.js'; // rotas externas
import jogadorRoutes from './routes/JogadorRoutes.js'; // rotas externas
import tecnicoRoutes from './routes/TecnicoRoutes.js'; // rotas externas

const PORT = 3000
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Caminho correto das views e public
const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

// Servir arquivos estáticos
app.use(express.static(join(__dirname, '/public')));
app.set('views', join(__dirname, '/views'));

// Rotas
app.use(campeonatoRoutes)
app.use(clubeRoutes)
app.use(jogadorRoutes)
app.use(tecnicoRoutes)
app.use(routes)
app.listen(PORT, ()=>{
 console.log(
    `Servidor rodando em http://localhost:${PORT}`)
});
// Exporta o handler compatível com Vercel
export default app;