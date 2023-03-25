const avatars = document.querySelector(".reviews__swither");
const findReview = (reviewId) => {
  const activeReview = document.querySelector('.reviews__block--active');
  activeReview.classList.remove('reviews__block--active');
  const currentReview = document.querySelector(`.reviews__block[data-item="${reviewId}"]`);
  currentReview.classList.add('reviews__block--active');
}

avatars.addEventListener('click', (e) => {
  e.preventDefault();
  const target = e.target;
  if (target.classList.contains("avatar__img")) {
    const activeAvatar = document.querySelector(".avatar--active");
    const button = target.parentElement;
    const listElement = target.closest(".reviews__switcher-item");
    if (activeAvatar != listElement) {
      activeAvatar.classList.remove('avatar--active');
      listElement.classList.add('avatar--active');
    } 

    const id = button.getAttribute('data-open');
    findReview(id);

  }


});