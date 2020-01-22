const chai = require('chai');
const supertest = require('supertest');
const faker = require('faker');
const hasher = require('../../../server/utils/hasher');
const constants = require('../../../server/utils/constants');
const database = require('../../../server/models/database');
const getSession = require('../../utils/getSession');

const { expect } = chai;
const app =
  process.env.NODE_ENV == 'production'
    ? require('../../../tools/serverProduction')
    : require('../../../tools/serverDevelopment');

const api = supertest(app);
const path = `/v1/users/wish`;

module.exports = describe(`AddWish in V1`, () => {
  const createdUser = {
    name: faker.random.word(30),
    email: faker.internet.email(),
    password: faker.random.alphaNumeric(30),
  };
  const createdGame = {
    _id: faker.random.number(999999999),
    platforms: [
      { gameId: faker.random.alphaNumeric(14) },
      { gameId: faker.random.alphaNumeric(14) },
      { gameId: faker.random.alphaNumeric(14) },
    ],
  };
  console.log(createdGame);

  before(done => {
    new database.Games({
      _id: createdGame._id,
      platforms: [
        { gameId: createdGame.platforms[0] },
        { gameId: createdGame.platforms[1] },
        { gameId: createdGame.platforms[2] },
      ],
    })
      .save()
      .then(async insertedGame => {
        if (!insertedGame) {
          console.log('deu pau 2');
          return done();
        }
        console.log('insertedGame:', insertedGame);
      });
    new database.Users({
      name: createdUser.name,
      email: createdUser.email,
      password: hasher(
        createdUser.password,
        constants.values.cryptography.PASSWORD_KEY
      ),
    })
      .save()
      .then(async insertedUser => {
        const session = await getSession(
          createdUser.email,
          createdUser.password
        );
        console.log(session);
        return done();
      })
      .catch(err => {
        return done(err);
      });
  });

  after(done => {
    database.Games.deleteOne({ _id: createdGame._id })
      .then(ok => {
        if (!ok) {
          return done(error);
        }
      })
      .catch(err => {
        return done(err);
      });
    database.Users.deleteOne({ email: createdUser.email })
      .then(ok => {
        if (!ok) {
          return done(error);
        }
        return done();
      })
      .catch(err => {
        return done(err);
      });
  });
  it(`Should return 400 when no Id is sent`, done => {
    api
      .post(path)
      .send({
        platforms: [{ gameId: faker.random.alphaNumeric(14) }],
      })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status, `Status`).to.equal(400);
          done();
        }
      });
  });
});
