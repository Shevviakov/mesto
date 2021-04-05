import '../pages/index.css';

import Card from './Card.js';
import Section from './Section.js';
import FormValidator from './FormValidator.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import {initialCards} from './initial-cards.js';

const validationConfig = {
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.popup-form__save-btn',
  inactiveButtonClass: 'popup-form__save-btn_inactive',
  inputErrorClass: 'popup-form__input_type_error',
  errorClass: 'popup-form__input-error_active'
};


const userInfo = new UserInfo({
  nameSelector: '.profile__fullname',
  bioSelector: '.profile__bio'
});
const profilePopup = new PopupWithForm(
  '.popup_type_edit-profile',
  ({fullname, bio}) => {
    userInfo.setUserInfo({name: fullname, bio: bio});
  }
);
profilePopup.setEventListeners();

const editProfileValidator = new FormValidator(profilePopup.formElement, validationConfig);
editProfileValidator.enableValidation();

const editProfileButton = document.querySelector('.profile__edit-btn');
editProfileButton.addEventListener('click', () => {
  const {name, bio} = userInfo.getUserInfo();
  profilePopup.setInputValues({fullname: name, bio: bio});
  editProfileValidator.resetFormValidity();
  profilePopup.open();
});


const createCardPopup = new PopupWithForm(
  '.popup_type_add-card',
  ({placename, link}) => {
    const cardObject = {name: placename, link: link};
    console.log(cardObject);
    const card = new Card(
      '.card-template',
      cardObject,
      () => imagePopup.open(cardObject)
    );
    cardsList.addItem(card.generateCard());
  }
);
createCardPopup.setEventListeners();

const addCardValidator = new FormValidator(createCardPopup.formElement, validationConfig);
addCardValidator.enableValidation();

const addCardButton = document.querySelector('.profile__add-card-btn');
addCardButton.addEventListener('click', () => {
  addCardValidator.resetFormValidity();
  createCardPopup.open()
});

const imagePopup = new PopupWithImage('.popup_type_image-popup');
imagePopup.setEventListeners();

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const card = new Card(
        '.card-template',
        cardItem,
        () => imagePopup.open(cardItem)
      );
      cardsList.addItem(card.generateCard());
    }
  },
  '.cards'
);

cardsList.renderItems();
