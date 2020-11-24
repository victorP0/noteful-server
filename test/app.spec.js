const NotefulService = require("../src/noteful-service");
const { expect } = require("chai");
const supertest = require("supertest");
const knex = require("knex");

describe(`Note service object`, function () {
  let db;
  before(() => {
    db = knex({
      client: "postgres",
      connection: process.env.TEST_DB_URL,
    });
  });
});

