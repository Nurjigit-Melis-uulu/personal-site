let burgerMenu = document.querySelectorAll(".burger_menu");
let navScreen = document.querySelector(".navScreen");
let navScreenLinks = document.querySelectorAll(".navScreen a");
let backdrop = document.querySelector(".backdrop");
let menuStatus = false;

burgerMenu.forEach((el) => {
  el.addEventListener("click", () => {
    menuStatus = !menuStatus;
    toggleMenu();
  });
});

navScreenLinks.forEach((el) => {
  el.addEventListener("click", () => {
    menuStatus = false;
    toggleMenu();
  });
});

backdrop.addEventListener("click", () => {
  menuStatus = false;
  toggleMenu();
});

function toggleMenu() {
  if (menuStatus) {
    navScreen.style.display = "block";
  } else {
    navScreen.style.display = "none";
  }
}
