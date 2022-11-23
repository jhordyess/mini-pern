-- Create tables
CREATE TABLE "Category" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR NOT NULL UNIQUE,
	"prodsQnt" INTEGER DEFAULT 0
);

CREATE TABLE "Brand" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR NOT NULL UNIQUE,
	"prodsQnt" INTEGER DEFAULT 0
);

CREATE TABLE "Product" (
	"id" SERIAL PRIMARY KEY,
	"sku" VARCHAR(8) NOT NULL UNIQUE,
	"details" TEXT NULL,
	"productName" VARCHAR NOT NULL,
	"price" NUMERIC NOT NULL, -- CHECK ("price" > 0)
	"stock" INTEGER NOT NULL, -- CHECK ("price" >= 0)
	"createdAt" DATE DEFAULT CURRENT_DATE,
	"deleted" BOOLEAN DEFAULT false,
	"categoryId" INTEGER NOT NULL REFERENCES "Category" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
	"brandId" INTEGER NOT NULL REFERENCES "Brand" ("id") ON UPDATE CASCADE ON DELETE CASCADE
);
