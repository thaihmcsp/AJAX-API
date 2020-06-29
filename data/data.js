const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Register', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;
 
const AccountSchema = new Schema({
  _id: String,
  username: String,
  password: String,
},{collection:'register'});

var AccountModel = mongoose.model('register',AccountSchema);

module.exports = AccountModel;