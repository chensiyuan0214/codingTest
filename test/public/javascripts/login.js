'use strict'

//将mongoose.Schema 赋值给一个变量
var Schema = mongoose.Schema;

//创建Schema（模式）对象
var userModel = new Schema({

    username:String,
    password:String

});

var userModel = mongoose.model("users" , userModel);



var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.

function register() {
      var username = document.getElementById("exampleInputEmail2").value;
      var password = document.getElementById("exampleInputPassword2").value;

      var result = userModel.findOne({username:username},function (err , docs) {
          if(!err){
              console.log("did find the users");
          }
      });

      if(result != null){
          alert("Username Already Exsit");
      }else{
          userModel.create({
              username:username,
              password:password
          },function (err) {
              if(!err){
                  console.log("Successful inserted");
              }
          });

      }
      return false;


}

function validate(){

      //grab username from front end
      var username = document.getElementById("exampleInputEmail1").value;
      var password = document.getElementById("exampleInputPassword1").value;

      var res = userModel.findOne({username:username, password:password},function (err , docs) {
          if(!err){
              console.log("did find the users");
          }
      });

      if(res != null){
          alert("Successfully logged in");
          return false;
      }else{
          alert("Either user does not exist");
      }
      if(attempt > 0){
          attempt --;// Decrementing by one.
          alert("You have left "+attempt+" attempt;");
      }else{
          alert("You have no attempts left");
      }
      // Disabling fields after 3 attempts.
      if( attempt == 0){
          document.getElementById("username").disabled = true;
          document.getElementById("password").disabled = true;
          document.getElementById("submit").disabled = true;
          return false;
      }


}