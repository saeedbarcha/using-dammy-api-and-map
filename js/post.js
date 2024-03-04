import { validMsgFunc } from "./commanFunc.js";

const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const postCont = document.getElementById("postCont");

// promise to get all the post data
function fetchPost() {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
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
function fetchPostComments(postId) {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
      true
    );
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

function createPostElements(posts) {
  posts.forEach((element) => {
    const postCard = document.createElement("div");
    postCard.classList.add("postCard");

    const postPara = document.createElement("p");
    postPara.classList.add("postPara");
    postPara.textContent = `User ID: ${element.userId}`;

    const postHead = document.createElement("h4");
    postHead.classList.add("postHead");
    postHead.textContent = `Post Heading: ${element.title}`;

    const postIdPara = document.createElement("p");
    postIdPara.classList.add("postIdPara");
    postIdPara.textContent = `Post ID: ${element.id}`;

    const postBodyPara = document.createElement("p");
    postBodyPara.classList.add("postBodyPara");
    postBodyPara.textContent = `Post Body: ${element.body}`;

    const commentBtn = document.createElement("button");
    commentBtn.classList.add("commentBtn");
    commentBtn.textContent = `Show comment`;

    const commentContainer = document.createElement("div");
    commentContainer.classList.add("commentContainer");
    commentContainer.style.display = "none";
    postCard.appendChild(postPara);
    postCard.appendChild(postHead);
    postCard.appendChild(postIdPara);
    postCard.appendChild(postBodyPara);
    postCard.appendChild(commentBtn);

    postCard.appendChild(commentContainer); 

    postCont.appendChild(postCard);

    commentBtn.addEventListener("click", function () {
      if (commentContainer.style.display === "block") {
        commentContainer.style.display = "none";
      } else {
        commentContainer.style.display = "block";
        if (commentContainer.children.length === 0) {
          fetchPostComments(element.id)
            .then(function (commentsData) {
              createCommentElements(commentsData, commentContainer); // Pass commentContainer to append comments
            })
            .catch(function (error) {
              console.error(
                "An error occurred while fetching comments:",
                error
              );
              validMsgFunc("Error fetching comments", "red");
            });
        }
      }
    });
    // Fetch and append comments
    fetchPostComments(element.id)
      .then(function (commentsData) {
        createCommentElements(commentsData, commentContainer); // Pass commentContainer to append comments
      })
      .catch(function (error) {
        console.error("An error occurred while fetching comments:", error);
        validMsgFunc("Error fetching comments", "red");
      });
  });
}

function createCommentElements(commentsData, container) {
  commentsData.forEach((element) => {
    const commentCard = document.createElement("div");
    commentCard.classList.add("commentCard");


    const commentId = document.createElement("h5");
    commentId.classList.add("commentId");
    commentId.textContent = `comment id: ${element.id}`;

    const postId = document.createElement("h5");
    postId.classList.add("postId");
    postId.textContent = `post id: ${element.postId}`;

    const userId = document.createElement("h5");
    userId.classList.add("userId");
    userId.textContent = `user email: ${element.email}`;


    const commentNamePara = document.createElement("h5");
    commentNamePara.classList.add("commentNamePara");
    commentNamePara.textContent = `commented by: ${element.name}`;

    const commentBody = document.createElement("p");
    commentBody.classList.add("commentBody");
    commentBody.textContent = `comment: ${element.body}`;

    commentCard.appendChild(commentId);
    commentCard.appendChild(postId);
    commentCard.appendChild(userId);
    commentCard.appendChild(commentNamePara);
    commentCard.appendChild(commentBody);

    container.appendChild(commentCard);
  });
}

fetchPost()
  .then(function (data) {
    const postData = data.filter((post) => post.userId === userInfo.id);
    createPostElements(postData);
  })
  .catch(function (error) {
    console.error("An error occurred:", error);
    validMsgFunc("Internal Server error", "red");
  });



var map = L.map('map').setView([userInfo.address.geo.lng, userInfo.address.geo.lat], 3);
var marker = L.marker([userInfo.address.geo.lng, userInfo.address.geo.lat]).addTo(map);
// var map = L.map('map').setView([51.505, -0.09], 13);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);