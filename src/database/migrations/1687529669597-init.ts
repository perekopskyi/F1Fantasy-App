import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1687529669597 implements MigrationInterface {
    name = 'Init1687529669597'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "currentHashedRefreshToken"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" ADD "currentHashedRefreshToken" character varying NOT NULL`);
    }

}
