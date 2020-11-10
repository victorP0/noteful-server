const express = require('express')
const { v4: uuid } = require('uuid');
const notefulRouter = express.Router()
const bodyParser = express.json()

const folders = [];
const notes = [];

notefulRouter
  .route('/')
  .get((req, res) => {
    res.json(folders);
    res.json(notes);
    res.send('loaded')
  })

notefulRouter
  .route('/folders')
  .post(bodyParser, (req, res) => {
    const {name} = req.body

    if (!name) {
      return res
        .status(400)
        .send('Folder name required');
    }

    const newFolder = {
      id: uuid (),
      name
    };

    folders.push(newFolder)

    logger.info(`folder with id ${id} not found.`);

    res
    .status(201)
    .location(`http://localhost:8000/folders/${id}`)
    .json({id: id});
   
    res.send ('Folder created')
     })

    
notefulRouter
.route('/notes')
.post(bodyParser, (req, res) => {
  const {name, content, folderId, modified} = req.body

  if (!name) {
    return res
      .status(400)
      .send('Note name required');
  }

  if (!content) {
    return res
      .status(400)
      .send('Content required');
  }

const newNote = {id : uuid (), name, content, folderId, modified}

notes.push(newNote)

logger.info(`Note with id ${id} not found.`);

res
  .status(201)
  .location(`http://localhost:8000/notes/${id}`)
  .json({id: id});

res.send ('Note created')
  })
  
notefulRouter
  .route('/notes/:noteId')
  .delete((req,res)=>{

    const { id } = req.params;
    const index = notes.findIndex(n => n.id === id);
    users.splice(index, 1);
    
    logger.info(`Note with id ${id} deleted.`);
  
    res     
      .status(204)
       .end();
  
    res.send('Deleted');
  })

module.exports = notefulRouter