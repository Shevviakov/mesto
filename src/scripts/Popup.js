export default class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);
    this._bindedHandleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._element.classList.add('popup_opened');
    document.addEventListener('keydown', this._bindedHandleEscClose);
  }

  close() {
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._bindedHandleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._element.addEventListener('click', evt => {
      const targetClassList = evt.target.classList;
      if (targetClassList.contains('popup') || targetClassList.contains('popup__close-btn')) {
        this.close();
      }
    });
  }
}
