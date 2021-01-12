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


// Get all students
router.get('/', async (req, res) => {
            try{
                let allStudents = await database.collection("students_data").find({}).toArray();
                //console.log(allTasks);
                res.render('students', {allStudents});
            }
            catch (err){
                console.error(err);
            }
          } 
)

// Create a student record

router.post('/', async (req, res) => {
    if(!req.body.id || !req.body.name || !req.body.branch || !req.body.email || !req.body.password){
        res.status(400).json({msg:"You have to enter all the details"})
    }
    else{
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
        // const stmt = `insert into student_details(id, name,branch, email, password )values(?,?,?,?,?)`;
        // const val = [req.body.id, req.body.name, req.body.branch, req.body.email, req.body.password];
        // connection.query(stmt,val,(err, results, fields) => {
        //     if (err) {
        //       return console.error(err.message);
        //     }
        //     // get inserted id
        //     res.redirect('/');
        // })  
    }
})

module.exports = router;
