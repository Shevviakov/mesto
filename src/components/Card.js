export default class Card {
  constructor({selector, cardObject, isDeletable, isLiked, handleCardClick, handleDeleteCard, handleLike}) {
    this._selector = selector;
    this.cardObject = cardObject

    this._isDeletable = isDeletable;
    this.isLiked = isLiked;

    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLike = handleLike;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeElement = this._element.querySelector('.card__like-btn');
    this._likeCounterElement = this._element.querySelector('.card__like-counter');
    this._deleteButtonElement = this._element.querySelector('.card__delete-btn');
    this._imgElement = this._element.querySelector('.card__image');

    this._setEventListeners();
    this._element.querySelector('.card__title').textContent = this.cardObject.name;

    if (this._isDeletable) {
      this._deleteButtonElement.classList.add('card__delete-btn_enabled');
    }
    this.renderLikes();

    this._imgElement.src = this.cardObject.link;
    this._imgElement.alt = this.cardObject.name;


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
    this._likeElement.addEventListener('click', this._handleLike);

    this._deleteButtonElement.addEventListener('click', this._handleDeleteCard);

    this._imgElement.addEventListener('click', this._handleCardClick);
  }

  renderLikes() {
    if (this.isLiked) {
      this._likeElement.classList.add('card__like-btn_active');
    } else {
      this._likeElement.classList.remove('card__like-btn_active');
    }
    this._likeCounterElement.textContent = this.cardObject.likes.length;
  }

  delete() {
    this._element.closest('.card').remove();
  }
}
