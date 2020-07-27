//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let Patient = require("../models/patients");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();

chai.use(chaiHttp);

describe("Testsing - Patients Report :", () => {
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjFlOGE4MTI1NzU2OTIyMjRhM2UyZmQiLCJ1c2VybmFtZSI6InJvaGFuMiIsInBhc3N3b3JkIjoiJDJhJDEwJEJwOVBSOWsub0R4UWJNcGhwaXpQemU2WGQ3U3dzUHI1YjdpQWFSaGFFZGJ4MEY5RW0xdktHIiwiY3JlYXRlZEF0IjoiMjAyMC0wNy0yN1QwODowNDoxNy43NDlaIiwidXBkYXRlZEF0IjoiMjAyMC0wNy0yN1QwODowNDoxNy43NDlaIiwiX192IjowLCJpYXQiOjE1OTU4MzcwNjQsImV4cCI6MTY5NTgzNzA2NH0.vyLLZrdyXN5Tz3TBTG9RJqg2rB2kaFnBhIH-HWGRVLg";
  let auth = "bearer " + token;
  const patientID = "5f1e8aec2176cc10b8c47118"; //--patient 4

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
