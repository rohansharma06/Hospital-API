const Patients = require('../../models/patients');
const Doctor = require('../../models/doctor');
const Report = require('../../models/reports');

//---- display all reports
module.exports.all_report = async function(req,res){

    //---- if no status is present 
    if(!req.params){
        return res.status(404).json({
            message: 'missing params'
        });
    }

    try{
        //---- find report sort it and populate patient info
        let report = await Report.find({status: req.params.status})
                    .sort("createdAt")
                    .populate('patient');

        //---- if report present show reports else give err
        if(report){
            return res.status(200).json({
                data: {report},
                message: 'All report of this status'
            });
        }else{
            return res.status(404).json({
                message: 'No Report for the given Status!'
            });
        }
    }
    catch(err){
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}
