// repositories/categoriaRepository.js
const db = require('../config/db');

class CategoriaRepository {
  async findAll() {
    const result = await db.query('SELECT * FROM categoria ORDER BY nome');
    return result.rows;
  }

  async findById(id) {
    const result = await db.query('SELECT * FROM categoria WHERE id = $1', [id]);
    return result.rows[0];
  }

  async create(categoriaData) {
    const { nome, descricao } = categoriaData;
    const result = await db.query(
      'INSERT INTO categoria (nome, descricao) VALUES ($1, $2) RETURNING *',
      [nome, descricao]
    );
    return result.rows[0];
  }

  async update(id, categoriaData) {
    const { nome, descricao } = categoriaData;
    const result = await db.query(
      'UPDATE categoria SET nome = $1, descricao = $2 WHERE id = $3 RETURNING *',
      [nome, descricao, id]
    );
    return result.rows[0];
  }

  async delete(id) {
    const result = await db.query('DELETE FROM categoria WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }

  async findByNome(nome) {
    const result = await db.query('SELECT * FROM categoria WHERE nome ILIKE $1', [`%${nome}%`]);
    return result.rows;
  }

  async findCategoriasComLivros() {
    const result = await db.query(`
      SELECT DISTINCT c.id, c.nome, c.descricao,
             COUNT(lc.livro_id) as total_livros
      FROM categoria c
      LEFT JOIN livro_categorias lc ON c.id = lc.categoria_id
      GROUP BY c.id, c.nome, c.descricao
      ORDER BY c.nome
    `);
    return result.rows;
  }

  async findLivrosByCategoria(categoriaId) {
    const result = await db.query(`
      SELECT l.*, a.nome as autor_nome
      FROM livro l
      LEFT JOIN autor a ON l.autor_id = a.id
      INNER JOIN livro_categorias lc ON l.id = lc.livro_id
      WHERE lc.categoria_id = $1
      ORDER BY l.titulo
    `, [categoriaId]);
    return result.rows;
  }
}

module.exports = new CategoriaRepository();