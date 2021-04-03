import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
  }

  _getInputValues() {

  }

  close() {}

  setEventListeners() {
    super.setEventListeners();
  }
}
