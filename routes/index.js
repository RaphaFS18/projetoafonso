// routes/index.js
const express = require('express');
const router = express.Router();

// Importando todas as rotas
const autorRoutes = require('./autorRoutes');
const categoriaRoutes = require('./categoriaRoutes');
const livroRoutes = require('./livroRoutes');
const livroCategoriaRoutes = require('./livroCategoriaRoutes');

// Definindo os prefixos para cada grupo de rotas
router.use('/autores', autorRoutes);
router.use('/categorias', categoriaRoutes);
router.use('/livros', livroRoutes);
router.use('/livro-categoria', livroCategoriaRoutes);


module.exports = router;