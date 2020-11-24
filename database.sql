
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

-- "covid_reviews" DB

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "access_level_id" INT REFERENCES "access_level" NOT NULL
);



CREATE TABLE "access_level" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR NOT NULL,
	"level" INT 
);

INSERT INTO "access_level" ("name", "level")
	VALUES ('Admin', '5'), ('Registered user', '1');


CREATE TABLE "reviews" (
	"id" SERIAL PRIMARY KEY,
    "rating" INT NOT NULL,
	"masks" BOOLEAN NOT NULL,
	"tables" BOOLEAN NOT NULL,
	"party_size" BOOLEAN NOT NULL,
	"sanitizer_offered" BOOLEAN NOT NULL,
	"menu" BOOLEAN NOT NULL,
	"comments" VARCHAR(360)
);


INSERT INTO "reviews" ("rating", "masks", "tables", "party_size", "sanitizer_offered", "menu", "comments")
	VALUES ('4', 'yes', 'yes', 'yes', 'yes', 'yes', 'Employees were all wearing masks and protocols were being followed correctly')
;

CREATE TABLE "restaurants" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(80),
	"street" VARCHAR(80),
	"city" VARCHAR(80),
	"state" VARCHAR(40)
);

INSERT INTO "restaurants" ("name", "street", "city", "state")
	VALUES('El Maguey', '7831 N Oak Trafficway', 'Kansas City', 'MO')

;

CREATE TABLE "user_reviews" (
	"id" SERIAL PRIMARY KEY,
	"users_id" INT REFERENCES "user" NOT NULL,
	"reviews_id" INT REFERENCES "reviews" NOT NULL
);

CREATE TABLE "restaurants_reviews" (
	"id" SERIAL PRIMARY KEY,
	"restaurants_id" INT REFERENCES "restaurants" NOT NULL,
	"reviews_id" INT REFERENCES "reviews" NOT NULL
);
