export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.renderSlider();
    this.thumb = this.elem.querySelector(".slider__thumb");
    this.progress = this.elem.querySelector(".slider__progress");
    this.stepsElements = this.elem.querySelectorAll(".slider__steps span");

    this.#setInitialValue();
    this.elem.addEventListener("click", (event) => this.#onSliderClick(event));
  }

  renderSlider() {
    const slider = document.createElement("div");
    slider.classList.add("slider");

    const thumb = document.createElement("div");
    thumb.classList.add("slider__thumb");
    const thumbValue = document.createElement("span");
    thumbValue.classList.add("slider__value");
    thumbValue.textContent = this.value;
    thumb.append(thumbValue);

    const progress = document.createElement("div");
    progress.classList.add("slider__progress");

    const stepsContainer = document.createElement("div");
    stepsContainer.classList.add("slider__steps");
    for (let i = 0; i < this.steps; i++) {
      const step = document.createElement("span");
      stepsContainer.append(step);
    }

    slider.append(thumb, progress, stepsContainer);

    return slider;
  }

  #setInitialValue() {
    for (let i = 0; i < this.stepsElements.length; i++) {
      this.stepsElements[i].classList.remove("slider__step-active");
    }
    this.stepsElements[this.value].classList.add("slider__step-active");

    const segments = this.steps - 1;
    const valuePercents = (this.value / segments) * 100;
    this.thumb.style.left = `${valuePercents}%`;
    this.progress.style.width = `${valuePercents}%`;
  }

  #onSliderClick(event) {
    const sliderWidth = this.elem.offsetWidth;
    const clickX = event.clientX - this.elem.getBoundingClientRect().left;
    const segmentWidth = sliderWidth / (this.steps - 1);
    const leftRelative = clickX / sliderWidth;
    const approximateValue = leftRelative * (this.steps - 1);
    const value = Math.round(approximateValue);

    this.setValue(value);

    this.elem.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: value,
        bubbles: true,
      })
    );
  }

  setValue(newValue) {
    this.value = newValue;
    this.elem.querySelector(".slider__value").textContent = newValue;

    for (let i = 0; i < this.stepsElements.length; i++) {
      this.stepsElements[i].classList.remove("slider__step-active");
    }
    this.stepsElements[newValue].classList.add("slider__step-active");

    const segments = this.steps - 1;
    const valuePercents = (newValue / segments) * 100;
    this.thumb.style.left = `${valuePercents}%`;
    this.progress.style.width = `${valuePercents}%`;
  }
}
