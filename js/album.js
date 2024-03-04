import { validMsgFunc } from "./commanFunc.js";

const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const albumCont = document.getElementById("albumCont");

// promise to get all the post data
function fetchAlbum() {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/albums", true);
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(xhr.statusText);
      }
    };
    xhr.onerror = function () {
      reject(xhr.statusText);
    };
    xhr.send();
  });
}
// promise to get all the comment on the base of postid++
function fetchImg() {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `https://jsonplaceholder.typicode.com/photos`, true);
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(xhr.statusText);
      }
    };
    xhr.onerror = function () {
      reject(xhr.statusText);
    };
    xhr.send();
  });
}

function createAlbumElements(albumData) {
  albumData.forEach((album) => {
    const albumCard = document.createElement("div");
    albumCard.classList.add("albumCard");

    const ablumTitle = document.createElement("p");
    ablumTitle.classList.add("ablumTitle");
    ablumTitle.textContent = `album Title: ${album.title}`;

    const ablumId = document.createElement("p");
    ablumId.classList.add("ablumId");
    ablumId.textContent = `album Id: ${album.id}`;

    const ablumUserId = document.createElement("p");
    ablumUserId.classList.add("ablumUserId");
    ablumUserId.textContent = `album userId: ${album.userId}`;

    const imageBtn = document.createElement("button");
    imageBtn.classList.add("imageBtn");
    imageBtn.textContent = `Show Images`;

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("imageContainer");
    imageContainer.style.display = "none";


    albumCard.appendChild(ablumId);
    albumCard.appendChild(ablumUserId);
    albumCard.appendChild(ablumTitle);
    albumCard.appendChild(imageBtn);
    albumCard.appendChild(imageContainer);


    albumCont.appendChild(albumCard);
    



    imageBtn.addEventListener("click", function () {
      if (imageContainer.style.display === "block") {
        imageContainer.style.display = "none";
      } else {
        imageContainer.style.display = "block";
        if (imageContainer.children.length === 0) {
          fetchImg(album.id)
            .then(function (imgData) {
              createImageElements(imgData, imageContainer); 
            })
            .catch(function (error) {
              console.error("An error occurred while fetching images:", error);
              validMsgFunc("Error fetching images", "red");
            });
        }
      }
    });
    // Fetch and append images
    fetchImg()
      .then(function (imgData) {
        const Data = imgData.filter((img) => img.albumId === album.id);
        createImageElements(Data, imageContainer);
      })
      .catch(function (error) {
        console.error("An error occurred while fetching images:", error);
        validMsgFunc("Error fetching images", "red");
      });
  });
}

function createImageElements(imageData, imageContainer) {
  var imageContCss = document.createElement("div");
  imageContCss.classList.add("imageContCss");
  
  imageData.forEach((element) => {
    console.log("element......", element);
    const imageCard = document.createElement("div");
    imageCard.classList.add("imageCard");

   

    const ablumId = document.createElement("p");
    ablumId.classList.add("ablumId");
    ablumId.textContent = `album id: ${element.albumId}`;

    const imageTitle = document.createElement("p");
    imageTitle.classList.add("imageTitle");
    imageTitle.textContent = `Image Title: ${element.title}`;

    const img = document.createElement("img");
    img.classList.add("image");
    img.src = element.url;

    imageCard.appendChild(ablumId);
    imageCard.appendChild(img);
    imageContCss.appendChild(imageCard)

   
  });

  imageContainer.appendChild(imageContCss);
}

fetchAlbum()
  .then(function (data) {
    const albumData = data.filter((album) => album.userId === userInfo.id);
    createAlbumElements(albumData);
  })
  .catch(function (error) {
    console.error("An error occurred:", error);
    validMsgFunc("Internal Server error", "red");
  });
