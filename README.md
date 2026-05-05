# 🚀 First API Nest

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" />
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger" />
</p>

## 📝 Descrição

Este repositório é o meu **campo de treinamento pessoal** para o ecossistema NestJS. Ele nasceu do desejo de tirar a teoria do papel e entender, na prática, como o framework funciona "sob o capô".

Por ser o meu **primeiro contato com NestJS**, foquei menos em funcionalidades complexas e mais em **consolidar os alicerces**: como os módulos se conversam, como funciona a injeção de dependências e como organizar um código que não se torne uma bagunça conforme cresce. Aqui, usei o gerenciamento de membros de equipe como uma desculpa para aplicar conceitos de **Clean Architecture** e **Repository Pattern**, aprendendo a separar o que é regra de negócio do que é apenas banco de dados.

É, acima de tudo, um **registro da minha evolução** e um laboratório para testar padrões de desenvolvimento modernos.

## ✨ Funcionalidades (O que aprendi/implementei)

- **Fundamentos do NestJS:** Criação de módulos, controladores e serviços.
- **Integração com Banco de Dados:** Uso do **Prisma ORM** com **SQLite** para persistência simples e eficiente.
- **Gerenciamento de Membros:** CRUD completo (Criar, Listar, Buscar por ID, Atualizar e Deletar).
- **Arquitetura Limpa:** Separação entre a infraestrutura (Prisma) e as regras de negócio.
- **Paginação e Filtros:** Implementação de listagem inteligente com parâmetros de busca.
- **Documentação Automática:** Configuração do **Swagger** para visualizar e testar as rotas da API.
- **Validação de Dados:** Uso de DTOs e Pipes para garantir que a API receba dados corretos.

## 🛠️ Tecnologias Utilizadas

- **[NestJS](https://nestjs.com/)** - Framework principal de aprendizado.
- **[TypeScript](https://www.typescriptlang.org/)** - Linguagem base do projeto.
- **[Prisma](https://www.prisma.io/)** - ORM moderno para interação com o banco de dados.
- **[SQLite](https://www.sqlite.org/)** - Banco de dados leve, ideal para estudos locais.
- **[Swagger](https://swagger.io/)** - Documentação interativa da API.

## 🚀 Como Executar o Projeto

### Pré-requisitos

- **Node.js** (v18+)
- **Yarn** ou **NPM**

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/jhonatanffelipe/first-project-nest.git
   cd first-project-nest
   ```

2. Instale as dependências:
   ```bash
   yarn install
   ```

3. Configure o ambiente:
   Crie um arquivo `.env` na raiz do projeto:
   ```env
   PORT=3000
   DATABASE_URL="file:./dev.db"
   ```

4. Prepare o banco de dados:
   ```bash
   npx prisma migrate dev
   ```

### Iniciando a Aplicação

```bash
# Modo de desenvolvimento
yarn start:dev
```

A API estará rodando em `http://localhost:3000` e a documentação em `http://localhost:3000/api/docs`.

## 🏗️ Estrutura do Projeto

A organização segue os princípios de modularidade aprendidos:

```text
src/
├── common/             # Utilitários, DTOs globais e tratamento de erros
├── database/           # Configuração e serviços do Prisma
└── modules/
    └── team-members/   # Domínio de estudo: Membros do Time
        ├── repositories/ # Onde o Repository Pattern é aplicado
        └── use-cases/  # Lógica de negócio isolada por operação
```

## 🧩 Conceitos Aplicados

- **Use Cases:** Cada funcionalidade possui seu próprio contexto, facilitando a manutenção.
- **Repository Pattern:** Desacoplamento da lógica de negócio da implementação do banco de dados.
- **Dependency Injection:** Gerenciamento eficiente de dependências pelo NestJS.

## 🗺️ Roadmap de Estudos

- [x] CRUD de Membros do Time
- [x] Documentação com Swagger
- [x] Integração com Prisma e SQLite
- [x] Implementação de Testes Unitários
- [ ] Implementação de Testes de Integração (Iniciado: CreateTeamMember)
- [ ] Refinamento de Padrões de Arquitetura

---

<p align="center">
  🚀 Em constante aprendizado por <a href="https://github.com/jhonatanffelipe">Jhonatan Felipe</a>
</p>
