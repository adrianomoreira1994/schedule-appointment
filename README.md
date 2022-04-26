# Desafio técnico - FinPec

### Instalação - Backend

```bash
cd backend
yarn
```

### Gerar Migration

> Observação: Antes de gerar a migration, criar uma base de dados no postgress chamada **appointments**
> 

```bash
yarn typeorm migration:generate -n InitialMigrate
```

### Rodar a Migration

```bash
yarn typeorm migration:run
```

### Rodar o backend

```bash
yarn start:dev
```

### Instalação - Frontend

```bash
cd frontend
yarn
```

### Rodar frontend

```bash
yarn dev
```

Para acessar o sistema, utilizar o seguinte usuário e senha:

**username:** admin@admin.com.br

**password:** admin

### Rotas da aplicação

- **GET - /api/v1/schedules** - Retorna os schedules pelo e-mail do usuário
- **GET - /api/v1/schedules/all** - Retorna todos os schedules
- **POST - /api/v1/schedules** - Cria um schedule
- **PUT - /api/v1/schedules** - Altera o status do schedule
- **POST - /api/v1/account/signin** - Realiza o login na API
- **GET - /api/v1/account/me** - Retorna o perfil do usuário admin logado
