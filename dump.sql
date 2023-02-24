--
-- PostgreSQL database dump
--

-- Dumped from database version 12.13 (Ubuntu 12.13-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.13 (Ubuntu 12.13-0ubuntu0.20.04.1)

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
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer,
    token text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT timezone('America/Sao_Paulo'::text, CURRENT_TIMESTAMP) NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: teste; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.teste (
    id integer NOT NULL,
    name character varying(50)
);


--
-- Name: teste_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.teste_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: teste_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.teste_id_seq OWNED BY public.teste.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "userId" integer,
    url text NOT NULL,
    "shortUrl" character varying(10) NOT NULL,
    "visitCount" bigint DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT timezone('America/Sao_Paulo'::text, CURRENT_TIMESTAMP) NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(50) NOT NULL,
    password text NOT NULL,
    "createdAt" date DEFAULT timezone('America/Sao_Paulo'::text, (CURRENT_DATE)::timestamp with time zone) NOT NULL
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
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: teste id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teste ALTER COLUMN id SET DEFAULT nextval('public.teste_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 1, 'f4ffb6f5-e8ef-4002-bec8-9cd4c3626775', '2023-02-23 19:27:14.272179');
INSERT INTO public.sessions VALUES (2, 2, '60b60449-6ab9-4be8-9605-c5025c2599a5', '2023-02-23 19:32:41.578192');
INSERT INTO public.sessions VALUES (3, 3, '1747fe38-3c3c-4394-93b3-36771f558939', '2023-02-23 19:33:40.01775');
INSERT INTO public.sessions VALUES (4, 2, 'd762cdd6-fa3b-4aea-8d31-3f960afd5c39', '2023-02-23 19:57:21.68888');


--
-- Data for Name: teste; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.teste VALUES (1, 'Peppa Pig');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (3, 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJv6RkbmNzhbwHh-CzHpgoLx_TyN4DAa8D2g&usqp=CAU', 'CmrIVb587U', 12, '2023-02-23 19:04:55.557983');
INSERT INTO public.urls VALUES (1, 1, 'http://pm1.narvii.com/6724/d04798dba6790f8aac543b7a25d597a8aa78fb79v2_00.jpg', 'jXfxfofD4o', 6, '2023-02-22 21:05:50.290137');
INSERT INTO public.urls VALUES (5, 2, 'https://classic.exame.com/wp-content/uploads/2021/08/avatar-the-last-airbender-and-the-legend-of-korra-characters_ckur.jpg?quality=70&strip=info&w=1024', 'Wqt3ezk5P0', 0, '2023-02-23 19:10:38.826934');
INSERT INTO public.urls VALUES (7, 2, 'https://ovicio.com.br/wp-content/uploads/2023/02/20230217-fpkvdoywcaitdj0.jpg', 'qaTIVLy_02', 0, '2023-02-23 19:11:19.125952');
INSERT INTO public.urls VALUES (4, 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShVHSeq9JaxUzMrLlhpa79lilydiQbpUVtuw&usqp=CAU', 'GP4DXXuVBm', 5, '2023-02-23 19:06:45.75487');
INSERT INTO public.urls VALUES (8, 2, 'https://ovicio.com.br/wp-content/uploads/2023/02/20230217-fpkvdoywcaitdj0.jp', '9VXOF0uecB', 0, '2023-02-23 19:57:58.253374');
INSERT INTO public.urls VALUES (9, 2, 'https://ovicio.com.br/wp-content/uploads/2023/02/20230217-fpkvdoywcaitdj0.j', 'DdN8JspEPb', 0, '2023-02-23 19:58:01.330616');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Peppa', 'peppa@driven.com.br', '$2b$10$P/IRPD.MqzN0CQiOnMyWw.HrkIZ./wya0Kkb2s5P7RR.iZA0PnZMq', '2023-02-22');
INSERT INTO public.users VALUES (2, 'joao', 'joao@driven.com.br', '$2b$10$0BW269gGoK2cZ1DCfKccuuulRLh6V1kXLQNt.jEo5MmfgVuAeHoJy', '2023-02-23');
INSERT INTO public.users VALUES (3, 'aang', 'aang@driven.com.br', '$2b$10$C5.aetr.BR5Wfo5a.DEzJec7HASVPBz5GucDA3tlonmqcBGhjkJn6', '2023-02-23');
INSERT INTO public.users VALUES (4, 'aang', 'ang@driven.com.br', '$2b$10$Y8gj9CTukFlC7Y7J8QXaYetpZ7LleX6ClIJuN1HkSA87bYcV9VrHi', '2023-02-23');
INSERT INTO public.users VALUES (5, '1', '1ang@driven.com.br', '$2b$10$L7kf43XGAQwdja.yfZYAOO/tIBWtgfb6ALF/WyWGoDPgxTINop8lW', '2023-02-23');
INSERT INTO public.users VALUES (6, '2', '2ang@driven.com.br', '$2b$10$/HZzDicLwl91uA9.P7w77OZkF6j9Wx1cEDCT1KMiztwuz3IMnOgJq', '2023-02-23');
INSERT INTO public.users VALUES (7, '3', '3ang@driven.com.br', '$2b$10$xcefQJDWRp0Rc4Vk6L9RBu4sx1fyuSeKokBsccNxN0aLxiIUVDQdG', '2023-02-23');
INSERT INTO public.users VALUES (8, '4', '4ang@driven.com.br', '$2b$10$QAG/E.z6WzjOq/DcqY7EHe5hadm40IFt4g8xvskaIlzV8SjM9uzc6', '2023-02-23');
INSERT INTO public.users VALUES (9, '5', '5ang@driven.com.br', '$2b$10$s7UEY6URItskOqo6PXuut.9/XvZvrSrvRc3Y/ATHvOCM69Tu9Z7oO', '2023-02-23');
INSERT INTO public.users VALUES (10, '6', '6ang@driven.com.br', '$2b$10$LGTzqHAKkwo2iE/7YMJTd.VE5RQU2g3kY2Rib6FELRPFmQYupg2Xq', '2023-02-23');
INSERT INTO public.users VALUES (11, '7', '7ang@driven.com.br', '$2b$10$Yz/c1Qw3W4sC1G8kABFYmeiYk1966jW00RgFbCdFP1L.xaM1gzhlS', '2023-02-23');
INSERT INTO public.users VALUES (12, '8', '8ang@driven.com.br', '$2b$10$/2vrqFYhq6uinDRMGyVUOuyDZYqniTbMvB2as3gCwmdGLqGryOtUO', '2023-02-23');
INSERT INTO public.users VALUES (13, '9', '9ang@driven.com.br', '$2b$10$t7LcM7Bt9oqYNT6xNW6d3OIlnZggXzgmW5U4CpFPkqAtvNdX4QH5S', '2023-02-23');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 4, true);


--
-- Name: teste_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.teste_id_seq', 1, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 9, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 13, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: teste teste_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teste
    ADD CONSTRAINT teste_name_key UNIQUE (name);


--
-- Name: teste teste_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teste
    ADD CONSTRAINT teste_pkey PRIMARY KEY (id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: urls urls_url_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_url_key UNIQUE (url);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

