/*import res = require("express/lib/response");*/

fetch(
  "http://192.168.43.152:1337/api/catalogues?pagination[pageSize]=30&populate=*"
)
  .then((res) => res.json())
  .then((res2) => {
    const corps = document.querySelector(".blockHouse");
    const corps2 = document.querySelector(".produit");
    const corps3 = document.querySelector("#respr");
    let D = new Date();
    let mois = D.getMonth() + 1;
    if (window.location.pathname === "/html/recherche.html") {
      let count = 0;
      res2.data.forEach((e) => {
        corps.innerHTML += `
              <a href="produit.html?id=${e.id}">
              <div class="newHouse">
              <img src="http://192.168.43.152:1337${e.attributes.Photo.data?.attributes.url}"></img>
                  <div class="description">
                      <div class="dColumn">
                          <h3>${e.attributes["Nom"]}</h3>
                          <h4>${e.attributes["Secteur"]}</h4>
                          <p>${e.attributes["Description"]}</p>
                      </div>
                      <div class="dColumn" id="${count}">
                          <p>${e.attributes["Ch"]} Chambres</p>
                      </div>
                  </div>
              </div> 
              </a>`;
        let inf = document.getElementById(`${count}`);

        if (e.attributes["Categorie"] === "Montagne") {
          if (9 <= mois && mois <= 11) {
            console.log(mois);
            inf.innerHTML += `
                        <p class="price">{e.attributes["Bas"]}€ <br> <span>/semaine</span></p>
                        `;
          } else if (4 <= mois && mois <= 6) {
            inf.innerHTML += `
                        <p class="price">${e.attributes["Moyen"]}€ <br> <span>/semaine</span></p>
                        `;
          } else {
            inf.innerHTML += `
                        <p class="price">${e.attributes["Haut"]}€ <br> <span>/semaine</span></p>
                        `;
          }
        } else {
          if ((10 <= mois && mois <= 12) || (1 <= mois && mois <= 4)) {
            inf.innerHTML += `
                        <p class="price">${e.attributes["Bas"]}€ <br> <span>/semaine</span></p>
                        `;
          } else if ((5 <= mois && mois <= 6) || 9 === mois) {
            inf.innerHTML += `
                        <p class="price">${e.attributes["Moyen"]}€ <br> <span>/semaine</span></p>
                        `;
          } else {
            inf.innerHTML += `
                        <p class="price">${e.attributes["Haut"]}€ <br> <span>/semaine</span></p>
                        `;
          }
        }

        count++;
      });
    } else if (window.location.pathname === "/html/produit.html") {
      res2.data.forEach((e) => {
        if (e.id.toString() === window.location.search.split("=")[1]) {
          corps2.innerHTML += ` 
      
          <div class="caroussel">
              <img src="http://192.168.43.152:1337${e.attributes.Photo.data?.attributes.url}" alt="">
          </div>
          <div class="fiche">
              <h3 class="glamore">${e.attributes["Nom"]}</h3>
              <div class="details">
                  <div>
                      <p>${e.attributes["M2"]} m²</p>
                      <p>${e.attributes["Ch"]} chambres</p>
                  </div>
                  <div class="nb-personne">
                      <p>${e.attributes["Type"]}</p>
                  </div>
              </div>
              <div>
                  <h6 class="glamore ">Equipements :</h6>
                  <div class="equipement">
                          
                  </div>
              </div>
                  
              <p>${e.attributes["Description"]}</p>
              <div class="fiche-end">
                  <div id="prix">
                  </div>
                  <div class="avis">

                  </div>
                  <button class="btn-reservation">Réservation</button>
              </div>
          </div>
                `;

          const eq = document.querySelector(".equipement");
          console.log(e.attributes["Equipements"].data);
          e.attributes["Equipements"].data.forEach((el) => {
            console.log(el);
            eq.innerHTML += `
            <div class="equipement-column">
                <p>${el.attributes.Name}</p>
                <hr class="hr-equipement">
            </div>
                
            `;
          });
          let prix = document.getElementById("prix");

          if (e.attributes["Categorie"] === "Montagne") {
            if (9 <= mois && mois <= 11) {
              console.log(mois);
              prix.innerHTML += `
                        <p class="fiche-price">${e.attributes["Bas"]}€ <br> </p><span>/semaine</span>
                        `;
              corps3.innerHTML += `
                        <p class="fiche-price">${e.attributes["Bas"]}€</p>
                        <p>/ semaine</p>
                        `;
            } else if (4 <= mois && mois <= 6) {
              prix.innerHTML += `
                        <p class="fiche-price">${e.attributes["Moyen"]}€ <br> </p><span>/semaine</span>
                        `;
              corps3.innerHTML += `
                        <p class="fiche-price">${e.attributes["Moyen"]}€</p>
                        <p>/ semaine</p>
                        `;
            } else {
              prix.innerHTML += `
                        <p class="fiche-price">${e.attributes["Haut"]}€ <br> </p><span>/semaine</span>
                        `;
              corps3.innerHTML += `
                        <p class="fiche-price">${e.attributes["Haut"]}€</p>
                        <p>/ semaine</p>
                        `;
            }
          } else {
            if ((10 <= mois && mois <= 12) || (1 <= mois && mois <= 4)) {
              prix.innerHTML += `
                        <p class="fiche-price">${e.attributes["Bas"]}€ <br> </p><span>/semaine</span>
                        `;
              corps3.innerHTML += `
                        <p class="fiche-price">${e.attributes["Bas"]}€</p>
                        <p>/ semaine</p>
                        `;
            } else if ((5 <= mois && mois <= 6) || 9 === mois) {
              prix.innerHTML += `
                        <p class="fiche-price">${e.attributes["Moyen"]}€ <br> </p><span>/semaine</span>
                        `;
              corps3.innerHTML += `
                        <p class="fiche-price">${e.attributes["Moyen"]}€</p>
                        <p>/ semaine</p>
                        `;
            } else {
              prix.innerHTML += `
                        <p class="fiche-price">${e.attributes["Haut"]}€ <br> </p><span>/semaine</span>
                        `;
              corps3.innerHTML += `
                        <p class="fiche-price">${e.attributes["Haut"]}€</p>
                        <p>/ semaine</p>
                        `;
            }
          }
        }
      });
      // Booking

      const btnReservation = document.querySelector(".btn-reservation");
      const formBooking = document.querySelector(".booking-form");
      const booking = document.querySelector(".block-booking");
      const produit = document.querySelector(".produit");
      const closeWindows = document.querySelector("#close");
      const thanks = document.querySelector(".thanks");

      btnReservation.addEventListener("click", (e) => {
        produit.style.display = "none";
        booking.style.display = "block";
        if (e.attributes["Categorie"] === "Montagne") {
          if (9 <= mois && mois <= 11) {
            console.log(mois);
            prix.innerHTML += `
                        <p class="fiche-price">${e.attributes["Bas"]}€ <br> </p><span>/semaine</span>
                        `;
            corps3.innerHTML += `
                        <p class="fiche-price">${e.attributes["Bas"]}€</p>
                        <p>/ semaine</p>
                        `;
          } else if (4 <= mois && mois <= 6) {
            prix.innerHTML += `
                        <p class="fiche-price">${e.attributes["Moyen"]}€ <br> </p><span>/semaine</span>
                        `;
            corps3.innerHTML += `
                        <p class="fiche-price">${e.attributes["Moyen"]}€</p>
                        <p>/ semaine</p>
                        `;
          } else {
            prix.innerHTML += `
                        <p class="fiche-price">${e.attributes["Haut"]}€ <br> </p><span>/semaine</span>
                        `;
            corps3.innerHTML += `
                        <p class="fiche-price">${e.attributes["Haut"]}€</p>
                        <p>/ semaine</p>
                        `;
          }
        } else {
          if ((10 <= mois && mois <= 12) || (1 <= mois && mois <= 4)) {
            prix.innerHTML += `
                        <p class="fiche-price">${e.attributes["Bas"]}€ <br> </p><span>/semaine</span>
                        `;
            corps3.innerHTML += `
                        <p class="fiche-price">${e.attributes["Bas"]}€</p>
                        <p>/ semaine</p>
                        `;
          } else if ((5 <= mois && mois <= 6) || 9 === mois) {
            prix.innerHTML += `
                        <p class="fiche-price">${e.attributes["Moyen"]}€ <br> </p><span>/semaine</span>
                        `;
            corps3.innerHTML += `
                        <p class="fiche-price">${e.attributes["Moyen"]}€</p>
                        <p>/ semaine</p>
                        `;
          } else {
            prix.innerHTML += `
                        <p class="fiche-price">${e.attributes["Haut"]}€ <br> </p><span>/semaine</span>
                        `;
            corps3.innerHTML += `
                        <p class="fiche-price">${e.attributes["Haut"]}€</p>
                        <p>/ semaine</p>
                        `;
          }
        }
      });

      closeWindows.addEventListener("click", (e) => {
        produit.style.display = "flex";
        booking.style.display = "none";
      });

      formBooking.addEventListener("submit", (e) => {
        e.preventDefault();
        booking.style.display = "none";
        thanks.style.display = "block";
        setTimeout(() => {
          produit.style.display = "flex";
          thanks.style.display = "none";
        }, 2000);
      });
    }
  });

// Menu
const menu = document.querySelector("#buttonMenu");
const profil = document.querySelector("#buttonProfil");
const body = document.querySelector('.overlay');

menu.addEventListener("click", openMenu);
profil.addEventListener("click", openConnexion);
body.addEventListener('click', closeConnexion);

function openMenu() {
  const showMenu = document.querySelector(".menuDesk");
  showMenu.classList.toggle("displayFlex");
}

function openConnexion() {
  const showConnexion = document.querySelector(".formDesk");
  showConnexion.classList.toggle("activeProfil");
}
function closeConnexion() {
    const unshowConnexion = document.querySelector('.formDesk');
    unshowConnexion.classList.remove('activeProfil');
}

mobiscroll.datepicker("#demo-booking-multiple", {
  controls: ["calendar", "timegrid"],
  min: "2022-03-16T00:00",
  max: "2022-09-16T00:00",
  minTime: "08:00",
  maxTime: "19:59",
  stepMinute: 60,
  // example for today's labels and invalids
  labels: [
    {
      start: "2022-03-16",
      textColor: "#e1528f",
      title: "1 SPOTS",
    },
  ],
  invalid: [
    {
      start: "2022-03-16T08:00",
      end: "2022-03-16T13:00",
    },
    {
      start: "2022-03-16T15:00",
      end: "2022-03-16T17:00",
    },
    {
      start: "2022-03-16T19:00",
      end: "2022-03-16T20:00",
    },
  ],
});
