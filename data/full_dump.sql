--
-- PostgreSQL database dump
--

\restrict EHEVQUQEeWU4JLsZ3cvCnOKSWVakUhL7osbHl7zFkIel12eZVnOgdBMeK09AUs9

-- Dumped from database version 18.4 (Ubuntu 18.4-0ubuntu0.26.04.1)
-- Dumped by pg_dump version 18.4 (Ubuntu 18.4-0ubuntu0.26.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: Answer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Answer" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    text text NOT NULL,
    username text,
    "gameId" uuid NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Answer" OWNER TO postgres;

--
-- Name: Game; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Game" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "roomCode" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Game" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: Answer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Answer" (id, text, username, "gameId", "createdAt") FROM stdin;
6b44070c-0a0b-406b-8be7-21cf1c555a5c	Albert Einstein	\N	273a039d-906e-479e-9c5f-51840cf9be57	2026-07-02 16:44:37.569
b38f0f2e-c8a4-4bbf-a886-d3dd71881056	Muhammad Usman	\N	b2e1f2e3-b00e-4205-8871-d95a044d2da3	2026-07-03 18:31:39.363
17e827f6-dff4-4f20-ba37-ed4f59182f5c	Muhammad Ali	\N	9ce9bcfd-3a6d-40d2-b483-b6e0c36eeb47	2026-07-06 15:38:25.548
60140216-4794-4d35-aac4-bef6b168b17a	Muhammad Usman	\N	4e310e5b-79b0-4612-aee1-bf420d068a2d	2026-07-08 17:26:57.978
aa20e8b3-4efa-42fc-8ab7-62327ec12ae0	Muhammad Usman	\N	0ff80aa1-8055-43d2-affd-ca0d8464b920	2026-07-08 17:27:05.939
00557d1a-36bb-4854-b258-584066260be0	Muhammad Usman	\N	89c940ef-9258-442f-88a7-bc1e0ae1345c	2026-07-08 17:27:14.407
feea3e56-c5e8-4a7b-a4b6-3a8523df2b45	Tom Hanks	\N	7036e495-0bba-4eb1-a4d1-c11c618fec7e	2026-07-08 17:52:58.502
07aafc1a-2e24-4bdf-a189-936948d58a4e	Halle Berry	usman	7036e495-0bba-4eb1-a4d1-c11c618fec7e	2026-07-08 17:54:31.409
\.


--
-- Data for Name: Game; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Game" (id, "roomCode", "createdAt") FROM stdin;
273a039d-906e-479e-9c5f-51840cf9be57	STAR01	2026-07-02 16:44:37.569
b2e1f2e3-b00e-4205-8871-d95a044d2da3	TEST123	2026-07-03 18:31:39.363
9ce9bcfd-3a6d-40d2-b483-b6e0c36eeb47	TEST	2026-07-06 15:38:25.548
4e310e5b-79b0-4612-aee1-bf420d068a2d	90	2026-07-08 17:26:57.978
0ff80aa1-8055-43d2-affd-ca0d8464b920	91	2026-07-08 17:27:05.939
89c940ef-9258-442f-88a7-bc1e0ae1345c	92	2026-07-08 17:27:14.407
7036e495-0bba-4eb1-a4d1-c11c618fec7e	ABC123	2026-07-08 17:52:58.502
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
3a9ce4f6-1e1d-41e9-9357-96ed8166458e	46823ffcc8935e068c4841037595736cdfb3960c5deba6deb7b3d1a03b839771	2026-07-02 11:51:45.543518-04	20260702155145_init	\N	\N	2026-07-02 11:51:45.522748-04	1
\.


--
-- Name: Answer Answer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Answer"
    ADD CONSTRAINT "Answer_pkey" PRIMARY KEY (id);


--
-- Name: Game Game_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Game"
    ADD CONSTRAINT "Game_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Game_roomCode_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Game_roomCode_key" ON public."Game" USING btree ("roomCode");


--
-- Name: Answer Answer_gameId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Answer"
    ADD CONSTRAINT "Answer_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES public."Game"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict EHEVQUQEeWU4JLsZ3cvCnOKSWVakUhL7osbHl7zFkIel12eZVnOgdBMeK09AUs9

