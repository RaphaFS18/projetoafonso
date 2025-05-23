// models/autorModel.js
const autorRepository = require('../repositories/autorRepository');

class Autor {
  constructor(data) {
    this.id = data.id;
    this.nome = data.nome;
    this.nacionalidade = data.nacionalidade;
    this.data_nascimento = data.data_nascimento;
  }

  static async getAll() {
    const autores = await autorRepository.findAll();
    return autores.map(autor => new Autor(autor));
  }

  static async getById(id) {
    const autor = await autorRepository.findById(id);
    return autor ? new Autor(autor) : null;
  }

  static async create(data) {
    const { nome, nacionalidade, data_nascimento } = data;
    
    // Validações básicas
    if (!nome || nome.trim().length === 0) {
      throw new Error('Nome do autor é obrigatório');
    }

    if (nome.length > 100) {
      throw new Error('Nome do autor deve ter no máximo 100 caracteres');
    }

    if (nacionalidade && nacionalidade.length > 50) {
      throw new Error('Nacionalidade deve ter no máximo 50 caracteres');
    }

    const autorData = {
      nome: nome.trim(),
      nacionalidade: nacionalidade ? nacionalidade.trim() : null,
      data_nascimento: data_nascimento || null
    };

    const novoAutor = await autorRepository.create(autorData);
    return new Autor(novoAutor);
  }

  static async update(id, data) {
    const { nome, nacionalidade, data_nascimento } = data;

    // Validações básicas
    if (!nome || nome.trim().length === 0) {
      throw new Error('Nome do autor é obrigatório');
    }

    if (nome.length > 100) {
      throw new Error('Nome do autor deve ter no máximo 100 caracteres');
    }

    if (nacionalidade && nacionalidade.length > 50) {
      throw new Error('Nacionalidade deve ter no máximo 50 caracteres');
    }

    const autorData = {
      nome: nome.trim(),
      nacionalidade: nacionalidade ? nacionalidade.trim() : null,
      data_nascimento: data_nascimento || null
    };

    const autorAtualizado = await autorRepository.update(id, autorData);
    return autorAtualizado ? new Autor(autorAtualizado) : null;
  }

  static async delete(id) {
    return await autorRepository.delete(id);
  }

  static async getByNacionalidade(nacionalidade) {
    const autores = await autorRepository.findByNacionalidade(nacionalidade);
    return autores.map(autor => new Autor(autor));
  }

  static async getAutoresComLivros() {
    const autores = await autorRepository.findAutoresComLivros();
    return autores.map(autor => new Autor(autor));
  }

  // Métodos de instância
  getIdade() {
    if (!this.data_nascimento) return null;
    const hoje = new Date();
    const nascimento = new Date(this.data_nascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  }

  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      nacionalidade: this.nacionalidade,
      data_nascimento: this.data_nascimento,
      idade: this.getIdade()
    };
  }
}

module.exports = Autor;