const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Register', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const AccountSchema = new Schema({
  // _id: ObjectId,
  username: String,
  password: String,
},{collection:'register'});

var AccountModel = mongoose.model('register',AccountSchema);

module.exports = AccountModel;