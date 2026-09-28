//importar o Model
import Clube from '../models/clube.js'
import Campeonato from '../models/campeonato.js'

export default class ClubeController{

    constructor(caminhoBase='clube/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            const resultado = await Campeonato.find({});
            res.render(caminhoBase + "add", {
                Campeonatos: resultado})
        }
        this.add = async(req, res)=>{
            //cria o Aluno

             let ccampeonato = null;
                if(req.body.campeonato != null) {
                ccampeonato = await Campeonato.findById(req.body.campeonato)
            }            

            await Clube.create({
                nome: req.body.nome,
                anoFundacao:req.body.anoFundacao,
                campeonatos:ccampeonato,
                nroTitulos:req.body.nroTitulos,
                escudo:req.file.buffer
            });

            res.redirect('/'+caminhoBase + 'add');
        }
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

     

         this.openEdt = async(req, res)=>{
    const resultado = await Clube.findById(req.params.id);
    const ccampeonato = await Campeonato.find({});

    res.render(caminhoBase + 'edt', {
        Clube: resultado,
        Campeonatos: ccampeonato
    });
}


        this.edt = async(req, res)=>{
            var ccampeonato = null;
            if(req.body.campeonato!=null)
            {
            ccampeonato = await Campeonato.findById(req.body.campeonato)
            }
            await Clube.findByIdAndUpdate(req.params.id, {
            nome: req.body.nome,
            anoFundacao:req.body.anoFundacao,
            campeonatos:ccampeonato,
            nroTitulos:req.body.nroTitulos
       
    })

                    if(req.file){
                        req.body.foto = req.file.buffer
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