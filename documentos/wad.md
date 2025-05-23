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

    Persona 1 – Ana, a Estudante Organizada
Nome: Ana Souza
Idade: 21 anos
Profissão: Estudante de Engenharia
Objetivo: Manter o controle de suas tarefas da faculdade, como trabalhos, provas e reuniões de grupo.
Necessidades: Um sistema prático para cadastrar, visualizar e marcar tarefas como concluídas.
Desafios: Esquecer prazos e perder tempo procurando o que precisa ser feito.
Dispositivo mais usado: Notebook pessoal e celular.
    Persona 2 – Carlos, o Profissional Atarefado
Nome: Carlos Lima
Idade: 35 anos
Profissão: Analista de Sistemas
Objetivo: Organizar pequenas tarefas diárias que surgem no trabalho.
Necessidades: Rápido acesso para adicionar e remover tarefas durante o expediente.
Desafios: Acúmulo de atividades sem acompanhamento adequado.
Dispositivo mais usado: Computador do trabalho.


### 2.2. User Stories (Semana 01)

US01	Como usuário, quero cadastrar uma nova tarefa para lembrar do que preciso fazer e ver uma lista com todas as tarefas.
US02	Como usuário, quero marcar uma tarefa como concluída para saber que já a finalizei.

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados  (Semana 3)

![modelo](https://res.cloudinary.com/dpks4ergy/image/upload/v1746807720/Captura_de_Tela_2025-05-09_%C3%A0s_13.20.56_qzexwj.png)

Este é o meu modelo.

*Posicione também o modelo físico com o Schema do BD (arquivo .sql)*

### 3.1.1 BD e Models (Semana 5)
*Descreva aqui os Models implementados no sistema web*

### 3.2. Arquitetura (Semana 5)

*Posicione aqui o diagrama de arquitetura da sua solução de aplicação web. Atualize sempre que necessário.*

**Instruções para criação do diagrama de arquitetura**  
- **Model**: A camada que lida com a lógica de negócios e interage com o banco de dados.
- **View**: A camada responsável pela interface de usuário.
- **Controller**: A camada que recebe as requisições, processa as ações e atualiza o modelo e a visualização.
  
*Adicione as setas e explicações sobre como os dados fluem entre o Model, Controller e View.*

### 3.3. Wireframes (Semana 03)

*Posicione aqui as imagens do wireframe construído para sua solução e, opcionalmente, o link para acesso (mantenha o link sempre público para visualização).*

### 3.4. Guia de estilos (Semana 05)

*Descreva aqui orientações gerais para o leitor sobre como utilizar os componentes do guia de estilos de sua solução.*


### 3.5. Protótipo de alta fidelidade (Semana 05)

*Posicione aqui algumas imagens demonstrativas de seu protótipo de alta fidelidade e o link para acesso ao protótipo completo (mantenha o link sempre público para visualização).*

### 3.6. WebAPI e endpoints (Semana 05)

*Utilize um link para outra página de documentação contendo a descrição completa de cada endpoint. Ou descreva aqui cada endpoint criado para seu sistema.*  

### 3.7 Interface e Navegação (Semana 07)

*Descreva e ilustre aqui o desenvolvimento do frontend do sistema web, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

*VIDEO: Insira o link do vídeo demonstrativo nesta seção*
*Descreva e ilustre aqui o desenvolvimento do sistema web completo, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

*Indique pontos fortes e pontos a melhorar de maneira geral.*
*Relacione também quaisquer outras ideias que você tenha para melhorias futuras.*



## <a name="c5"></a>5. Referências

_Incluir as principais referências de seu projeto, para que seu parceiro possa consultar caso ele se interessar em aprofundar. Um exemplo de referência de livro e de site:_<br>

---
---