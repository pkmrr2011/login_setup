var createError = require('http-errors');
var express = require('express');
var path = require('path');
var ejs = require('ejs');
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
var usersRouter = require('./routes/users');

var app = express();
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/users', usersRouter);

//Mongoose conect

mongoose.connect('mongodb+srv://admin:admin@cluster0.i58qwej.mongodb.net/rudra_tech', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // Connection established
  console.log('Connected to MongoDB database');
});



app.listen(4000, ()=>{
  console.log('App listening on port 4000')
});
