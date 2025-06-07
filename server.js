// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes'); // Agora aponta para routes/index.js

const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());
// Usando as rotas centralizadas
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});