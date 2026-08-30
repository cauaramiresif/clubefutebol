import conexao from '../config/conexao.js'

const Clube = conexao.Schema({
    nome: {type:String, required:true},
    anoFundacao: {type:String, required:true},
    campeonatos: {type:String, required:true},
    nroTitulos: {type:Number, required:true},
    escudo: {type:Buffer, 
        get: (valor) => {
           if (!valor) return null;
             return `data:image/png;base64,${valor.toString('base64')}`;
        }
    }
})

export default conexao.model('Clube',Clube)