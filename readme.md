# Hospital-API

An API for the doctors of a Hospital which has been allocated by the government for testing and quarantine + well being of  COVID-19 patients applied with unit testings.

URL : `http://localhost:8000/api/{routes}` 

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
    ├── package.json
    ├── .gitignore


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

