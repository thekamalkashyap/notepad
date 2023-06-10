create table users(
id serial primary key,
first_name varchar(50) not null,
last_name varchar(50) not null,
email varchar(150) not null unique,
password varchar not null
);

create table notes(
id serial primary key,
title varchar,
body varchar,
last_updated timestamp not null,
is_checked boolean not null,
uid varchar(150) not null
);
