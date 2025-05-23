// controllers/livroController.js
const LivroService = require('../services/livroService');

class LivroController {
  static async getAll(req, res) {
    try {
      const livros = await LivroService.getAllLivros();
      res.json(livros);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const livro = await LivroService.getLivroById(req.params.id);
      res.json(livro);
    } catch (error) {
      if (error.message.includes('não encontrado')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  static async create(req, res) {
    try {
      const novoLivro = await LivroService.createLivro(req.body);
      res.status(201).json(novoLivro);
    } catch (error) {
      if (error.message.includes('obrigatório') || 
          error.message.includes('caracteres') ||
          error.message.includes('válido') ||
          error.message.includes('maior') ||
          error.message.includes('ISBN') ||
          error.message.includes('cadastrado')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  static async update(req, res) {
    try {
      const livroAtualizado = await LivroService.updateLivro(req.params.id, req.body);
      res.json(livroAtualizado);
    } catch (error) {
      if (error.message.includes('não encontrado')) {
        res.status(404).json({ error: error.message });
      } else if (error.message.includes('obrigatório') || 
                 error.message.includes('caracteres') ||
                 error.message.includes('válido') ||
                 error.message.includes('maior') ||
                 error.message.includes('ISBN') ||
                 error.message.includes('cadastrado')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  static async delete(req, res) {
    try {
      const resultado = await LivroService.deleteLivro(req.params.id);
      res.json(resultado);
    } catch (error) {
      if (error.message.includes('não encontrado')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  static async getByAutor(req, res) {
    try {
      const livros = await LivroService.getLivrosByAutor(req.params.autorId);
      res.json(livros);
    } catch (error) {
      if (error.message.includes('obrigatório')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  static async getByAno(req, res) {
    try {
      const { ano } = req.query;
      const livros = await LivroService.getLivrosByAno(ano);
      res.json(livros);
    } catch (error) {
      if (error.message.includes('obrigatório')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  static async getByIsbn(req, res) {
    try {
      const { isbn } = req.query;
      const livro = await LivroService.getLivroByIsbn(isbn);
      res.json(livro);
    } catch (error) {
      if (error.message.includes('não encontrado')) {
        res.status(404).json({ error: error.message });
      } else if (error.message.includes('obrigatório')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  static async getWithCategorias(req, res) {
    try {
      const livro = await LivroService.getLivroWithCategorias(req.params.id);
      res.json(livro);
    } catch (error) {
      if (error.message.includes('não encontrado')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
}

module.exports = LivroController;