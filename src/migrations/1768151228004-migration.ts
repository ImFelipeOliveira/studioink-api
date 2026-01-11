import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1768151228004 implements MigrationInterface {
    name = 'Migration1768151228004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."financial_categories_type_enum" AS ENUM('income', 'expense')`);
        await queryRunner.query(`CREATE TABLE "financial_categories" ("id" SERIAL NOT NULL, "studio_id" bigint, "name" character varying(100) NOT NULL, "type" "public"."financial_categories_type_enum" NOT NULL, "is_system_default" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_cd806eb06bb34758203c506ff15" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."receivables_payment_method_enum" AS ENUM('cash', 'credit_card', 'debit_card', 'pix', 'boleto')`);
        await queryRunner.query(`CREATE TYPE "public"."receivables_status_enum" AS ENUM('pending', 'paid', 'overdue', 'canceled')`);
        await queryRunner.query(`CREATE TABLE "receivables" ("id" BIGSERIAL NOT NULL, "studio_id" bigint NOT NULL, "appointment_id" bigint, "category_id" integer NOT NULL, "amount_cents" bigint NOT NULL, "net_amount_cents" bigint, "tax_fee_cents" bigint, "issue_date" date NOT NULL, "due_date" date NOT NULL, "received_at" TIMESTAMP, "payment_method" "public"."receivables_payment_method_enum", "installment_number" integer NOT NULL DEFAULT '1', "total_installments" integer NOT NULL DEFAULT '1', "status" "public"."receivables_status_enum" NOT NULL DEFAULT 'pending', "description" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_d77a2c19436083a2039cf06f1ec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."payments_status_enum" AS ENUM('pending', 'paid', 'overdue', 'canceled')`);
        await queryRunner.query(`CREATE TYPE "public"."payments_payment_method_enum" AS ENUM('cash', 'bank_transfer', 'pix', 'boleto')`);
        await queryRunner.query(`CREATE TABLE "payments" ("id" BIGSERIAL NOT NULL, "studio_id" bigint NOT NULL, "category_id" integer NOT NULL, "artist_id" bigint, "supplier_id" character varying(255), "amount_cents" bigint NOT NULL, "discount_cents" bigint NOT NULL DEFAULT '0', "interest_cents" bigint NOT NULL DEFAULT '0', "final_amount_cents" bigint NOT NULL, "due_date" date NOT NULL, "paid_at" TIMESTAMP, "status" "public"."payments_status_enum" NOT NULL DEFAULT 'pending', "payment_method" "public"."payments_payment_method_enum", "document_url" character varying(500), "description" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "financial_categories" ADD CONSTRAINT "FK_a828456f0bbbac5c423af91c8a7" FOREIGN KEY ("studio_id") REFERENCES "studios"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "receivables" ADD CONSTRAINT "FK_899ec7089977b7f24138be37bd2" FOREIGN KEY ("studio_id") REFERENCES "studios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "receivables" ADD CONSTRAINT "FK_e9f26b5a1adbaf35276b2385e4d" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "receivables" ADD CONSTRAINT "FK_4903e4bcf248f0d814c46d9c520" FOREIGN KEY ("category_id") REFERENCES "financial_categories"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_4366296f1ff58c6205aff4c3a83" FOREIGN KEY ("studio_id") REFERENCES "studios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_a0f42aaa47be1f333a3ccebb676" FOREIGN KEY ("artist_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_91fbd90e589339e9581a9cfad5b" FOREIGN KEY ("category_id") REFERENCES "financial_categories"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_91fbd90e589339e9581a9cfad5b"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_a0f42aaa47be1f333a3ccebb676"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_4366296f1ff58c6205aff4c3a83"`);
        await queryRunner.query(`ALTER TABLE "receivables" DROP CONSTRAINT "FK_4903e4bcf248f0d814c46d9c520"`);
        await queryRunner.query(`ALTER TABLE "receivables" DROP CONSTRAINT "FK_e9f26b5a1adbaf35276b2385e4d"`);
        await queryRunner.query(`ALTER TABLE "receivables" DROP CONSTRAINT "FK_899ec7089977b7f24138be37bd2"`);
        await queryRunner.query(`ALTER TABLE "financial_categories" DROP CONSTRAINT "FK_a828456f0bbbac5c423af91c8a7"`);
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TYPE "public"."payments_payment_method_enum"`);
        await queryRunner.query(`DROP TYPE "public"."payments_status_enum"`);
        await queryRunner.query(`DROP TABLE "receivables"`);
        await queryRunner.query(`DROP TYPE "public"."receivables_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."receivables_payment_method_enum"`);
        await queryRunner.query(`DROP TABLE "financial_categories"`);
        await queryRunner.query(`DROP TYPE "public"."financial_categories_type_enum"`);
    }

}
