//importar o Model
import Campeonato from '../models/campeonato.js'

export default class CampeonatoController{

    constructor(caminhoBase='campeonato/'){
        this.caminhoBase = caminhoBase
    
        this.list = async(req, res)=>{
            const resultado = await Campeonato.find({})
            res.render(caminhoBase + 'lst', {Campeonatos:resultado})
        }
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await 
            Campeonato.find({ nome: { $regex: filtro,
                $options: "i" }})
            res.render(caminhoBase + 'lst', {Campeonatos:resultado})
        }
    }
}