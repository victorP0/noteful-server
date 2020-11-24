const express = require("express");
const { v4: uuid } = require("uuid");
const notefulRouter = express.Router();
const bodyParser = express.json();
const logger = require("./logger");
const notefulService = require("./noteful-service")
const knexbase = require("knex");

const knex = knexbase({
  client: "pg",
  connection: process.env.DATABASE_URL,
});

notefulRouter.route("/").get((req, res, next) => {
  notefulService
    .getAllFolders(knex)
    .then((folders) => {
      res.json(folders);
    })
    .catch(next);
  notefulService
    .getAllNotes(knex)
    .then((notes) => {
      res.json(notes);
    })
    .catch(next);
  res.send("loaded");
});

notefulRouter
  .route("/folders").get((req, res, next) => {
    notefulService
      .getAllFolders(knex)
      .then((folders) => {
        res.json(folders);
      })})
  .post(bodyParser, (req, res, next) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send("Folder name required");
    }

    const newFolder = {
      id: uuid(),
      name,
    };

    //folders.push(newFolder);

    notefulService
      .insertFolder(knex, newFolder)
      .then((folder) => {
        res.status(201)
        .location(`/folders/${newFolder.id}`)
        .json(newFolder)
        .send("Folder created");
      })
      .catch(next);
  });

notefulRouter
  .route("/notes").get((req, res, next) => {
    notefulService
      .getAllNotes(knex)
      .then((notes) => {
        res.json(notes);
      })})
  .post(bodyParser, (req, res, next) => {
    const { name, content, folderId, modified } = req.body;

    if (!name) {
      return res.status(400).send("Note name required");
    }

    if (!content) {
      return res.status(400).send("Content required");
    }

    let id = uuid();

    const folderid = folderId

    const newNote = { id, name, content, folderid, modified };

    //notes.push(newNote);

    notefulService
      .insertNote(knex, newNote)
      .then((note) => {
        res.status(201)
        .location(`/folder/${newNote.folderid}`).json(newNote).send("Note created");
      })
      .catch(next);
  });

notefulRouter.route("/folder/:folderId")
.get((req,res,next)=>{
  notefulService.getFolder(knex, folderId)
  .then((notes) => {
    res.json(notes);
  })
  .catch(next);
})
.delete((req, res, next) => {
  const { folderId } = req.params;

  notefulService
    .deleteFolder(knex, folderId)
    .then(() => {
      res.status(204).send("Deleted").end();
    })
    .catch(next);
});

notefulRouter.route("/notes/:noteId").delete((req, res, next) => {
  const { noteId } = req.params;

  notefulService.deleteNote(knex, noteId)
  .then(() => {
    res
    .status(200)
    .json({})
    .send("Deleted");
  })
  .catch(next);;
});

module.exports = notefulRouter;
