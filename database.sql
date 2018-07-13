CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL
);

CREATE TABLE "device" (
    "id" SERIAL PRIMARY KEY,
    "device_nickname" VARCHAR (80) NOT NULL,
    "device_build_id" VARCHAR (100) NOT NULL,
    "access_token" VARCHAR (100) NOT NULL,
    "device_location" VARCHAR(100) NOT NULL,
    "device_type" VARCHAR (100) NOT NULL,
    "sensor_type" VARCHAR (100) NOT NULL,
    "person_id" INT REFERENCES "person"
);

CREATE TABLE "sensors" (
	"id" SERIAL PRIMARY KEY,
	"sensor_name" VARCHAR(100) NOT NULL,
	"device_id" INT REFERENCES "device"
);

CREATE TABLE "desired_temperature" (
	"id" SERIAL PRIMARY KEY,
	"desired_temperature" INT,
	"person_id" INT REFERENCES "person"
);

CREATE TABLE "sensor_data" (
	"id" SERIAL PRIMARY KEY,
	"device_id" INT REFERENCES "device",
	"date" VARCHAR(100),
	"temperature" INT,
	"humidity" INT
);