# Logly API

API de ingestão e consulta de logs construída com **Bun**, **Elysia**, **MongoDB** e **Zod** para validação de dados.

## 🚀 Tecnologias

- **[Bun](https://bun.com)**: Runtime JavaScript ultra-rápido que substitui Node.js, npm e outras ferramentas
- **[Elysia](https://elysiajs.com)**: Framework web moderno e performático para Bun
- **[MongoDB](https://www.mongodb.com)**: Banco de dados NoSQL com suporte a Time Series Collections para armazenamento otimizado de logs
- **[Mongoose](https://mongoosejs.com)**: ODM (Object Data Modeling) para MongoDB
- **[Zod](https://zod.dev)**: Biblioteca de validação de schemas TypeScript-first
- **[OpenAPI/Swagger](https://swagger.io)**: Documentação interativa da API via `@elysiajs/swagger`

## 📋 Funcionalidades

- **Ingestão de logs em massa**: Endpoint para receber múltiplos logs de uma vez
- **Busca temporal**: Consulta de logs por intervalo de tempo
- **Filtragem por nível**: Suporte para filtrar logs por severidade (INFO, WARN, ERROR, DEBUG, FATAL)
- **Validação com Zod**: Todos os dados de entrada são validados usando schemas Zod
- **Documentação OpenAPI**: Documentação interativa disponível em `/doc`
- **Time Series Collections**: Utiliza MongoDB Time Series Collections para otimização de armazenamento e consultas

## 🏗️ Estrutura do Projeto

```
logly-api/
├── src/
│   ├── models/          # Modelos Mongoose
│   │   └── LogEntryModel.ts
│   ├── routes/          # Rotas da API
│   │   └── logs.ts
│   ├── schemas/         # Schemas Zod para validação
│   │   ├── LogEntrySchema.ts
│   │   └── LogQuerySchema.ts
│   └── utils/           # Utilitários
│       └── db.ts        # Conexão com MongoDB
├── index.ts             # Ponto de entrada da aplicação
└── package.json
```

## 🔧 Instalação

Instale as dependências usando Bun:

```bash
bun install
```

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto com a seguinte variável:

```env
MONGO_URI=mongodb://localhost:27017/logly
```

Substitua a URI pela sua conexão MongoDB. Para MongoDB Atlas ou outras configurações, ajuste conforme necessário.

## 🚀 Como Rodar

Inicie o servidor:

```bash
bun run index.ts
```

A API estará disponível em:
- **API**: `http://localhost:3000`
- **Documentação OpenAPI**: `http://localhost:3000/doc`

## 📡 Endpoints

### POST `/api/v1/logs`
Ingere múltiplos logs de uma vez.

**Body** (array de logs):
```json
[
  {
    "timestamp": "2024-01-15T10:30:00Z",
    "level": "INFO",
    "message": "Usuário autenticado com sucesso",
    "service": "auth-service",
    "environment": "production",
    "traceId": "550e8400-e29b-41d4-a716-446655440000",
    "metadata": {
      "userId": "123",
      "ip": "192.168.1.1"
    }
  }
]
```

### GET `/api/v1/logs/search`
Busca logs por intervalo de tempo e opcionalmente por nível.

**Query Parameters**:
- `startTime` (obrigatório): Data/hora de início (ISO 8601)
- `endTime` (obrigatório): Data/hora final (ISO 8601)
- `level` (opcional): Nível de severidade (INFO, WARN, ERROR, DEBUG, FATAL)

**Exemplo**:
```
GET /api/v1/logs/search?startTime=2024-01-15T00:00:00Z&endTime=2024-01-15T23:59:59Z&level=ERROR
```

## 🔒 Validação com Zod

Todos os dados de entrada são validados usando schemas Zod:

- **LogEntrySchema**: Valida a estrutura de cada log (timestamp, level, message, service, environment, etc.)
- **LogSearchQuerySchema**: Valida os parâmetros de busca (startTime, endTime, level)

A validação é automática via Elysia, garantindo type-safety em tempo de execução e desenvolvimento.

## 📊 MongoDB Time Series

O projeto utiliza **MongoDB Time Series Collections** para armazenar os logs de forma otimizada:

- **timeField**: `timestamp` - Campo temporal principal
- **metaField**: `metadata` - Metadados adicionais
- **granularity**: `hours` - Granularidade de agregação

Isso resulta em melhor performance de escrita e consultas temporais, além de redução significativa no uso de armazenamento.

## 📚 Documentação

A documentação completa da API está disponível em formato OpenAPI/Swagger em:
```
http://localhost:3000/doc
```

Lá você pode testar os endpoints diretamente e ver todos os schemas de validação.

## ⚡ Testes de Performance

Para testar a performance da API, você pode usar o `autocannon`:

```bash
bunx autocannon -c 100 -d 10 -m POST -b @test-payload.json http://localhost:3000/api/v1/logs
```

Este comando executa:
- `-c 100`: 100 conexões simultâneas
- `-d 10`: Duração de 10 segundos
- `-m POST`: Método HTTP POST
- `-b @test-payload.json`: Body do request usando o arquivo `test-payload.json`

Certifique-se de que o servidor está rodando antes de executar o teste.

## 🛠️ Desenvolvimento

Este projeto foi criado usando `bun init` e aproveita todas as vantagens do ecossistema Bun:
- Execução ultra-rápida
- Gerenciador de pacotes integrado
- TypeScript nativo
- Hot reload automático
