import express from 'express';
const router = express.Router();
import controller from '../controllers/controller.js'
const controle = new controller();

router.get('/', controle.home)
router.get('/login', controle.login)
router.get('/cadastro', controle.cadastro)
router.get('/teste', controle.teste)
router.post('/formulario', controle.formulario)
export default router