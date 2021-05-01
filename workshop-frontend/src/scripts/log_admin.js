const login_button = document.getElementById('login-button');
const verifyCredentials=()=>{
  window.location.replace('../templates/participants.html')
}
login_button.addEventListener('click',verifyCredentials);
//aqui debo incluir el fetch de login admin