//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let Patient = require("../models/patients");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();

chai.use(chaiHttp);

describe("Patients Report Testsing:", () => {
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjFlMzlhOTkxM2Y3ZDE5ZDRjZTQzY2IiLCJ1c2VybmFtZSI6InJvaGFuMSIsInBhc3N3b3JkIjoiJDJhJDEwJEJLNENKSFpMMThURjRacTJndU9kenVycWZSWEV6aGw5S0ZmaS9nSUhKcWxZcEZIV1BWcXFXIiwiY3JlYXRlZEF0IjoiMjAyMC0wNy0yN1QwMjoxOToyMS4xODRaIiwidXBkYXRlZEF0IjoiMjAyMC0wNy0yN1QwMjoxOToyMS4xODRaIiwiX192IjowLCJpYXQiOjE1OTU4MzEzMDAsImV4cCI6MTY5NTgzMTMwMH0._1lKllJh8PEj3FMsWfDgIgaoDkvBTFt-G_YoN6vye-Y";
  let auth = "bearer " + token;
  const patientID = "5f1e3946913f7d19d4ce43c8";

  /*
   *----Test case :- Create Patient Report
   */

  //---- Case 1: Doctor is not Authorize
  describe("POST /api/patients/id/create_report", () => {
    it("Return error because Doctor is not Authorize:", (done) => {
      let report = {
        status: "negative",
      };

      chai
        .request(server)
        .post(`/api/patients/${patientID}/create_report`)
        // .set("Authorization", auth)
        .send(report)

        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  //---- Case 2:  Missing Fields
  describe("POST /api/patients/id/create_report", () => {
    it("Return error because of Missing Input Fields :", (done) => {
      let report = {
        // status: "negative",
      };

      chai
        .request(server)
        .post(`/api/patients/${patientID}/create_report`)
        .set("Content-Type", "application/x-www-form-urlencoded")
        .set("Authorization", auth)
        .send(report)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("message");
          res.body.should.have.property("message").eql("Missing Fields!!");
          done();
        });
    });
  });

  //---- Case 2:  Report Successfully created
  describe("POST /api/patients/id/create_report", () => {
    it("Report Successfully created:", (done) => {
      let report = {
        status: "Symptoms-Quarantine",
      };

      chai
        .request(server)
        .post(`/api/patients/${patientID}/create_report`)
        .set("Content-Type", "application/x-www-form-urlencoded")
        .set("Authorization", auth)
        .send(report)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message");
          res.body.should.have
            .property("message")
            .eql(" Report Successfully created");
          done();
        });
    });
  });
});
