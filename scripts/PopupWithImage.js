import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imgElement = this._element.querySelector('.image-popup__image');
    this._titleElement = this._element.querySelector('.image-popup__title');
  }

  open({name, link}) {
    this._imgElement.src = link;
    this._imgElement.alt = name;
    this._titleElement.textContent = name;
    super.open();
  }
}
