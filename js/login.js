import { validMsgFunc } from "./commanFunc.js";

let logInBtn = document.getElementById("logInBtn");

logInBtn.addEventListener("click", function (e) {
  e.preventDefault();
  new Promise(function (myResolve, myReject) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/users", false);
    xhr.send();
    var data = JSON.parse(xhr.responseText);

    if (data) {
      myResolve(data);
    } else {
      myReject();
    }
  })
    .then(function (data) {
      let email = document.getElementById("email");
      let logiUser = {
        id: 0,
        name: "",
        username: "",
        email: email.value,
        address: {
          street: "",
          suite: "",
          city: "",
          zipcode: "",
          geo: {
            lat: "",
            lng: "",
          },
        },
        phone: "",
        website: "",
        company: {
          name: "",
          catchPhrase: "",
          bs: "",
        },
      };

      var matchVal = false;
      console.log("data........", data);
      data.forEach((element) => {
        if (element.email === logiUser.email) {
          matchVal = true;

          logiUser = {
            id: element?.id,
            name: element?.name,
            username: element?.username,
            email: element?.email,
            address: {
              street: element?.address?.street,
              suite: element?.address?.suite,
              city: element?.address?.city,
              zipcode: element?.address?.zipcode,
              geo: {
                lat: element?.address?.geo?.lat,
                lng: element?.address?.geo?.lng,
              },
            },
            phone: element?.phone,
            website: element?.website,
            company: {
              name: element?.company?.name,
              catchPhrase: element?.company?.catchPhrase,
              bs: element?.company?.bs,
            },
          };
        }
      });

      if (matchVal) {
        localStorage.setItem("userInfo", JSON.stringify(logiUser));
        validMsgFunc("Login successfully", "green");
        email.value = "";
        setTimeout(function () {
          location.href = "post.html";
        }, 2000);
      } else {
        validMsgFunc("Email is incorrect", "red");
      }
    })
    .catch(function (error) {
      console.log("An error occurred:", error);
      validMsgFunc("Internal Server error", "red");
    });
});
