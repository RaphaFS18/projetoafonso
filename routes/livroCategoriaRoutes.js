// routes/livroCategoriaRoutes.js
const express = require('express');
const router = express.Router();
const LivroCategoriaController = require('../controllers/livroCategoriaController');

// Rotas para associações específicas
router.post('/associar', LivroCategoriaController.associarLivroCategoria);
router.delete('/remover', LivroCategoriaController.removerAssociacaoLivroCategoria);

// Rotas para buscar relações
router.get('/livro/:livroId/categorias', LivroCategoriaController.getCategoriasByLivro);
router.get('/categoria/:categoriaId/livros', LivroCategoriaController.getLivrosByCategoria);

// Rotas para remover todas as associações
router.delete('/livro/:livroId/todas-categorias', LivroCategoriaController.removerTodasCategoriasDeLivro);
router.delete('/categoria/:categoriaId/todos-livros', LivroCategoriaController.removerTodosLivrosDeCategoria);

// Rotas CRUD básicas
router.get('/', LivroCategoriaController.getAll);
router.get('/:id', LivroCategoriaController.getById);
router.delete('/:id', LivroCategoriaController.delete);

module.exports = router;