import conexao from '../config/conexao.js'

const Jogador = conexao.Schema({
    nome: {type:String, required:true},
    camisa: {type:Number, required:true},
    localNascismento: {type:String, required:true},
    clube: {type:String, required:true},
    posicao: {type:String, required:true},
    foto: {type:File, required:true}
})

export default conexao.model('Jogador',Jogador)