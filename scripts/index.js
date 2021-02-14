
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


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


function openPopup(popupElem) {
  popupElem.classList.add('popup_opened');
}

function closePopup (popupElem) {
  popupElem.classList.remove('popup_opened');
}

function openEditProfilePopup (evt) {
  nameInput.value = profileNameElem.textContent;
  bioInput.value = profileBioElem.textContent;
  openPopup(popupEditProfileElem);
}

function formProfileSubmitHandler (evt) {
  evt.preventDefault();
  profileNameElem.textContent = nameInput.value;
  profileBioElem.textContent = bioInput.value;
  closePopup(popupEditProfileElem);
}

function openAddCardPopup (evt) {
  placenameInput.value = '';
  imgUrlInput.value = '';
  openPopup(popupAddCardElem);
}

function formAddCardSubmitHandler (evt) {
  evt.preventDefault();
  addCard(imgUrlInput.value, placenameInput.value);
  closePopup(popupAddCardElem);
}

function showImagePopup (imgSrc, imgTitle) {
  imgElem.src = imgSrc;
  imgElem.alt = imgTitle;
  imgTitleElem.textContent = imgTitle;
  openPopup(popupImgElem);
}

function createCard (imgSrc, imgTitle) {
  const newCardElem = cardTemplate.cloneNode(true);

  const newCardTitleElem = newCardElem.querySelector('.card__title');
  newCardTitleElem.textContent = imgTitle;

  const newCardImgElem = newCardElem.querySelector('.card__image');
  newCardImgElem.src = imgSrc;
  newCardImgElem.alt = imgTitle;

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
    showImagePopup(imgSrc, imgTitle)
  });
  return newCardElem;
}

function addCard (imgSrc, imgTitle) {
  cardElem = createCard(imgSrc, imgTitle);
  cardsElem.prepend(cardElem);
}


formEditProfile.addEventListener('submit', formProfileSubmitHandler);
editProfileButton.addEventListener('click', openEditProfilePopup);

formAddCard.addEventListener('submit', formAddCardSubmitHandler);
addCardButton.addEventListener('click', openAddCardPopup);

document.querySelectorAll('.popup__close-btn').forEach(elem => {
  elem.addEventListener('click', evt => {
    closePopup(evt.target.closest('.popup'))
  });
});

initialCards.forEach(item => {
  cardsElem.append(createCard(item.link, item.name))
});


