// routes/categoriaRoutes.js
const express = require('express');
const router = express.Router();
const CategoriaController = require('../controllers/categoriaController');

// Rotas específicas (devem vir antes de /:id)
router.get('/buscar', CategoriaController.getByNome);
router.get('/com-livros', CategoriaController.getCategoriasComLivros);

// Rota para buscar livros por categoria
router.get('/:id/livros', CategoriaController.getLivrosByCategoria);

// Rotas CRUD básicas
router.get('/', CategoriaController.getAll);
router.get('/:id', CategoriaController.getById);
router.post('/', CategoriaController.create);
router.put('/:id', CategoriaController.update);
router.delete('/:id', CategoriaController.delete);

module.exports = router;