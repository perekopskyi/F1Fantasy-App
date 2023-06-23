import { MigrationInterface, QueryRunner } from "typeorm";

export class Updated1687537624399 implements MigrationInterface {
    name = 'Updated1687537624399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" RENAME COLUMN "token" TO "currentHashedRefreshToken"`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "currentHashedRefreshToken" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "currentHashedRefreshToken" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" RENAME COLUMN "currentHashedRefreshToken" TO "token"`);
    }

}
