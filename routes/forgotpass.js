const express = require('express');
const nodemailer = require('nodemailer');
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
app.use('/', async (req, res) =>{
    let testAccount = await nodemailer.createTestAccount();
    const mail = req.body.email;
    let user = await database.collection("students_data").find({email:mail}).toArray();
    if(user.length === 0){
        return res.send("<h1>You are not registered</h1>")
    }
    const pass = user[0].password;
    console.log(pass);
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
    port: 465,
    secure: true,
        auth: {
            user: "udugundlasusmitha@gmail.com", 
            pass: "9505935070", 
        },
    });

  let mailDetails = {
    from: "udugundlasusmitha@gmail.com", 
    to: mail,
    subject: "Password", 
    text: `Your password is ${pass}`, 
    html: `<b>Your password is ${pass}</b>`
    }

  transporter.sendMail( mailDetails, (err, response) => {
      if(err){
          return res.json({err});
      }
      else{
            res.send("<h1>Password sent to your registered mail</h1>")
          console.log(JSON.stringify(res));
      }
  });

})

module.exports = app;