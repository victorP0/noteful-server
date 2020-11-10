CREATE DATABASE noteful;

CREATE TABLE folders(
    folder_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE notes(
    note_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL, 
    content TEXT NOT NULL, 
    folder_id INTEGER references folders(folder_id), 
    modified TEXT
);
