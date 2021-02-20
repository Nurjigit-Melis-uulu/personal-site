let navScreenParallax = document.querySelector(".navScreen .parallax");
let imgSpeed = 10;

document.querySelector(".navScreen").addEventListener("mousemove", (e) => {
  navScreenParallax.style.left = e.clientX / imgSpeed + "px";
  navScreenParallax.style.top = e.clientY / imgSpeed + "px";
});
