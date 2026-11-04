//importar o Model
import Jogador from '../models/jogador.js'
import Clube from '../models/clube.js'

export default class JogadorController{

    constructor(caminhoBase='jogador/'){
        this.caminhoBase = caminhoBase
    
        this.list = async(req, res)=>{
            const resultado = await Jogador.find({}) .populate('clube');
            res.render(caminhoBase + 'lst', {Jogadores:resultado})
        }
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await 
            Jogador.find({ nome: { $regex: filtro,
                $options: "i" }})
            res.render(caminhoBase + 'lst', {Jogadores:resultado})
        }
    }
}