import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this.submitHandler = submitHandler;

    this._submitButtonElement = this._element.querySelector('.popup-form__save-btn');
    this._submitText = this._submitButtonElement.textContent;

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
    this.setPending(false);
  }

  setEventListeners() {
    super.setEventListeners();
    this.formElement.addEventListener('submit', evt => {
      evt.preventDefault();
      const inputData = this._getInputValues();
      this.submitHandler(inputData);
    })
  }

  setInputValues(data) {
    this._inputElements.forEach(input => {
      if (input.name in data) {
        input.value = data[input.name];
      }
    });
  }

  setPending(isPending) {
    this._submitButtonElement.textContent = isPending ? 'Сохранение...' : this._submitText;
  }
}
