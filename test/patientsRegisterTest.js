//During the test the env variable is set to test

process.env.NODE_ENV = "test";

let Patient = require("../models/patients");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();

chai.use(chaiHttp);

describe("Testsing - Patients Register :", () => {
  //---doctor=rohan2 token
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjFlOGE4MTI1NzU2OTIyMjRhM2UyZmQiLCJ1c2VybmFtZSI6InJvaGFuMiIsInBhc3N3b3JkIjoiJDJhJDEwJEJwOVBSOWsub0R4UWJNcGhwaXpQemU2WGQ3U3dzUHI1YjdpQWFSaGFFZGJ4MEY5RW0xdktHIiwiY3JlYXRlZEF0IjoiMjAyMC0wNy0yN1QwODowNDoxNy43NDlaIiwidXBkYXRlZEF0IjoiMjAyMC0wNy0yN1QwODowNDoxNy43NDlaIiwiX192IjowLCJpYXQiOjE1OTU4MzcwNjQsImV4cCI6MTY5NTgzNzA2NH0.vyLLZrdyXN5Tz3TBTG9RJqg2rB2kaFnBhIH-HWGRVLg";
  let auth = "bearer " + token;

  /*
   *----Test case :- Patient Register
   */

  //---- Case 1: Doctor is not Authorize
  describe("POST /api/patients/register", () => {
    it("Return error because Doctor is not Authorize:", (done) => {
      let patient = {
        name: "patient4",
        phone: 100000004,
      };

      chai
        .request(server)
        .post("/api/patients/register")
        .set("Content-Type", "application/x-www-form-urlencoded")
        // .set("Authorization", auth)
        .send(patient)

        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  //---- Case 2: Missing Fields
  describe("POST /api/patients/register", () => {
    it("Return error because of Missing Input Fields :", (done) => {
      let patient = {
        name: "patient4",
        // phone: 100000004,
      };

      chai
        .request(server)
        .post("/api/patients/register")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .set("Authorization", auth)
        .send(patient)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("message");
          res.body.should.have.property("message").eql("Missing Fields!!");
          done();
        });
    });
  });

  //---- Case 3: Patient already exist
  describe("POST /api/patients/register", () => {
    it("Notify that patient already exist:", (done) => {
      let patient = {
        name: "patient3",
        phone: 100000003,
      };

      chai
        .request(server)
        .post("/api/patients/register")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .set("Authorization", auth)
        .send(patient)

        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          res.body.should.have
            .property("message")
            .eql("Patient already registered");
          done();
        });
    });
  });

  //---- Case 4: Patient Successfully created
  describe("POST /api/patients/register", () => {
    it("Patient Successfully created:", (done) => {
      let patient = {
        name: "patient5",
        phone: 100000005,
      };

      chai
        .request(server)
        .post("/api/patients/register")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .set("Authorization", auth)
        .send(patient)

        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          res.body.should.have.property("Patient");
          res.body.Patient.should.have.property("name");
          res.body.Patient.should.have.property("phone");
          done();
        });
    });
  });
});
