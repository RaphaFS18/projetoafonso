// routes/livroRoutes.js
const express = require('express');
const router = express.Router();
const LivroController = require('../controllers/livroController');

// Rotas específicas com query parameters
router.get('/ano', LivroController.getByAno);
router.get('/isbn', LivroController.getByIsbn);

// Rotas específicas com parâmetros (devem vir antes de /:id)
router.get('/autor/:autorId', LivroController.getByAutor);
router.get('/:id/categorias', LivroController.getWithCategorias);

// Rotas CRUD básicas
router.get('/', LivroController.getAll);
router.get('/:id', LivroController.getById);
router.post('/', LivroController.create);
router.put('/:id', LivroController.update);
router.delete('/:id', LivroController.delete);

module.exports = router;