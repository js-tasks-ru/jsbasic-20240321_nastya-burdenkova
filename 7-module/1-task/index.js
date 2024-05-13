import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.render();

    this.ribbonInner = this.elem.querySelector(".ribbon__inner");
    this.arrowLeft = this.elem.querySelector(".ribbon__arrow_left");
    this.arrowRight = this.elem.querySelector(".ribbon__arrow_right");

    this.activeCategory = null;

    this.arrowLeft.addEventListener("click", this.#scrollLeft.bind(this));
    this.arrowRight.addEventListener("click", this.#scrollRight.bind(this));

    this.ribbonInner.addEventListener("click", this.#onCategoryClick.bind(this));
    this.ribbonInner.addEventListener("scroll", this.#toggleArrows.bind(this));
  }

  render() {
    const ribbonElem = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner">
          ${this.categories
            .map(
              (category) => `
            <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>
          `
            )
            .join("")}
        </nav>
        <button class="ribbon__arrow ribbon__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);

    return ribbonElem;
  }

  #scrollLeft() {
    this.ribbonInner.scrollBy(-350, 0);
  }

  #scrollRight() {
    this.ribbonInner.scrollBy(350, 0);
  }

  #onCategoryClick(event) {
    event.preventDefault();

    if (event.target.classList.contains("ribbon__item")) {
      const clickedCategoryID = event.target.dataset.id;

      if (this.activeCategory === clickedCategoryID) {
        return; // Если кликнули на уже активную категорию, ничего не делаем
      }

      const activeItem = this.elem.querySelector(".ribbon__item_active");

      if (activeItem) {
        activeItem.classList.remove("ribbon__item_active");
      }

      event.target.classList.add("ribbon__item_active");
      this.activeCategory = clickedCategoryID;

      const ribbonSelectEvent = new CustomEvent("ribbon-select", {
        detail: clickedCategoryID,
        bubbles: true,
      });

      this.elem.dispatchEvent(ribbonSelectEvent);
    }
  }

  #toggleArrows() {
    const scrollRight =
      this.ribbonInner.scrollWidth -
      this.ribbonInner.scrollLeft -
      this.ribbonInner.clientWidth;

    if (this.ribbonInner.scrollLeft === 0) {
      this.arrowLeft.classList.remove("ribbon__arrow_visible");
    } else {
      this.arrowLeft.classList.add("ribbon__arrow_visible");
    }

    if (scrollRight <= 1) {
      this.arrowRight.classList.remove("ribbon__arrow_visible");
    } else {
      this.arrowRight.classList.add("ribbon__arrow_visible");
    }
  }
}
