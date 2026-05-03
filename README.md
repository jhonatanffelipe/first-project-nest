# NestJS + Prisma Masterclass

Este projeto foi desenvolvido seguindo a Masterclass da Rocketseat sobre NestJS, focando na construção de uma API robusta, escalável e tipada utilizando Prisma ORM.

## 🚀 Tecnologias

- [NestJS](https://nestjs.com/) - Framework Node.js progressivo.
- [Prisma](https://www.prisma.io/) - ORM de nova geração para Node.js e TypeScript.
- [SQLite](https://www.sqlite.org/) - Banco de dados leve para desenvolvimento.
- [Class Validator & Transformer](https://github.com/typestack/class-validator) - Validação de dados de entrada.

## 📋 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- Node.js (v16 ou superior)
- npm, yarn ou pnpm

## 🔧 Configuração e Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/jhonatanffelipe/masterclass-nest.git
   cd masterclass-nest
   ```

2. **Instale as dependências:**

   ```bash
   yarn
   ```

3. **Configure o Prisma:**

   O projeto utiliza SQLite por padrão. Inicialize o Prisma e gere as migrações:

   ```bash
   npx prisma migrate dev --name init
   ```

4. **Inicie o servidor:**

   ```bash
   npm run start:dev
   ```

## 🛠️ Utilizando o Prisma no Projeto

### 1. Definindo o Schema

O arquivo principal de configuração do banco está em `prisma/schema.prisma`. Para adicionar novos modelos:

```prisma
model Member {
  id       String @id
  name     String
  function String
}
```

### 2. Prisma Service

Para utilizar o Prisma dentro do NestJS, foi criado um `PrismaService` que estende o `PrismaClient` para facilitar a injeção de dependência:

- Localizado em: `src/database/prisma.service.ts`

### 3. Gerenciando o Banco (Prisma Studio)

Para visualizar e editar os dados do banco de dados de forma visual, execute:

```bash
npx prisma studio
```

## 🏗️ Arquitetura e Padrões

- **Inversão de Dependência:** O projeto utiliza classes abstratas para definir contratos de repositórios, permitindo trocar a implementação do banco de dados (ex: trocar Prisma por TypeORM) sem afetar a lógica de negócio.
- **DTOs:** Utilizados para tipar e validar o corpo das requisições HTTP (`@Body()`).
- **Validation Pipes:** Configuração global para capturar erros de validação automaticamente.

## 🛣️ Rotas Principais

### `POST /app/hello`

Cria um novo membro no time (Exemplo da aula).

```json
{
  "name": "Diego Fernandes",
  "function": "CTO"
}
```
