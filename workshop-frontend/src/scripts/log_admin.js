const login_button = document.getElementById('login-button');
const url_login = "http://localhost:3000/login";
const admin_name = document.getElementById('user_admin_name');
const admin_password = document.getElementById('user_admin_password');
const verifyCredentials=()=>{
  const credentials = 
  {
    admin_user: admin_name.value,
    admin_password:admin_password.value
  };
  fetch(url_login,{
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(credentials)
  })
  .then(response => response.json())
  .then(regist => {
    if(regist.state){
      localStorage.setItem('admin', regist.token)
      window.location.replace('../templates/participants.html')
    }else{
      alert(regist.msg);
    }
  })
}
login_button.addEventListener('click',verifyCredentials);
