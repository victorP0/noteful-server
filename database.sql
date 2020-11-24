CREATE DATABASE noteful;

drop table if EXISTS folders CASCADE;
drop table if exists notes ;

CREATE TABLE folders(
    id VARCHAR (100) PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE notes(
    id VARCHAR (100) PRIMARY KEY,
    name TEXT NOT NULL, 
    content TEXT NOT NULL, 
    folderId VARCHAR (100) references folders(id), 
    modified TEXT
);