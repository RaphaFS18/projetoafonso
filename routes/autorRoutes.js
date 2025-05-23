// routes/autorRoutes.js
const express = require('express');
const router = express.Router();
const AutorController = require('../controllers/autorController');

// Rota para buscar autores por nacionalidade (deve vir antes de /:id)
router.get('/nacionalidade', AutorController.getByNacionalidade);

// Rota para buscar autores com seus livros
router.get('/com-livros', AutorController.getAutoresComLivros);

// Rotas CRUD básicas
router.get('/', AutorController.getAll);
router.get('/:id', AutorController.getById);
router.post('/', AutorController.create);
router.put('/:id', AutorController.update);
router.delete('/:id', AutorController.delete);

module.exports = router;