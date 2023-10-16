-- create database concert_masterlist
--USERS TABLE
CREATE TABLE users (
id SERIAL PRIMARY KEY,
username VARCHAR(60) not null,
is_admin BOOLEAN default false,
password VARCHAR(1000) not null
);

INSERT INTO users ("username", "is_admin", "password")
VALUES ('david', TRUE, 1234), ('scott', FALSE, 1234);


--CONCERTS TABLE
CREATE TABLE concerts (
id SERIAL PRIMARY KEY,
venue VARCHAR(150),
city VARCHAR(150) NOT NULL,
state VARCHAR(2),
date DATE NOT NULL
);

--BANDS TABLE
CREATE TABLE bands (
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL
);

--USER_CONCERTS Joiner table
CREATE TABLE user_concerts (
id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
concert_id INTEGER REFERENCES concerts(id) ON DELETE CASCADE,
hidden BOOLEAN default false,
is_deleted BOOLEAN default false,
deleted_date DATE,
favorite BOOLEAN default false,
comments VARCHAR(1000),
seat_location VARCHAR(35)
);

--ENHANCEMENTS
CREATE TABLE enhancements (
id SERIAL PRIMARY KEY,
user_concert_id INTEGER REFERENCES user_concerts(id) ON DELETE CASCADE,
type VARCHAR(50) NOT NULL,
description VARCHAR(1000)
-- description is updated. was too small.
);

-- FRIENDS 
CREATE TABLE friends (
id SERIAL PRIMARY KEY,
user_1 INTEGER REFERENCES users(id) ON DELETE CASCADE,
user_2 INTEGER REFERENCES users(id) ON DELETE CASCADE,
follow BOOLEAN default false,
met_where VARCHAR(150)
);



-- NEW JOIN TABLE BAND_CONCERTS
CREATE TABLE band_concerts (
    id SERIAL PRIMARY KEY,
    band_id INTEGER REFERENCES bands(id) ON DELETE CASCADE,
    concert_id INTEGER REFERENCES concerts(id) ON DELETE CASCADE,
    concert_position INTEGER 
);

-- NEW PICTURES TABLE
CREATE TABLE pictures (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    band_concert_id INTEGER REFERENCES band_concerts(id) ON DELETE CASCADE,
    url VARCHAR(1000) NOT NULL
);



select * FROM "users";

drop table enhancements;
drop table pictures;
drop table band_concerts
drop table user_concerts;
drop table bands;
drop table concerts;


-- Concerts for ALL USERS --BROKEN--
SELECT "users".id, "users".username, "concerts".venue, "concerts".date, 
ARRAY_AGG("bands".name ORDER BY "bands".concert_position ASC) FROM "users" 
JOIN "user_concerts" ON "user_concerts".user_id = "users".id JOIN "concerts" 
ON "concerts".id = "user_concerts".concert_id JOIN "bands" ON 
"bands".concert_id = "concerts".id GROUP BY "users".id, "users".username,
 "concerts".venue, "concerts".date;

-- Concerts for a SPECIFIC USER --BROKEN--
SELECT "users".id AS user_id, "users".username, "concerts".venue, "concerts".date, ARRAY_AGG("bands".name ORDER BY "bands".concert_position ASC) FROM "users" JOIN "user_concerts" ON "user_concerts".user_id= "users".id JOIN "concerts" ON "concerts".id = "user_concerts".concert_id JOIN "bands" ON "bands".concert_id = "concerts".id WHERE "user_id"=1 GROUP BY "users".id, "users".username, "concerts".venue, "concerts".date;


-- NEW Concerts for ALL USERS since table change              --TRY WITH JSON AGG LATER ON. object may be helpful
SELECT "users".id, "users".username, "concerts".venue, "concerts".date, ARRAY_AGG("bands".name ORDER BY "band_concerts".concert_position ASC) FROM "users" JOIN "user_concerts" ON "user_concerts".user_id = "users".id JOIN "concerts" ON "concerts".id = "user_concerts".concert_id JOIN "band_concerts" ON "band_concerts".concert_id = "concerts".id JOIN "bands" on "bands".id = "bands_concerts".band_id;




SELECT
    u.id AS user_id,
    u.username AS username,
    c.id AS concert_id,
    c.venue AS venue,
    c.city AS city,
    c.state AS state,
    c.date AS concert_date,
    b.id AS band_id,
    b.name AS band_name,
    p.url AS picture_url
FROM
    user_concerts uc
JOIN
    users u ON uc.user_id = u.id
JOIN
    concerts c ON uc.concert_id = c.id
JOIN
    band_concerts bc ON c.id = bc.concert_id
JOIN
    bands b ON bc.band_id = b.id
LEFT JOIN
    pictures p ON u.id = p.user_id AND bc.id = p.band_concert_id
WHERE
    uc.hidden = false
    AND uc.is_deleted = false;
