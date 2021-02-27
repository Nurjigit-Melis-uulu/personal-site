let container = document.querySelector(".container");
let sections = document.querySelectorAll(".section");
let href = window.location.href;
let links = document.querySelectorAll(".link");

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    links.forEach((link2) => link2.classList.remove("active"));

    document
      .querySelectorAll('a[href$="#' + link.href.split("#")[1] + '"]')
      .forEach((link3) => {
        link3.classList.add("active");
      });
    togglePage(link.href.split("#")[1]);
  });
});

function togglePage(page) {
  sections.forEach((section) => {
    console.log(page);
    if (section.id === page) {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  });
}

function checkAddress(address) {
  let addressHref = address.split("#")[1];

  console.log(addressHref);

  if (addressHref) {
    togglePage(addressHref);
  } else {
    togglePage("home");
  }
}

window.onload = () => {
  checkAddress(window.location.href);
};
