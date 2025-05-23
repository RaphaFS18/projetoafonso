// repositories/autorRepository.js
const db = require('../config/db');

class AutorRepository {
  async findAll() {
    const result = await db.query('SELECT * FROM autor ORDER BY id');
    return result.rows;
  }

  async findById(id) {
    const result = await db.query('SELECT * FROM autor WHERE id = $1', [id]);
    return result.rows[0];
  }

  async create(autorData) {
    const { nome, nacionalidade, data_nascimento } = autorData;
    const result = await db.query(
      'INSERT INTO autor (nome, nacionalidade, data_nascimento) VALUES ($1, $2, $3) RETURNING *',
      [nome, nacionalidade, data_nascimento]
    );
    return result.rows[0];
  }

  async update(id, autorData) {
    const { nome, nacionalidade, data_nascimento } = autorData;
    const result = await db.query(
      'UPDATE autor SET nome = $1, nacionalidade = $2, data_nascimento = $3 WHERE id = $4 RETURNING *',
      [nome, nacionalidade, data_nascimento, id]
    );
    return result.rows[0];
  }

  async delete(id) {
    const result = await db.query('DELETE FROM autor WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }

  async findByNacionalidade(nacionalidade) {
    const result = await db.query('SELECT * FROM autor WHERE nacionalidade = $1', [nacionalidade]);
    return result.rows;
  }

  async findAutoresComLivros() {
    const result = await db.query(`
      SELECT DISTINCT a.id, a.nome, a.nacionalidade, a.data_nascimento
      FROM autor a
      INNER JOIN livro l ON a.id = l.autor_id
      ORDER BY a.nome
    `);
    return result.rows;
  }
}

module.exports = new AutorRepository();