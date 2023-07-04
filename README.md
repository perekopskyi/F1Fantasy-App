# F1-Fantasy

## Environment

For development please create `.env` file inside the project folder

```bash
# Server
PORT=3009

# Postgres DEV DB
DB_HOST=snuffleupagus.db.elephantsql.com
DB_PORT=5432
DB_USERNAME=bziekksl
DB_PASSWORD=f8y7zkTGMY8HosRxwfju5TkRUTgTglZ7
DB_NAME=bziekksl

# JWT
JWT_ACCESS_TOKEN_SECRET="s3cr3t"
JWT_ACCESS_TOKEN_EXPIRATION_TIME="365d"
```

## Migrations

1 - Сгенерировать миграцию
`npm run migration:generate ./src/database/migrations/NewMigrationName`
где ./src/database/migrations/NewMigrartionName
Это папка и название файла (без разширения) где будет сохранен новый файл с миграцией
2 - Накатить миграцию на БД
`npm run migration:run`
