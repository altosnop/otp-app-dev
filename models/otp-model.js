const { Schema } = require('mongoose');
const { model } = require('mongoose');

const OtpSchema = new Schema({
  code: { type: Number, unique: true, required: true },
  fileName: { type: String, required: true },
  description: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  expireAt: { type: String },
});

module.exports = model('Otp', OtpSchema);
