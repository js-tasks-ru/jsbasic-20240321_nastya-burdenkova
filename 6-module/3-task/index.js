import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.currentSlide = 0;
    this.elem = this.createCarousel();
    this.initCarousel();
  }

  // Приватный метод для создания отдельного слайда
  #createSlide(slide) {
    return `
      <div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `;
  }

  createCarousel() {
    const carousel = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left" style="display: none;">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${this.slides.map((slide) => this.#createSlide(slide)).join("")}
        </div>
      </div>
    `);

    carousel.addEventListener("click", (event) => {
      if (event.target.closest(".carousel__button")) {
        const slideId = event.target.closest(".carousel__slide").dataset.id;
        carousel.dispatchEvent(
          new CustomEvent("product-add", {
            detail: slideId,
            bubbles: true,
          })
        );
      }
    });

    return carousel;
  }

  initCarousel() {
    const inner = this.elem.querySelector(".carousel__inner");

    this.elem.querySelector(".carousel__arrow_right").addEventListener("click", () => {
      this.currentSlide++;
      this.#moveSlide(inner);
    });

    this.elem.querySelector(".carousel__arrow_left").addEventListener("click", () => {
      this.currentSlide--;
      this.#moveSlide(inner);
    });
  }

  // Приватный метод для перемещения слайдов
  #moveSlide(inner) {
    const slideWidth = inner.offsetWidth;
    inner.style.transform = `translateX(-${this.currentSlide * slideWidth}px)`;
    this.#toggleArrows();
  }

  // Приватный метод для отображения/скрытия стрелок навигации
  #toggleArrows() {
    const arrows = this.elem.querySelectorAll(".carousel__arrow");
    arrows[0].style.display = this.currentSlide === this.slides.length - 1 ? "none" : "";
    arrows[1].style.display = this.currentSlide === 0 ? "none" : "";
  }
}
