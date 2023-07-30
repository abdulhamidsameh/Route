let signUpName = document.getElementById("signUpName");
let signUpEmail = document.getElementById("signUpEmail");
let signUpPassword = document.getElementById("signUpPassword");
let email = document.getElementById("email");
let password = document.getElementById("password");
let enter = document.getElementById("enter");
let loginDiv = document.getElementById("loginDiv");
let welcome = document.getElementById("welcome");
let nav = document.getElementById("nav");
let LogoutBtn = document.getElementById("LogoutBtn");
let linkSignUp = document.getElementById("linkSignUp");
let linkSignIn = document.getElementById("linkSignIn");
let signUp = document.getElementById("signUp");
let add = document.getElementById("add");
let users = [];
if (localStorage.getItem("users")) {
  users = JSON.parse(localStorage.getItem("users"));
}

function addUser() {
  if (validateUserName()) {
    if (validateUserEmail()) {
      let flag = true;
      for (let i = 0; i < users.length; i++) {
        if (signUpEmail.value == users[i].userEmail) {
          flag = false;
        }
      }
      if (flag) {
        if (validateUserPassword()) {
          let user = {
            userName: signUpName.value,
            userEmail: signUpEmail.value,
            userPassword: signUpPassword.value,
          };
          users.push(user);
          localStorage.setItem("users", JSON.stringify(users));
          clearSignUp();
          signInForm();
        } else {
          alert(
            "Un Validate Password Minimum eight characters, at least one letter and one number:"
          );
        }
      } else {
        alert(`This Email you can't use in signup already founded`);
      }
    } else {
      alert("Un Validate Email");
    }
  } else {
    alert("Un Validate User Name");
  }
}
function clear() {
  email.value = "";
  password.value = "";
}
function clearSignUp() {
  signUpName.value = "";
  signUpEmail.value = "";
  signUpPassword.value = "";
}
function login() {
  if (localStorage.getItem("users")) {
    users = JSON.parse(localStorage.getItem("users"));
  } else {
    alert("incorrect email or password");
    clear();
  }
  for (let i = 0; i < users.length; i++) {
    if (
      email.value == users[i].userEmail &&
      password.value == users[i].userPassword
    ) {
      loginDiv.style.display = "none";
      welcome.innerHTML = `Welcome ${users[i].userName}`;
      welcome.style.display = "block";
      nav.style.display = "block";
      clear();
    } else {
      alert("incorrect email or password");
      clear();
    }
  }
}
function logout() {
  loginDiv.style.display = "block";
  welcome.style.display = "none";
  nav.style.display = "none";
}
function signUpForm() {
  loginDiv.style.display = "none";
  signUp.style.display = "block";
  clear();
}
function signInForm() {
  loginDiv.style.display = "block";
  signUp.style.display = "none";
  clearSignUp();
}
enter.addEventListener("click", login);
LogoutBtn.addEventListener("click", logout);
linkSignUp.addEventListener("click", signUpForm);
linkSignIn.addEventListener("click", signInForm);
add.addEventListener("click", addUser);
function validateUserName() {
  let regex = /[a-zA-Z]/;
  return regex.test(signUpName.value);
}
function validateUserPassword() {
  let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regex.test(signUpPassword.value);
}
function validateUserEmail() {
  let regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(signUpEmail.value);
}
