import express from 'express';
const router = express.Router();
import controller from '../controllers/controller.js'
const controle = new controller();
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', controle.home)
router.get('/teste', controle.teste)
router.post('/formulario', controle.formulario)
export default router