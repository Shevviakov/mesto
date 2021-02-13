
const formEditProfile = document.querySelector('#edit-profile-form');
const nameInput = document.querySelector('#fullname');
const profileName = document.querySelector('.profile__fullname');

const bioInput = document.querySelector('#bio');
const profileBio = document.querySelector('.profile__bio');

const editProfileButton = document.querySelector('.profile__edit-btn');

const placenameInput = document.querySelector('#placename');
const imgUrlInput = document.querySelector('#img-url');
const formAddCard = document.querySelector('#add-place-form');
const addCardPopup = document.querySelector('.add-card-popup');
const addCardButton = document.querySelector('.profile__add-card-btn');

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


function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

function closePopup (popupElement) {
  popupElement.classList.remove('popup_opened');
}

function openEditProfilePopup (evt) {
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;
  popupElem = document.querySelector('#edit-profile-form').closest('.popup');
  openPopup(popupElem);
}

function openAddCardPopup (evt) {
  placenameInput.value = '';
  imgUrlInput.value = '';
  popupElem = document.querySelector('#add-place-form').closest('.popup');
  openPopup(popupElem);
}

function formProfileSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value;
  closePopup(evt.target.closest('.popup'));
}

function formAddCardSubmitHandler (evt) {
  evt.preventDefault();
  addCard(placenameInput.value, imgUrlInput.value);
  closePopup(evt.target.closest('.popup'));
}

function showImagePopup (evt) {
  const imgPopupElement = document.querySelector('.image-popup').closest('.popup');
  const imgElem = imgPopupElement.querySelector('.image-popup__image');
  const imgUrl = evt.target.style.backgroundImage.slice(5, -2);
  const placeName = evt.target.parentElement.querySelector('.card__title').textContent;

  imgPopupElement.querySelector('.image-popup__image').src = imgUrl;
  imgPopupElement.querySelector('.image-popup__image').alt = placeName;
  imgPopupElement.querySelector('.image-popup__title').textContent = placeName;

  openPopup(imgPopupElement);
}

function addCard (title, img_src) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = title;
  cardElement.querySelector('.card__image').style.backgroundImage = `url('${img_src}')`;

  // Like handler
  cardElement.querySelector('.card__like-btn').addEventListener('click', evt => {
    evt.target.classList.toggle('card__like-btn_active')
  });

  // Delete card handler
  cardElement.querySelector('.card__delete-btn').addEventListener('click', evt => {
    evt.target.closest('.card').remove();
  });

  // Image popup handler
  cardElement.querySelector('.card__image').addEventListener('click', showImagePopup);

  const cardsElement = document.querySelector('.cards');
  cardsElement.prepend(cardElement);
}




formEditProfile.addEventListener('submit', formProfileSubmitHandler);
editProfileButton.addEventListener('click', openEditProfilePopup);

formAddCard.addEventListener('submit', formAddCardSubmitHandler);
addCardButton.addEventListener('click', openAddCardPopup);

document.querySelectorAll('.popup__close-btn').forEach(elem => elem.addEventListener('click', evt => closePopup(evt.target.closest('.popup'))));

initialCards.forEach(item => addCard(item.name, item.link));
document.querySelectorAll('.card__image').forEach(elem => elem.addEventListener('click', showImagePopup));


