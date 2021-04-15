import './index.css';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {initialCards} from '../utils/initial-cards.js';

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

function createCard(cardObject) {
  const card = new Card(
    '.card-template',
    cardObject,
    () => imagePopup.open(cardObject)
  );
  return card.generateCard();
}

const createCardPopup = new PopupWithForm(
  '.popup_type_add-card',
  ({placename, link}) => cardsList.addItem(createCard({name: placename, link: link}))
);
createCardPopup.setEventListeners();

const addCardValidator = new FormValidator(createCardPopup.formElement, validationConfig);
addCardValidator.enableValidation();

const addCardButton = document.querySelector('.profile__add-card-btn');
addCardButton.addEventListener('click', () => {
  addCardValidator.resetFormValidity();
  createCardPopup.open()
});

const editAvatarPopup = new PopupWithForm(
  '.popup_type_edit-avatar',
  ({avatar_url}) => {console.log(avatar_url)}
);
editAvatarPopup.setEventListeners();

const editAvatarValidator = new FormValidator(editAvatarPopup.formElement, validationConfig);
editAvatarValidator.enableValidation();

const editAvatarButton = document.querySelector('.profile__avatar-btn');
editAvatarButton.addEventListener('click', () => {
  editAvatarValidator.resetFormValidity();
  editAvatarPopup.open();
});

const imagePopup = new PopupWithImage('.popup_type_image-popup');
imagePopup.setEventListeners();

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => cardsList.addItem(createCard(cardItem))
  },
  '.cards'
);

cardsList.renderItems();
