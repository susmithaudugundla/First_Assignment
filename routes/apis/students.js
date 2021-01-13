const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const schema = require('mongodb-schema');
const { check, validationResult } = require('express-validator');
const { validateId, validateEmail, isEmailInUse, validatePassword, isIDInUse } = require('../../validator')
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

// Get all students
router.get('/', async (req, res) => {
            try{
                let allStudents = await database.collection("students_data").find({}).toArray();
                //let del = await database.collection("students_data").deleteMany({ name:"Bhavani" })
                res.render('students', {allStudents});
            }
            catch (err){
                console.error(err);
            }
          } 
)

// Create a student record

router.post('/', 
    [validateId, isIDInUse, validateEmail, isEmailInUse, validatePassword],
    async (req, res) => {
        if(!req.body.id || !req.body.name || !req.body.branch || !req.body.email || !req.body.password){
            return res.status(400).json({msg:"You have to enter all the details"})
        }
        else{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({ errors:errors.array()});
            }
            try{
                let addStudent = await database.collection("students_data").insertOne({
                    id:req.body.id,
                    name: req.body.name,
                    email:req.body.email,
                    branch:req.body.branch,
                    password:req.body.password
                });
                res.redirect('/');
            }
            catch(err){
                console.error(err);
            }  
        }
})

module.exports = router;
