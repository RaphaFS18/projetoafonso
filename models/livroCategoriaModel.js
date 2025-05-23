// models/livroCategoriaModel.js
const livroCategoriaRepository = require('../repositories/livrocategoriaRepository');

class LivroCategoria {
  constructor(data) {
    this.id = data.id;
    this.livro_id = data.livro_id;
    this.categoria_id = data.categoria_id;
    this.livro_titulo = data.livro_titulo;
    this.categoria_nome = data.categoria_nome;
  }

  static async getAll() {
    const relacoes = await livroCategoriaRepository.findAll();
    return relacoes.map(relacao => new LivroCategoria(relacao));
  }

  static async getById(id) {
    const relacao = await livroCategoriaRepository.findById(id);
    return relacao ? new LivroCategoria(relacao) : null;
  }

  static async create(livroId, categoriaId) {
    // Validações básicas
    if (!livroId) {
      throw new Error('ID do livro é obrigatório');
    }

    if (!categoriaId) {
      throw new Error('ID da categoria é obrigatório');
    }

    // Verificar se a associação já existe
    const jaExiste = await livroCategoriaRepository.exists(livroId, categoriaId);
    if (jaExiste) {
      throw new Error('Esta associação já existe');
    }

    const novaRelacao = await livroCategoriaRepository.create(livroId, categoriaId);
    return new LivroCategoria(novaRelacao);
  }

  static async delete(livroId, categoriaId) {
    return await livroCategoriaRepository.delete(livroId, categoriaId);
  }

  static async deleteById(id) {
    return await livroCategoriaRepository.deleteById(id);
  }

  static async getByLivro(livroId) {
    const relacoes = await livroCategoriaRepository.findByLivro(livroId);
    return relacoes.map(relacao => new LivroCategoria(relacao));
  }

  static async getByCategoria(categoriaId) {
    const relacoes = await livroCategoriaRepository.findByCategoria(categoriaId);
    return relacoes.map(relacao => new LivroCategoria(relacao));
  }

  static async deleteAllByLivro(livroId) {
    return await livroCategoriaRepository.deleteAllByLivro(livroId);
  }

  static async deleteAllByCategoria(categoriaId) {
    return await livroCategoriaRepository.deleteAllByCategoria(categoriaId);
  }

  // Métodos de instância
  toJSON() {
    return {
      id: this.id,
      livro_id: this.livro_id,
      categoria_id: this.categoria_id,
      livro_titulo: this.livro_titulo,
      categoria_nome: this.categoria_nome
    };
  }
}

module.exports = LivroCategoria;