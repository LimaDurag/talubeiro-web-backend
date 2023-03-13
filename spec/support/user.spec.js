import express from 'express';
import request from 'supertest';
import usersRouter from '../../../app.js';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use("/", usersRouter);

describe("TEST GET USER", function() {
    let a;
  
    it(", Failed to get", function(done) {
    request(app)
    .get("/User/")
    .expect("Content-Type", /json/)
    .expect(200, done);
    });
  });
  