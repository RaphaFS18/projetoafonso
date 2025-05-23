// services/categoriaService.js
const Categoria = require('../models/categoriaModel');

class CategoriaService {
  static async getAllCategorias() {
    try {
      return await Categoria.getAll();
    } catch (error) {
      throw new Error(`Erro ao buscar categorias: ${error.message}`);
    }
  }

  static async getCategoriaById(id) {
    try {
      if (!id) {
        throw new Error('ID da categoria é obrigatório');
      }
      
      const categoria = await Categoria.getById(id);
      if (!categoria) {
        throw new Error('Categoria não encontrada');
      }
      
      return categoria;
    } catch (error) {
      throw new Error(`Erro ao buscar categoria: ${error.message}`);
    }
  }

  static async createCategoria(data) {
    try {
      return await Categoria.create(data);
    } catch (error) {
      throw new Error(`Erro ao criar categoria: ${error.message}`);
    }
  }

  static async updateCategoria(id, data) {
    try {
      if (!id) {
        throw new Error('ID da categoria é obrigatório');
      }
      
      const categoriaAtualizada = await Categoria.update(id, data);
      if (!categoriaAtualizada) {
        throw new Error('Categoria não encontrada para atualização');
      }
      
      return categoriaAtualizada;
    } catch (error) {
      throw new Error(`Erro ao atualizar categoria: ${error.message}`);
    }
  }

  static async deleteCategoria(id) {
    try {
      if (!id) {
        throw new Error('ID da categoria é obrigatório');
      }
      
      const deleted = await Categoria.delete(id);
      if (!deleted) {
        throw new Error('Categoria não encontrada para exclusão');
      }
      
      return { message: 'Categoria excluída com sucesso' };
    } catch (error) {
      throw new Error(`Erro ao excluir categoria: ${error.message}`);
    }
  }

  static async getCategoriasByNome(nome) {
    try {
      if (!nome) {
        throw new Error('Nome é obrigatório para busca');
      }
      
      return await Categoria.getByNome(nome);
    } catch (error) {
      throw new Error(`Erro ao buscar categorias por nome: ${error.message}`);
    }
  }

  static async getCategoriasComLivros() {
    try {
      return await Categoria.getCategoriasComLivros();
    } catch (error) {
      throw new Error(`Erro ao buscar categorias com livros: ${error.message}`);
    }
  }

  static async getLivrosByCategoria(categoriaId) {
    try {
      if (!categoriaId) {
        throw new Error('ID da categoria é obrigatório');
      }
      
      return await Categoria.getLivrosByCategoria(categoriaId);
    } catch (error) {
      throw new Error(`Erro ao buscar livros da categoria: ${error.message}`);
    }
  }
}

module.exports = CategoriaService;