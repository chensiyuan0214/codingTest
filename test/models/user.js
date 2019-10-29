var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userModel = new Schema({

  username:String,
  password:String

});

userModel.virtual('username').get(function () {
        return this.username;
})

module.exports = mongoose.model('user', userModel);