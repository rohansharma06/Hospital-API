const Patients = require("../../models/patients");
const Doctor = require("../../models/doctor");
const Report = require("../../models/reports");

//----- register patent info
module.exports.register = async function (req, res) {
  console.log(req.body);

  try {
    let patient = await Patients.findOne({ phone: req.body.phone });

    if (!patient) {
      let patient = await Patients.create(req.body);
      return res.status(200).json({
        message: "Patient Registered Successfully",
        Patient: patient,
      });
    } else {
      return res.status(409).json({
        message: "Patient already registered",
        Patient_ID: patient._id,
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: "Missing Fields!!",
    });
  }
};

//---- create patient report
module.exports.create_report = async function (req, res) {
  //console.log(req.params.id);
  //console.log(req.user.id); //--- login doctor id
  //console.log(req.body);

  try {
    let patient = await Patients.findById(req.params.id);
    let doctor = await Doctor.findById(req.user.id);
    if (patient) {
      //---- creating report
      let report = await Report.create({
        status: req.body.status,
        doctor: doctor._id,
        patient: patient.id,
      });

      //---- saveing report ref to patients
      patient.report.push(report._id);
      patient.save();

      return res.status(200).json({
        message: " Report Successfully created",
        Report: report,
      });
    } else {
      return res.status(404).json({
        message: "Patient does't exist",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
};

//---- display all report of patient
module.exports.all_reports = async function (req, res) {
  //console.log(req.params.id);
  try {
    let report = await Report.find({ patient: req.params.id }).sort(
      "createdAt"
    );

    if (report) {
      return res.status(200).json({
        message: "Reports",
        All_Report: report,
      });
    } else {
      return res.status(404).json({
        message: "No reports Report",
        data: report,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
};
