var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
var loginButton = document.getElementById("loginButton");
var users = [];
function register() {
  var username = document.getElementById("exampleInputEmail2").value;
  var password = document.getElementById("exampleInputPassword2").value;
  var pair = {name: username, password: password};

}

function validate(){
  var username = document.getElementById("exampleInputEmail1").value;
  var password = document.getElementById("exampleInputPassword1").value;
  if ( username == "chen@gmail.com" && password == "11"){
    alert ("Login successfully");
    window.location = "success.html"; // Redirecting to other page.
    return false;
  } else{
    attempt --;// Decrementing by one.
    alert("You have left "+attempt+" attempt;");
// Disabling fields after 3 attempts.
    if( attempt == 0){
      document.getElementById("username").disabled = true;
      document.getElementById("password").disabled = true;
      document.getElementById("submit").disabled = true;
      return false;
    }
  }
}