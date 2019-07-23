const chai = require('chai');
const supertest = require('supertest');
const faker = require('faker');
const hasher = require('../../../server/utils/hasher');
const constants = require('../../../server/utils/constants');
const database = require('../../../server/models/database');

const { expect } = chai;
const app =
  process.env.NODE_ENV == 'production'
    ? require('../../../tools/serverProduction')
    : require('../../../tools/serverDevelopment');

const api = supertest(app);
const path = `/v1/auth/sign_in`;

module.exports = describe(`Sign in`, () => {
  const createdUser = {
    name: faker.random.word(30),
    email: faker.internet.email(),
    password: faker.random.word(30),
  };

  before(done => {
    new database.Users({
      name: createdUser.name,
      email: createdUser.email,
      password: hasher(
        createdUser.password,
        constants.values.cryptography.PASSWORD_KEY
      ),
    })
      .save()
      .then(insertedUser => {
        return done();
      })
      .catch(err => {
        return done(err);
      });
  });

  after(done => {
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

  it(`Should return 400 when no email is sent`, done => {
    api
      .post(path)
      .send({
        password: faker.random.word(6),
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

  it(`Should return 400 when email sent is below 3 characters`, done => {
    api
      .post(path)
      .send({
        email: faker.random.word(2),
        password: faker.random.word(6),
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

  it(`Should return 400 when email is not a valid email`, done => {
    api
      .post(path)
      .send({
        email: faker.random.word(10),
        password: faker.random.word(6),
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

  it(`Should return 400 when no password is sent`, done => {
    api
      .post(path)
      .send({
        email: faker.internet.email(),
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

  it(`Should return 400 when password sent is below 3 characters`, done => {
    api
      .post(path)
      .send({
        email: faker.internet.email(),
        password: faker.random.word(2),
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

  it(`Should return 404 when email does not exist`, done => {
    api
      .post(path)
      .send({
        email: faker.internet.email(),
        password: faker.random.word(6),
      })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status, `Status`).to.equal(404);
          done();
        }
      });
  });

  it(`Should return 404 when password does not match`, done => {
    api
      .post(path)
      .send({
        email: createdUser.email,
        password: faker.random.word(6),
      })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status, `Status`).to.equal(404);
          done();
        }
      });
  });

  it(`Should return 200 with user's info when username and password matches
    but user's info must not contain its password`, done => {
    api
      .post(path)
      .send(createdUser)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status, `Status`).to.equal(200);
          expect(res.body, `Body`).to.contain('id');
          expect(res.body, `Body`).to.not.contain('password');
          done();
        }
      });
  });
});
