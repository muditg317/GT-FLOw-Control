const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

Array.prototype.forEach.call(userSchema.requiredPaths(), requiredField => {
  let capitalizedFieldName = requiredField.substring(0,1).toUpperCase() + requiredField.substring(1);
  userSchema.static(`findBy${capitalizedFieldName}`, function(fieldValue) { return this.find({ [requiredField]: fieldValue }); });
  userSchema.static(`findOneBy${capitalizedFieldName}`, function(fieldValue) { return this.findOne({ [requiredField]: fieldValue }); });
});

const UserModel = mongoose.model("User", userSchema, "users");

module.exports = UserModel;
