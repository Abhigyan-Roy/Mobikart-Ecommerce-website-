console.log("i am loading");
const stars = document.querySelectorAll('.star-icon-inp');
const ratingInput = document.querySelector('#rating-give');

stars.forEach((star) => {
  star.addEventListener('click', () => {
    const selectedValue = parseInt(star.getAttribute('data-value'));
    ratingInput.value = selectedValue;
    stars.forEach((star, index) => {
      if (index < selectedValue) {
        star.classList.add('filled');
      } else {
        star.classList.remove('filled');
      }
    });
  });
});