import express from 'express';
const router = express.Router();
import ClubeController from '../controllers/ClubeController.js'
const controle = new ClubeController();
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });

const caminhobase = 'clube/'

router.get('/' + caminhobase + 'lst', controle.list)
router.post('/' + caminhobase + 'lst', controle.find)

export default router