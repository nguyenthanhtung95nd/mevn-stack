const express = require('express');
const controller = require('../book/book.controller');
const auth = require('../../services/auth.service');
const router = express.Router();

router.get('/book', auth.requireLogin, controller.index);
router.post('/book', auth.requireLogin, controller.create);
router.get('/book/:id', auth.requireLogin, controller.show);
router.put('/book', auth.requireLogin, controller.update);
router.delete('/book/:id', auth.requireLogin, controller.remove);

module.exports = router;