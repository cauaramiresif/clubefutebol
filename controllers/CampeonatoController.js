//importar o Model
import campeonato from '../models/campeonato.js'

export default class CampeonatoController{

    constructor(caminhoBase='campeonato/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }
        this.add = async(req, res)=>{
            //cria o Aluno
           
            await Campeonato.create({
                nome: req.body.nome,
                pais:req.body.pais
            });
            res.redirect('/'+caminhoBase + 'add');
        }
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

     

         this.openEdt = async(req, res)=>{
            //passar quem eu quero editar
            const id = req.params.id
            console.log(id)
            const campeonato = await Campeonato.findById(id) 
            console.log(campeonato)
            res.render(caminhoBase + "edt", 
                {Campeonato:campeonato})
        }


        this.edt = async(req, res)=>{
        await Campeonato.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

         this.del = async(req, res)=>{
        await Campeonato.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

    }
}