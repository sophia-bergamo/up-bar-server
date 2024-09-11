import { DataSource } from "typeorm";

export const connectionSource = new DataSource({
  migrationsTableName: "migrations",
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "db_user",
  password: "db_password",
  database: "db_name",
  logging: false,
  synchronize: false,
  entities: ["src/**/**.entity{.ts,.js}"],
  migrations: ["src/migrations/**/*{.ts,.js}"],
});
