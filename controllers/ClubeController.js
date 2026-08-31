//importar o Model
import Clube from '../models/clube.js'

export default class ClubeController{

    constructor(caminhoBase='clube/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }
        this.add = async(req, res)=>{
            //cria o Aluno

            await Clube.create({
                nome: req.body.nome,
                anoFundacao:req.body.anoFundacao,
                campeonatos:req.body.campeonatos,
                nroTitulos:req.body.nroTitulos,
                escudo:req.file.buffer
            });

            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Clube.find({})
            res.render(caminhoBase + 'lst', {Clubes:resultado})
        }
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await 
            Clube.find({ nome: { $regex: filtro,
                $options: "i" }})
            res.render(caminhoBase + 'lst', {Clubes:resultado})
        }

     

         this.openEdt = async(req, res)=>{
            //passar quem eu quero editar
            const id = req.params.id
            console.log(id)
            const clube = await Clube.findById(id) 
            console.log(Clube)
            res.render(caminhoBase + "edt", 
                {Clube:clube})
        }


        this.edt = async(req, res)=>{
            if(req.file){
                req.body.escudo = req.file.buffer
                }

        await Clube.findByIdAndUpdate(req.params.id, req.body)
            res.redirect('/'+caminhoBase + 'lst');
            }

        this.del = async(req, res)=>{
        await Clube.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

    }
}