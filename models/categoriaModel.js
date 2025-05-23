// models/categoriaModel.js
const categoriaRepository = require('../repositories/categoriaRepository');

class Categoria {
  constructor(data) {
    this.id = data.id;
    this.nome = data.nome;
    this.descricao = data.descricao;
    this.total_livros = data.total_livros;
  }

  static async getAll() {
    const categorias = await categoriaRepository.findAll();
    return categorias.map(categoria => new Categoria(categoria));
  }

  static async getById(id) {
    const categoria = await categoriaRepository.findById(id);
    return categoria ? new Categoria(categoria) : null;
  }

  static async create(data) {
    const { nome, descricao } = data;
    
    // Validações básicas
    if (!nome || nome.trim().length === 0) {
      throw new Error('Nome da categoria é obrigatório');
    }

    if (nome.length > 50) {
      throw new Error('Nome da categoria deve ter no máximo 50 caracteres');
    }

    // Verificar se categoria já existe
    const categoriasExistentes = await categoriaRepository.findByNome(nome.trim());
    if (categoriasExistentes.length > 0) {
      throw new Error('Já existe uma categoria com este nome');
    }

    const categoriaData = {
      nome: nome.trim(),
      descricao: descricao ? descricao.trim() : null
    };

    const novaCategoria = await categoriaRepository.create(categoriaData);
    return new Categoria(novaCategoria);
  }

  static async update(id, data) {
    const { nome, descricao } = data;

    // Validações básicas
    if (!nome || nome.trim().length === 0) {
      throw new Error('Nome da categoria é obrigatório');
    }

    if (nome.length > 50) {
      throw new Error('Nome da categoria deve ter no máximo 50 caracteres');
    }

    // Verificar se categoria já existe (para outro ID)
    const categoriasExistentes = await categoriaRepository.findByNome(nome.trim());
    const categoriaComMesmoNome = categoriasExistentes.find(cat => cat.id != id);
    if (categoriaComMesmoNome) {
      throw new Error('Já existe uma categoria com este nome');
    }

    const categoriaData = {
      nome: nome.trim(),
      descricao: descricao ? descricao.trim() : null
    };

    const categoriaAtualizada = await categoriaRepository.update(id, categoriaData);
    return categoriaAtualizada ? new Categoria(categoriaAtualizada) : null;
  }

  static async delete(id) {
    return await categoriaRepository.delete(id);
  }

  static async getByNome(nome) {
    const categorias = await categoriaRepository.findByNome(nome);
    return categorias.map(categoria => new Categoria(categoria));
  }

  static async getCategoriasComLivros() {
    const categorias = await categoriaRepository.findCategoriasComLivros();
    return categorias.map(categoria => new Categoria(categoria));
  }

  static async getLivrosByCategoria(categoriaId) {
    return await categoriaRepository.findLivrosByCategoria(categoriaId);
  }

  // Métodos de instância
  temLivros() {
    return this.total_livros > 0;
  }

  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      descricao: this.descricao,
      total_livros: this.total_livros || 0,
      tem_livros: this.temLivros()
    };
  }
}

module.exports = Categoria;