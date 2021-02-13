
const formEditProfile = document.querySelector(".edit-profile-popup").querySelector(".popup__container");
const nameInput = document.querySelector("#fullname");
const profileName = document.querySelector(".profile__fullname");

const bioInput = document.querySelector("#bio");
const profileBio = document.querySelector(".profile__bio");

const editProfilePopup = document.querySelector(".edit-profile-popup");
const editProfileButton = document.querySelector(".profile__edit-btn");

const placenameInput = document.querySelector('#placename');
const imgUrlInput = document.querySelector('#img-url');
const formAddCard = document.querySelector(".add-card-popup").querySelector(".popup__container");
const addCardPopup = document.querySelector(".add-card-popup");
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

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileBio.textContent = bioInput.value;
    closePopup();
}

function closePopup (event) {
  event.target.closest('.popup').classList.remove("popup_opened");
}

function openEditProfilePopup () {
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;
  editProfilePopup.classList.add("popup_opened");
}

function openAddCardPopup () {
  addCardPopup.classList.add("popup_opened");
}

function formProfileSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value;
  closePopup(evt);
}

function formAddCardSubmitHandler (evt) {
  evt.preventDefault();
  addCard(placenameInput.value, imgUrlInput.value);
  closePopup(evt);
  placenameInput.value = '';
  imgUrlInput.value = '';
}

function showImagePopup (evt) {
  const imgPopupElement = document.querySelector('.image-popup');
  const imgElem = imgPopupElement.querySelector('.image-popup__image');
  const imgUrl = evt.target.style.backgroundImage.slice(5, -2);
  const placeName = evt.target.parentElement.querySelector('.card__title').textContent;

  imgPopupElement.querySelector('.image-popup__image').src = imgUrl;
  imgPopupElement.querySelector('.image-popup__image').alt = placeName;
  imgPopupElement.querySelector('.image-popup__title').textContent = placeName;

  imgPopupElement.classList.add("popup_opened");
}

function addCard (title, img_src) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = title;
  cardElement.querySelector('.card__image').style.backgroundImage = `url("${img_src}")`;

  // Like handler
  cardElement.querySelector('.card__like-btn').addEventListener('click', evt => {
    evt.target.classList.toggle('card__like-btn_active')
  });

  // Delete card handler
  cardElement.querySelector('.card__delete-btn').addEventListener('click', evt => {
    evt.target.closest('.card').remove();
  });

  //
  cardElement.querySelector('.card__image').addEventListener('click', showImagePopup);

  const cardsElement = document.querySelector('.cards');
  cardsElement.prepend(cardElement);
}




formEditProfile.addEventListener('submit', formProfileSubmitHandler);
editProfileButton.addEventListener("click", openEditProfilePopup);

formAddCard.addEventListener('submit', formAddCardSubmitHandler);
addCardButton.addEventListener('click', openAddCardPopup);

document.querySelectorAll('.popup__close-btn').forEach(elem => elem.addEventListener("click", closePopup));

initialCards.forEach(item => addCard(item.name, item.link));
document.querySelectorAll('.card__image').forEach(elem => elem.addEventListener('click', showImagePopup));


