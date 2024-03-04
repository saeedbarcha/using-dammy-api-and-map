let logInUser = JSON.parse(localStorage.getItem("userInfo"));
console.log("iiiiiiiiiiiiiiii", logInUser);

let sectionCont = document.getElementById("profileCont");

sectionCont.innerHTML = `
<div class="userProfileCont">

<h1>User Profile </h1>
<p>id :${logInUser.id}</p>
<p>name :${logInUser.name}</p>
<p>Email :${logInUser.email}</p>
<p>Phone :${logInUser.phone}</p>
<p>User Name : ${logInUser.username}</p>
<p>Website :${logInUser.website}</p>
<p>Address :${logInUser.address.city}</p>
<h1>GEO Location </h1>
<p>GEO location (lat): ${logInUser.address.geo.lat}</p>
<p>GEO location (lng):  ${logInUser.address.geo.lng}</p>

<h1>Company </h1>
<p>Name : ${logInUser.company.name}</p>
<p>catchPhrase: ${logInUser.company.catchPhrase}</p>
<p>bs: ${logInUser.company.bs}</p>
</div>
`;
