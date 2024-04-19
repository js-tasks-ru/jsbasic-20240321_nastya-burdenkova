function initCarousel() {
  const inner = document.querySelector('.carousel__inner');
  const slides = document.querySelectorAll('.carousel__slide');
  const slideWidth = slides[0].offsetWidth;
  const totalSlides = slides.length;
  let currentSlide = 0;

  document.querySelector('.carousel__arrow_left').addEventListener('click', function() {
    if (currentSlide > 0) {
      currentSlide--;
      inner.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }
    toggleArrowsVisibility();
  });

  document.querySelector('.carousel__arrow_right').addEventListener('click', function() {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      inner.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }
    toggleArrowsVisibility();
  });

  function toggleArrowsVisibility() {
    const leftArrow = document.querySelector('.carousel__arrow_left');
    const rightArrow = document.querySelector('.carousel__arrow_right');

    if (currentSlide === 0) {
      leftArrow.style.display = 'none';
      rightArrow.style.display = '';
    } else if (currentSlide === totalSlides - 1) {
      leftArrow.style.display = '';
      rightArrow.style.display = 'none';
    } else {
      leftArrow.style.display = '';
      rightArrow.style.display = '';
    }
  }

  toggleArrowsVisibility();
}

