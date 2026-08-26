//importar o Model
import tecnico from '../models/tecnico.js'

export default class TecnicoController{

    constructor(caminhoBase='tecnico/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }
        this.add = async(req, res)=>{
            //cria o Aluno
           
            await Tecnico.create({
                nome: req.body.nome,
                localNascimento:req.body.localNascimento,
                clube:req.body.clube,
                foto:req.body.foto
            });
            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Tecnico.find({})
            res.render(caminhoBase + 'lst', {Tecnicos:resultado})
        }
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await 
            Tecnico.find({ nome: { $regex: filtro,
                $options: "i" }})
            res.render(caminhoBase + 'lst', {Tecnicos:resultado})
        }

     

         this.openEdt = async(req, res)=>{
            //passar quem eu quero editar
            const id = req.params.id
            console.log(id)
            const tecnico = await Tecnico.findById(id) 
            console.log(tecnico)
            res.render(caminhoBase + "edt", 
                {Tecnico:tecnico})
        }


        this.edt = async(req, res)=>{
        await Tecnico.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

         this.del = async(req, res)=>{
        await Tecnico.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

    }
}