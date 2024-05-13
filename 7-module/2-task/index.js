import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modal = this.createModalElement();
    this.titleElement = this.modal.querySelector('.modal__title');
    this.bodyElement = this.modal.querySelector('.modal__body');
    this.closeButton = this.modal.querySelector('.modal__close');

    this.closeButton.addEventListener('click', () => this.close());
    document.addEventListener('keydown', (event) => this.handleKeyDown(event));
  }

  createModalElement() {
    const modalElement = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `);

    document.body.append(modalElement);
    return modalElement;
  }

  open() {
    document.body.classList.add('is-modal-open');
  }

  setTitle(title) {
    this.titleElement.textContent = title;
  }

  setBody(node) {
    this.bodyElement.innerHTML = '';
    this.bodyElement.append(node);
  }

  close() {
    this.modal.remove();
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', (event) => this.handleKeyDown(event));
  }

  handleKeyDown(event) {
    if (event.code === 'Escape') {
      this.close();
    }
  }
}
