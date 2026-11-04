
//importar os Models
import Clube from '../models/clube.js'
import Campeonato from '../models/campeonato.js'
import Jogador from '../models/jogador.js'
import Tecnico from '../models/tecnico.js'

 export default class GeralController {
 
    constructor() {
        this.home = async (req, res) => {
          const [clubes, campeonatos, jogadores, tecnicos] = await Promise.all([
            Clube.find({}).sort({ _id: -1 }).limit(6).populate('campeonatos'),
            Campeonato.find({}).sort({ _id: -1 }).limit(6),
            Jogador.find({}).sort({ _id: -1 }).limit(6).populate('clube'),
            Tecnico.find({}).sort({ _id: -1 }).limit(6).populate('clube')
          ]);

          res.render('index', {
            tituloPagina: 'Início',
            Clubes: clubes,
            Campeonatos: campeonatos,
            Jogadores: jogadores,
            Tecnicos: tecnicos
          })
        };

        // Telas de acesso apenas ilustrativas: nenhuma credencial é verificada ou salva.
        this.login = async (req, res) => {
          res.render('usuario/login', { tituloPagina: 'Entrar' })
        };

        this.cadastro = async (req, res) => {
          const clubes = await Clube.find({}).sort({ nome: 1 });
          res.render('usuario/cadastro', {
            tituloPagina: 'Criar conta',
            Clubes: clubes
          })
        };

        this.teste = async (req, res) => {
          const resultado = "teste";
          res.render('index2',{teste: resultado});
        };

        this.formulario = async (req, res) => {
          res.render('index')
        };

    }
 }

