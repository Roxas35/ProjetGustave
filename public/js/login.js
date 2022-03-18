const APICALL = "http://localhost:1337/api/auth/local";

const identifier = document.querySelector(".identifier");
const password = document.querySelector(".password");
const connexion = document.querySelector(".connex");
const form = document.querySelector(".formDesk");
const loginFailed = document.querySelector(".failed");
const cardConnexion = document.querySelectorAll(".connexion");
const btnDeconnexion = document.querySelector(".deconnexion");
const burger = document.querySelector("#buttonMenu");
const search = document.querySelector(".search-bar");
const savedToken = JSON.parse(window.localStorage.getItem("data"));


let saveData = {
  authData: {
    token: "",
  },
};

const dataUser = async (user, password) => {
  const answer = await fetch(APICALL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      identifier: user,
      password: password,
    }),
  });

  const data = await answer.json();
  console.log(data);

  if (data.jwt != null) {
    saveData[0] = {
      token: data.jwt,
    };
    saveObj();
    window.location.href = "/html/index.html";
  } else {
    loginFailed.style.display = "block";
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  dataUser(identifier.value, password.value);
});

const saveObj = () => {
  window.localStorage.setItem("data", JSON.stringify(saveData));
};

btnDeconnexion.addEventListener("click", (e) => {
  savedToken[0].token = null;
  saveObj();
  window.location.href = "/html/index.html";
});

if (savedToken[0].token != null) {
  btnDeconnexion.style.display = "block";
  cardConnexion.forEach((e)=>{
    e.style.display = "none";
  });
  burger.style.display = "block";
  search.style.display = "flex";
} else if ((savedToken[0].token = null)) {
  console.log(savedToken[0].token)
  btnDeconnexion.style.display = "none";
  cardConnexion.forEach((e)=>{
    e.style.display = "block";
  });
  burger.style.display = "none";
  search.style.display = "none";
}
