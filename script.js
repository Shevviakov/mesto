
let formElement = document.querySelector(".popup__container");
let nameInput = document.querySelector("#fullname");
let profileName = document.querySelector(".profile__fullname");

let bioInput = document.querySelector("#bio");
let profileBio = document.querySelector(".profile__bio");

let popup = document.querySelector(".popup");
let editProfileButton = document.querySelector(".profile__edit-btn");
let closePopupButton = document.querySelector(".popup__close-btn");


function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileBio.textContent = bioInput.value;
}
formElement.addEventListener('submit', formSubmitHandler);

function closePopup () {
  popup.classList.remove("popup_opened");
}
closePopupButton.addEventListener("click", closePopup);

function openPopup () {
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;
  popup.classList.add("popup_opened");
}
editProfileButton.addEventListener("click", openPopup);
