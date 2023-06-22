import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1687437855976 implements MigrationInterface {
    name = 'Init1687437855976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "team" ("team_id" BIGSERIAL NOT NULL, "short_name" character varying NOT NULL DEFAULT '', "full_name" character varying NOT NULL DEFAULT '', "base" character varying NOT NULL DEFAULT '', "team_chief" character varying NOT NULL DEFAULT '', "chassis" character varying NOT NULL DEFAULT '', "power_unit" character varying NOT NULL DEFAULT '', "championships" integer NOT NULL DEFAULT '0', "color" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_a35a345d4436b82adf6bb76f3ce" PRIMARY KEY ("team_id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "nickname" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL DEFAULT '', "lastName" character varying NOT NULL DEFAULT '', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_ad02a1be8707004cb805a4b5023" UNIQUE ("nickname"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "driver" ("driver_id" BIGSERIAL NOT NULL, "short_name" character varying NOT NULL DEFAULT '', "full_name" character varying NOT NULL DEFAULT '', "teamId" bigint, CONSTRAINT "PK_f27607c5716c6afcef0eb6aa1b0" PRIMARY KEY ("driver_id"))`);
        await queryRunner.query(`ALTER TABLE "driver" ADD CONSTRAINT "FK_8c925de44f98a5e89c2f5727947" FOREIGN KEY ("teamId") REFERENCES "team"("team_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "driver" DROP CONSTRAINT "FK_8c925de44f98a5e89c2f5727947"`);
        await queryRunner.query(`DROP TABLE "driver"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "team"`);
    }

}
