
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
--CREATE TABLE "user" (
  --  "id" SERIAL PRIMARY KEY,
-- "username" VARCHAR (80) UNIQUE NOT NULL,
  ----  "password" VARCHAR (1000) NOT NULL
--);

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
	"state" VARCHAR(40),
	"longitude" FLOAT ,
	"latitude" FLOAT 
);

INSERT INTO "restaurants" ("name", "street", "city", "state", "longitude", "latitude" )
	VALUES--('El Maguey', '7831 N Oak Trafficway', 'Kansas City', 'MO', '-94.5752517', '39.2365134'),
	('Corvino Supper Club', '1830 Walnut St', 'Kansas City', 'MO', '-94.5826133', '39.0912818'),
	('Majestic', '931 Broadway Blvd', 'Kansas City', 'MO', '-94.5879988', '39.1026518'),
	('Joe''s Kansas City BBQ', '3002 W 47th Ave', 'Kansas City', 'KS', '-94.6207599', '39.0444538'),
	('Slap''s BBQ', '553 Central Ave', 'Kansas City', 'KS', '-94.6244509', '39.1024739'),
	('Arthur Bryant''s Barbeque', '1727 Brooklyn Ave', 'Kansas City', 'MO', '-94.5560646', '39.091478'),
	('LC''s Bar-B-Q', '5800 Blue Pkwy', 'Kansas City', 'MO', '-94.517065', '39.034619'),
	('Green Room Burgers & Beer', '4010 Pennsylvania Ave', 'Kansas City', 'MO', '-94.5932559', '39.0544808'),
	('The Peanut', '418 West 9th Street', 'Kansas City', 'MO', '-94.5890556', '39.1038536'),
	('Brown & Loe', '429 Walnut Street', 'Kansas City', 'MO', '-94.5815061', '39.1087135')

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

INSERT INTO "restaurants_reviews" ("restaurants_id", "reviews_id")
	VALUES (4,15);--,(3,7),(4,8),(5,9),(6,11),(7,12),(8,13),(9,14),(10,15);



SELECT * FROM "restaurants"
  JOIN "restaurants_reviews" ON "restaurants".id = "restaurants_reviews".restaurants_id
  JOIN "reviews" ON "restaurants_reviews".reviews_id = "reviews".id
  WHERE "restaurants".id = 1;
  
  SELECT "reviews".* FROM "restaurants" 
    JOIN "restaurants_reviews" ON "restaurants".id = "restaurants_reviews".restaurants_id
    JOIN "reviews" ON "restaurants_reviews".reviews_id = "reviews".id
    WHERE "restaurants".id = 1;
  
 UPDATE "reviews" SET "rating"=5 WHERE id=1; 