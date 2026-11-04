import express from 'express';
const router = express.Router();
import JogadorController from '../controllers/JogadorController.js'
const controle = new JogadorController();
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });

const caminhobase = 'jogador/'

router.get('/' + caminhobase + 'lst', controle.list)
router.post('/' + caminhobase + 'lst', controle.find)

export default router