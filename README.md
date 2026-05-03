# NestJS + Prisma Masterclass

Este projeto foi desenvolvido seguindo a Masterclass da Rocketseat sobre NestJS, focando na construção de uma API robusta, escalável e tipada utilizando Prisma ORM.

## Tecnologias

- [NestJS](https://nestjs.com/) - Framework Node.js progressivo.
- [Prisma](https://www.prisma.io/) - ORM de nova geração para Node.js e TypeScript.
- [SQLite](https://www.sqlite.org/) - Banco de dados leve para desenvolvimento.
- [Swagger](https://swagger.io/) - Documentação automática da API via `@nestjs/swagger`.
- [Class Validator & Transformer](https://github.com/typestack/class-validator) - Validação de dados de entrada.

## Pré-requisitos

- Node.js (v16 ou superior)
- npm, yarn ou pnpm

## Configuração e Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/jhonatanffelipe/masterclass-nest.git
   cd masterclass-nest
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
├── main.ts                              # Bootstrap da aplicação (Swagger, pipes globais)
│
├── common/                              # Utilitários e recursos compartilhados
│   ├── errors/
│   │   └── app.error.ts                # Classe AppError (estende HttpException)
│   └── filtes/
│       └── http-exception.filter.ts    # Filtro global de exceções HTTP
│
├── database/
│   └── prisma.service.ts               # PrismaService (injeção de dependência)
│
└── modules/
    └── team-members/                   # Módulo de membros do time
        ├── team-members.module.ts
        ├── team-members.controller.ts
        ├── team-members.service.ts
        ├── dtos/
        │   ├── create-team-member-body.dto.ts
        │   └── create-team-member-response.dto.ts
        └── repositories/
            ├── team-members.repository.ts          # Contrato abstrato
            └── prisma/
                └── prisma-team-members.repository.ts  # Implementação com Prisma
```

## Arquitetura e Padrões

- **Inversão de Dependência:** Repositórios são definidos como classes abstratas, permitindo trocar a implementação (ex: Prisma → TypeORM) sem alterar a lógica de negócio.
- **Módulos por domínio:** Cada domínio (ex: `team-members`) agrupa controller, service, DTOs e repositórios em seu próprio módulo.
- **DTOs com validação:** `class-validator` e `class-transformer` validam e tipam o corpo das requisições via `ValidationPipe` global.
- **Tratamento de erros centralizado:** `AppError` e `HttpExceptionFilter` padronizam as respostas de erro da API.
- **Documentação automática:** Swagger configurado globalmente com `@nestjs/swagger`, decoradores `@ApiTags`, `@ApiProperty` e `@ApiCreatedResponse` nos endpoints.

## Rotas da API

### `POST /team-members`

Cria um novo membro no time.

**Request body:**
```json
{
  "name": "Jhonatan Nascimento",
  "function": "CEO"
}
```

**Response `201`:**
```json
{
  "id": "uuid",
  "name": "Jhonatan Nascimento",
  "function": "CEO"
}
```

> Retorna `400` se já existir um membro com o mesmo nome.

## Comandos Úteis

```bash
# Desenvolvimento com hot-reload
yarn start:dev

# Visualizar o banco de dados
npx prisma studio

# Gerar o client Prisma após alterar o schema
npx prisma generate
```
