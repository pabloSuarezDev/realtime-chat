const express = require('express');
const router = express.Router();
const ConversacionController = require('../controllers/ConversacionController');

router.get('/todas/:id', ConversacionController.todas);
router.post('/crear', ConversacionController.crear);
router.delete('/borrar/:id', ConversacionController.borrar);
router.put('/nuevo-mensaje', ConversacionController.nuevoMensaje);
router.put('/quitar-nuevo-mensaje', ConversacionController.quitarNuevoMensaje);


module.exports = router;