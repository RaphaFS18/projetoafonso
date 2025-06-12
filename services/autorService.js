// services/autorService.js
const Autor = require('../models/autorModel');

class AutorService {
  static async getAllAutores() {
    try {
      return await Autor.getAll();
    } catch (error) {
      throw new Error(`Erro ao buscar autores: ${error.message}`);
    }
  }

  static async getAutorById(id) {
    try {
      if (!id) {
        throw new Error('ID do autor é obrigatório');
      }
      
      const autor = await Autor.getById(id);
      if (!autor) {
        throw new Error('Autor não encontrado');
      }
      
      return autor;
    } catch (error) {
      throw new Error(`Erro ao buscar autor: ${error.message}`);
    }
  }

  static async createAutor(data) {
    try {
      return await Autor.create(data);
    } catch (error) {
      throw error;
    }
  }

  static async updateAutor(id, data) {
    try {
      if (!id) {
        throw new Error('ID do autor é obrigatório');
      }
      
      const autorAtualizado = await Autor.update(id, data);
      if (!autorAtualizado) {
        throw new Error('Autor não encontrado para atualização');
      }
      
      return autorAtualizado;
    } catch (error) {
      throw new Error(`Erro ao atualizar autor: ${error.message}`);
    }
  }

  static async deleteAutor(id) {
    try {
      if (!id) {
        throw new Error('ID do autor é obrigatório');
      }
      
      const deleted = await Autor.delete(id);
      if (!deleted) {
        throw new Error('Autor não encontrado para exclusão');
      }
      
      return { message: 'Autor excluído com sucesso' };
    } catch (error) {
      throw new Error(`Erro ao excluir autor: ${error.message}`);
    }
  }

  static async getAutoresByNacionalidade(nacionalidade) {
    try {
      if (!nacionalidade) {
        throw new Error('Nacionalidade é obrigatória para busca');
      }
      
      return await Autor.getByNacionalidade(nacionalidade);
    } catch (error) {
      throw new Error(`Erro ao buscar autores por nacionalidade: ${error.message}`);
    }
  }

  static async getAutoresComLivros() {
    try {
      return await Autor.getAutoresComLivros();
    } catch (error) {
      throw new Error(`Erro ao buscar autores com livros: ${error.message}`);
    }
  }
}

module.exports = AutorService;