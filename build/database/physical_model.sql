-- Create tables
CREATE TABLE "Product" (
	"id" SERIAL PRIMARY KEY,
	"sku" VARCHAR NOT NULL UNIQUE,
	"details" VARCHAR NOT NULL,
	"productName" VARCHAR NOT NULL,
	"price" INTEGER NOT NULL,
	"stock" INTEGER NOT NULL,
	"createdAt" DATE DEFAULT CURRENT_DATE,
	"deleted" BOOLEAN DEFAULT false,
	"categoryId" INTEGER NOT NULL,
	"brandId" INTEGER NOT NULL
);

CREATE TABLE "Category" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR NOT NULL UNIQUE
);

CREATE TABLE "Brand" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR NOT NULL UNIQUE
);

-- Create foreign Key constraints
ALTER TABLE "Product" ADD CONSTRAINT "fk_product_category"
FOREIGN KEY ("categoryId") REFERENCES "Category" ("id")
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE "Product" ADD CONSTRAINT "fk_product_brand"
FOREIGN KEY ("brandId") REFERENCES "Brand" ("id")
ON UPDATE CASCADE
ON DELETE CASCADE; 
