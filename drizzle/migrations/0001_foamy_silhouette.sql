ALTER TABLE "cashback_requests" RENAME COLUMN "user" TO "user_id";--> statement-breakpoint
ALTER TABLE "cashback_requests" RENAME COLUMN "merchant" TO "merchant_id";--> statement-breakpoint
ALTER TABLE "cashback_requests" DROP CONSTRAINT "cashback_requests_user_users_id_fk";
--> statement-breakpoint
ALTER TABLE "cashback_requests" DROP CONSTRAINT "cashback_requests_merchant_merchants_id_fk";
--> statement-breakpoint
DROP INDEX "merchant_idx";--> statement-breakpoint
DROP INDEX "cashback_request_user_idx";--> statement-breakpoint
ALTER TABLE "cashback_requests" ALTER COLUMN "purchased_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "cashback_requests" ADD CONSTRAINT "cashback_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cashback_requests" ADD CONSTRAINT "cashback_requests_merchant_id_merchants_id_fk" FOREIGN KEY ("merchant_id") REFERENCES "public"."merchants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "cashback_request_merchant_idx" ON "cashback_requests" USING btree ("merchant_id");--> statement-breakpoint
CREATE INDEX "cashback_request_user_idx" ON "cashback_requests" USING btree ("user_id");