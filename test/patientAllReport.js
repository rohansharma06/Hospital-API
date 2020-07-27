//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let Patient = require("../models/patients");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();

chai.use(chaiHttp);

describe("Testsing - Display All Report of Patients Report :", () => {
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjFlOGE4MTI1NzU2OTIyMjRhM2UyZmQiLCJ1c2VybmFtZSI6InJvaGFuMiIsInBhc3N3b3JkIjoiJDJhJDEwJEJwOVBSOWsub0R4UWJNcGhwaXpQemU2WGQ3U3dzUHI1YjdpQWFSaGFFZGJ4MEY5RW0xdktHIiwiY3JlYXRlZEF0IjoiMjAyMC0wNy0yN1QwODowNDoxNy43NDlaIiwidXBkYXRlZEF0IjoiMjAyMC0wNy0yN1QwODowNDoxNy43NDlaIiwiX192IjowLCJpYXQiOjE1OTU4MzcwNjQsImV4cCI6MTY5NTgzNzA2NH0.vyLLZrdyXN5Tz3TBTG9RJqg2rB2kaFnBhIH-HWGRVLg";
  let auth = "bearer " + token;
  const patientID = "5f1e3946913f7d19d4ce43c8"; //---patient 2

  /*
   *----Test case :- Create Patient Report
   */

  //---- Case 1: Doctor is not Authorize
  describe("POST /api/patients/id/all_reports", () => {
    it("Return error because Doctor is not Authorize:", (done) => {
      chai
        .request(server)
        .get(`/api/patients/${patientID}/all_reports`)
        // .set("Authorization", auth)

        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  //---- Case 2:  All Report Displayed Successfully
  describe("POST /api/patients/id/all_reports", () => {
    it("All Report Displayed Successfully:", (done) => {
      chai
        .request(server)
        .get(`/api/patients/${patientID}/all_reports`)
        .set("Authorization", auth)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message");
          res.body.should.have.property("message").eql("Reports");
          done();
        });
    });
  });
});
