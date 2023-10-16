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

INSERT INTO bands ("name")
VALUES ('Dropkick Murphys'), ('The Interrupters'), ('Jesse Ahern')

INSERT INTO concerts ("venue", "city", "state", "date")
VALUES ('Scheels Arena', 'Fargo', 'ND', '2023/10/14')

INSERT INTO band_concerts ("band_id", "concert_id", "concert_position")
VALUES (1, 2, 1 ), (2,2,2), (3,2,3);

INSERT INTO user_concerts ("user_id", "concert_id", "comments", "seat_location")
VALUES (1, 2, 'Fun Show!', 'pit');



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



-- different queries for different pages?
-- for card view I can select url from pictures limit 1.
--maybe use that for card AND list view.
-- just do not show the pic anywhere on list view
-- Bands can be in an array for both views