document.getElementById(
  "currentYear"
).innerText = ` - ${new Date().getFullYear()}`;

document.addEventListener("DOMContentLoaded", function () {
  var navbarToggle = document.querySelector(
    '[data-collapse-toggle="navbar-sticky"]'
  );
  var navbarMenu = document.getElementById("navbar-sticky");

  navbarToggle.addEventListener("click", function () {
    navbarMenu.classList.toggle("hidden");
  });
});
