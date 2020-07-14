const Patients = require('../../models/patients');
const Doctor = require('../../models/doctor');
const Report = require('../../models/reports');

module.exports.register = async function(req,res){
    console.log(req.body);
    // return res.status(200).json({
    //     message: "OHHHH"
    // })
    try{
        let patient = await Patients.findOne({phone: req.body.phone});

        if(!patient){
            let patient = await Patients.create(req.body);
            return res.status(200).json({
                message: "Patient Registered Successfully"
            })
        }

        else{
            return res.status(200).json({
                message: "Patient already registered",
                data: patient
            })
        }

    }catch(err){
        return res.status(500).json({
            message: "Server Error"
        })
    }
};

module.exports.create_report = async function(req,res){
    //console.log(req.params.id);
    //console.log(req.user.id); //--- login doctor id
    //console.log(req.body);
    
    try{
        let patient = await Patients.findById(req.params.id);
        let doctor = await Doctor.findById(req.user.id);
        if(patient){
            //---- creating report
            let report = await Report.create({
                status: req.body.status, 
                doctor: req.user.id
            });

            //---- saving reports to patient scmea
            await patient.reports.push(report);
            await patient.save();

            return res.status(200).json({
                message: " Report Successfully created",
                data: {
                    report: {
                        Patient_Name: patient.name,
                        Status: report.status,
                        Doctor_Name: doctor.username,
                        Date: report.createdAt
                    }
                }
            })
        }
        else{
            return res.status(404).json({
                message: "Patient does't exist"
            })
        }
    }catch(err){
        return res.status(400).json({
            message: "Internal Server error"
        })
    } 
};