export default class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);
  }

  open() {}

  close() {}

  _handleEscClose() {}

  setEventListeners() {
    // TODO add close on close button
  }
}
