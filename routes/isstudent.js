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
router.post('/', (req, res) => {
    if(!req.body.id || !req.body.password){
        res.status(400).json({msg:"You have to enter all the details"})
    }
    else{
        connection.query('SELECT * from student_details', function (err, rows, fields) {
            if (err) throw err
            const found = rows.some( row => row.id == req.body.id && row.password == req.body.password );
            if(found){
                res.send("<h3>Logged in successfully</h3>");
            }
            else{
                res.send("<h3>Entered incorrect details</h3>");
            }
        })
    }
})

module.exports = router;
