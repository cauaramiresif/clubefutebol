//importar o Model
import Jogador from '../models/jogador.js'
import Clube from '../models/clube.js'

export default class JogadorController{

    constructor(caminhoBase='jogador/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            const resultado = await Clube.find({});
            res.render(caminhoBase + "add", {
                Clubes: resultado})
        }
        this.add = async(req, res)=>{
            //cria o Aluno

             let jclube = null;
                if(req.body.clube != null) {
                jclube = await Clube.findById(req.body.clube)
            }

            await Jogador.create({
                nome: req.body.nome,
                camisa:req.body.camisa,
                localNascimento:req.body.localNascimento,
                clube:jclube,
                posicao:req.body.posicao,
                foto:req.file.buffer
            });

            res.redirect('/'+caminhoBase + 'add');
        }
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

         this.openEdt = async(req, res)=>{
    const resultado = await Jogador.findById(req.params.id);
    const jclubes = await Clube.find({});

    res.render(caminhoBase + 'edt', {
        Jogador: resultado,
        Clubes: jclubes
    });
}


        this.edt = async(req, res)=>{
            var jclube = null;
            if(req.body.clube!=null)
            {
            jclube = await Clube.findById(req.body.clube)
            }
            await Jogador.findByIdAndUpdate(req.params.id, {
            nome:req.body.nome,
            camisa:req.body.camisa,
            localNascimento:req.body.localNascimento,
            clube:jclube,
            posicao:req.body.posicao
       
    })

                    if(req.file){
                        req.body.foto = req.file.buffer
                        }
        
                await Jogador.findByIdAndUpdate(req.params.id, req.body)
                    res.redirect('/'+caminhoBase + 'lst');
                    }

         this.del = async(req, res)=>{
        await Jogador.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

    }
}