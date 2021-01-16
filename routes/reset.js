const express = require('express');
const { validateConfirmPassword, validatePassword } = require('../validator')
const { validationResult } = require('express-validator');
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGODB_URI || "mongodb+srv://FirstAssignment:Susmi@123@assignment-1.ksf6u.mongodb.net/Students?retryWrites=true&w=majority";
let database;


MongoClient.connect(uri,{ useUnifiedTopology: true, useNewUrlParser: true }, (err, conn) => {
        if (err) {
            console.log("Connection failed to database", err);
          } else {
            database = conn.db("Students");
            console.log("Connection Successfull");
          }
        }
  )

const app = express();
app.use('/',[validatePassword, validateConfirmPassword],
    async (req, res) => {
        const { oldPassword, password, confirmPassword} = req.body;
        if(!oldPassword || !password || !confirmPassword){
            return res.status(400).json({msg:"You have to enter all the details"})
        }
        else{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({ errors:errors.array()});
            }
            try{
                const pass = req.cookies.authData.user[0]['password'];
                if(pass === oldPassword){
                    let allStudents = await database.collection("students_data").updateOne({password:oldPassword}, {$set:{password:password}});
                    res.send("<h1>Password updated successfully</h1>")
                }else{
                    res.send("<h1>Please enter correct Password</h1>")
                }
            }
            catch(err){
                console.error(err);
            }  
        }
    
})

module.exports = app;