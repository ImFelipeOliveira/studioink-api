import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1768176664724 implements MigrationInterface {
    name = 'Migration1768176664724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "studios" ADD "owner_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "studios" ADD CONSTRAINT "FK_c1dac27c04d70a9a943daddd131" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "studios" DROP CONSTRAINT "FK_c1dac27c04d70a9a943daddd131"`);
        await queryRunner.query(`ALTER TABLE "studios" DROP COLUMN "owner_id"`);
    }

}
