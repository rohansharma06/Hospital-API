//During the test the env variable is set to test

process.env.NODE_ENV = "test";

let Patient = require("../models/patients");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();

chai.use(chaiHttp);

describe("Patients Register Testsing:", () => {
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjFlMzlhOTkxM2Y3ZDE5ZDRjZTQzY2IiLCJ1c2VybmFtZSI6InJvaGFuMSIsInBhc3N3b3JkIjoiJDJhJDEwJEJLNENKSFpMMThURjRacTJndU9kenVycWZSWEV6aGw5S0ZmaS9nSUhKcWxZcEZIV1BWcXFXIiwiY3JlYXRlZEF0IjoiMjAyMC0wNy0yN1QwMjoxOToyMS4xODRaIiwidXBkYXRlZEF0IjoiMjAyMC0wNy0yN1QwMjoxOToyMS4xODRaIiwiX192IjowLCJpYXQiOjE1OTU4MzEzMDAsImV4cCI6MTY5NTgzMTMwMH0._1lKllJh8PEj3FMsWfDgIgaoDkvBTFt-G_YoN6vye-Y";
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
        name: "patient4",
        phone: 100000004,
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
