# Hospital-API

An API for the doctors of a Hospital which has been allocated by the government for testing and quarantine + well being of COVID-19 patients applied with unit testings.

URL : `http://localhost:8000/api/{routes}`

# Basic Funcionality

- Register Doctor => (using: Username and Password).
- Login Doctor using passport-jwt-Strategy which returns a jwt-token.
- Jwt-Tokento will be used to access(authorize) protected routes.
- After logging-in the doctor can do various things such as :
  1. Register patient => (using: Name and Phone No)
  2. Generate a report of patient
  3. View all reports of a particular patient
  4. Display reports by particular status [Negative, Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit].
- Generation of report(protecte by jwt) : A doctor has to enter enter the status for a particular patient and can generate the report according to it.
- View all reports of a patient(protected by jwt) : Only doctor can view reports of a patient.
- View all the reports of particular status(protected by jwt) : Only doctor can view the reports.

# Routes

1. /doctors/register → with username and password.
2. /doctors/login → returns the JWT to be used.
3. /patients/register → with mobile No and name..
4. /patients/:id/create_report.
5. /patients/:id/all_reports → List all the reports of a patient oldest to latest
6. /reports/:status → List all the reports of all the patients filtered by a specific status

# Folder Structure

.

    ├── config
        ├── mongoose.js
        ├── passport-local-strategy.js
    ├── controllers
        ├── api
            ├── doctor_api_controller.js
            ├── patient_api_controller.js
            ├── report_api_controller.js
    ├── models
        ├── doctor.js
        ├── patient.js
        ├── report.js
    ├── routes
        ├── api
            ├── index.js
            ├── doctors.js
            ├── patients.js
            ├── reports.js
        ├── index.js
    ├── test
        ├── patientAllReportTest.js
        ├── patientRegisterTest.js
        ├── patientReportReportTest.js
    ├── index.js
    ├── package.json
    ├── .gitignore

## Unit-Testing

- Used mocha as a server and chai for assertion library.

1. testing for /patients/register
2. testing for /patients/:id/create_report
3. testing for /patients/:id/all_reports

Pass all the required field and bearer token and test for all different test cases possible.

Result:
![test](/assets/image/test.JPG)

## Getting Started

1. Clone the project.
2. Go to folder.
3. Run following command:

   ```
   npm install express
   npm install jsonwebtoken
   npm install mongoose
   npm install passport
   npm install passport-jwt

   ```

4. Run command: `npm start` .
5. Open Postman and follow the routes.
6. Use jwt as header (Authorization: Bearer jwtToken).
7. Pass require params in form body.
8. Happy Learning.
