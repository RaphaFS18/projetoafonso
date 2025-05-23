// controllers/categoriaController.js
const CategoriaService = require('../services/categoriaService');

class CategoriaController {
  static async getAll(req, res) {
    try {
      const categorias = await CategoriaService.getAllCategorias();
      res.json(categorias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const categoria = await CategoriaService.getCategoriaById(req.params.id);
      res.json(categoria);
    } catch (error) {
      if (error.message.includes('não encontrada')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  static async create(req, res) {
    try {
      const novaCategoria = await CategoriaService.createCategoria(req.body);
      res.status(201).json(novaCategoria);
    } catch (error) {
      if (error.message.includes('obrigatório') || 
          error.message.includes('caracteres') ||
          error.message.includes('já existe')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  static async update(req, res) {
    try {
      const categoriaAtualizada = await CategoriaService.updateCategoria(req.params.id, req.body);
      res.json(categoriaAtualizada);
    } catch (error) {
      if (error.message.includes('não encontrada')) {
        res.status(404).json({ error: error.message });
      } else if (error.message.includes('obrigatório') || 
                 error.message.includes('caracteres') ||
                 error.message.includes('já existe')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  static async delete(req, res) {
    try {
      const resultado = await CategoriaService.deleteCategoria(req.params.id);
      res.json(resultado);
    } catch (error) {
      if (error.message.includes('não encontrada')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  static async getByNome(req, res) {
    try {
      const { nome } = req.query;
      const categorias = await CategoriaService.getCategoriasByNome(nome);
      res.json(categorias);
    } catch (error) {
      if (error.message.includes('obrigatório')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  static async getCategoriasComLivros(req, res) {
    try {
      const categorias = await CategoriaService.getCategoriasComLivros();
      res.json(categorias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getLivrosByCategoria(req, res) {
    try {
      const livros = await CategoriaService.getLivrosByCategoria(req.params.id);
      res.json(livros);
    } catch (error) {
      if (error.message.includes('obrigatório')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
}

module.exports = CategoriaController;