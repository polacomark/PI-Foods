/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: 'Milanea a la napolitana',
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  // beforeEach(() => Recipe.sync({ force: true })
  //   .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('GET response with 200 if recives recipes', function(){
      agent.get('/recipes').expect(200)
    });
  });
});
describe('GET /recipes/:id', () => {
  it('GET response with 200 if it finds a recipe with the id provided', function () {
      agent.get('/recipes/25')
      .expect(function(res) {
        expect(res.status).equal(200);
      })
    })
})