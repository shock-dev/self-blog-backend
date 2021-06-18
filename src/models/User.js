const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  avatarUrl: {
    type: String
  },
  location: { type: String },
  bio: { type: String },
  cloudinaryId: {
    type: String
  },
  birthday: {
    type: Date,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

module.exports = model('User', userSchema);
