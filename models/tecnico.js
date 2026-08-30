import conexao from '../config/conexao.js'

const Tecnico = conexao.Schema({
    nome: {type:String, required:true},
    localNascismento: {type:String, required:true},
    clube: {type:String, required:true},
    foto: {type:Buffer, required:true}
})

export default conexao.model('Tecnico',Tecnico)