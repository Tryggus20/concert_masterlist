--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9 (Homebrew)
-- Dumped by pg_dump version 14.9 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: band_concerts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.band_concerts (
    id integer NOT NULL,
    band_id integer,
    concert_id integer,
    concert_position integer
);


--
-- Name: band_concerts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.band_concerts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: band_concerts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.band_concerts_id_seq OWNED BY public.band_concerts.id;


--
-- Name: bands; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.bands (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);


--
-- Name: bands_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.bands_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: bands_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.bands_id_seq OWNED BY public.bands.id;


--
-- Name: concerts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.concerts (
    id integer NOT NULL,
    venue character varying(150),
    city character varying(150) NOT NULL,
    state character varying(2),
    date date NOT NULL
);


--
-- Name: concerts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.concerts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: concerts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.concerts_id_seq OWNED BY public.concerts.id;


--
-- Name: enhancements; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.enhancements (
    id integer NOT NULL,
    user_concert_id integer,
    type character varying(50) NOT NULL,
    description character varying(1000)
);


--
-- Name: enhancements_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.enhancements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: enhancements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.enhancements_id_seq OWNED BY public.enhancements.id;


--
-- Name: friends; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.friends (
    id integer NOT NULL,
    user_1 integer,
    user_2 integer,
    follow boolean DEFAULT false,
    met_where character varying(150)
);


--
-- Name: friends_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.friends_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: friends_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.friends_id_seq OWNED BY public.friends.id;


--
-- Name: pictures; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pictures (
    id integer NOT NULL,
    user_id integer,
    band_concert_id integer,
    url character varying(1000) NOT NULL
);


--
-- Name: pictures_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.pictures_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pictures_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pictures_id_seq OWNED BY public.pictures.id;


--
-- Name: user_concerts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_concerts (
    id integer NOT NULL,
    user_id integer,
    concert_id integer,
    hidden boolean DEFAULT false,
    is_deleted boolean DEFAULT false,
    deleted_date date,
    favorite boolean DEFAULT false,
    comments character varying(1000),
    seat_location character varying(35)
);


--
-- Name: user_concerts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_concerts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_concerts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_concerts_id_seq OWNED BY public.user_concerts.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(60) NOT NULL,
    is_admin boolean DEFAULT false,
    password character varying(1000) NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: band_concerts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.band_concerts ALTER COLUMN id SET DEFAULT nextval('public.band_concerts_id_seq'::regclass);


--
-- Name: bands id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bands ALTER COLUMN id SET DEFAULT nextval('public.bands_id_seq'::regclass);


--
-- Name: concerts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.concerts ALTER COLUMN id SET DEFAULT nextval('public.concerts_id_seq'::regclass);


--
-- Name: enhancements id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.enhancements ALTER COLUMN id SET DEFAULT nextval('public.enhancements_id_seq'::regclass);


--
-- Name: friends id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.friends ALTER COLUMN id SET DEFAULT nextval('public.friends_id_seq'::regclass);


--
-- Name: pictures id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pictures ALTER COLUMN id SET DEFAULT nextval('public.pictures_id_seq'::regclass);


--
-- Name: user_concerts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_concerts ALTER COLUMN id SET DEFAULT nextval('public.user_concerts_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: band_concerts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (19, 4, 2, 1);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (23, 5, 2, 2);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (24, 6, 2, 3);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (25, 7, 3, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (26, 7, 3, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (27, 9, 4, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (28, 9, 4, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (29, 9, 4, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (30, 9, 4, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (31, 9, 4, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (32, 11, 5, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (33, 11, 5, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (34, 14, 5, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (35, 11, 5, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (36, 13, 5, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (37, 11, 5, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (38, 13, 5, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (39, 15, 6, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (45, 18, 8, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (46, 19, 8, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (48, 11, 9, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (47, 12, 9, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (50, 26, 10, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (51, 27, 11, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (52, 28, 11, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (53, 9, 12, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (54, 10, 12, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (55, 29, 12, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (56, 30, 13, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (57, 31, 13, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (58, 32, 13, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (59, 34, 14, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (60, 35, 14, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (61, 36, 14, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (62, 37, 14, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (63, 40, 15, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (66, 43, 16, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (64, 44, 16, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (49, 20, 10, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (67, 45, 17, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (68, 20, 18, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (65, 46, 16, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (69, 47, 19, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (70, 48, 19, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (71, 49, 20, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (72, 50, 21, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (73, 10, 22, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (74, 51, 23, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (75, 52, 23, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (76, 53, 23, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (77, 54, 24, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (78, 55, 24, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (79, 56, 24, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (80, 44, 25, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (81, 46, 25, NULL);
INSERT INTO public.band_concerts (id, band_id, concert_id, concert_position) VALUES (82, 43, 25, NULL);


--
-- Data for Name: bands; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.bands (id, name) VALUES (4, 'Dropkick Murphys');
INSERT INTO public.bands (id, name) VALUES (5, 'The Interrupters');
INSERT INTO public.bands (id, name) VALUES (6, 'Jesse Ahern');
INSERT INTO public.bands (id, name) VALUES (7, 'DJ Blaine');
INSERT INTO public.bands (id, name) VALUES (8, 'Mason''s AirPods');
INSERT INTO public.bands (id, name) VALUES (9, 'Shinedown');
INSERT INTO public.bands (id, name) VALUES (10, 'Papa Roach');
INSERT INTO public.bands (id, name) VALUES (11, 'My Speakers');
INSERT INTO public.bands (id, name) VALUES (12, 'Noisy Neighbors');
INSERT INTO public.bands (id, name) VALUES (13, 'My Neighbors');
INSERT INTO public.bands (id, name) VALUES (14, 'dsfadafs');
INSERT INTO public.bands (id, name) VALUES (15, 'Shoplifters');
INSERT INTO public.bands (id, name) VALUES (16, 'Don''t Know, Don''t Care');
INSERT INTO public.bands (id, name) VALUES (17, 'The Nobodys');
INSERT INTO public.bands (id, name) VALUES (18, 'Friday The 13th');
INSERT INTO public.bands (id, name) VALUES (19, 'Halloween Town');
INSERT INTO public.bands (id, name) VALUES (20, 'Taylor Swift');
INSERT INTO public.bands (id, name) VALUES (21, 'Imaging Dragons');
INSERT INTO public.bands (id, name) VALUES (22, 'Noisy Neighbor');
INSERT INTO public.bands (id, name) VALUES (23, 'Noisy');
INSERT INTO public.bands (id, name) VALUES (24, 'Noisy Nerighrbrs');
INSERT INTO public.bands (id, name) VALUES (25, 'ImagineDragons');
INSERT INTO public.bands (id, name) VALUES (26, 'Imagine Dragons');
INSERT INTO public.bands (id, name) VALUES (27, 'Macklemore');
INSERT INTO public.bands (id, name) VALUES (28, 'Kesha');
INSERT INTO public.bands (id, name) VALUES (29, 'Diamante');
INSERT INTO public.bands (id, name) VALUES (30, 'Slipknot');
INSERT INTO public.bands (id, name) VALUES (31, 'In This Moment');
INSERT INTO public.bands (id, name) VALUES (32, 'Wage War');
INSERT INTO public.bands (id, name) VALUES (33, 'afsdfad');
INSERT INTO public.bands (id, name) VALUES (34, 'Three Days Grace');
INSERT INTO public.bands (id, name) VALUES (35, 'Linkin Park');
INSERT INTO public.bands (id, name) VALUES (36, 'Breaking Benjamin');
INSERT INTO public.bands (id, name) VALUES (37, 'Otherwise');
INSERT INTO public.bands (id, name) VALUES (38, '{{"Taylor Swift"}}');
INSERT INTO public.bands (id, name) VALUES (39, 'Taylor Swifty');
INSERT INTO public.bands (id, name) VALUES (40, 'SpaceRockStars');
INSERT INTO public.bands (id, name) VALUES (41, 'Pink');
INSERT INTO public.bands (id, name) VALUES (42, 'Brani Carlile');
INSERT INTO public.bands (id, name) VALUES (43, 'Grouplove');
INSERT INTO public.bands (id, name) VALUES (44, 'P!nk');
INSERT INTO public.bands (id, name) VALUES (45, 'Ogga boooga');
INSERT INTO public.bands (id, name) VALUES (46, 'Brandi Carlile');
INSERT INTO public.bands (id, name) VALUES (47, 'Gemini Syndrome');
INSERT INTO public.bands (id, name) VALUES (48, 'September Mourning');
INSERT INTO public.bands (id, name) VALUES (49, 'Ice Cube');
INSERT INTO public.bands (id, name) VALUES (50, 'Jinjer');
INSERT INTO public.bands (id, name) VALUES (51, 'Alter Bridge');
INSERT INTO public.bands (id, name) VALUES (52, 'Sevendust');
INSERT INTO public.bands (id, name) VALUES (53, 'MJT');
INSERT INTO public.bands (id, name) VALUES (54, 'Metallica');
INSERT INTO public.bands (id, name) VALUES (55, 'Avenged Sevenfold');
INSERT INTO public.bands (id, name) VALUES (56, 'Volbeat');


--
-- Data for Name: concerts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.concerts (id, venue, city, state, date) VALUES (3, 'PrairieDen', 'Fargo', 'ND', '2023-10-19');
INSERT INTO public.concerts (id, venue, city, state, date) VALUES (4, 'Fargodome', 'Fargo', 'ND', '2023-10-18');
INSERT INTO public.concerts (id, venue, city, state, date) VALUES (5, 'My House', 'Fargo', 'ND', '2023-10-15');
INSERT INTO public.concerts (id, venue, city, state, date) VALUES (7, 'Sioux Falls', 'Sioux Falls', 'SD', '2023-10-03');
INSERT INTO public.concerts (id, venue, city, state, date) VALUES (6, 'WestAcres', 'Minneapolis', 'mn', '2023-10-01');
INSERT INTO public.concerts (id, venue, city, state, date) VALUES (9, 'My House', 'Fargo', 'ND', '2023-10-23');
INSERT INTO public.concerts (id, venue, city, state, date) VALUES (2, 'Scheels Arena', 'Fargo', 'ND', '2023-10-14');
INSERT INTO public.concerts (id, venue, city, state, date) VALUES (11, 'Sanctuary', 'Fargo', 'ND', '2023-10-25');
INSERT INTO public.concerts (id, venue, city, state, date) VALUES (12, 'Fargodome', 'Fargo', 'ND', '2023-08-30');
INSERT INTO public.concerts (id, venue, city, state, date) VALUES (13, 'Fargodome', 'Fargo', 'nd', '2022-03-16');
INSERT INTO public.concerts (id, venue, city, state, date) VALUES (14, 'The Armory', 'Minneapolis', 'MN', '2023-10-26');
INSERT INTO public.concerts (id, venue, city, state, date) VALUES (10, 'Prairie Den', 'Fargo', 'ND', '2023-10-22');
INSERT INTO public.concerts (id, venue, city, state, date) VALUES (15, 'Space', 'Moonland', 'MU', '2042-10-03');
INSERT INTO public.concerts (id, venue, city, state, date) VALUES (16, 'FargoDome', 'Fargo', 'ND', '2023-08-19');
INSERT INTO public.concerts (id, venue, city, state, date) VALUES (17, 'hello', 'fargo', 'nd', '2023-10-01');
INSERT INTO public.concerts (id, venue, city, state, date) VALUES (18, 'Scheels Arena', 'Fargo', 'ND', '2023-10-29');
INSERT INTO public.concerts (id, venue, city, state, date) VALUES (8, 'PrairieDen', 'Fargo', 'ND', '2023-10-13');
INSERT INTO public.concerts (id, venue, city, state, date) VALUES (20, 'RockFest', 'Cadott', 'WI', '2023-07-13');
INSERT INTO public.concerts (id, venue, city, state, date) VALUES (19, 'RockFest', 'Cadott', 'WI', '2023-07-12');
INSERT INTO public.concerts (id, venue, city, state, date) VALUES (21, 'RockFest', 'Cadott', 'WI', '2023-07-14');
INSERT INTO public.concerts (id, venue, city, state, date) VALUES (22, 'RockFest', 'Cadott', 'WI', '2023-07-15');
INSERT INTO public.concerts (id, venue, city, state, date) VALUES (23, 'Fargo Brewing', 'Fargo', 'ND', '2023-08-28');
INSERT INTO public.concerts (id, venue, city, state, date) VALUES (24, 'US Bank Stadium', 'Minneapolis', 'MN', '2016-08-20');
INSERT INTO public.concerts (id, venue, city, state, date) VALUES (25, 'Fargodome', 'Fargo', 'ND', '2023-08-19');


--
-- Data for Name: enhancements; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: friends; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: pictures; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.pictures (id, user_id, band_concert_id, url) VALUES (6, 10, 24, 'https://i.ibb.co/kJYDJsy/20231014-192432.jpg');
INSERT INTO public.pictures (id, user_id, band_concert_id, url) VALUES (7, 10, 23, 'https://i.ibb.co/Gx1gsyp/20231014-195226.jpg');
INSERT INTO public.pictures (id, user_id, band_concert_id, url) VALUES (1, 10, 19, 'https://i.ibb.co/ZV9WZqy/20231014-212645.jpg');
INSERT INTO public.pictures (id, user_id, band_concert_id, url) VALUES (2, 10, 19, 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uY2VydHxlbnwwfHwwfHx8MA%3D%3D&w=1400');
INSERT INTO public.pictures (id, user_id, band_concert_id, url) VALUES (8, 10, 49, 'https://people.com/thmb/hpoiVOw0GmQ56iHW0gnUEmCw0mI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(791x211:793x213):format(webp)/taylor-swift-gameday-102223-1-64c1a3f1d19041fba406d415154aa4eb.jpg');
INSERT INTO public.pictures (id, user_id, band_concert_id, url) VALUES (3, 10, 36, 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uY2VydHxlbnwwfHwwfHx8MA%3D%3D&w=1400');
INSERT INTO public.pictures (id, user_id, band_concert_id, url) VALUES (4, 10, 37, 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uY2VydHxlbnwwfHwwfHx8MA%3D%3D&w=1400');
INSERT INTO public.pictures (id, user_id, band_concert_id, url) VALUES (5, 10, 38, 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uY2VydHxlbnwwfHwwfHx8MA%3D%3D&w=1400');
INSERT INTO public.pictures (id, user_id, band_concert_id, url) VALUES (9, 10, 51, 'https://variety.com/wp-content/uploads/2013/07/macklemore-ryan-lewis-thrift-shop.jpg?w=640&h=360&crop=1');
INSERT INTO public.pictures (id, user_id, band_concert_id, url) VALUES (10, 10, 52, 'https://image.petmd.com/files/styles/978x550/public/2023-03/pit-bull.jpg?w=2048&q=75');
INSERT INTO public.pictures (id, user_id, band_concert_id, url) VALUES (11, 10, 64, 'https://www.inquirer.com/resizer/UP6U7NFig-eWXkeKMXeEWByz6Xo=/700x467/smart/filters:format(webp)/cloudfront-us-east-1.images.arcpublishing.com/pmn/JW2BERMNEZEU5MBQGG3LJBGPY4.jpg');
INSERT INTO public.pictures (id, user_id, band_concert_id, url) VALUES (12, 10, 64, 'https://media.gettyimages.com/id/1501292691/photo/p-nk-headlines-bst-hyde-park-festival-2023.jpg?s=2048x2048&w=gi&k=20&c=21WtiyxrbvPdtd-ndM-6jyN4mwytfarKZ8NPHgawqKk=');
INSERT INTO public.pictures (id, user_id, band_concert_id, url) VALUES (13, 10, 64, 'https://www.billboard.com/wp-content/uploads/media/pink-performs-beautiful-trauma-2018-billboard-1548.jpg?w=942&h=623&crop=1');
INSERT INTO public.pictures (id, user_id, band_concert_id, url) VALUES (14, 10, 65, 'https://www.rollingstone.com/wp-content/uploads/2021/10/bcarlile-2022tour.jpg?w=1581&h=1054&crop=1');
INSERT INTO public.pictures (id, user_id, band_concert_id, url) VALUES (15, 10, 69, 'https://i.ibb.co/xMLDBCf/20230712-222457.jpg');
INSERT INTO public.pictures (id, user_id, band_concert_id, url) VALUES (16, 10, 69, 'https://i.ibb.co/30T66Yq/20230712-222857.jpg');
INSERT INTO public.pictures (id, user_id, band_concert_id, url) VALUES (17, 10, 70, 'https://i.ibb.co/7g4yztC/20230712-202446.jpg');
INSERT INTO public.pictures (id, user_id, band_concert_id, url) VALUES (18, 10, 71, 'https://i.ibb.co/7ny2kxc/20230713-204142.jpg');
INSERT INTO public.pictures (id, user_id, band_concert_id, url) VALUES (19, 10, 72, 'https://i.ibb.co/VCsJkNb/20230714-193501.jpg');
INSERT INTO public.pictures (id, user_id, band_concert_id, url) VALUES (20, 10, 72, 'https://i.ibb.co/pJPd0S0/20230714-193515-0.jpg');
INSERT INTO public.pictures (id, user_id, band_concert_id, url) VALUES (21, 10, 73, 'https://i.ibb.co/YRYrHQ7/20230715-212415.jpg');
INSERT INTO public.pictures (id, user_id, band_concert_id, url) VALUES (22, 10, 73, 'https://i.ibb.co/ftjggK1/20230715-212351.jpg');
INSERT INTO public.pictures (id, user_id, band_concert_id, url) VALUES (23, 10, 74, 'https://i.ibb.co/42VT5Nn/20230828-210102.jpg');
INSERT INTO public.pictures (id, user_id, band_concert_id, url) VALUES (24, 10, 74, 'https://i.ibb.co/RDSGf5L/20230828-210121.jpg');
INSERT INTO public.pictures (id, user_id, band_concert_id, url) VALUES (25, 10, 75, 'https://i.ibb.co/rpqNXjj/20230828-195634.jpg');
INSERT INTO public.pictures (id, user_id, band_concert_id, url) VALUES (26, 10, 77, 'https://i.ibb.co/N6TH8Zj/FB-IMG-1698663936719.jpg');
INSERT INTO public.pictures (id, user_id, band_concert_id, url) VALUES (27, 10, 80, 'https://i.ibb.co/hXFDxSz/20230819-220359-1.jpg');
INSERT INTO public.pictures (id, user_id, band_concert_id, url) VALUES (28, 10, 80, 'https://i.ibb.co/hmmRtcw/20230819-215314-1.jpg');
INSERT INTO public.pictures (id, user_id, band_concert_id, url) VALUES (29, 10, 80, 'https://i.ibb.co/gM7YkMn/20230819-210224.jpg');
INSERT INTO public.pictures (id, user_id, band_concert_id, url) VALUES (30, 10, 81, 'https://www.tennessean.com/gcdn/presto/2022/07/09/PNAS/68aa125a-b668-4340-a381-53dc20f9b4e5-BrandiCarlile-070822-AN-024.jpg?width=1320&height=880&fit=crop&format=pjpg&auto=webp');


--
-- Data for Name: user_concerts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.user_concerts (id, user_id, concert_id, hidden, is_deleted, deleted_date, favorite, comments, seat_location) VALUES (5, 3, 2, false, false, NULL, false, 'Fun Show!', 'pit');
INSERT INTO public.user_concerts (id, user_id, concert_id, hidden, is_deleted, deleted_date, favorite, comments, seat_location) VALUES (8, 10, 7, false, false, NULL, false, '', NULL);
INSERT INTO public.user_concerts (id, user_id, concert_id, hidden, is_deleted, deleted_date, favorite, comments, seat_location) VALUES (6, 10, 2, false, false, NULL, false, 'Fun show!', 'pit');
INSERT INTO public.user_concerts (id, user_id, concert_id, hidden, is_deleted, deleted_date, favorite, comments, seat_location) VALUES (15, 10, 13, false, false, NULL, false, '', NULL);
INSERT INTO public.user_concerts (id, user_id, concert_id, hidden, is_deleted, deleted_date, favorite, comments, seat_location) VALUES (11, 10, 10, false, false, NULL, false, 'hello', NULL);
INSERT INTO public.user_concerts (id, user_id, concert_id, hidden, is_deleted, deleted_date, favorite, comments, seat_location) VALUES (21, 10, 18, false, true, '2023-10-29', false, '', NULL);
INSERT INTO public.user_concerts (id, user_id, concert_id, hidden, is_deleted, deleted_date, favorite, comments, seat_location) VALUES (20, 10, 18, false, true, '2023-10-29', false, '', NULL);
INSERT INTO public.user_concerts (id, user_id, concert_id, hidden, is_deleted, deleted_date, favorite, comments, seat_location) VALUES (22, 10, 18, false, true, '2023-10-29', false, '', NULL);
INSERT INTO public.user_concerts (id, user_id, concert_id, hidden, is_deleted, deleted_date, favorite, comments, seat_location) VALUES (17, 10, 15, false, true, '2023-10-29', false, 'i cannot wait for this moon show. ', NULL);
INSERT INTO public.user_concerts (id, user_id, concert_id, hidden, is_deleted, deleted_date, favorite, comments, seat_location) VALUES (16, 10, 14, false, true, '2023-10-29', false, '', NULL);
INSERT INTO public.user_concerts (id, user_id, concert_id, hidden, is_deleted, deleted_date, favorite, comments, seat_location) VALUES (10, 10, 9, false, true, '2023-10-29', false, '', NULL);
INSERT INTO public.user_concerts (id, user_id, concert_id, hidden, is_deleted, deleted_date, favorite, comments, seat_location) VALUES (7, 10, 6, false, true, '2023-10-29', false, 'HI', NULL);
INSERT INTO public.user_concerts (id, user_id, concert_id, hidden, is_deleted, deleted_date, favorite, comments, seat_location) VALUES (9, 10, 8, false, false, NULL, false, '', NULL);
INSERT INTO public.user_concerts (id, user_id, concert_id, hidden, is_deleted, deleted_date, favorite, comments, seat_location) VALUES (19, 10, 17, false, true, '2023-10-29', false, '', NULL);
INSERT INTO public.user_concerts (id, user_id, concert_id, hidden, is_deleted, deleted_date, favorite, comments, seat_location) VALUES (24, 10, 20, false, false, NULL, false, '', NULL);
INSERT INTO public.user_concerts (id, user_id, concert_id, hidden, is_deleted, deleted_date, favorite, comments, seat_location) VALUES (23, 10, 19, false, false, NULL, false, '', NULL);
INSERT INTO public.user_concerts (id, user_id, concert_id, hidden, is_deleted, deleted_date, favorite, comments, seat_location) VALUES (25, 10, 21, false, false, NULL, false, '', NULL);
INSERT INTO public.user_concerts (id, user_id, concert_id, hidden, is_deleted, deleted_date, favorite, comments, seat_location) VALUES (26, 10, 22, false, false, NULL, false, '', NULL);
INSERT INTO public.user_concerts (id, user_id, concert_id, hidden, is_deleted, deleted_date, favorite, comments, seat_location) VALUES (27, 10, 23, false, false, NULL, false, '', NULL);
INSERT INTO public.user_concerts (id, user_id, concert_id, hidden, is_deleted, deleted_date, favorite, comments, seat_location) VALUES (18, 10, 16, false, true, '2023-10-30', false, 'Fun Show. Mom''s birthday present ', NULL);
INSERT INTO public.user_concerts (id, user_id, concert_id, hidden, is_deleted, deleted_date, favorite, comments, seat_location) VALUES (13, 10, 11, false, true, '2023-10-30', false, 'Pitbull was with Ke$ha but Macklemore took the cake! Hoooooooeeeeeeeeyyyyyy!!!!!', NULL);
INSERT INTO public.user_concerts (id, user_id, concert_id, hidden, is_deleted, deleted_date, favorite, comments, seat_location) VALUES (14, 10, 12, false, true, '2023-10-30', false, '', NULL);
INSERT INTO public.user_concerts (id, user_id, concert_id, hidden, is_deleted, deleted_date, favorite, comments, seat_location) VALUES (28, 10, 24, false, false, NULL, false, '', NULL);
INSERT INTO public.user_concerts (id, user_id, concert_id, hidden, is_deleted, deleted_date, favorite, comments, seat_location) VALUES (29, 10, 25, false, false, NULL, false, '', NULL);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users (id, username, is_admin, password) VALUES (3, 'david', true, '1234');
INSERT INTO public.users (id, username, is_admin, password) VALUES (4, 'scott', false, '1234');
INSERT INTO public.users (id, username, is_admin, password) VALUES (10, 'David', true, '$2a$10$/XoLF1meQBpNU/omwQ4Nd.7WdJMHHE5r.A0NPxz6uxV1T7eBjaoU2');
INSERT INTO public.users (id, username, is_admin, password) VALUES (11, 'David', false, '$2a$10$2hgNHEhu20otJYAqarQ/cePOs2AaSdxLl8Rv6EegQPTl2Cz64XDR6');
INSERT INTO public.users (id, username, is_admin, password) VALUES (12, 'David', false, '$2a$10$k9PUiDuv2xlpXK1hrhaq4Ozg025s4i4nhEoReJTxvVgfn/eJMlYtW');
INSERT INTO public.users (id, username, is_admin, password) VALUES (13, 'David', false, '$2a$10$9XRBA9BjcEzli/LXFCHFTe6LV0Z9DFlqhC0KJE87874FNDbZH2Aou');
INSERT INTO public.users (id, username, is_admin, password) VALUES (14, 'David', false, '$2a$10$FswP9kWs5qfCMx/xueX3cuqQPZTylYMg23sldX8SDLbFNvMEnIMre');


--
-- Name: band_concerts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.band_concerts_id_seq', 82, true);


--
-- Name: bands_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.bands_id_seq', 56, true);


--
-- Name: concerts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.concerts_id_seq', 25, true);


--
-- Name: enhancements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.enhancements_id_seq', 1, false);


--
-- Name: friends_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.friends_id_seq', 1, false);


--
-- Name: pictures_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.pictures_id_seq', 30, true);


--
-- Name: user_concerts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_concerts_id_seq', 29, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 14, true);


--
-- Name: band_concerts band_concerts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.band_concerts
    ADD CONSTRAINT band_concerts_pkey PRIMARY KEY (id);


--
-- Name: bands bands_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bands
    ADD CONSTRAINT bands_pkey PRIMARY KEY (id);


--
-- Name: concerts concerts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.concerts
    ADD CONSTRAINT concerts_pkey PRIMARY KEY (id);


--
-- Name: enhancements enhancements_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.enhancements
    ADD CONSTRAINT enhancements_pkey PRIMARY KEY (id);


--
-- Name: friends friends_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.friends
    ADD CONSTRAINT friends_pkey PRIMARY KEY (id);


--
-- Name: pictures pictures_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pictures
    ADD CONSTRAINT pictures_pkey PRIMARY KEY (id);


--
-- Name: user_concerts user_concerts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_concerts
    ADD CONSTRAINT user_concerts_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: band_concerts band_concerts_band_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.band_concerts
    ADD CONSTRAINT band_concerts_band_id_fkey FOREIGN KEY (band_id) REFERENCES public.bands(id) ON DELETE CASCADE;


--
-- Name: band_concerts band_concerts_concert_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.band_concerts
    ADD CONSTRAINT band_concerts_concert_id_fkey FOREIGN KEY (concert_id) REFERENCES public.concerts(id) ON DELETE CASCADE;


--
-- Name: enhancements enhancements_user_concert_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.enhancements
    ADD CONSTRAINT enhancements_user_concert_id_fkey FOREIGN KEY (user_concert_id) REFERENCES public.user_concerts(id) ON DELETE CASCADE;


--
-- Name: friends friends_user_1_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.friends
    ADD CONSTRAINT friends_user_1_fkey FOREIGN KEY (user_1) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: friends friends_user_2_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.friends
    ADD CONSTRAINT friends_user_2_fkey FOREIGN KEY (user_2) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: pictures pictures_band_concert_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pictures
    ADD CONSTRAINT pictures_band_concert_id_fkey FOREIGN KEY (band_concert_id) REFERENCES public.band_concerts(id) ON DELETE CASCADE;


--
-- Name: pictures pictures_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pictures
    ADD CONSTRAINT pictures_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: user_concerts user_concerts_concert_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_concerts
    ADD CONSTRAINT user_concerts_concert_id_fkey FOREIGN KEY (concert_id) REFERENCES public.concerts(id) ON DELETE CASCADE;


--
-- Name: user_concerts user_concerts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_concerts
    ADD CONSTRAINT user_concerts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

