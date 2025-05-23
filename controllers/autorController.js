const AutorService = require('../services/autorService');

class AutorController {
  static getAll(req, res) {
    AutorService.getAllAutores((err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  }

  static getById(req, res) {
    AutorService.getAutorById(req.params.id, (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Autor não encontrado' });
      res.json(row);
    });
  }

  static create(req, res) {
    AutorService.createAutor(req.body, (err, newAutor) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json(newAutor);
    });
  }

  static update(req, res) {
    AutorService.updateAutor(req.params.id, req.body, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Autor atualizado com sucesso' });
    });
  }

  static delete(req, res) {
    AutorService.deleteAutor(req.params.id, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Autor excluído com sucesso' });
    });
  }
}

module.exports = AutorController;
