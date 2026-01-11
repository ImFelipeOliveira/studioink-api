import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1768152618068 implements MigrationInterface {
    name = 'Migration1768152618068'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_a0f42aaa47be1f333a3ccebb676"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_9f49987820da519f855d04c82bd"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_c09d54644d40718fb05980f350f"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "appointment_id"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "artist_id"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "due_date"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "paid_at"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "appointment_id"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "payment_method"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_payment_method_enum"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "gateway_fee_cents"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "net_amount_cents"`);
        await queryRunner.query(`ALTER TABLE "receivables" ADD "transaction_id" bigint`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "transaction_id" bigint`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "balance_after_cents" bigint`);
        await queryRunner.query(`ALTER TYPE "public"."receivables_payment_method_enum" RENAME TO "receivables_payment_method_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."receivables_payment_method_enum" AS ENUM('cash', 'credit_card', 'debit_card', 'pix')`);
        await queryRunner.query(`ALTER TABLE "receivables" ALTER COLUMN "payment_method" TYPE "public"."receivables_payment_method_enum" USING "payment_method"::"text"::"public"."receivables_payment_method_enum"`);
        await queryRunner.query(`DROP TYPE "public"."receivables_payment_method_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."receivables_status_enum" RENAME TO "receivables_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."receivables_status_enum" AS ENUM('pending', 'paid', 'canceled')`);
        await queryRunner.query(`ALTER TABLE "receivables" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "receivables" ALTER COLUMN "status" TYPE "public"."receivables_status_enum" USING "status"::"text"::"public"."receivables_status_enum"`);
        await queryRunner.query(`ALTER TABLE "receivables" ALTER COLUMN "status" SET DEFAULT 'pending'`);
        await queryRunner.query(`DROP TYPE "public"."receivables_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "description" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "receivables" ADD CONSTRAINT "FK_7e326dd10e25b528dcaba320cba" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_3c324ca49dabde7ffc0ef64675d" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_3c324ca49dabde7ffc0ef64675d"`);
        await queryRunner.query(`ALTER TABLE "receivables" DROP CONSTRAINT "FK_7e326dd10e25b528dcaba320cba"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "description" text`);
        await queryRunner.query(`CREATE TYPE "public"."receivables_status_enum_old" AS ENUM('pending', 'paid', 'overdue', 'canceled')`);
        await queryRunner.query(`ALTER TABLE "receivables" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "receivables" ALTER COLUMN "status" TYPE "public"."receivables_status_enum_old" USING "status"::"text"::"public"."receivables_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "receivables" ALTER COLUMN "status" SET DEFAULT 'pending'`);
        await queryRunner.query(`DROP TYPE "public"."receivables_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."receivables_status_enum_old" RENAME TO "receivables_status_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."receivables_payment_method_enum_old" AS ENUM('credit_card', 'pix', 'cash', 'boleto')`);
        await queryRunner.query(`ALTER TABLE "receivables" ALTER COLUMN "payment_method" TYPE "public"."receivables_payment_method_enum_old" USING "payment_method"::"text"::"public"."receivables_payment_method_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."receivables_payment_method_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."receivables_payment_method_enum_old" RENAME TO "receivables_payment_method_enum"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "balance_after_cents"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "transaction_id"`);
        await queryRunner.query(`ALTER TABLE "receivables" DROP COLUMN "transaction_id"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "net_amount_cents" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "gateway_fee_cents" bigint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`CREATE TYPE "public"."transactions_payment_method_enum" AS ENUM('cash', 'credit_card', 'pix', 'debit')`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "payment_method" "public"."transactions_payment_method_enum"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "appointment_id" bigint`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "paid_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "due_date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "artist_id" bigint`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "appointment_id" bigint`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_c09d54644d40718fb05980f350f" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_9f49987820da519f855d04c82bd" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_a0f42aaa47be1f333a3ccebb676" FOREIGN KEY ("artist_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
