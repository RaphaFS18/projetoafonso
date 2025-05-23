// repositories/livroCategoriaRepository.js
const db = require('../config/db');

class LivroCategoriaRepository {
  async findAll() {
    const result = await db.query(`
      SELECT lc.*, l.titulo as livro_titulo, c.nome as categoria_nome
      FROM livro_categorias lc
      LEFT JOIN livro l ON lc.livro_id = l.id
      LEFT JOIN categoria c ON lc.categoria_id = c.id
      ORDER BY lc.id
    `);
    return result.rows;
  }

  async findById(id) {
    const result = await db.query(`
      SELECT lc.*, l.titulo as livro_titulo, c.nome as categoria_nome
      FROM livro_categorias lc
      LEFT JOIN livro l ON lc.livro_id = l.id
      LEFT JOIN categoria c ON lc.categoria_id = c.id
      WHERE lc.id = $1
    `, [id]);
    return result.rows[0];
  }

  async create(livroId, categoriaId) {
    const result = await db.query(
      'INSERT INTO livro_categorias (livro_id, categoria_id) VALUES ($1, $2) RETURNING *',
      [livroId, categoriaId]
    );
    return result.rows[0];
  }

  async delete(livroId, categoriaId) {
    const result = await db.query(
      'DELETE FROM livro_categorias WHERE livro_id = $1 AND categoria_id = $2 RETURNING *',
      [livroId, categoriaId]
    );
    return result.rowCount > 0;
  }

  async deleteById(id) {
    const result = await db.query('DELETE FROM livro_categorias WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }

  async findByLivro(livroId) {
    const result = await db.query(`
      SELECT lc.*, c.nome as categoria_nome, c.descricao
      FROM livro_categorias lc
      LEFT JOIN categoria c ON lc.categoria_id = c.id
      WHERE lc.livro_id = $1
      ORDER BY c.nome
    `, [livroId]);
    return result.rows;
  }

  async findByCategoria(categoriaId) {
    const result = await db.query(`
      SELECT lc.*, l.titulo as livro_titulo, l.ano_publicacao
      FROM livro_categorias lc
      LEFT JOIN livro l ON lc.livro_id = l.id
      WHERE lc.categoria_id = $1
      ORDER BY l.titulo
    `, [categoriaId]);
    return result.rows;
  }

  async exists(livroId, categoriaId) {
    const result = await db.query(
      'SELECT id FROM livro_categorias WHERE livro_id = $1 AND categoria_id = $2',
      [livroId, categoriaId]
    );
    return result.rows.length > 0;
  }

  async deleteAllByLivro(livroId) {
    const result = await db.query(
      'DELETE FROM livro_categorias WHERE livro_id = $1 RETURNING *',
      [livroId]
    );
    return result.rowCount;
  }

  async deleteAllByCategoria(categoriaId) {
    const result = await db.query(
      'DELETE FROM livro_categorias WHERE categoria_id = $1 RETURNING *',
      [categoriaId]
    );
    return result.rowCount;
  }
}

module.exports = new LivroCategoriaRepository();