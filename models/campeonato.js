import conexao from '../config/conexao.js'

const Campeonato = conexao.Schema({
    nome: {type:String, required:true},
    pais: {type:String, required:true}
})

export default conexao.model('Campeonato',Campeonato)