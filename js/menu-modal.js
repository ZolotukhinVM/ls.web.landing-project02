let burger  = document.querySelector('.hamburger');
let overlay = document.querySelector('.overlay-menu');
let links = document.querySelectorAll('.menu--vertical .menu__link');
let body = document.body;

function toggleMenu(burgerLink){
  burgerLink.preventDefault();
  burger.classList.toggle('hamburger--active');
  overlay.classList.toggle('overlay-menu--active');
  body.classList.toggle('body--active-menu');
}

links.forEach(function(menuLink){
  menuLink.addEventListener('click' , toggleMenu);
})

burger.addEventListener('click', toggleMenu);