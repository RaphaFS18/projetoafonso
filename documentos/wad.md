# Web Application Document - Projeto Individual - Módulo 2 - Inteli

**_Os trechos em itálico servem apenas como guia para o preenchimento da seção. Por esse motivo, não devem fazer parte da documentação final._**

## Lista de tarefas 

#### Raphael Fischer

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução (Semana 01)

Este projeto tem como objetivo o desenvolvimento de uma aplicação baseada na arquitetura MVC utilizando **Node.js** e **SQLite**, com foco na criação e gestão de um banco de dados relacional para armazenar informações sobre livros, autores e categorias literárias.

Para isso, foram definidas quatro tabelas principais:

- **autor**: Armazena dados sobre os autores, como `nome`, `nacionalidade` e `data_nascimento`;
- **livro**: Contém informações bibliográficas dos livros, incluindo `titulo`, `ano_publicacao`, `paginas` e `isbn`. Cada livro está obrigatoriamente associado a um autor por meio da chave estrangeira `autor_id`;
- **categoria**: Representa as categorias literárias, com os campos `nome` e `descricao`;
- **livro_categorias**: Tabela intermediária que implementa a relação muitos-para-muitos entre livros e categorias, referenciando os IDs das tabelas `livro` e `categoria`.

A estrutura do banco de dados foi cuidadosamente modelada para garantir a integridade referencial por meio de chaves estrangeiras, assegurando a consistência das relações entre as entidades. Esta primeira etapa marca o início do projeto, com foco na **modelagem de dados** e na construção da base estrutural que dará suporte às funcionalidades da aplicação.

---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas (Semana 01)

### Nome: Júlia Fernandes


Idade: 42 anos


Profissão: Bibliotecária em uma universidade pública


### Objetivo:

 Organizar o acervo da biblioteca universitária de forma digital e acessível.


### Necessidades:
-Cadastrar livros novos com facilidade.


-Consultar autores por nacionalidade ou data de nascimento.


-Associar livros a múltiplas categorias para facilitar a busca dos alunos.


### Desafios:

-Sistemas antigos são lentos e difíceis de usar.

-Evitar cadastros duplicados ou erros de digitação.

-Dispositivos mais usados: Computador da biblioteca e tablet.

### Persona 2 – Marcelo, o Pesquisador Literário

### Nome: Marcelo Azevedo

Idade: 30 anos

Profissão: Doutorando em Literatura Brasileira

### Objetivo: 
-Analisar autores e suas obras por época, nacionalidade e temas.

### Necessidades:

-Buscar livros por autor, ano de publicação ou categoria.

-Ver rapidamente quais livros um autor escreveu.

-Obter dados organizados e confiáveis para exportar em suas pesquisas.

### Desafios:

Sites com poucas opções de filtro.

Dificuldade em encontrar informações completas e atualizadas.

Dispositivos mais usados: Notebook pessoal e celular.


### 2.2. User Stories (Semana 01)

### User Story 1

 – Cadastro e Organização de Livros (Júlia, a Bibliotecária)

ID: US01

Como bibliotecária,
quero cadastrar livros com título, autor, ano de publicação e categorias,
para que o acervo da biblioteca fique organizado e fácil de consultar pelos alunos.

### User Story 2 

– Consulta de Obras por Autor (Marcelo, o Pesquisador)

ID: US02

Como pesquisador literário,
quero visualizar todos os livros de um autor específico,
para que eu possa analisar sua produção ao longo do tempo.



## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados  (Semana 3)

![modelo](https://res.cloudinary.com/dpks4ergy/image/upload/v1746807720/Captura_de_Tela_2025-05-09_%C3%A0s_13.20.56_qzexwj.png)

Este é o meu modelo.

*Posicione também o modelo físico com o Schema do BD (arquivo .sql)*

### 3.1.1 BD e Models (Semana 5)
# Models do Sistema de Biblioteca

O sistema possui 4 models principais que implementam a lógica de negócio para um sistema de gerenciamento de biblioteca. Todos seguem o padrão de arquitetura em camadas, separando a lógica de domínio dos repositórios de dados.

---

## 1. AutorModel (`autorModel.js`)

**Responsabilidade:** Gerenciar dados e operações relacionadas aos autores de livros.

### Atributos da Classe:
- `id`: Identificador único do autor
- `nome`: Nome completo do autor (**obrigatório**, máx. 100 caracteres)
- `nacionalidade`: País de origem (opcional, máx. 50 caracteres)
- `data_nascimento`: Data de nascimento (opcional)

### Métodos Estáticos (CRUD):
- `getAll()`: Retorna todos os autores
- `getById(id)`: Busca autor por ID
- `create(data)`: Cria novo autor com validações
- `update(id, data)`: Atualiza dados do autor
- `delete(id)`: Remove autor do sistema
- `getByNacionalidade(nacionalidade)`: Filtra autores por nacionalidade
- `getAutoresComLivros()`: Retorna autores que possuem livros cadastrados

### Métodos de Instância:
- `getIdade()`: Calcula idade atual do autor baseada na data de nascimento
- `toJSON()`: Serialização personalizada incluindo idade calculada

### Validações Implementadas:
- Nome obrigatório e não vazio
- Limite de caracteres para `nome` (100) e `nacionalidade` (50)
- Sanitização de dados (`trim`)

---

## 2. CategoriaModel (`categoriaModel.js`)

**Responsabilidade:** Gerenciar categorias de livros e suas associações.

### Atributos da Classe:
- `id`: Identificador único da categoria
- `nome`: Nome da categoria (**obrigatório**, máx. 50 caracteres, **único**)
- `descricao`: Descrição detalhada (opcional)
- `total_livros`: Contador de livros associados

### Métodos Estáticos (CRUD):
- `getAll()`: Lista todas as categorias
- `getById(id)`: Busca categoria por ID
- `create(data)`: Cria nova categoria
- `update(id, data)`: Atualiza categoria existente
- `delete(id)`: Remove categoria
- `getByNome(nome)`: Busca por nome
- `getCategoriasComLivros()`: Categorias que possuem livros
- `getLivrosByCategoria(categoriaId)`: Lista livros de uma categoria

### Métodos de Instância:
- `temLivros()`: Verifica se a categoria possui livros associados
- `toJSON()`: Inclui flag `tem_livros` na serialização

### Validações Implementadas:
- Nome obrigatório e único no sistema
- Limite de 50 caracteres para o nome
- Verificação de duplicidade antes de criar/atualizar

---

## 3. LivroModel (`livroModel.js`)

**Responsabilidade:** Gerenciar informações dos livros e suas relações com autores.

### Atributos da Classe:
- `id`: Identificador único do livro
- `titulo`: Título do livro (**obrigatório**, máx. 200 caracteres)
- `ano_publicacao`: Ano de publicação (**obrigatório**, válido)
- `paginas`: Número de páginas (**obrigatório**, > 0)
- `isbn`: Código ISBN (opcional, máx. 20 caracteres, **único**)
- `autor_id`: Referência ao autor (**obrigatório**)
- `autor_nome`: Nome do autor (preenchido via join)
- `categorias`: Array de categorias associadas

### Métodos Estáticos (CRUD):
- `getAll()`: Lista todos os livros
- `getById(id)`: Busca livro por ID
- `create(data)`: Cria novo livro
- `update(id, data)`: Atualiza livro existente
- `delete(id)`: Remove livro
- `getByAutor(autorId)`: Livros de um autor específico
- `getByAno(ano)`: Livros publicados em determinado ano
- `getByIsbn(isbn)`: Busca por ISBN
- `getWithCategorias(id)`: Livro com suas categorias

### Métodos de Instância:
- `getIdadeLivro()`: Calcula quantos anos tem o livro
- `isClassico()`: Determina se é um clássico (50+ anos)
- `toJSON()`: Inclui campos calculados na serialização

### Validações Implementadas:
- Título obrigatório (máx. 200 caracteres)
- Ano válido (não pode ser futuro)
- Páginas obrigatório (> 0)
- Autor obrigatório
- ISBN único quando fornecido
- Conversão de tipos numéricos

---

## 4. LivroCategoriaModel (`livroCategoriaModel.js`)

**Responsabilidade:** Gerenciar o relacionamento many-to-many entre livros e categorias.

### Atributos da Classe:
- `id`: Identificador da associação
- `livro_id`: ID do livro
- `categoria_id`: ID da categoria
- `livro_titulo`: Título do livro (via join)
- `categoria_nome`: Nome da categoria (via join)

### Métodos Estáticos:
- `getAll()`: Lista todas as associações
- `getById(id)`: Busca associação por ID
- `create(livroId, categoriaId)`: Cria nova associação
- `delete(livroId, categoriaId)`: Remove associação específica
- `deleteById(id)`: Remove por ID da associação
- `getByLivro(livroId)`: Categorias de um livro
- `getByCategoria(categoriaId)`: Livros de uma categoria
- `deleteAllByLivro(livroId)`: Remove todas as categorias de um livro
- `deleteAllByCategoria(categoriaId)`: Remove todos os livros de uma categoria

### Validações Implementadas:
- IDs obrigatórios para livro e categoria
- Verificação de duplicidade (evita associações repetidas)
- Métodos para limpeza em cascata

---

## Características Gerais da Implementação

### Padrões Utilizados:
- **Active Record Pattern**: Cada model encapsula dados e comportamentos
- **Repository Pattern**: Separação entre lógica de negócio e acesso a dados
- **Factory Pattern**: Construtores que criam instâncias a partir de dados brutos

### Funcionalidades Transversais:
- **Validação de Dados**: Cada model implementa suas próprias regras de negócio
- **Sanitização**: Limpeza automática de strings (`trim`)
- **Conversão de Tipos**: Garantia de tipos corretos para números
- **Serialização Customizada**: Método `toJSON()` com campos calculados
- **Tratamento de Erros**: Mensagens descritivas para validações

### Relacionamentos:
- `Autor → Livros` (1:N)
- `Livro → Categorias` (N:M via `livroCategoriaModel`)
- `Categoria → Livros` (N:M via `livroCategoriaModel`)

### Campos Calculados:

### 3.2. Arquitetura (Semana 5)

![image](https://res.cloudinary.com/dpks4ergy/image/upload/v1750094396/projeto_afonsov.drawio_nmqlhx.png)

**Instruções para criação do diagrama de arquitetura**  
- **Model**: A camada que lida com a lógica de negócios e interage com o banco de dados.
- **View**: A camada responsável pela interface de usuário.
- **Controller**: A camada que recebe as requisições, processa as ações e atualiza o modelo e a visualização.
  
### 3.3. Wireframes (Semana 03)

### 3.4. Guia de estilos (Semana 05)

### 3.5. Protótipo de alta fidelidade (Semana 05)
![image](https://res.cloudinary.com/dpks4ergy/image/upload/v1750094442/Captura_de_Tela_2025-06-16_%C3%A0s_14.20.11_c7d16h.png)
![image](https://res.cloudinary.com/dpks4ergy/image/upload/v1750094442/Captura_de_Tela_2025-06-16_%C3%A0s_14.20.20_k5gndx.png)
### 3.6. WebAPI e endpoints (Semana 05)

<a href="wad2.md">Abrir especificações endpoints</a>


### 3.7 Interface e Navegação (Semana 07)

O desenvolvimento do frontend do sistema web foi realizado utilizando as tecnologias HTML5, CSS3 e JavaScript, com foco em criar uma interface intuitiva, responsiva e de fácil usabilidade. Todas as páginas seguem um padrão visual moderno, com navegação clara e componentes reutilizáveis, mantendo a identidade visual do sistema.

As interfaces implementadas incluem:

Página inicial com navegação entre os principais módulos (Livros, Autores, Categorias)

Formulários de cadastro com validação de campos e mensagens de erro e sucesso

Componentes visuais como ícones, breadcrumbs, menus, botões e indicadores de carregamento


Destaques visuais para facilitar a experiência do usuário, como campos obrigatórios, placeholders e contadores de caracteres.
Além disso, foram utilizados ícones da biblioteca Font Awesome para enriquecer a usabilidade e o design. Também foram aplicados efeitos visuais como hover, transições suaves e feedback visual em ações como salvar de salvar o autor.
![image](https://res.cloudinary.com/dpks4ergy/image/upload/v1750094771/Captura_de_Tela_2025-06-16_%C3%A0s_14.25.50_svrhnt.png)



## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

https://youtu.be/egIr7uXzW4o?si=t9WCeFSzBsulLfLq

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

Fazer um menu com todos os livros, autores e categorias cadastrados com mais informações como de fotos, curiosidades etc...




## <a name="c5"></a>5. Referências

Usei tudo como exemplo, nada de real.<br>

---
---