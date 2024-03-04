let logInUser = JSON.parse(localStorage.getItem("userInfo"));
let tableClickBtn = document.getElementById("tableClickBtn");
let headerCont = document.getElementById("headerCont");

function logout() {
  localStorage.removeItem("userInfo");
  window.location.href = "login.html";
}
if (logInUser) {

  headerCont.innerHTML = `
  <header class="headerCont">
  <p id="emailCont"></p>
   <ul class="nav">
    <li class="nav-item active">
      <a class="nav-link text-white" href="index.html">home</a>
    </li>
    <li class="nav-item">
      <a class="nav-link text-white" href="post.html">Post</a>
    </li>
    <li class="nav-item">
      <a class="nav-link text-white" href="profile.html">Profile</a>
    </li>
    <li class="nav-item">
      <a class="nav-link text-white" href="album.html">Albums</a>
    </li>
    <li class="nav-item">
      <a class="nav-link text-white" onclick="logout()" href="">logout</a>
    </li>
   </ul>
  <header>
    `;
} else {
  headerCont.innerHTML = `
  <header class="headerCont">
  <p id="emailCont"></p>
    <ul class="nav">
    <li class="nav-item active">
      <a class="nav-link text-white" href="index.html">home</a>
    </li>
 
    <li class="nav-item">
      <a class="nav-link text-white" href="login.html">Login</a>
    </li>
   
  </ul>
  </header>
    `;
}




let emailCont = document.getElementById("emailCont");
if(logInUser.email){
  emailCont.innerText = logInUser.email;
}else{
  emailCont.innerText = '';
}
