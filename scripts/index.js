import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {openPopup, closePopup} from './utils.js';
import {initialCards} from './initial-cards.js';

const editProfileButton = document.querySelector('.profile__edit-btn');
const profileBioElem = document.querySelector('.profile__bio');
const profileNameElem = document.querySelector('.profile__fullname');

const popupEditProfileElem = document.querySelector('.popup_type_edit-profile')
const formEditProfile = popupEditProfileElem.querySelector('#edit-profile-form');
const nameInput = popupEditProfileElem.querySelector('#fullname');
const bioInput = popupEditProfileElem.querySelector('#bio');


const addCardButton = document.querySelector('.profile__add-card-btn');
const cardsElem = document.querySelector('.cards');

const popupAddCardElem = document.querySelector('.popup_type_add-card')
const placenameInput = popupAddCardElem.querySelector('#placename');
const imgUrlInput = popupAddCardElem.querySelector('#img-url');
const formAddCard = popupAddCardElem.querySelector('#add-place-form');

const validationConfig = {
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.popup-form__save-btn',
  inactiveButtonClass: 'popup-form__save-btn_inactive',
  inputErrorClass: 'popup-form__input_type_error',
  errorClass: 'popup-form__input-error_active'
};


function openEditProfilePopup (validator) {
  validator.resetFormValidity();

  nameInput.value = profileNameElem.textContent;
  bioInput.value = profileBioElem.textContent;

  const inputList = Array.from(formEditProfile.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formEditProfile.querySelector(validationConfig.submitButtonSelector);
  validator.toggleButtonState(inputList, buttonElement);

  openPopup(popupEditProfileElem);
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileNameElem.textContent = nameInput.value;
  profileBioElem.textContent = bioInput.value;
  closePopup(popupEditProfileElem);
}

function openAddCardPopup (validator) {
  validator.resetFormValidity();
  openPopup(popupAddCardElem);
}

function handleAddCardFormSubmit (evt) {
  evt.preventDefault();
  const cardObject = {
    link: imgUrlInput.value,
    name: placenameInput.value
  };
  const card = new Card('.card-template', cardObject);
  cardsElem.prepend(card.generateCard());
  closePopup(popupAddCardElem);
}


formEditProfile.addEventListener('submit', handleProfileFormSubmit);
const editProfileValidator = new FormValidator(formEditProfile, validationConfig);
editProfileValidator.enableValidation();
editProfileButton.addEventListener('click', () => openEditProfilePopup(editProfileValidator));

formAddCard.addEventListener('submit', handleAddCardFormSubmit);
const addCardValidator = new FormValidator(formAddCard, validationConfig);
addCardValidator.enableValidation();
addCardButton.addEventListener('click', () => openAddCardPopup(addCardValidator));

document.querySelectorAll('.popup').forEach(popupElement => {
  popupElement.addEventListener('click', evt => {
    const targetClassList = evt.target.classList;
    if (targetClassList.contains('popup') || targetClassList.contains('popup__close-btn')) {
      closePopup(popupElement);
    }
  });
});

initialCards.forEach(cardObject => {
  const cardElement = new Card('.card-template', cardObject);
  cardsElem.append(cardElement.generateCard());
});


