const mongoose = require('mongoose');

const patientsSchema = new mongoose.Schema({

    name:{
        type:String,
        required: true
    },
    phone:{
        type: Number,
        required: true,
        unique: true
    },
},{
    timestamps: true
});

const Patients = mongoose.model('Patients', patientsSchema);

module.exports = Patients;