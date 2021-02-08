
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
    closePopup();
}

function closePopup () {
  popup.classList.remove("popup_opened");
}

function openPopup () {
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;
  popup.classList.add("popup_opened");
}


formElement.addEventListener('submit', formSubmitHandler);
closePopupButton.addEventListener("click", closePopup);
editProfileButton.addEventListener("click", openPopup);
