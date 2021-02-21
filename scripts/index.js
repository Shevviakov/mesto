
const editProfileButton = document.querySelector('.profile__edit-btn');
const profileBioElem = document.querySelector('.profile__bio');
const profileNameElem = document.querySelector('.profile__fullname');

const popupEditProfileElem = document.querySelector('.popup_type_edit-profile')
const formEditProfile = popupEditProfileElem.querySelector('#edit-profile-form');
const nameInput = popupEditProfileElem.querySelector('#fullname');
const bioInput = popupEditProfileElem.querySelector('#bio');


const addCardButton = document.querySelector('.profile__add-card-btn');
const cardsElem = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

const popupAddCardElem = document.querySelector('.popup_type_add-card')
const placenameInput = popupAddCardElem.querySelector('#placename');
const imgUrlInput = popupAddCardElem.querySelector('#img-url');
const formAddCard = popupAddCardElem.querySelector('#add-place-form');

const popupImgElem = document.querySelector('.popup_type_image-popup');
const imgElem = popupImgElem.querySelector('.image-popup__image');
const imgTitleElem = popupImgElem.querySelector('.image-popup__title');

const validationConfig = {
  formSelector: '.popup-form',
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.popup-form__save-btn',
  inactiveButtonClass: 'popup-form__save-btn_inactive',
  inputErrorClass: 'popup-form__input_type_error',
  errorClass: 'popup-form__input-error_active'
};

function closePopupByEsc (evt) {
  const openedPopupElement = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(openedPopupElement);
  }
}

function openPopup(popupElem) {
  popupElem.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

function closePopup (popupElem) {
  popupElem.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

function openEditProfilePopup (evt) {
  resetFormValidity(validationConfig, formEditProfile);

  nameInput.value = profileNameElem.textContent;
  bioInput.value = profileBioElem.textContent;

  const inputList = Array.from(formEditProfile.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formEditProfile.querySelector('.popup-form__save-btn');
  toggleButtonState(validationConfig, inputList, buttonElement);

  openPopup(popupEditProfileElem);
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileNameElem.textContent = nameInput.value;
  profileBioElem.textContent = bioInput.value;
  closePopup(popupEditProfileElem);
}

function openAddCardPopup (evt) {
  resetFormValidity(validationConfig, formAddCard);
  openPopup(popupAddCardElem);
}

function handleAddCardFormSubmit (evt) {
  evt.preventDefault();
  addCard({
    link: imgUrlInput.value,
    name: placenameInput.value
  });
  closePopup(popupAddCardElem);
}

function showImagePopup (cardObject) {
  imgElem.src = cardObject.link;
  imgElem.alt = cardObject.name;
  imgTitleElem.textContent = cardObject.name;
  openPopup(popupImgElem);
}

function createCard (cardObject) {
  const newCardElem = cardTemplate.cloneNode(true);

  const newCardTitleElem = newCardElem.querySelector('.card__title');
  newCardTitleElem.textContent = cardObject.name;

  const newCardImgElem = newCardElem.querySelector('.card__image');
  newCardImgElem.src = cardObject.link;
  newCardImgElem.alt = cardObject.name;

  // Like handler
  newCardElem.querySelector('.card__like-btn').addEventListener('click', evt => {
    evt.target.classList.toggle('card__like-btn_active');
  });

  // Delete card handler
  newCardElem.querySelector('.card__delete-btn').addEventListener('click', evt => {
    evt.target.closest('.card').remove();
  });

  // Image popup handler
  newCardElem.querySelector('.card__image').addEventListener('click', evt => {
    showImagePopup(cardObject)
  });
  return newCardElem;
}

function addCard (cardObject) {
  const cardElem = createCard(cardObject);
  cardsElem.prepend(cardElem);
}



enableValidation(validationConfig);


formEditProfile.addEventListener('submit', handleProfileFormSubmit);
editProfileButton.addEventListener('click', openEditProfilePopup);

formAddCard.addEventListener('submit', handleAddCardFormSubmit);
addCardButton.addEventListener('click', openAddCardPopup);

document.querySelectorAll('.popup').forEach(popupElement => {
  popupElement.addEventListener('click', evt => {
    const targetClassList = evt.target.classList;
    if (targetClassList.contains('popup') || targetClassList.contains('popup__close-btn')) {
      closePopup(popupElement);
    }
  });
});

initialCards.forEach(cardObject => {
  cardsElem.append(createCard(cardObject));
});


