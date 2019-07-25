const chai = require('chai');
const supertest = require('supertest');
const faker = require('faker');
const database = require('../../../server/models/database');
const hasher = require('../../../server/utils/hasher');
const constants = require('../../../server/utils/constants');

const { expect } = chai;
const app =
  process.env.NODE_ENV == 'production'
    ? require('../../../tools/serverProduction')
    : require('../../../tools/serverDevelopment');

const api = supertest(app);
const path = `/v1/auth/register`;

module.exports = describe(`Register V1`, () => {
  const createdUser = {
    name: faker.random.word(30),
    email: faker.internet.email(),
    password: faker.random.word(30),
  };
  const userToBeCreated = {
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
    let deletedAmount = 0;
    database.Users.deleteOne({ email: createdUser.email })
      .then(ok => {
        if (deletedAmount > 0) {
          if (!ok) {
            return done(error);
          }
          return done();
        }
        deletedAmount++;
      })
      .catch(err => {
        if (deletedAmount > 0) {
          return done(err);
        }
        deletedAmount++;
      });
    database.Users.deleteOne({ email: userToBeCreated.email })
      .then(ok => {
        if (deletedAmount > 0) {
          if (!ok) {
            return done(error);
          }
          return done();
        }
        deletedAmount++;
      })
      .catch(err => {
        if (deletedAmount > 0) {
          return done(err);
        }
        deletedAmount++;
      });
  });

  it(`Should return 400 when no name is sent`, done => {
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
          expect(res.status, 'Status').to.equal(400);
          done();
        }
      });
  });

  it(`Should return 400 when name sent is below 3 characters`, done => {
    api
      .post(path)
      .send({
        name: 'aa',
        email: faker.internet.email(),
        password: faker.random.word(6),
      })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status, 'Status').to.equal(400);
          done();
        }
      });
  });

  it(`Should return 400 when no email is sent`, done => {
    api
      .post(path)
      .send({
        name: faker.random.word(6),
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

  it(`Should return 400 when email sent is not valid`, done => {
    api
      .post(path)
      .send({
        name: faker.random.word(6),
        email: faker.random.word(6),
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
        name: faker.random.word(6),
        username: faker.internet.email(),
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
        name: faker.random.word(6),
        username: faker.internet.email(),
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

  it(`Should return 409 when email already exists`, done => {
    api
      .post(path)
      .send(createdUser)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status, `Status`).to.equal(409);
          done();
        }
      });
  });

  it(`Should return 201 with user's info but must not contain its password`, done => {
    api
      .post(path)
      .send(userToBeCreated)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status, `Status`).to.equal(201);
          expect(res.body, `Body`).to.have.property('data');
          expect(res.body.data, `Data`).to.have.property('_id');
          expect(res.body.data, `Data`).to.not.have.property('password');
          done();
        }
      });
  });
});
