const mongoose = require('mongoose');

const { Schema } = mongoose;

const LoginSchema = new Schema({
  email: { type: String, unique: [true, 'email already exists'], required: [true, 'email required'] },
  password: { type: String, required: [true, 'password required'] },
  token: [{ type: String }],
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Login', LoginSchema);
