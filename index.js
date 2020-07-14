const express = require('express');
const port = 8000;
const app = express();

const db = require('./config/mongoose');

//---- require passport ans jwt strategy for authentication
const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy');

//---- to fetch data from url
app.use(express.urlencoded({extended:true}));

//---- tell app to use passport
app.use(passport.initialize());

//--- use express router
    app.use('/', require('./routes'));
    
//---- starting server
app.listen(port, function(err){
    if(err){
        console.log('Error in running the server:',err);
        return;
    }
    console.log('Server is up and runinng at port: ',port );
});