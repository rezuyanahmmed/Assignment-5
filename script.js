document.getElementById('signin').addEventListener('click', function () {

  let userName = document.getElementById('username').value.trim();
  let userPassword = document.getElementById('userPass').value.trim();

  if (userName === 'admin' && userPassword === 'admin123') {
    window.location.href = "./home.html";
  } else {
    alert('Invalid Username or Password');
  }

});


//-------------------------------------------------------------------

