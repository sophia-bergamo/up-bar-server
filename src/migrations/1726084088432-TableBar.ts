import { MigrationInterface, QueryRunner } from "typeorm";

export class TableBar1726084088432 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE bar (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                foto_bar VARCHAR(255),
                cnpj VARCHAR(14) NOT NULL,
                endereco VARCHAR(255) NOT NULL,
                sobre_o_bar TEXT,
                senha VARCHAR(255) NOT NULL,
                link_cardapio VARCHAR(255)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
