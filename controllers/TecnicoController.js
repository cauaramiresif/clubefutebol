//importar o Model
import Tecnico from '../models/tecnico.js'

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
                foto:req.file.buffer
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
            console.log(Tecnico)
            res.render(caminhoBase + "edt", 
                {Tecnico:tecnico})
        }


        this.edt = async(req, res)=>{
                    if(req.file){
                        req.body.foto = req.file.buffer
                        }
                
                await Tecnico.findByIdAndUpdate(req.params.id, req.body)
                    res.redirect('/'+caminhoBase + 'lst');
                    }

         this.del = async(req, res)=>{
        await Tecnico.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

    }
}