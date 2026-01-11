import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1768152837263 implements MigrationInterface {
    name = 'Migration1768152837263'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "receivables" DROP CONSTRAINT "FK_7e326dd10e25b528dcaba320cba"`);
        await queryRunner.query(`ALTER TABLE "receivables" DROP CONSTRAINT "PK_d77a2c19436083a2039cf06f1ec"`);
        await queryRunner.query(`ALTER TABLE "receivables" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "receivables" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "receivables" ADD CONSTRAINT "PK_d77a2c19436083a2039cf06f1ec" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "receivables" DROP COLUMN "transaction_id"`);
        await queryRunner.query(`ALTER TABLE "receivables" ADD "transaction_id" uuid`);
        await queryRunner.query(`ALTER TYPE "public"."receivables_payment_method_enum" RENAME TO "receivables_payment_method_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."receivables_payment_method_enum" AS ENUM('cash', 'credit_card', 'pix', 'debit')`);
        await queryRunner.query(`ALTER TABLE "receivables" ALTER COLUMN "payment_method" TYPE "public"."receivables_payment_method_enum" USING "payment_method"::"text"::"public"."receivables_payment_method_enum"`);
        await queryRunner.query(`DROP TYPE "public"."receivables_payment_method_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."receivables_status_enum" RENAME TO "receivables_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."receivables_status_enum" AS ENUM('pending', 'paid', 'overdue', 'canceled')`);
        await queryRunner.query(`ALTER TABLE "receivables" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "receivables" ALTER COLUMN "status" TYPE "public"."receivables_status_enum" USING "status"::"text"::"public"."receivables_status_enum"`);
        await queryRunner.query(`ALTER TABLE "receivables" ALTER COLUMN "status" SET DEFAULT 'pending'`);
        await queryRunner.query(`DROP TYPE "public"."receivables_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_3c324ca49dabde7ffc0ef64675d"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "transaction_id"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "transaction_id" uuid`);
        await queryRunner.query(`ALTER TABLE "commissions" DROP CONSTRAINT "FK_7532e2ddc108af0943e1adba4ad"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "commissions" DROP COLUMN "transaction_id"`);
        await queryRunner.query(`ALTER TABLE "commissions" ADD "transaction_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "receivables" ADD CONSTRAINT "FK_7e326dd10e25b528dcaba320cba" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_3c324ca49dabde7ffc0ef64675d" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "commissions" ADD CONSTRAINT "FK_7532e2ddc108af0943e1adba4ad" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "commissions" DROP CONSTRAINT "FK_7532e2ddc108af0943e1adba4ad"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_3c324ca49dabde7ffc0ef64675d"`);
        await queryRunner.query(`ALTER TABLE "receivables" DROP CONSTRAINT "FK_7e326dd10e25b528dcaba320cba"`);
        await queryRunner.query(`ALTER TABLE "commissions" DROP COLUMN "transaction_id"`);
        await queryRunner.query(`ALTER TABLE "commissions" ADD "transaction_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "id" BIGSERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "commissions" ADD CONSTRAINT "FK_7532e2ddc108af0943e1adba4ad" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "transaction_id"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "transaction_id" bigint`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "id" BIGSERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_3c324ca49dabde7ffc0ef64675d" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE TYPE "public"."receivables_status_enum_old" AS ENUM('pending', 'paid', 'canceled')`);
        await queryRunner.query(`ALTER TABLE "receivables" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "receivables" ALTER COLUMN "status" TYPE "public"."receivables_status_enum_old" USING "status"::"text"::"public"."receivables_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "receivables" ALTER COLUMN "status" SET DEFAULT 'pending'`);
        await queryRunner.query(`DROP TYPE "public"."receivables_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."receivables_status_enum_old" RENAME TO "receivables_status_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."receivables_payment_method_enum_old" AS ENUM('cash', 'credit_card', 'debit_card', 'pix')`);
        await queryRunner.query(`ALTER TABLE "receivables" ALTER COLUMN "payment_method" TYPE "public"."receivables_payment_method_enum_old" USING "payment_method"::"text"::"public"."receivables_payment_method_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."receivables_payment_method_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."receivables_payment_method_enum_old" RENAME TO "receivables_payment_method_enum"`);
        await queryRunner.query(`ALTER TABLE "receivables" DROP COLUMN "transaction_id"`);
        await queryRunner.query(`ALTER TABLE "receivables" ADD "transaction_id" bigint`);
        await queryRunner.query(`ALTER TABLE "receivables" DROP CONSTRAINT "PK_d77a2c19436083a2039cf06f1ec"`);
        await queryRunner.query(`ALTER TABLE "receivables" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "receivables" ADD "id" BIGSERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "receivables" ADD CONSTRAINT "PK_d77a2c19436083a2039cf06f1ec" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "receivables" ADD CONSTRAINT "FK_7e326dd10e25b528dcaba320cba" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
