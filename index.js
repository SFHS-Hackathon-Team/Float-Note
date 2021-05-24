const express = require ('express');
const path = require ('path');
const bodyParser = require('body-parser');

const app = express();
const Note = require('./models').Note;
const User = require('./models').User;

const mongoose = require('mongoose');
mongoose.connection.on('connected', function(){
  console.log('Connected to MongoDb!')
});
mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses

app.get('/viewMap', function(req, res){
  Note.find({}, function(err, notes){
    if (err){
      console.log(err);
    } else {
      console.log("hello", notes);
      res.json(notes);
    }
  })
})

app.get('/viewNote', function(req, res){
  Note.find({latitude: req.query.latitude,
             longitude: req.query.longitude}, function(err, note){
    if (err){
      console.log(err);
    } else {
      console.log(note);
      res.json(note[0]);
    }
  })
});

app.post('/dropNote', function(req, res){
  var note = new Note({
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    message: req.body.message
  });
  note.save(function(err){
    if(err){
      console.log(err);
    } else {
      res.redirect('/viewMap');
    }
  })
})

console.log('Express started. Listening on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);
