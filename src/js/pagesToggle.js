let container = document.querySelector(".container");
let sections = document.querySelectorAll(".section");
let href = window.location.href;
let links = document.querySelectorAll("a");

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    togglePage(link.href.split("#")[1]);
  });
});

function togglePage(page) {
  sections.forEach((section) => {
    console.log(page);
    // if (page === "#" || page === "") {
    //   sections.forEach((sect) => (sect.style.display = "none"));
    //   sections[0].style.display = "block";
    // }

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

window.onload = () => checkAddress(window.location.href);
