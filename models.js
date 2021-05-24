const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  user: {
    type: [mongoose.Schema.ObjectId],
    ref: 'User',
  }
});

const UserSchema = new Schema({
  notes: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Note',
  }
});

const Note = mongoose.model('Note', NoteSchema);
const User = mongoose.model('User', UserSchema);

module.exports = {
  Note: Note,
  User: User
};
