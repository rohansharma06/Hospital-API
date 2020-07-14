const Doctor = require('../../models/doctor');
const jwt = require('jsonwebtoken');

module.exports.register = async function(req,res){
    console.log(req.body);
    try {
        //--If filelds are not enter so show error
        if(!req.body.username || !req.body.password){
            return res.status(404).json({
                message: "Enter valid text"
            })
        }
        else{
            //---- find if doctor already registered 
            let doctor = await Doctor.findOne({ username: req.body.username});
            //---- if not then register the doctor
            if(!doctor){
                let doctor = await Doctor.create({
                    username: req.body.username,
                    password: req.body.password
                });
                return res.status(200).json({
                    
                    message: "Doctor Register Successfully!"
                })
            }
            //---- else show response
            else{
                //doctor = await doctor.populate('username', 'password').execPopulate();
                return res.status(200).json({
                    // data: doctor["_id"],
                    message: "Doctor username Already exist"
                })
            }
        }
    }catch(err){
        return res.status(404).json({
            message: "Server Error"
        })
    }
    
};

module.exports.login = async function(req,res){

    try{
        let doctor = await Doctor.findOne({ username: req.body.username});
        if(!doctor || doctor.password != req.body.password){
            return res.status(422).json({
                message:"Invalid Username/Password"
            }); 
        }
        else{
            return res.status(200).json({
                message:'Sign in successfully, here is your token, please keep it safe',
                data:{
                    token: jwt.sign(doctor.toJSON(), 'hospitalapi', {expiresIn: 10000})
                }
            });
            
        }
    }catch(err){
        return res.status(500).json({
            message: 'Server Error'
        });
    }
};