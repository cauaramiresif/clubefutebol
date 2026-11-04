import express from 'express';
const router = express.Router();
import TecnicoController from '../controllers/TecnicoController.js'
const controle = new TecnicoController();
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });

const caminhobase = 'tecnico/'

router.get('/' + caminhobase + 'lst', controle.list)
router.post('/' + caminhobase + 'lst', controle.find)

export default router