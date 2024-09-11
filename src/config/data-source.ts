import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "db_user",
  password: "db_password",
  database: "db_name",
  entities: ["src/**/**.entity{.ts,.js}"],
  synchronize: false,
  logging: true,
});
