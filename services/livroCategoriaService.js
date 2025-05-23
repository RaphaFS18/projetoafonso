// services/livroCategoriaService.js
const livroCategoriaRepository = require('../repositories/livrocategoriaRepository');

class LivroCategoriaService {
  static async getAllLivroCategorias() {
    try {
      return await livroCategoriaRepository.findAll();
    } catch (error) {
      throw new Error(`Erro ao buscar relacionamentos livro-categoria: ${error.message}`);
    }
  }

  static async getLivroCategoriaById(id) {
    try {
      if (!id) {
        throw new Error('ID é obrigatório');
      }
      
      const relacao = await livroCategoriaRepository.findById(id);
      if (!relacao) {
        throw new Error('Relacionamento não encontrado');
      }
      
      return relacao;
    } catch (error) {
      throw new Error(`Erro ao buscar relacionamento: ${error.message}`);
    }
  }

  static async associarLivroCategoria(livroId, categoriaId) {
    try {
      if (!livroId || !categoriaId) {
        throw new Error('ID do livro e ID da categoria são obrigatórios');
      }

      // Verificar se a associação já existe
      const jaExiste = await livroCategoriaRepository.exists(livroId, categoriaId);
      if (jaExiste) {
        throw new Error('Esta associação já existe');
      }
      
      return await livroCategoriaRepository.create(livroId, categoriaId);
    } catch (error) {
      throw new Error(`Erro ao associar livro à categoria: ${error.message}`);
    }
  }

  static async removerAssociacaoLivroCategoria(livroId, categoriaId) {
    try {
      if (!livroId || !categoriaId) {
        throw new Error('ID do livro e ID da categoria são obrigatórios');
      }
      
      const deleted = await livroCategoriaRepository.delete(livroId, categoriaId);
      if (!deleted) {
        throw new Error('Associação não encontrada para remoção');
      }
      
      return { message: 'Associação removida com sucesso' };
    } catch (error) {
      throw new Error(`Erro ao remover associação: ${error.message}`);
    }
  }

  static async removerAssociacaoPorId(id) {
    try {
      if (!id) {
        throw new Error('ID é obrigatório');
      }
      
      const deleted = await livroCategoriaRepository.deleteById(id);
      if (!deleted) {
        throw new Error('Associação não encontrada para remoção');
      }
      
      return { message: 'Associação removida com sucesso' };
    } catch (error) {
      throw new Error(`Erro ao remover associação: ${error.message}`);
    }
  }

  static async getCategoriasByLivro(livroId) {
    try {
      if (!livroId) {
        throw new Error('ID do livro é obrigatório');
      }
      
      return await livroCategoriaRepository.findByLivro(livroId);
    } catch (error) {
      throw new Error(`Erro ao buscar categorias do livro: ${error.message}`);
    }
  }

  static async getLivrosByCategoria(categoriaId) {
    try {
      if (!categoriaId) {
        throw new Error('ID da categoria é obrigatório');
      }
      
      return await livroCategoriaRepository.findByCategoria(categoriaId);
    } catch (error) {
      throw new Error(`Erro ao buscar livros da categoria: ${error.message}`);
    }
  }

  static async removerTodasCategoriasDeLivro(livroId) {
    try {
      if (!livroId) {
        throw new Error('ID do livro é obrigatório');
      }
      
      const removidos = await livroCategoriaRepository.deleteAllByLivro(livroId);
      return { 
        message: `${removidos} categorias removidas do livro`,
        removidos: removidos
      };
    } catch (error) {
      throw new Error(`Erro ao remover categorias do livro: ${error.message}`);
    }
  }

  static async removerTodosLivrosDeCategoria(categoriaId) {
    try {
      if (!categoriaId) {
        throw new Error('ID da categoria é obrigatório');
      }
      
      const removidos = await livroCategoriaRepository.deleteAllByCategoria(categoriaId);
      return { 
        message: `${removidos} livros removidos da categoria`,
        removidos: removidos
      };
    } catch (error) {
      throw new Error(`Erro ao remover livros da categoria: ${error.message}`);
    }
  }
}

module.exports = LivroCategoriaService;