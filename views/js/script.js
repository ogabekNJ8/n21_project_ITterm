// const { response } = require("express");
// const { error } = require("winston");

function login() {
  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
      fetch("http://localhost:3333/api/author/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((response) => {
          console.log(response);
          if (response.ok) {
            console.log("Login successfully");
            return response.json();
          } else {
            console.log("Login failed");
          }
        })
        .then((data) => {
          console.log(data);
          localStorage.setItem("accessToken", data.accessToken);
        });
    } catch (error) {
      console.log(error);
    }
  });
}

async function getAuthors() {
  let accessToken = localStorage.getItem("accessToken");

  const accessTokenExpTime = getTokenExptime(accessToken);
  console.log("accessTokenExpTime:", accessTokenExpTime);

  if (accessTokenExpTime) {
    const currentTime = new Date();
    if (currentTime < accessTokenExpTime) {
      console.log("AccessToken faol");
    } else {
      console.log("Access token vaqti chiqib ketdi");
      accessToken = await refreshToken();
    }
  } else {
    console.log("AccessToken chiqish vaqti berilmagan!");
  }

  fetch("http://localhost:3333/api/author", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      console.log("res:", response)
      if (response.ok) {
        return response.json();
      } else {
        console.log("Request failed with status:", response.status);
      }
    })
    .then((authorData) => {
      console.log(authorData);
      displayAuthors(authorData.authors);
    })

    .catch((error) => {
      console.log(error);
    });
}

function displayAuthors(authorsData) {
  const authorsList = document.getElementById("list-authors");
  authorsData.forEach((author) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${author.first_name} ${author.last_name} - ${author.email}`;
    authorsList.appendChild(listItem);
  });
}

function getTokenExptime(token) {
  const decodedToken = JSON.parse(atob(token.split(".")[1]));

  if (decodedToken.exp) {
    return new Date(decodedToken.exp * 1000);
  }
  return null;
}

async function refreshToken(params) {
  const loginUrl = "/login";
  try {
    const response = await fetch("http://localhost:3333/api/author/refresh", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await response.json();

    if (data.error && data.error == "jwt expired") {
      console.log("Refresh token vaqti chiqib ketgan!");
      return window.location.replace(loginUrl);
    }
    console.log("Tokenlar refresh token yordamida yangilandi");
    localStorage.setItem("accessToken", data.accessToken);
    return data.accessToken;
  } catch (error) {
    console.log(error);
  }
}
