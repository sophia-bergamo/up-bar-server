import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBarToForgotPasswordTable1727266964133 implements MigrationInterface {
    name = 'AddBarToForgotPasswordTable1727266964133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "forgot_password" ADD "barId" integer`);
        await queryRunner.query(`ALTER TABLE "forgot_password" ADD CONSTRAINT "UQ_b84b432f57d418f7d4b6c9aa543" UNIQUE ("barId")`);
        await queryRunner.query(`ALTER TABLE "forgot_password" ADD CONSTRAINT "FK_b84b432f57d418f7d4b6c9aa543" FOREIGN KEY ("barId") REFERENCES "bar"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "forgot_password" DROP CONSTRAINT "FK_b84b432f57d418f7d4b6c9aa543"`);
        await queryRunner.query(`ALTER TABLE "forgot_password" DROP CONSTRAINT "UQ_b84b432f57d418f7d4b6c9aa543"`);
        await queryRunner.query(`ALTER TABLE "forgot_password" DROP COLUMN "barId"`);
    }

}
