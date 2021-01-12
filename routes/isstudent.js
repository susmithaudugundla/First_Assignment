const express = require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const schema = require('mongodb-schema');
let database;
const uri = "mongodb+srv://FirstAssignment:Susmi@123@assignment-1.ksf6u.mongodb.net/Students?retryWrites=true&w=majority";
MongoClient.connect(uri,{ useUnifiedTopology: true, useNewUrlParser: true }, (err, conn) => {
        if (err) {
            console.log("Connection failed to database", err);
          } else {
            console.log("Connection Successfull");
            database = conn.db("Students");
          }
        }
  )

router.post('/', async (req, res) => {
    if(!req.body.id || !req.body.password){
        res.status(400).json({msg:"You have to enter all the details"})
    }
    else{
        try{
            let allStudents = await database.collection("students_data").find({}).toArray();
            const found = allStudents.some( row => row.id == req.body.id && row.password == req.body.password );
            if(found){
                res.send("<h3>Logged in successfully</h3>");
            }
            else{
                res.send("<h3>Entered incorrect details</h3>");
            }
        }
        catch(err){
            console.log(err);
        }
    }
})

module.exports = router;
