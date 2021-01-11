const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'rgukt123',
    database:'students'
})
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
});

// Get all students
router.get('/', (req, res) => {
    connection.query('SELECT * from student_details', function (err, rows, fields) {
        if (err) throw err
        console.log('The solution is: ', rows);
        //res.status(200).json({msg:"success"});
        res.render('students', {rows});
    })  
})

// Create a student record

router.post('/', (req, res) => {
    if(!req.body.id || !req.body.name || !req.body.branch || !req.body.email || !req.body.password){
        res.status(400).json({msg:"You have to enter all the details"})
    }
    else{
        const stmt = `insert into student_details(id, name,branch, email, password )values(?,?,?,?,?)`;
        const val = [req.body.id, req.body.name, req.body.branch, req.body.email, req.body.password];
        connection.query(stmt,val,(err, results, fields) => {
            if (err) {
              return console.error(err.message);
            }
            // get inserted id
            res.redirect('/');
        })  
    }
})

module.exports = router;
