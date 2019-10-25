'use strict'
var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
var loginButton = document.getElementById("loginButton");
var users = [];

function register() {
  var username = document.getElementById("exampleInputEmail2").value;
  var password = document.getElementById("exampleInputPassword2").value;
  var person = {username: username, password: password};

  for(let i = 0; i < users.length; i++) {
    if(users[i].username == username){
        alert("Username is already existed");
        return false;
    }
  }
  users.push(person);

}

function validate(){
  var username = document.getElementById("exampleInputEmail1").value;
  var password = document.getElementById("exampleInputPassword1").value;
  for(let i = 0; i < users.length; i++) {

      if ( users[i].username == username && password == users[i].password){
          alert ("Login successfully");
          window.location.replace("http://www.w3schools.com");
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