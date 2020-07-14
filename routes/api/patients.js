const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const patients_api_controller = require('../../controller/api/patients_api_controller'); 

console.log('API Pathents router loaded');

//---- routing to patient registeration
router.post('/register', passport.authenticate('jwt', {session:false}), patients_api_controller.register);

//---- routing to creating patient report
router.post('/:id/create_report', passport.authenticate('jwt', {session:false}), patients_api_controller.create_report);

//--- routing to show all report of the patient
router.get('/:id/all_reports', passport.authenticate('jwt', {session:false}), patients_api_controller.all_reports);

module.exports = router;