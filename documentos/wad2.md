
# Documentação da API REST - Sistema de Biblioteca

Esta documentação descreve todos os endpoints disponíveis na API do sistema de biblioteca.

**Base URL**: `http://localhost:3000/api`

## Índice
- [Autores](#autores)
- [Categorias](#categorias)
- [Livros](#livros)
- [Associações Livro-Categoria](#associações-livro-categoria)
- [Códigos de Status HTTP](#códigos-de-status-http)
- [Tratamento de Erros](#tratamento-de-erros)

---

## Autores

### Listar Todos os Autores
```http
GET /api/autores
```

**Descrição**: Retorna lista completa de todos os autores cadastrados no sistema.

**Resposta de Sucesso** (200):
```json
[
  {
    "id": 1,
    "nome": "Machado de Assis",
    "nacionalidade": "Brasileiro",
    "data_nascimento": "1839-06-21",
    "idade": 184
  }
]
```

### Buscar Autor por ID
```http
GET /api/autores/{id}
```

**Parâmetros**:
- `id` (path): ID numérico do autor

**Resposta de Sucesso** (200):
```json
{
  "id": 1,
  "nome": "Machado de Assis",
  "nacionalidade": "Brasileiro",
  "data_nascimento": "1839-06-21",
  "idade": 184
}
```

**Resposta de Erro** (404):
```json
{
  "error": "Autor não encontrado"
}
```

### Criar Novo Autor
```http
POST /api/autores
```

**Body**:
```json
{
  "nome": "Jorge Amado",
  "nacionalidade": "Brasileiro",
  "data_nascimento": "1912-08-10"
}
```

**Validações**:
- `nome`: Obrigatório, máximo 100 caracteres
- `nacionalidade`: Opcional, máximo 50 caracteres
- `data_nascimento`: Opcional, formato de data válido

**Resposta de Sucesso** (201):
```json
{
  "id": 2,
  "nome": "Jorge Amado",
  "nacionalidade": "Brasileiro",
  "data_nascimento": "1912-08-10",
  "idade": 111
}
```

### Atualizar Autor
```http
PUT /api/autores/{id}
```

**Parâmetros**:
- `id` (path): ID do autor a ser atualizado

**Body**: Mesmo formato do POST

**Resposta de Sucesso** (200): Dados atualizados do autor

### Excluir Autor
```http
DELETE /api/autores/{id}
```

**Resposta de Sucesso** (204): Sem conteúdo

### Buscar Autores por Nacionalidade
```http
GET /api/autores/nacionalidade?nacionalidade={nacionalidade}
```

**Query Parameters**:
- `nacionalidade`: Nome da nacionalidade para filtrar

**Exemplo**: `/api/autores/nacionalidade?nacionalidade=Brasileiro`

### Buscar Autores com Livros
```http
GET /api/autores/com-livros
```

**Descrição**: Retorna apenas autores que possuem ao menos um livro cadastrado.

...


