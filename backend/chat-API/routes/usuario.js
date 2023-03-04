const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

router.get('/todos', UsuarioController.todos);
router.post('/login', UsuarioController.login);
router.post('/registrar', UsuarioController.registrar);
router.get('/perfil/:id', UsuarioController.perfil);

module.exports = router;