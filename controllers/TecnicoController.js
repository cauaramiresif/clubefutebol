//importar o Model
import Tecnico from '../models/tecnico.js'
import Clube from '../models/clube.js'

export default class TecnicoController{

    constructor(caminhoBase='tecnico/'){
        this.caminhoBase = caminhoBase
    
        this.list = async(req, res)=>{
            const resultado = await Tecnico.find({}) .populate('clube');
            res.render(caminhoBase + 'lst', {Tecnicos:resultado})
        }
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await 
            Tecnico.find({ nome: { $regex: filtro,
                $options: "i" }})
            res.render(caminhoBase + 'lst', {Tecnicos:resultado})
        }
    }
}