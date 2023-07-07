import { MigrationInterface, QueryRunner } from "typeorm";

export class AddForgotPassword1688470837314 implements MigrationInterface {
    name = 'AddForgotPassword1688470837314'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "resetPassword" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "code" bigint NOT NULL, CONSTRAINT "PK_98b22462b330d1a21bcbbb1c6eb" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "resetPassword"`);
    }

}
