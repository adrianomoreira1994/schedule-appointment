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
