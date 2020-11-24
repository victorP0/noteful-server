

const notefulService = {
  getAllFolders(knex) {
    return knex
    .select("*")
    .from("folders");
  },

  getFolder(knex, id) {
    return knex
    .select("*")
    .from("notes")
    .where ({folderid:'id'});
  },

  getAllNotes(knex) {
    return knex
    .select("*")
    .from("notes");
  },

  insertFolder(knex, newFolder) {
    return knex
    .insert(newFolder)
    .into("folders")
    .returning("*")
    .then(rows => {
      return rows[0]
    });
  },
  insertNote(knex, newNote) {
    return knex
    .insert(newNote)
    .into("notes")
    .returning("*")
    .then(rows => {
      return rows[0]
    });
  },

  deleteFolder(knex, id) {
    return knex("folders")
    .where({ folderid: 'id' })
    .delete();
  },
  deleteNote(knex, id) {
    return knex("notes")
    .where({ id: 'id' })
    .delete();
  },
};

module.exports = notefulService;
