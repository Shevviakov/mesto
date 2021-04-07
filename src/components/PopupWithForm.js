import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this.formElement = this._element.querySelector('.popup-form');

    this._inputElements = Array.from(this.formElement.querySelectorAll('.popup-form__input'));
  }

  _getInputValues() {
    const response = {}
    this._inputElements.forEach(elem => {
      response[elem.name] = elem.value;
    });
    return response;
  }

  close() {
    super.close();
    this.formElement.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this.formElement.addEventListener('submit', evt => {
      evt.preventDefault();
      const inputData = this._getInputValues();
      this._submitHandler(inputData);
      this.close();
    })
  }

  setInputValues(data) {
    this._inputElements.forEach(input => {
      if (input.name in data) {
        input.value = data[input.name];
      }
    });
  }
}
