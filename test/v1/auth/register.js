const chai = require('chai');
const supertest = require('supertest');
const constants = require('../../utils/constants');

const expect = chai.expect;
const app =
  process.env.NODE_ENV == 'production'
    ? require('../../../tools/serverProduction')
    : require('../../../tools/serverDevelopment');
const api = supertest(app);

const faker = require('faker');
const path = `/v1/auth/sign_in`;

module.exports = describe(`Sign in`, () => {
  it(`Should return 400 when no username is sent`, done => {
    api
      .post(path)
      .send({
        password: faker.random.word(6),
      })
      .end((err, res) => {
        if (err)
          done(err);
        else {
          expect(res.status, 'Status').to.equal(400);
          done();
        }
      });
  });

  it(`Should return 400 when username sent is below 3 characters`, done => {
    api
      .post(path)
      .send({
        username: faker.random.word(2),
        password: faker.random.word(6),
      })
      .end((err, res) => {
        if (err)
          done(err);
        else {
          expect(res.status, 'Status').to.equal(400);
          done();
        }
      });
  });

  it(`Should return 400 when no password is sent`, done => {
    api
      .post(path)
      .send({
        username: faker.random.word(6),
      })
      .end((err, res) => {
        if (err)
          done(err);
        else {
          expect(res.status, `Status`).to.equal(400);
          done();
        }
      });
  });

  it(`Should return 400 when password sent is below 3 characters`, done => {
    api
      .post(path)
      .send({
        username: faker.random.word(6),
        password: faker.random.word(2),
      })
      .end((err, res) => {
        if (err)
          done(err);
        else {
          expect(res.status, `Status`).to.equal(400);
          done();
        }
      });
  });

  it(`Should return 404 when username does not exist`, done => {
    api
      .post(path)
      .send({
        username: faker.random.word(6),
        password: faker.random.word(6),
      })
      .end((err, res) => {
        if (err)
          done(err);
        else {
          expect(res.status, `Status`).to.equal(404);
          done();
        }
      });
  });

  it(`Should return 404 when password does not match`, done => {
    api
      .post(path)
      .send({
        username: 'here',
        password: faker.random.word(6),
      })
      .end((err, res) => {
        if (err)
          done(err);
        else {
          expect(res.status, `Status`).to.equal(404);
          done();
        }
      });
  });

  it(`Should return 200 with user's info when username and password matches`, done => {
    api
      .post(path)
      .send({
        username: 'here',
        password: 'here',
      })
      .end((err, res) => {
        if (err)
          done(err);
        else {
          expect(res.status, `Status`).to.equal(200);
          done();
        }
      });
  });
});
