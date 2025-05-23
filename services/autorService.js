const AutorRepository = require('../repositories/autorRepository');

class AutorService {
  static getAllAutores(callback) {
    AutorRepository.findAll(callback);
  }

  static getAutorById(id, callback) {
    AutorRepository.findById(id, callback);
  }

  static createAutor(data, callback) {
    AutorRepository.create(data, callback);
  }

  static updateAutor(id, data, callback) {
    AutorRepository.update(id, data, callback);
  }

  static deleteAutor(id, callback) {
    AutorRepository.delete(id, callback);
  }
}

module.exports = AutorService;
