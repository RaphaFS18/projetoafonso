// repositories/livroRepository.js
const db = require('../config/db');

class LivroRepository {
  async findAll() {
    const result = await db.query(`
      SELECT l.*, a.nome as autor_nome
      FROM livro l
      LEFT JOIN autor a ON l.autor_id = a.id
      ORDER BY l.id
    `);
    return result.rows;
  }

  async findById(id) {
    const result = await db.query(`
      SELECT l.*, a.nome as autor_nome
      FROM livro l
      LEFT JOIN autor a ON l.autor_id = a.id
      WHERE l.id = $1
    `, [id]);
    return result.rows[0];
  }

  async create(livroData) {
    const { titulo, ano_publicacao, paginas, isbn, autor_id } = livroData;
    const result = await db.query(
      'INSERT INTO livro (titulo, ano_publicacao, paginas, isbn, autor_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [titulo, ano_publicacao, paginas, isbn, autor_id]
    );
    return result.rows[0];
  }

  async update(id, livroData) {
    const { titulo, ano_publicacao, paginas, isbn, autor_id } = livroData;
    const result = await db.query(
      'UPDATE livro SET titulo = $1, ano_publicacao = $2, paginas = $3, isbn = $4, autor_id = $5 WHERE id = $6 RETURNING *',
      [titulo, ano_publicacao, paginas, isbn, autor_id, id]
    );
    return result.rows[0];
  }

  async delete(id) {
    const result = await db.query('DELETE FROM livro WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }

  async findByAutor(autorId) {
    const result = await db.query(`
      SELECT l.*, a.nome as autor_nome
      FROM livro l
      LEFT JOIN autor a ON l.autor_id = a.id
      WHERE l.autor_id = $1
      ORDER BY l.ano_publicacao
    `, [autorId]);
    return result.rows;
  }

  async findByAno(ano) {
    const result = await db.query(`
      SELECT l.*, a.nome as autor_nome
      FROM livro l
      LEFT JOIN autor a ON l.autor_id = a.id
      WHERE l.ano_publicacao = $1
      ORDER BY l.titulo
    `, [ano]);
    return result.rows;
  }

  async findByIsbn(isbn) {
    const result = await db.query(`
      SELECT l.*, a.nome as autor_nome
      FROM livro l
      LEFT JOIN autor a ON l.autor_id = a.id
      WHERE l.isbn = $1
    `, [isbn]);
    return result.rows[0];
  }

  async findWithCategorias(id) {
    const result = await db.query(`
      SELECT l.*, a.nome as autor_nome,
             ARRAY_AGG(c.nome) as categorias
      FROM livro l
      LEFT JOIN autor a ON l.autor_id = a.id
      LEFT JOIN livro_categorias lc ON l.id = lc.livro_id
      LEFT JOIN categoria c ON lc.categoria_id = c.id
      WHERE l.id = $1
      GROUP BY l.id, a.nome
    `, [id]);
    return result.rows[0];
  }
}

module.exports = new LivroRepository();