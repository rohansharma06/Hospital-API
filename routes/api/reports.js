const express = require('express');
const router = express.Router();
const passport = require('passport');

const report_api_controller = require('../../controller/api/report_api.controller');

//---- routing to display all report
router.get('/:status',passport.authenticate('jwt', {session:false}) ,report_api_controller.all_report);

module.exports = router;