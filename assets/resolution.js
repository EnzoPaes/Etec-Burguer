let currentIndex = 0;
const totalSlides = document.querySelectorAll('.carousel img').length;

function prevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
}

function updateCarousel() {
  const carousel = document.querySelector('.carousel');
  const newTransformValue = -currentIndex * 100 + '%';
  carousel.style.transform = 'translateX(' + newTransformValue + ')';
}