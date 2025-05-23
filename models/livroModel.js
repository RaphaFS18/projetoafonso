// models/livroModel.js
const livroRepository = require('../repositories/livroRepository');

class Livro {
  constructor(data) {
    this.id = data.id;
    this.titulo = data.titulo;
    this.ano_publicacao = data.ano_publicacao;
    this.paginas = data.paginas;
    this.isbn = data.isbn;
    this.autor_id = data.autor_id;
    this.autor_nome = data.autor_nome;
    this.categorias = data.categorias;
  }

  static async getAll() {
    const livros = await livroRepository.findAll();
    return livros.map(livro => new Livro(livro));
  }

  static async getById(id) {
    const livro = await livroRepository.findById(id);
    return livro ? new Livro(livro) : null;
  }

  static async create(data) {
    const { titulo, ano_publicacao, paginas, isbn, autor_id } = data;
    
    // Validações básicas
    if (!titulo || titulo.trim().length === 0) {
      throw new Error('Título do livro é obrigatório');
    }

    if (titulo.length > 200) {
      throw new Error('Título deve ter no máximo 200 caracteres');
    }

    if (!ano_publicacao || ano_publicacao < 1) {
      throw new Error('Ano de publicação é obrigatório e deve ser válido');
    }

    const anoAtual = new Date().getFullYear();
    if (ano_publicacao > anoAtual) {
      throw new Error('Ano de publicação não pode ser maior que o ano atual');
    }

    if (!paginas || paginas < 1) {
      throw new Error('Número de páginas é obrigatório e deve ser maior que zero');
    }

    if (!autor_id) {
      throw new Error('Autor é obrigatório');
    }

    if (isbn && isbn.length > 20) {
      throw new Error('ISBN deve ter no máximo 20 caracteres');
    }

    // Verificar se ISBN já existe (se fornecido)
    if (isbn) {
      const livroExistente = await livroRepository.findByIsbn(isbn);
      if (livroExistente) {
        throw new Error('ISBN já cadastrado para outro livro');
      }
    }

    const livroData = {
      titulo: titulo.trim(),
      ano_publicacao: parseInt(ano_publicacao),
      paginas: parseInt(paginas),
      isbn: isbn ? isbn.trim() : null,
      autor_id: parseInt(autor_id)
    };

    const novoLivro = await livroRepository.create(livroData);
    return new Livro(novoLivro);
  }

  static async update(id, data) {
    const { titulo, ano_publicacao, paginas, isbn, autor_id } = data;

    // Validações básicas
    if (!titulo || titulo.trim().length === 0) {
      throw new Error('Título do livro é obrigatório');
    }

    if (titulo.length > 200) {
      throw new Error('Título deve ter no máximo 200 caracteres');
    }

    if (!ano_publicacao || ano_publicacao < 1) {
      throw new Error('Ano de publicação é obrigatório e deve ser válido');
    }

    const anoAtual = new Date().getFullYear();
    if (ano_publicacao > anoAtual) {
      throw new Error('Ano de publicação não pode ser maior que o ano atual');
    }

    if (!paginas || paginas < 1) {
      throw new Error('Número de páginas é obrigatório e deve ser maior que zero');
    }

    if (!autor_id) {
      throw new Error('Autor é obrigatório');
    }

    if (isbn && isbn.length > 20) {
      throw new Error('ISBN deve ter no máximo 20 caracteres');
    }

    // Verificar se ISBN já existe para outro livro (se fornecido)
    if (isbn) {
      const livroExistente = await livroRepository.findByIsbn(isbn);
      if (livroExistente && livroExistente.id != id) {
        throw new Error('ISBN já cadastrado para outro livro');
      }
    }

    const livroData = {
      titulo: titulo.trim(),
      ano_publicacao: parseInt(ano_publicacao),
      paginas: parseInt(paginas),
      isbn: isbn ? isbn.trim() : null,
      autor_id: parseInt(autor_id)
    };

    const livroAtualizado = await livroRepository.update(id, livroData);
    return livroAtualizado ? new Livro(livroAtualizado) : null;
  }

  static async delete(id) {
    return await livroRepository.delete(id);
  }

  static async getByAutor(autorId) {
    const livros = await livroRepository.findByAutor(autorId);
    return livros.map(livro => new Livro(livro));
  }

  static async getByAno(ano) {
    const livros = await livroRepository.findByAno(ano);
    return livros.map(livro => new Livro(livro));
  }

  static async getByIsbn(isbn) {
    const livro = await livroRepository.findByIsbn(isbn);
    return livro ? new Livro(livro) : null;
  }

  static async getWithCategorias(id) {
    const livro = await livroRepository.findWithCategorias(id);
    return livro ? new Livro(livro) : null;
  }

  // Métodos de instância
  getIdadeLivro() {
    const anoAtual = new Date().getFullYear();
    return anoAtual - this.ano_publicacao;
  }

  isClassico() {
    return this.getIdadeLivro() >= 50;
  }

  toJSON() {
    return {
      id: this.id,
      titulo: this.titulo,
      ano_publicacao: this.ano_publicacao,
      paginas: this.paginas,
      isbn: this.isbn,
      autor_id: this.autor_id,
      autor_nome: this.autor_nome,
      categorias: this.categorias,
      idade_livro: this.getIdadeLivro(),
      is_classico: this.isClassico()
    };
  }
}

module.exports = Livro;