import conexao from '../config/conexao.js'

const Clube = conexao.Schema({
    nome: {type:String, required:true},
    anoFundacao: {type:String, required:true},
    campeonatos: {type:String, required:true},
    nroTitulos: {type:Number, required:true},
    escudo: {type:File, required:true}
})

export default conexao.model('Clube',Clube)