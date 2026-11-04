//importar o Model
import Clube from '../models/clube.js'
import Campeonato from '../models/campeonato.js'

export default class ClubeController{

    constructor(caminhoBase='clube/'){
        this.caminhoBase = caminhoBase
    
        this.list = async(req, res)=>{
            const resultado = await Clube.find({}) .populate('campeonatos');
            res.render(caminhoBase + 'lst', {Clubes:resultado})
        }
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await 
            Clube.find({ nome: { $regex: filtro,
                $options: "i" }})
            res.render(caminhoBase + 'lst', {Clubes:resultado})
        }
    }
}