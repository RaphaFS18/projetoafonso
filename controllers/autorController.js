// controllers/autorController.js
const AutorService = require('../services/autorService');

class AutorController {
  static async getAll(req, res) {
    try {
      const autores = await AutorService.getAllAutores();
      res.json(autores);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const autor = await AutorService.getAutorById(req.params.id);
      res.json(autor);
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
      const novoAutor = await AutorService.createAutor(req.body);
      res.status(201).json(novoAutor);
    } catch (error) {
      if (error.message.includes('obrigatório') || 
          error.message.includes('caracteres')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  static async update(req, res) {
    try {
      const autorAtualizado = await AutorService.updateAutor(req.params.id, req.body);
      res.json(autorAtualizado);
    } catch (error) {
      if (error.message.includes('não encontrado')) {
        res.status(404).json({ error: error.message });
      } else if (error.message.includes('obrigatório') || 
                 error.message.includes('caracteres')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  static async delete(req, res) {
    try {
      const resultado = await AutorService.deleteAutor(req.params.id);
      res.json(resultado);
    } catch (error) {
      if (error.message.includes('não encontrado')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  static async getByNacionalidade(req, res) {
    try {
      const { nacionalidade } = req.query;
      const autores = await AutorService.getAutoresByNacionalidade(nacionalidade);
      res.json(autores);
    } catch (error) {
      if (error.message.includes('obrigatória')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  static async getAutoresComLivros(req, res) {
    try {
      const autores = await AutorService.getAutoresComLivros();
      res.json(autores);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = AutorController;