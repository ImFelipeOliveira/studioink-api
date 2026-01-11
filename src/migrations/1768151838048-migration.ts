import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1768151838048 implements MigrationInterface {
    name = 'Migration1768151838048'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "receivables" DROP CONSTRAINT "FK_4903e4bcf248f0d814c46d9c520"`);
        await queryRunner.query(`ALTER TABLE "receivables" DROP COLUMN "category_id"`);
        await queryRunner.query(`ALTER TABLE "receivables" DROP COLUMN "tax_fee_cents"`);
        await queryRunner.query(`ALTER TABLE "receivables" DROP COLUMN "issue_date"`);
        await queryRunner.query(`ALTER TABLE "receivables" DROP COLUMN "received_at"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "discount_cents"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "interest_cents"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "final_amount_cents"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "payment_method"`);
        await queryRunner.query(`DROP TYPE "public"."payments_payment_method_enum"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "supplier_id"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "document_url"`);
        await queryRunner.query(`ALTER TABLE "receivables" ADD "client_id" bigint`);
        await queryRunner.query(`ALTER TABLE "receivables" ADD "paid_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "appointment_id" bigint`);
        await queryRunner.query(`ALTER TYPE "public"."receivables_payment_method_enum" RENAME TO "receivables_payment_method_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."receivables_payment_method_enum" AS ENUM('credit_card', 'pix', 'cash', 'boleto')`);
        await queryRunner.query(`ALTER TABLE "receivables" ALTER COLUMN "payment_method" TYPE "public"."receivables_payment_method_enum" USING "payment_method"::"text"::"public"."receivables_payment_method_enum"`);
        await queryRunner.query(`DROP TYPE "public"."receivables_payment_method_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."payments_status_enum" RENAME TO "payments_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."payments_status_enum" AS ENUM('pending', 'paid', 'canceled')`);
        await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "status" TYPE "public"."payments_status_enum" USING "status"::"text"::"public"."payments_status_enum"`);
        await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "status" SET DEFAULT 'pending'`);
        await queryRunner.query(`DROP TYPE "public"."payments_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "receivables" ADD CONSTRAINT "FK_59fed1e96388af8cd39079d27e1" FOREIGN KEY ("client_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_9f49987820da519f855d04c82bd" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_9f49987820da519f855d04c82bd"`);
        await queryRunner.query(`ALTER TABLE "receivables" DROP CONSTRAINT "FK_59fed1e96388af8cd39079d27e1"`);
        await queryRunner.query(`CREATE TYPE "public"."payments_status_enum_old" AS ENUM('pending', 'paid', 'overdue', 'canceled')`);
        await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "status" TYPE "public"."payments_status_enum_old" USING "status"::"text"::"public"."payments_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "status" SET DEFAULT 'pending'`);
        await queryRunner.query(`DROP TYPE "public"."payments_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."payments_status_enum_old" RENAME TO "payments_status_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."receivables_payment_method_enum_old" AS ENUM('cash', 'credit_card', 'debit_card', 'pix', 'boleto')`);
        await queryRunner.query(`ALTER TABLE "receivables" ALTER COLUMN "payment_method" TYPE "public"."receivables_payment_method_enum_old" USING "payment_method"::"text"::"public"."receivables_payment_method_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."receivables_payment_method_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."receivables_payment_method_enum_old" RENAME TO "receivables_payment_method_enum"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "appointment_id"`);
        await queryRunner.query(`ALTER TABLE "receivables" DROP COLUMN "paid_at"`);
        await queryRunner.query(`ALTER TABLE "receivables" DROP COLUMN "client_id"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "document_url" character varying(500)`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "supplier_id" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "description" text`);
        await queryRunner.query(`CREATE TYPE "public"."payments_payment_method_enum" AS ENUM('cash', 'bank_transfer', 'pix', 'boleto')`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "payment_method" "public"."payments_payment_method_enum"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "final_amount_cents" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "interest_cents" bigint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "discount_cents" bigint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "receivables" ADD "received_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "receivables" ADD "issue_date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "receivables" ADD "tax_fee_cents" bigint`);
        await queryRunner.query(`ALTER TABLE "receivables" ADD "category_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "receivables" ADD CONSTRAINT "FK_4903e4bcf248f0d814c46d9c520" FOREIGN KEY ("category_id") REFERENCES "financial_categories"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

}
