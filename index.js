const express = require('express');
const exphb = require('express-handlebars');
const app = express()

//body-parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}))

//handle-bars middleware
app.engine('handlebars',exphb({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

//Home page
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/signup', (req, res) => {
    res.render('signup');
})

app.use('/api/students', require('./routes/apis/students'))
app.use('/isstudent', require('./routes/isstudent'))
const PORT = process.env.PORT || 5000;

app.listen(PORT);