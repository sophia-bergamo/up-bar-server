import { MigrationInterface, QueryRunner } from "typeorm";

export class EditForgotPasswordTable1727145578467 implements MigrationInterface {
    name = 'EditForgotPasswordTable1727145578467'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "forgot_password" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "forgot_password" ADD "active" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "forgot_password" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "forgot_password" ADD "active" character varying NOT NULL`);
    }

}
