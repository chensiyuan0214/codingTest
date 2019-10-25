'use strict'
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/my_test', {userNewUrlParser: true});
var db = mongoose.connection;



window.localStorage.clear();
var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
let user =new Array();
window.localStorage.setItem('textValues', JSON.stringify(user));
var Person = function (username, password) {
  this.username = username;
  this.password = password;

  this.toString = function () {
    return ["Hi ! I'm ", this.username, " ", this.password].join("");
  };
};
function register() {
  var username = document.getElementById("exampleInputEmail2").value;
  var password = document.getElementById("exampleInputPassword2").value;
  var p = new Person(username, password);
  alert(p);
  user = window.localStorage.getItem('textValues');
  alert(window.localStorage.getItem('textValues'));
  alert(user);
  alert("最起码进来了");
  for(let i = 2; i < user.length; i++) {
    alert(user[i].username);
    if(user[i].username == username){
        alert("Username is already existed");
        return false;
    }
  }
  user.push(p);
  alert("users"+user);
  window.localStorage.setItem('textValues', JSON.stringify(user));
  alert(user.length);

}

function validate(){
  var username = document.getElementById("exampleInputEmail1").value;
  var password = document.getElementById("exampleInputPassword1").value;
  alert(users.length);
  for(let i = 0; i < users.length; i++) {
      if ( users[i].username == username && password == users[i].password){
          alert ("Login successfully");
          var loginLabel = document.getElementById("loginLabel");
          loginLabel.innerText = "Welcome";
          // window.location.replace("http://www.w3schools.com");
          return false;
      }


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