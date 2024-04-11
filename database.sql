-- create database concert_masterlist
--USERS TABLE
CREATE TABLE
    users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(60) not null,
        is_admin BOOLEAN default false,
        password VARCHAR(1000) not null
    );

INSERT INTO
    bands ("name")
VALUES
    ('Dropkick Murphys'),
    ('The Interrupters'),
    ('Jesse Ahern')
INSERT INTO
    concerts ("venue", "city", "state", "date")
VALUES
    ('Scheels Arena', 'Fargo', 'ND', '2023/10/14')
INSERT INTO
    band_concerts ("band_id", "concert_id", "concert_position")
VALUES
    (1, 2, 1),
    (2, 2, 2),
    (3, 2, 3);

INSERT INTO
    user_concerts (
        "user_id",
        "concert_id",
        "comments",
        "seat_location"
    )
VALUES
    (1, 2, 'Fun Show!', 'pit');

--CONCERTS TABLE
CREATE TABLE
    concerts (
        id SERIAL PRIMARY KEY,
        venue VARCHAR(150),
        city VARCHAR(150) NOT NULL,
        state VARCHAR(2),
        date DATE NOT NULL
    );

--BANDS TABLE
CREATE TABLE
    bands (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        spotify_id CHAR(22),
    );

--USER_CONCERTS Joiner table
CREATE TABLE
    user_concerts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
        concert_id INTEGER REFERENCES concerts (id) ON DELETE CASCADE,
        hidden BOOLEAN default false,
        is_deleted BOOLEAN default false,
        deleted_date DATE,
        favorite BOOLEAN default false,
        comments VARCHAR(1000),
        seat_location VARCHAR(35)
    );

--ENHANCEMENTS  // need to implement this in the future
CREATE TABLE
    enhancements (
        id SERIAL PRIMARY KEY,
        user_concert_id INTEGER REFERENCES user_concerts (id) ON DELETE CASCADE,
        type VARCHAR(50) NOT NULL,
        description VARCHAR(1000)
        -- description is updated. was too small.
    );

-- FRIENDS  //TODO: Working on implementing this. met_where will be later
-- status will either be pending, confirmed, or blocked.
CREATE TABLE
    friends (
        id SERIAL PRIMARY KEY,
        user_1 INTEGER REFERENCES users (id) ON DELETE CASCADE,
        user_2 INTEGER REFERENCES users (id) ON DELETE CASCADE,
        status VARCHAR(10) NOT NULL,
        met_where VARCHAR(250)
    );

    -- New table to handle all of the friend request tables. 
    --TODO: Implement code to clean out old and completed requests after so long
    -- Constraint is so user cannot send a request to themselves
CREATE TABLE
    friend_request (
        id SERIAL PRIMARY KEY,
        sender_id INTEGER REFERENCES users (id),
        receiver_id INTEGER REFERENCES users (id),
        status VARCHAR(10) NOT NULL,
        sent_at TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP
        WITH
            TIME ZONE NULL,
        CONSTRAINT chk_sender_receiver CHECK (sender_id != receiver_id)
    );

    -- NEW JOIN TABLE BAND_CONCERTS
CREATE TABLE
    band_concerts (
        id SERIAL PRIMARY KEY,
        band_id INTEGER REFERENCES bands (id) ON DELETE CASCADE,
        concert_id INTEGER REFERENCES concerts (id) ON DELETE CASCADE,
        concert_position INTEGER
    );

-- NEW PICTURES TABLE
CREATE TABLE
    pictures (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users (id),
        band_concert_id INTEGER REFERENCES band_concerts (id) ON DELETE CASCADE,
        url VARCHAR(1000) NOT NULL
    );

select
    *
FROM
    "users";

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
    JOIN users u ON uc.user_id = u.id
    JOIN concerts c ON uc.concert_id = c.id
    JOIN band_concerts bc ON c.id = bc.concert_id
    JOIN bands b ON bc.band_id = b.id
    LEFT JOIN pictures p ON u.id = p.user_id
    AND bc.id = p.band_concert_id
WHERE
    uc.hidden = false
    AND uc.is_deleted = false;