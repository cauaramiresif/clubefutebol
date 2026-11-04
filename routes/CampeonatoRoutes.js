import express from 'express';
const router = express.Router();
import CampeonatoController from '../controllers/CampeonatoController.js'
const controle = new CampeonatoController();

const caminhobase = 'campeonato/'

router.get('/' + caminhobase + 'lst', controle.list)
router.post('/' + caminhobase + 'lst', controle.find)
export default router