//importar o Model
import jogador from '../models/jogador.js'

export default class JogadorController{

    constructor(caminhoBase='jogador/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }
        this.add = async(req, res)=>{
            //cria o Aluno
            
            app.post('/jogador/add/ok',upload.single('foto'), async (req, res) => {

            await Jogador.create({
                nome: req.body.nome,
                camisa:req.body.camisa,
                localNascimento:req.body.localNascimento,
                clube:req.body.clube,
                posicao:req.body.posicao,
                foto:req.body.foto
            });
            res.render("jogador/addok" )
})
            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Jogador.find({})
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
            //passar quem eu quero editar
            const id = req.params.id
            console.log(id)
            const jogador = await Jogador.findById(id) 
            console.log(jogador)
            res.render(caminhoBase + "edt", 
                {Jogador:jogador})
        }


        this.edt = async(req, res)=>{
        await Jogador.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

         this.del = async(req, res)=>{
        await Jogador.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

    }
}