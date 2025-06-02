CREATE TYPE "public"."currency" AS ENUM('USD', 'EUR', 'GBP', 'JPY');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TABLE "affiliate_clicks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"merchant_id" uuid,
	"click_time" timestamp DEFAULT now(),
	"ipAddress" varchar(255) NOT NULL,
	"user_agent" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cashback_payouts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cashback_request_id" uuid NOT NULL,
	"amount_btc" numeric(16, 8) NOT NULL,
	"payout_date" timestamp DEFAULT now(),
	"txId" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "cashback_payouts_txId_unique" UNIQUE("txId")
);
--> statement-breakpoint
CREATE TABLE "cashback_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user" uuid NOT NULL,
	"merchant" uuid NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"currency" "currency" NOT NULL,
	"amount_btc" numeric(16, 8) NOT NULL,
	"receipt_url" varchar(255) NOT NULL,
	"purchased_at" date NOT NULL,
	"status" "status" DEFAULT 'pending',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "merchants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"cashback_percent" integer NOT NULL,
	"logo_url" varchar(255) NOT NULL,
	"affiliate_url" varchar(500),
	"partner" boolean DEFAULT false,
	"highlight" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "merchants_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"btc_address" varchar(35),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "affiliate_clicks" ADD CONSTRAINT "affiliate_clicks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "affiliate_clicks" ADD CONSTRAINT "affiliate_clicks_merchant_id_merchants_id_fk" FOREIGN KEY ("merchant_id") REFERENCES "public"."merchants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cashback_payouts" ADD CONSTRAINT "cashback_payouts_cashback_request_id_cashback_requests_id_fk" FOREIGN KEY ("cashback_request_id") REFERENCES "public"."cashback_requests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cashback_requests" ADD CONSTRAINT "cashback_requests_user_users_id_fk" FOREIGN KEY ("user") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cashback_requests" ADD CONSTRAINT "cashback_requests_merchant_merchants_id_fk" FOREIGN KEY ("merchant") REFERENCES "public"."merchants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "afiliate_user_idx" ON "affiliate_clicks" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "afiliate_merchant_idx" ON "affiliate_clicks" USING btree ("merchant_id");--> statement-breakpoint
CREATE INDEX "afiliate_click_time_idx" ON "affiliate_clicks" USING btree ("click_time");--> statement-breakpoint
CREATE INDEX "cashback_request_user_idx" ON "cashback_requests" USING btree ("user");--> statement-breakpoint
CREATE INDEX "merchant_idx" ON "cashback_requests" USING btree ("merchant");--> statement-breakpoint
CREATE INDEX "merchant_name_idx" ON "merchants" USING btree ("name");--> statement-breakpoint
CREATE INDEX "merchant_partner_idx" ON "merchants" USING btree ("partner");--> statement-breakpoint
CREATE INDEX "merchant_highlight_idx" ON "merchants" USING btree ("highlight");--> statement-breakpoint
CREATE INDEX "merchant_highlight_name_idx" ON "merchants" USING btree ("highlight","name");--> statement-breakpoint
CREATE INDEX "user_btc_address_idx" ON "users" USING btree ("btc_address");