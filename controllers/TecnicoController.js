//importar o Model
import Tecnico from '../models/tecnico.js'
import Clube from '../models/clube.js'

export default class TecnicoController{

    constructor(caminhoBase='tecnico/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            const resultado = await Clube.find({});
            res.render(caminhoBase + "add", {
                Clubes: resultado})
        }
        this.add = async(req, res)=>{
            //cria o Aluno

             let tclube = null;
                if(req.body.clube != null) {
                tclube = await Clube.findById(req.body.clube)
            }

            await Tecnico.create({
                nome: req.body.nome,
                localNascimento:req.body.localNascimento,
                clube:tclube,
                foto:req.file.buffer
            });
            
            res.redirect('/'+caminhoBase + 'add');

        }
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

     

         this.openEdt = async(req, res)=>{
    const resultado = await Tecnico.findById(req.params.id);
    const tclubes = await Clube.find({});

    res.render(caminhoBase + 'edt', {
        Tecnico: resultado,
        Clubes: tclubes
    });
}


        this.edt = async(req, res)=>{
            var tclube = null;
            if(req.body.clube!=null)
            {
            tclube = await Clube.findById(req.body.clube)
            }
            await Tecnico.findByIdAndUpdate(req.params.id, {
            nome: req.body.nome,
            localNascimento:req.body.localNascimento,
            clube:tclube
       
    })

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