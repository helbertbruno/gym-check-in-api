🏋️ Gym Check-in API

API RESTful para gerenciamento de academias e check-ins de usuários, construída seguindo os princípios de SOLID e Clean Architecture, com cobertura completa de testes e pipeline de CI/CD automatizado.

📋 Sobre o projeto

Aplicação backend que permite que usuários se cadastrem, façam login, busquem academias próximas por geolocalização e realizem check-in nelas — com regras de negócio como limite de distância máxima, validação de check-in duplicado no mesmo dia e controle de acesso por papel (usuário comum vs administrador).

O projeto foi desenvolvido como prática avançada de arquitetura backend, aplicando:

SOLID nos casos de uso e repositórios
Repository Pattern com implementações in-memory (testes) e Prisma (produção)
Factory Pattern para injeção de dependências dos casos de uso
RBAC (Role-Based Access Control) para rotas administrativas
Autenticação JWT com access token + refresh token via cookie httpOnly
Testes unitários e E2E com cobertura de todos os fluxos principais
CI/CD com GitHub Actions, incluindo testes E2E contra banco Postgres real
🚀 Tecnologias
Categoria	Tecnologias
Runtime	Node.js 22
Linguagem	TypeScript
Framework	Fastify
ORM	Prisma
Banco de dados	PostgreSQL (prod/E2E) · SQLite (dev)
Autenticação	JWT (@fastify/jwt) + Cookies (@fastify/cookie)
Validação	Zod
Testes	Vitest + Supertest
CI/CD	GitHub Actions
Containerização	Docker (banco de dados em ambiente de teste)
⚙️ Funcionalidades
Usuários
✅ Cadastro de usuário
✅ Autenticação (login) com JWT
✅ Refresh token via cookie httpOnly
✅ Perfil do usuário autenticado
Academias
✅ Cadastro de academia (restrito a administradores)
✅ Busca de academias por nome
✅ Busca de academias próximas por geolocalização (latitude/longitude)
Check-ins
✅ Realizar check-in em uma academia
✅ Validação de distância máxima permitida
✅ Validação de check-in duplicado no mesmo dia
✅ Histórico de check-ins do usuário
✅ Métricas de check-ins do usuário
✅ Validação de check-in (restrito a administradores)
🔐 Autenticação e RBAC

A API utiliza dois níveis de token:

Access token: JWT de curta duração (10min), enviado no header Authorization.
Refresh token: JWT de longa duração (7 dias), armazenado em cookie httpOnly e usado para renovar o access token sem exigir novo login.

Rotas administrativas (como validar check-in ou cadastrar academia) são protegidas por um middleware de verificação de papel (role), com enum ADMIN / MEMBER definido no schema do Prisma.

🧪 Testes

O projeto possui duas suítes de teste independentes:

bash
# Testes unitários (usam repositórios in-memory)
npm run test

# Testes E2E (usam banco Postgres real via Supertest)
npm run test:e2e

Os testes E2E cobrem todos os endpoints da aplicação de ponta a ponta, incluindo o fluxo completo de autenticação, refresh token e regras de negócio de check-in.

🔄 CI/CD

O projeto possui dois workflows automatizados no GitHub Actions:

run-unit-tests.yml

Disparado em todo push. Sobe uma VM limpa, instala dependências e roda a suíte de testes unitários (repositórios in-memory, sem dependência externa).

run-e2e-tests.yml

Disparado em todo Pull Request. Sobe um container Postgres real como serviço, aplica as variáveis de ambiente necessárias e executa a suíte de testes E2E completa contra banco de dados real — validando o comportamento da aplicação em condições próximas de produção antes de qualquer merge na main.

🏗️ Como rodar o projeto localmente
Pré-requisitos
Node.js 22+
Docker (para o banco de dados)
Passo a passo
bash
# Clonar o repositório
git clone https://github.com/helbertbruno/gym-check-in-api.git
cd gym-check-in-api

# Instalar dependências
npm install

# Copiar variáveis de ambiente
cp .env.example .env

# Subir o banco de dados via Docker
docker-compose up -d

# Rodar as migrations
npx prisma migrate dev

# Iniciar o servidor
npm run start:dev
📁 Estrutura do projeto
src/
├── env/                    # Validação de variáveis de ambiente
├── http/
│   ├── controllers/        # Controllers organizados por domínio
│   │   ├── users/
│   │   ├── gyms/
│   │   └── check-ins/
│   └── middlewares/        # Middlewares de autenticação e RBAC
├── repositories/           # Contratos + implementações (in-memory e Prisma)
├── use-cases/               # Regras de negócio (SOLID) + factories
├── utils/                  # Funções utilitárias (ex: cálculo de distância)
├── app.ts                  # Configuração da aplicação Fastify
└── server.ts                # Ponto de entrada da aplicação

prisma/
├── migrations/              # Histórico de migrations
└── schema.prisma            # Schema do banco de dados
📌 Status do projeto

Projeto funcional, com todas as regras de negócio implementadas, testado (unitário + E2E) e com pipeline de CI/CD ativo. Desenvolvido como parte da trilha de formação Full Stack em Node.js/TypeScript.

👤 Autor

Helbert Bruno

GitHub: @helbertbruno
LinkedIn: in/helbertbruno
