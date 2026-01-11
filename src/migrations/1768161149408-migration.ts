import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1768161149408 implements MigrationInterface {
    name = 'Migration1768161149408'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sale_items" DROP CONSTRAINT "FK_171e0a3a6354393a1645b6fad61"`);
        await queryRunner.query(`ALTER TABLE "sale_items" RENAME COLUMN "receivable_id" TO "transaction_id"`);
        await queryRunner.query(`ALTER TABLE "commissions" DROP CONSTRAINT "FK_b57b1306fdd71690cd88300b7bb"`);
        await queryRunner.query(`ALTER TABLE "commissions" DROP COLUMN "payment_id"`);
        await queryRunner.query(`ALTER TABLE "commissions" ADD "payment_id" uuid`);
        await queryRunner.query(`ALTER TABLE "inventory_batches" DROP CONSTRAINT "FK_2fc579755299de918e87fa7b064"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "inventory_batches" DROP COLUMN "payment_id"`);
        await queryRunner.query(`ALTER TABLE "inventory_batches" ADD "payment_id" uuid`);
        await queryRunner.query(`ALTER TABLE "commissions" ADD CONSTRAINT "FK_b57b1306fdd71690cd88300b7bb" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory_batches" ADD CONSTRAINT "FK_2fc579755299de918e87fa7b064" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_items" ADD CONSTRAINT "FK_b0c3c9a3d7af9a3ebf67e2b0fa4" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sale_items" DROP CONSTRAINT "FK_b0c3c9a3d7af9a3ebf67e2b0fa4"`);
        await queryRunner.query(`ALTER TABLE "inventory_batches" DROP CONSTRAINT "FK_2fc579755299de918e87fa7b064"`);
        await queryRunner.query(`ALTER TABLE "commissions" DROP CONSTRAINT "FK_b57b1306fdd71690cd88300b7bb"`);
        await queryRunner.query(`ALTER TABLE "inventory_batches" DROP COLUMN "payment_id"`);
        await queryRunner.query(`ALTER TABLE "inventory_batches" ADD "payment_id" bigint`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "id" BIGSERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "inventory_batches" ADD CONSTRAINT "FK_2fc579755299de918e87fa7b064" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "commissions" DROP COLUMN "payment_id"`);
        await queryRunner.query(`ALTER TABLE "commissions" ADD "payment_id" bigint`);
        await queryRunner.query(`ALTER TABLE "commissions" ADD CONSTRAINT "FK_b57b1306fdd71690cd88300b7bb" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_items" RENAME COLUMN "transaction_id" TO "receivable_id"`);
        await queryRunner.query(`ALTER TABLE "sale_items" ADD CONSTRAINT "FK_171e0a3a6354393a1645b6fad61" FOREIGN KEY ("receivable_id") REFERENCES "receivables"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
