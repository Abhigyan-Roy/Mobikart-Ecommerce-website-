const menu = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.mc-nav__links');

if (menu && navLinks) {
    menu.addEventListener('click', function () {
        navLinks.classList.toggle('mobile-menu');
    });
}
