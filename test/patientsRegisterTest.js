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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjFkMzVhMTc0NTMzZjJmMDhlYzUyMTciLCJ1c2VybmFtZSI6InJvaGFuIiwicGFzc3dvcmQiOiIkMmEkMTAkQUsuTWduQ2N1c01hMlVTVkFrR2RNT2lWQXpldy44Sjd1ZDRQYUV0Y0lYUjFwUkdXTFhSbG0iLCJjcmVhdGVkQXQiOiIyMDIwLTA3LTI2VDA3OjQ5OjUzLjU2N1oiLCJ1cGRhdGVkQXQiOiIyMDIwLTA3LTI2VDA3OjQ5OjUzLjU2N1oiLCJfX3YiOjAsImlhdCI6MTU5NTgwODY1NywiZXhwIjoxNjk1ODA4NjU3fQ.VGcqKfAMMaXLnqQQElW7LtkfsffNESP2Qsfj9aM9_Pc";
  let auth = "bearer " + token;

  /*
   *----Test case :- Patient Register
   */

  //---- Case 1: Doctor is not Authorize
  describe("POST /api/patients/register", () => {
    it("Return error because Doctor is not Authorize:", (done) => {
      let patient = {
        name: "patient5",
        phone: 1000000005,
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
        // phone: 1000000004,
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
        phone: 1000000004,
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
        phone: 1000000005,
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
