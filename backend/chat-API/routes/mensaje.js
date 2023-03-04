const express = require('express');
const router = express.Router();
const MensajeController = require('../controllers/MensajeController');

router.get('/todos/:id', MensajeController.todos);
router.post('/crear', MensajeController.crear);

module.exports = router;