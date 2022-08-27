const menu=document.querySelector('.menu-btn');
const navlinks=document.querySelector('.nav-links');
menu.addEventListener('click',function(){
    navlinks.classList.toggle('mobile-menu');
})