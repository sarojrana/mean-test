const mongoose = require('mongoose');

const { Schema } = mongoose;

const gender = ['MALE', 'FEMALE', 'OTHER'];
const userStatus = ['ACTIVE', 'BLOCKED'];

const UserSchema = new Schema({
  full_name: { type: String, trim: true, required: [true, 'full name required'] },
  image: { type: String },
  gender: { type: String, enum: gender, required: [true, 'gender required'] },
  designation: { type: String, trim: true },
  experiences: [{ type: String, trim: true }],
  status: { type: String, enum: userStatus, default: 'ACTIVE', required: [true, 'status required'] },
  login_id: { type: Schema.ObjectId, ref: 'Login', required: [true, 'required'] }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('User', UserSchema);
