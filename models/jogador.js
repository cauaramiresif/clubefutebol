import conexao from '../config/conexao.js'

const Jogador = conexao.Schema({
    nome: {type:String, required:true},
    camisa: {type:Number, required:true},
    localNascimento: {type:String, required:true},
    clube: {type:String, required:true},
    posicao: {type:String, required:true},
    foto: {type:Buffer, 
        get: (valor) => {
           if (!valor) return null;
             return `data:image/png;base64,${valor.toString('base64')}`;
        }
    }
})

export default conexao.model('Jogador',Jogador)