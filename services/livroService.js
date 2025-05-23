// services/livroService.js
const Livro = require('../models/livroModel');

class LivroService {
  static async getAllLivros() {
    try {
      return await Livro.getAll();
    } catch (error) {
      throw new Error(`Erro ao buscar livros: ${error.message}`);
    }
  }

  static async getLivroById(id) {
    try {
      if (!id) {
        throw new Error('ID do livro é obrigatório');
      }
      
      const livro = await Livro.getById(id);
      if (!livro) {
        throw new Error('Livro não encontrado');
      }
      
      return livro;
    } catch (error) {
      throw new Error(`Erro ao buscar livro: ${error.message}`);
    }
  }

  static async createLivro(data) {
    try {
      return await Livro.create(data);
    } catch (error) {
      throw new Error(`Erro ao criar livro: ${error.message}`);
    }
  }

  static async updateLivro(id, data) {
    try {
      if (!id) {
        throw new Error('ID do livro é obrigatório');
      }
      
      const livroAtualizado = await Livro.update(id, data);
      if (!livroAtualizado) {
        throw new Error('Livro não encontrado para atualização');
      }
      
      return livroAtualizado;
    } catch (error) {
      throw new Error(`Erro ao atualizar livro: ${error.message}`);
    }
  }

  static async deleteLivro(id) {
    try {
      if (!id) {
        throw new Error('ID do livro é obrigatório');
      }
      
      const deleted = await Livro.delete(id);
      if (!deleted) {
        throw new Error('Livro não encontrado para exclusão');
      }
      
      return { message: 'Livro excluído com sucesso' };
    } catch (error) {
      throw new Error(`Erro ao excluir livro: ${error.message}`);
    }
  }

  static async getLivrosByAutor(autorId) {
    try {
      if (!autorId) {
        throw new Error('ID do autor é obrigatório');
      }
      
      return await Livro.getByAutor(autorId);
    } catch (error) {
      throw new Error(`Erro ao buscar livros por autor: ${error.message}`);
    }
  }

  static async getLivrosByAno(ano) {
    try {
      if (!ano) {
        throw new Error('Ano é obrigatório para busca');
      }
      
      return await Livro.getByAno(ano);
    } catch (error) {
      throw new Error(`Erro ao buscar livros por ano: ${error.message}`);
    }
  }

  static async getLivroByIsbn(isbn) {
    try {
      if (!isbn) {
        throw new Error('ISBN é obrigatório para busca');
      }
      
      const livro = await Livro.getByIsbn(isbn);
      if (!livro) {
        throw new Error('Livro não encontrado com este ISBN');
      }
      
      return livro;
    } catch (error) {
      throw new Error(`Erro ao buscar livro por ISBN: ${error.message}`);
    }
  }

  static async getLivroWithCategorias(id) {
    try {
      if (!id) {
        throw new Error('ID do livro é obrigatório');
      }
      
      const livro = await Livro.getWithCategorias(id);
      if (!livro) {
        throw new Error('Livro não encontrado');
      }
      
      return livro;
    } catch (error) {
      throw new Error(`Erro ao buscar livro com categorias: ${error.message}`);
    }
  }
}

module.exports = LivroService;