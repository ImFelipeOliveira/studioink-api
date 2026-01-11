import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1768110117196 implements MigrationInterface {
    name = 'Migration1768110117196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "studios" ("id" BIGSERIAL NOT NULL, "name" character varying(255) NOT NULL, "slug" character varying(255) NOT NULL, "config_settings" json, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "UQ_0148777f9002509905fbb1bdb33" UNIQUE ("slug"), CONSTRAINT "PK_76ff398ef5041c4b42618ed6111" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permissions" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "slug" character varying(100) NOT NULL, CONSTRAINT "UQ_d090ad82a0e97ce764c06c7b312" UNIQUE ("slug"), CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permission_role" ("permission_id" integer NOT NULL, "role_id" bigint NOT NULL, CONSTRAINT "PK_559155e68c73c7b70d216b3e2e9" PRIMARY KEY ("permission_id", "role_id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" BIGSERIAL NOT NULL, "name" character varying(50) NOT NULL, "slug" character varying(50) NOT NULL, "description" text, CONSTRAINT "UQ_881f72bac969d9a00a1a29e1079" UNIQUE ("slug"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_user" ("id" BIGSERIAL NOT NULL, "user_id" bigint NOT NULL, "role_id" bigint NOT NULL, "studio_id" bigint NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "userId" bigint, CONSTRAINT "PK_573bb667bae1d35cfabfe0ac774" PRIMARY KEY ("id", "user_id", "role_id", "studio_id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" BIGSERIAL NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password_hash" character varying(255) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "permission_role" ADD CONSTRAINT "FK_ea144050277434b1ec4a3070614" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permission_role" ADD CONSTRAINT "FK_693f65986d1bd7b5bc973e30d76" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_user" ADD CONSTRAINT "FK_2a23ceb75c7511d0523c4aaf492" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_user" ADD CONSTRAINT "FK_78ee37f2db349d230d502b1c7ea" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_user" ADD CONSTRAINT "FK_e7debc339652cd0123238ac9caf" FOREIGN KEY ("studio_id") REFERENCES "studios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE TABLE "query-result-cache" ("id" SERIAL NOT NULL, "identifier" character varying, "time" bigint NOT NULL, "duration" integer NOT NULL, "query" text NOT NULL, "result" text NOT NULL, CONSTRAINT "PK_6a98f758d8bfd010e7e10ffd3d3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "query-result-cache"`);
        await queryRunner.query(`ALTER TABLE "role_user" DROP CONSTRAINT "FK_e7debc339652cd0123238ac9caf"`);
        await queryRunner.query(`ALTER TABLE "role_user" DROP CONSTRAINT "FK_78ee37f2db349d230d502b1c7ea"`);
        await queryRunner.query(`ALTER TABLE "role_user" DROP CONSTRAINT "FK_2a23ceb75c7511d0523c4aaf492"`);
        await queryRunner.query(`ALTER TABLE "permission_role" DROP CONSTRAINT "FK_693f65986d1bd7b5bc973e30d76"`);
        await queryRunner.query(`ALTER TABLE "permission_role" DROP CONSTRAINT "FK_ea144050277434b1ec4a3070614"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "role_user"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "permission_role"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
        await queryRunner.query(`DROP TABLE "studios"`);
    }

}
