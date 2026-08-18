CREATE TABLE "leads" (
	"id" text PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"data" jsonb NOT NULL,
	"created_at" timestamp with time zone NOT NULL
);
