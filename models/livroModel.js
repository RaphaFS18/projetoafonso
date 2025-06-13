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
    // --- ADD THESE CONSOLE.LOGS ---
    console.log('--- LivroModel.create: Raw incoming data ---');
    console.log(data);
    console.log('-------------------------------------------');
    // --- END ADD ---

    const { titulo, ano_publicacao, paginas, isbn, autor_id } = data;

    const parsedAnoPublicacao = ano_publicacao ? parseInt(ano_publicacao, 10) : null;
    const parsedPaginas = paginas ? parseInt(paginas, 10) : null;
    const parsedAutorId = autor_id ? parseInt(autor_id, 10) : null;

    // --- ADD THESE CONSOLE.LOGS ---
    console.log('--- LivroModel.create: Parsed values ---');
    console.log('titulo:', titulo);
    console.log('ano_publicacao (parsed):', parsedAnoPublicacao);
    console.log('paginas (parsed):', parsedPaginas);
    console.log('isbn:', isbn);
    console.log('autor_id (parsed):', parsedAutorId);
    console.log('----------------------------------------');
    // --- END ADD ---

    // Validações básicas
    if (!titulo || titulo.trim().length === 0) {
      throw new Error('Título do livro é obrigatório');
    }

    if (titulo.length > 200) {
      throw new Error('Título deve ter no máximo 200 caracteres');
    }

    const anoAtual = new Date().getFullYear();
    if (parsedAnoPublicacao === null || isNaN(parsedAnoPublicacao) || parsedAnoPublicacao < 1 || parsedAnoPublicacao > anoAtual) {
      throw new Error('Ano de publicação é obrigatório e deve ser válido (entre 1 e o ano atual)');
    }

    if (parsedPaginas === null || isNaN(parsedPaginas) || parsedPaginas < 1) {
      throw new Error('Número de páginas é obrigatório e deve ser maior que zero');
    }

    if (parsedAutorId === null || isNaN(parsedAutorId)) {
      throw new Error('Autor é obrigatório');
    }

    if (isbn && isbn.length > 20) {
      throw new Error('ISBN deve ter no máximo 20 caracteres');
    }

    if (isbn && isbn.trim().length > 0) {
      const livroExistente = await livroRepository.findByIsbn(isbn.trim());
      if (livroExistente) {
        throw new Error('ISBN já cadastrado para outro livro');
      }
    }

    const livroData = {
      titulo: titulo.trim(),
      ano_publicacao: parsedAnoPublicacao,
      paginas: parsedPaginas,
      isbn: isbn ? isbn.trim() : null,
      autor_id: parsedAutorId
    };

    const novoLivro = await livroRepository.create(livroData);
    return new Livro(novoLivro);
  }

  // ... rest of your Livro class
}

module.exports = Livro;