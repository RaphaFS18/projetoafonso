--  Criação da tabela de autores
CREATE TABLE IF NOT EXISTS autor( 
  id SERIAL PRIMARY KEY, 
  nome VARCHAR(100) NOT NULL,
  nacionalidade VARCHAR(50),
  data_nascimento DATE
);

CREATE TABLE IF NOT EXISTS livro(
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL,
  ano_publicacao INTEGER NOT NULL,
  paginas INTEGER NOT NULL,
  isbn VARCHAR(20) UNIQUE,
  autor_id INTEGER NOT NULL,
FOREIGN KEY(autor_id) REFERENCES autor(id)
);

CREATE TABLE IF NOT EXISTS categoria(
  id SERIAL PRIMARY KEY,
  NOME VARCHAR(50) NOT NULL,
  descricao TEXT
);

CREATE TABLE IF NOT EXISTS livro_categorias(
  id SERIAL PRIMARY KEY,
  livro_id INTEGER NOT NULL,
  categoria_id INTEGER NOT NULL,
  UNIQUE (livro_id, categoria_id),
  FOREIGN KEY(livro_id) REFERENCES livro(id),
  FOREIGN KEY(categoria_id) REFERENCES categoria(id)
);

-- Inserir autores
INSERT INTO autor (nome, nacionalidade, data_nascimento) VALUES
  ('Machado de Assis', 'Brasileiro', '1839-06-21'),
  ('Clarice Lispector', 'Brasileira', '1920-12-10'),
  ('George Orwell', 'Britânico', '1903-06-25');

-- Inserir livros
INSERT INTO livro (titulo, ano_publicacao, paginas, isbn, autor_id) VALUES
  ('Dom Casmurro', 1899, 256, '9788535914849', 1),
  ('Memórias Póstumas de Brás Cubas', 1881, 208, '9788535911121', 1),
  ('A Hora da Estrela', 1977, 96, '9788532506245', 2),
  ('1984', 1949, 328, '9780451524935', 3);

-- Inserir categorias
INSERT INTO categoria (nome, descricao) VALUES
  ('Romance', 'Narrativa longa de ficção'),
  ('Clássico', 'Obra de grande valor literário'),
  ('Distopia', 'Ficção sobre sociedades opressoras');

-- Inserir livro_categorias
INSERT INTO livro_categorias (livro_id, categoria_id) VALUES
  (1, 1), -- Dom Casmurro - Romance
  (1, 2), -- Dom Casmurro - Clássico
  (2, 1), -- Memórias Póstumas - Romance
  (2, 2), -- Memórias Póstumas - Clássico
  (3, 1), -- A Hora da Estrela - Romance
  (3, 2), -- A Hora da Estrela - Clássico
  (4, 2), -- 1984 - Clássico
  (4, 3); -- 1984 - Distopia