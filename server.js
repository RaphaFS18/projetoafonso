// server.js
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const cors = require('cors');

// Import your existing route index
const routes = require('./routes/index');

// Import the new LivroCategoriaController
const livroCategoriaController = require('./controllers/livroCategoriaController'); // <-- NEW LINE

app.use(cors({ origin: '*' }));
app.use(express.json()); // Middleware para ler corpo das requisições em JSON

// Use your centralized API routes (this covers /api/livros, /api/autores, etc.)
app.use('/api', routes);

// Add the new route for book-category association directly
// This handles POST requests to /api/livros-categorias/associar
app.post('/api/livros-categorias/associar', livroCategoriaController.associarLivroCategoria); // <-- CORRECTED LINE

// Serve static HTML pages (ensure views/pages is correct)
app.use(express.static(path.join(__dirname, 'views/pages')));

// Body-parser setup (Note: express.json() handles JSON, this is for URL-encoded)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // This is redundant if express.json() is used above, but often kept.

// Routes to serve specific HTML pages (for direct access)
app.get('/cadastrolivro.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/pages/cadastrolivro.html'));
});

app.get('/cadastroautor.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/pages/cadastroautor.html'));
});

app.get('/cadastrocategoria.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/pages/cadastrocategoria.html'));
});

app.get('/inicio.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/pages/inicio.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});