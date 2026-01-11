import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1768154539869 implements MigrationInterface {
    name = 'Migration1768154539869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artist_profiles" ALTER COLUMN "default_commission_value" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artist_profiles" ALTER COLUMN "default_commission_value" SET NOT NULL`);
    }

}
