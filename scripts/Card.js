export default class Card {
  constructor(selector, cardObject, handleCardClick) {
    this._selector = selector;
    this._name = cardObject.name;
    this._link = cardObject.link;
    this._handleCardClick = handleCardClick;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._name;

    const imgElement = this._element.querySelector('.card__image');
    imgElement.src = this._link;
    imgElement.alt = this._name;

    return this._element;
  }

  _getTemplate() {
    return document
      .querySelector(this._selector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  _setEventListeners() {
    this._element.querySelector('.card__like-btn')
      .addEventListener('click', () => this._handleLike());

    this._element.querySelector('.card__delete-btn')
      .addEventListener('click', () => this._handleDelete());

    this._element.querySelector('.card__image')
      .addEventListener('click', evt => {
        this._handleCardClick();
      });
  }

  _handleLike() {
    this._element.querySelector('.card__like-btn')
      .classList.toggle('card__like-btn_active');
  }

  _handleDelete() {
    this._element.closest('.card').remove();
  }
}
