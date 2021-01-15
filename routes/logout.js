const express = require('express');
const app = express();
app.use('/', (req, res) =>{
    res.clearCookie("token");
    res.redirect('/')
})

module.exports = app;