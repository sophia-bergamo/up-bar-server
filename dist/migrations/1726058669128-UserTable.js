export class UserTable1726058669128 {
    async up(queryRunner) {
        await queryRunner.query(`
        CREATE TABLE "user" (
            "id" SERIAL PRIMARY KEY,
            "name" VARCHAR(255) NOT NULL,
            "email" VARCHAR(255) NOT NULL UNIQUE,
            "password" VARCHAR(255) NOT NULL
        );
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      DROP TABLE "user";
  `);
    }
}
