document.getElementById('signin').addEventListener('click', function () {
  let userName = document.getElementById('username').value;
  let userPassword = document.getElementById('userPass').value;

  // let user = username.value;
  // let password = userPass.value;

  if (userName === 'admin' && userPassword === 'admin123') {
    window.location.assign('./home.html');
  } else {
    alert('Inavalid Username or Password');
  }


});
