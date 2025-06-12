// server.js
const express = require('express');

const path = require('path');

const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/index'); // Agora aponta para routes/index.js

app.use(cors({ origin: '*' }));
app.use(express.json()); // Middleware para ler corpo das requisições em JSON
// Usando as rotas centralizadas
app.use('/api', routes);
app.use(express.static(path.join(__dirname, 'views/pages')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Adicionando rotas para servir as páginas HTML
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

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});