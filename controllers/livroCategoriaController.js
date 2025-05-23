// controllers/livroCategoriaController.js
const LivroCategoriaService = require('../services/livroCategoriaService');

class LivroCategoriaController {
  static async getAll(req, res) {
    try {
      const relacoes = await LivroCategoriaService.getAllLivroCategorias();
      res.json(relacoes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const relacao = await LivroCategoriaService.getLivroCategoriaById(req.params.id);
      res.json(relacao);
    } catch (error) {
      if (error.message.includes('não encontrado')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  static async associarLivroCategoria(req, res) {
    try {
      const { livro_id, categoria_id } = req.body;
      const novaAssociacao = await LivroCategoriaService.associarLivroCategoria(livro_id, categoria_id);
      res.status(201).json(novaAssociacao);
    } catch (error) {
      if (error.message.includes('obrigatório') || 
          error.message.includes('já existe')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  static async removerAssociacaoLivroCategoria(req, res) {
    try {
      const { livro_id, categoria_id } = req.body;
      const resultado = await LivroCategoriaService.removerAssociacaoLivroCategoria(livro_id, categoria_id);
      res.json(resultado);
    } catch (error) {
      if (error.message.includes('não encontrada')) {
        res.status(404).json({ error: error.message });
      } else if (error.message.includes('obrigatório')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  static async delete(req, res) {
    try {
      const resultado = await LivroCategoriaService.removerAssociacaoPorId(req.params.id);
      res.json(resultado);
    } catch (error) {
      if (error.message.includes('não encontrada')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  static async getCategoriasByLivro(req, res) {
    try {
      const categorias = await LivroCategoriaService.getCategoriasByLivro(req.params.livroId);
      res.json(categorias);
    } catch (error) {
      if (error.message.includes('obrigatório')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  static async getLivrosByCategoria(req, res) {
    try {
      const livros = await LivroCategoriaService.getLivrosByCategoria(req.params.categoriaId);
      res.json(livros);
    } catch (error) {
      if (error.message.includes('obrigatório')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  static async removerTodasCategoriasDeLivro(req, res) {
    try {
      const resultado = await LivroCategoriaService.removerTodasCategoriasDeLivro(req.params.livroId);
      res.json(resultado);
    } catch (error) {
      if (error.message.includes('obrigatório')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  static async removerTodosLivrosDeCategoria(req, res) {
    try {
      const resultado = await LivroCategoriaService.removerTodosLivrosDeCategoria(req.params.categoriaId);
      res.json(resultado);
    } catch (error) {
      if (error.message.includes('obrigatório')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
}

module.exports = LivroCategoriaController;