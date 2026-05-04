# first-project-nest

Meu primeiro projeto com NestJS — desenvolvido para aprender e explorar o ecossistema do framework, aplicando boas práticas de arquitetura como Clean Architecture, padrão Repository e separação por use cases.

## Tecnologias

- [NestJS](https://nestjs.com/) — Framework Node.js progressivo e modular.
- [Prisma](https://www.prisma.io/) — ORM de nova geração para Node.js e TypeScript.
- [SQLite](https://www.sqlite.org/) — Banco de dados leve para desenvolvimento local.
- [Swagger](https://swagger.io/) — Documentação automática da API via `@nestjs/swagger`.
- [Class Validator & Transformer](https://github.com/typestack/class-validator) — Validação e transformação de dados de entrada.

## Pré-requisitos

- Node.js (v18 ou superior)
- npm, yarn ou pnpm

## Configuração e Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/jhonatanffelipe/first-project-nest.git
   cd first-project-nest
   ```

2. **Instale as dependências:**

   ```bash
   yarn
   ```

3. **Configure as variáveis de ambiente:**

   Crie um arquivo `.env` na raiz do projeto:

   ```env
   PORT=3000
   DATABASE_URL="file:./dev.db"
   ```

4. **Execute as migrações do banco:**

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Inicie o servidor:**

   ```bash
   yarn start:dev
   ```

A API estará disponível em `http://localhost:3000` e a documentação Swagger em `http://localhost:3000/api/docs`.

## Estrutura do Projeto

```
src/
├── app.module.ts                        # Módulo raiz da aplicação
├── main.ts                              # Bootstrap (Swagger, pipes globais)
│
├── common/                              # Utilitários compartilhados entre módulos
│   ├── dtos/
│   │   ├── pagination.dto.ts            # Parâmetros de paginação (page, limit, sort)
│   │   ├── pagination-response.dto.ts   # Wrapper genérico de resposta paginada
│   │   └── default-filters.dto.ts       # Filtros comuns (filterField, filterValue)
│   ├── errors/
│   │   └── app.error.ts                 # AppError: exceção customizada com contexto
│   └── filtes/
│       └── http-exception.filter.ts     # Filtro global de exceções HTTP
│
├── database/
│   └── prisma.service.ts                # PrismaService com injeção de dependência
│
└── modules/
    └── team-members/                    # Módulo de membros do time
        ├── team-members.module.ts
        ├── dtos/
        │   ├── create-team-member-body.dto.ts
        │   └── create-team-member-response.dto.ts
        ├── repositories/
        │   ├── team-members.repository.ts           # Contrato abstrato (interface)
        │   └── prisma/
        │       └── prisma-team-members.repository.ts # Implementação com Prisma
        └── use-cases/
            ├── create-team-member/
            │   ├── create-team-member.controller.ts
            │   └── create-team-member.service.ts
            ├── find-all-team-members/
            │   ├── find-all-team-members.controller.ts
            │   └── find-all-team-members.service.ts
            └── find-team-member-by-id/
                ├── find-team-member-by-id.controller.ts
                └── find-team-member-by-id.service.ts
```

## Arquitetura e Padrões

- **Use Cases:** cada operação de negócio possui seu próprio par controller/service, tornando o código isolado, testável e fácil de estender.
- **Repository Pattern:** repositórios são definidos como classes abstratas, desacoplando a lógica de negócio da implementação de banco de dados (hoje Prisma, amanhã qualquer outro).
- **Módulos por domínio:** cada domínio agrupa seus use cases, DTOs e repositórios em um único módulo coeso.
- **DTOs com validação:** `class-validator` e `class-transformer` validam e tipam as requisições via `ValidationPipe` global.
- **Tratamento de erros centralizado:** `AppError` e `HttpExceptionFilter` padronizam todas as respostas de erro da API.
- **Paginação e filtros genéricos:** DTOs reutilizáveis de paginação (`page`, `limit`, `sortBy`, `sortOrder`) e filtragem dinâmica disponíveis para qualquer módulo.
- **Documentação automática:** Swagger com `@nestjs/swagger`, decoradores `@ApiTags`, `@ApiProperty` e respostas tipadas em todos os endpoints.

## Rotas da API

A documentação completa e interativa de todos os endpoints está disponível via Swagger UI:

**[http://localhost:3000/api/docs](http://localhost:3000/api/docs)**

Lá você encontra todos os recursos, parâmetros, exemplos de request/response e pode testar as rotas diretamente pelo navegador.

## Comandos Úteis

```bash
# Desenvolvimento com hot-reload
yarn start:dev

# Visualizar o banco de dados no browser
npx prisma studio

# Gerar o client Prisma após alterar o schema
npx prisma generate

# Criar nova migration
npx prisma migrate dev --name <nome-da-migration>
```
