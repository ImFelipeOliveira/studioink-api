import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1768154312365 implements MigrationInterface {
    name = 'Migration1768154312365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artist_profiles" DROP CONSTRAINT "FK_61ee457836557a6751d15287913"`);
        await queryRunner.query(`CREATE TABLE "sale_items" ("id" BIGSERIAL NOT NULL, "receivable_id" uuid NOT NULL, "item_id" bigint NOT NULL, "quantity" integer NOT NULL DEFAULT '1', CONSTRAINT "PK_5a7dc5b4562a9e590528b3e08ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" DROP CONSTRAINT "PK_ac25695aca8798029b64dcc7196"`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" ADD CONSTRAINT "PK_ca516b7e4b913d6742f9a2d9a5d" PRIMARY KEY ("role_id")`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" DROP CONSTRAINT "PK_ca516b7e4b913d6742f9a2d9a5d"`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" DROP COLUMN "role_id"`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" DROP COLUMN "default_commission_rate"`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" ADD "user_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" ADD CONSTRAINT "PK_2369a181588cf88b39cd0196c2b" PRIMARY KEY ("user_id")`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" ADD "studio_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" DROP CONSTRAINT "PK_2369a181588cf88b39cd0196c2b"`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" ADD CONSTRAINT "PK_d5367c9d2630db4627b9a5c045b" PRIMARY KEY ("user_id", "studio_id")`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" ADD "default_commission_value" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "financial_categories" ADD "slug" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "commissions" ADD "payment_id" bigint`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "invoice_id" bigint`);
        await queryRunner.query(`ALTER TABLE "inventory_batches" ADD "payment_id" bigint`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" ALTER COLUMN "bio" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" ALTER COLUMN "styles" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" DROP COLUMN "calendar_color"`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" ADD "calendar_color" character varying(7)`);
        await queryRunner.query(`ALTER TYPE "public"."financial_categories_type_enum" RENAME TO "financial_categories_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."financial_categories_type_enum" AS ENUM('revenue', 'expense')`);
        await queryRunner.query(`ALTER TABLE "financial_categories" ALTER COLUMN "type" TYPE "public"."financial_categories_type_enum" USING "type"::"text"::"public"."financial_categories_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."financial_categories_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "id" BIGSERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "inventory_batches" DROP COLUMN "batch_number"`);
        await queryRunner.query(`ALTER TABLE "inventory_batches" ADD "batch_number" character varying(100)`);
        await queryRunner.query(`ALTER TYPE "public"."transactions_type_enum" RENAME TO "transactions_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."transactions_type_enum" AS ENUM('credit', 'debit')`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "type" TYPE "public"."transactions_type_enum" USING "type"::"text"::"public"."transactions_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "financial_categories" ADD CONSTRAINT "UQ_0b1a87d873880c9d239f98109bd" UNIQUE ("slug", "studio_id")`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" ADD CONSTRAINT "FK_2369a181588cf88b39cd0196c2b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" ADD CONSTRAINT "FK_aadd60014d2ca8d0902a4f74178" FOREIGN KEY ("studio_id") REFERENCES "studios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "commissions" ADD CONSTRAINT "FK_b57b1306fdd71690cd88300b7bb" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_563a5e248518c623eebd987d43e" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory_batches" ADD CONSTRAINT "FK_2fc579755299de918e87fa7b064" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_items" ADD CONSTRAINT "FK_171e0a3a6354393a1645b6fad61" FOREIGN KEY ("receivable_id") REFERENCES "receivables"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_items" ADD CONSTRAINT "FK_0e18dd713dec5c3bca8e8c2972c" FOREIGN KEY ("item_id") REFERENCES "inventory_items"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sale_items" DROP CONSTRAINT "FK_0e18dd713dec5c3bca8e8c2972c"`);
        await queryRunner.query(`ALTER TABLE "sale_items" DROP CONSTRAINT "FK_171e0a3a6354393a1645b6fad61"`);
        await queryRunner.query(`ALTER TABLE "inventory_batches" DROP CONSTRAINT "FK_2fc579755299de918e87fa7b064"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_563a5e248518c623eebd987d43e"`);
        await queryRunner.query(`ALTER TABLE "commissions" DROP CONSTRAINT "FK_b57b1306fdd71690cd88300b7bb"`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" DROP CONSTRAINT "FK_aadd60014d2ca8d0902a4f74178"`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" DROP CONSTRAINT "FK_2369a181588cf88b39cd0196c2b"`);
        await queryRunner.query(`ALTER TABLE "financial_categories" DROP CONSTRAINT "UQ_0b1a87d873880c9d239f98109bd"`);
        await queryRunner.query(`CREATE TYPE "public"."transactions_type_enum_old" AS ENUM('income', 'expense', 'payout')`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "type" TYPE "public"."transactions_type_enum_old" USING "type"::"text"::"public"."transactions_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."transactions_type_enum_old" RENAME TO "transactions_type_enum"`);
        await queryRunner.query(`ALTER TABLE "inventory_batches" DROP COLUMN "batch_number"`);
        await queryRunner.query(`ALTER TABLE "inventory_batches" ADD "batch_number" integer`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id")`);
        await queryRunner.query(`CREATE TYPE "public"."financial_categories_type_enum_old" AS ENUM('income', 'expense')`);
        await queryRunner.query(`ALTER TABLE "financial_categories" ALTER COLUMN "type" TYPE "public"."financial_categories_type_enum_old" USING "type"::"text"::"public"."financial_categories_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."financial_categories_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."financial_categories_type_enum_old" RENAME TO "financial_categories_type_enum"`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" DROP COLUMN "calendar_color"`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" ADD "calendar_color" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" ALTER COLUMN "styles" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" ALTER COLUMN "bio" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventory_batches" DROP COLUMN "payment_id"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "invoice_id"`);
        await queryRunner.query(`ALTER TABLE "commissions" DROP COLUMN "payment_id"`);
        await queryRunner.query(`ALTER TABLE "financial_categories" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" DROP COLUMN "default_commission_value"`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" DROP CONSTRAINT "PK_d5367c9d2630db4627b9a5c045b"`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" ADD CONSTRAINT "PK_2369a181588cf88b39cd0196c2b" PRIMARY KEY ("user_id")`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" DROP COLUMN "studio_id"`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" DROP CONSTRAINT "PK_2369a181588cf88b39cd0196c2b"`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" ADD "userId" bigint`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" ADD "default_commission_rate" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" ADD "role_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" ADD CONSTRAINT "PK_ca516b7e4b913d6742f9a2d9a5d" PRIMARY KEY ("role_id")`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" ADD "id" BIGSERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" DROP CONSTRAINT "PK_ca516b7e4b913d6742f9a2d9a5d"`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" ADD CONSTRAINT "PK_ac25695aca8798029b64dcc7196" PRIMARY KEY ("id", "role_id")`);
        await queryRunner.query(`DROP TABLE "sale_items"`);
        await queryRunner.query(`ALTER TABLE "artist_profiles" ADD CONSTRAINT "FK_61ee457836557a6751d15287913" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
