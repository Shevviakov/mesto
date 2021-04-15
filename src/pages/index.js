import './index.css';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

function checkIsLiked(cardObject, userData) {
  return cardObject.likes.some(like => like._id === userData._id);
}

function checkIsDeletable(cardObject, userData) {
  return cardObject.owner._id === userData._id;
}

const validationConfig = {
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.popup-form__save-btn',
  inactiveButtonClass: 'popup-form__save-btn_inactive',
  inputErrorClass: 'popup-form__input_type_error',
  errorClass: 'popup-form__input-error_active'
};

const userInfo = new UserInfo({
  nameSelector: '.profile__fullname',
  bioSelector: '.profile__bio',
  avatarSelector: '.profile__avatar-btn',
});

const cardsList = new Section('.cards', (cardItem) => cardsList.appendItem(createCard(cardItem)));

const api = new Api({
  cohortId: 'cohort-22',
  token: '946aaeba-7448-46be-96a2-9a2018d54afe'
})

let userData; // global oobject for current user data

api.getUserInfo()
  .then(user => {
    userData = user;
    userInfo.setAvatar(userData);
    userInfo.setUserInfo(userData);
    return api.getInitialCards();
  })
  .then(cards => {
    cards = cards.map(card => ({
      isDeletable: checkIsDeletable(card, userData),
      isLiked: checkIsLiked(card, userData),
      cardObject: card,
    }));
    cardsList.renderItems(cards);
  })
  .catch(res => {
    console.log(`Error '${res.status} ${res.statusText}' ${res.url}`);
  });


const profilePopup = new PopupWithForm(
  '.popup_type_edit-profile',
  ({fullname: name, bio: about}) => {
    const newInfo = {name: name, about: about}
    profilePopup.setPending(true);
    api.setUserInfo(newInfo)
      .then(newInfo => {
        userInfo.setUserInfo(newInfo)
        profilePopup.close();
      })
      .catch(res => {
        console.log(`Error '${res.status} ${res.statusText}' ${res.url}`);
      })
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


const deleteCardPopup = new PopupWithForm (
  '.popup_type_card-delete-confirmation',
  () => {}
);
deleteCardPopup.setEventListeners();

const imagePopup = new PopupWithImage('.popup_type_image-popup');
imagePopup.setEventListeners();


function createCard({cardObject, isDeletable, isLiked}) {
  const card = new Card({
    selector: '.card-template',
    cardObject: cardObject,
    isDeletable: isDeletable,
    isLiked: isLiked,
    handleCardClick: () => imagePopup.open(cardObject),
    handleDeleteCard: () => {
      deleteCardPopup.submitHandler = () => {
        api.deleteCard(cardObject._id)
          .then(() => {
            card.delete();
            deleteCardPopup.close();
          })
          .catch(res => {
            console.log(`Error '${res.status} ${res.statusText}' ${res.url}`);
          });
      }
      deleteCardPopup.open();
    },
    handleLike: () => {
      const method = (card.isLiked ? api.removeLike(cardObject._id) : api.addLike(cardObject._id));
      method.then(cardObject => {
        card.cardObject = cardObject;
        card.isLiked = checkIsLiked(cardObject, userData);
        card.renderLikes();
      })
      .catch(res => {
        console.log(`Error '${res.status} ${res.statusText}' ${res.url}`);
      });
    }
  });
  return card.generateCard();
}


const createCardPopup = new PopupWithForm(
  '.popup_type_add-card',
  ({placename, link}) => {
    const cardObject = {name: placename, link: link}
    createCardPopup.setPending(true);
    api.addNewCard(cardObject)
      .then(cardObject => {
        cardsList.addItem(createCard({
          cardObject: cardObject,
          isDeletable: true,
          isLiked: false,
        }))
        createCardPopup.close();
      })
      .catch(res => {
        console.log(`Error '${res.status} ${res.statusText}' ${res.url}`);
      })
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


const editAvatarPopup = new PopupWithForm(
  '.popup_type_edit-avatar',
  ({avatar_url}) => {
    editAvatarPopup.setPending(true);
    api.setAvatar(avatar_url)
      .then(userData => {
        userInfo.setAvatar(userData);
        editAvatarPopup.close();
      })
      .catch(res => {
        console.log(`Error '${res.status} ${res.statusText}' ${res.url}`);
      })
  }
);
editAvatarPopup.setEventListeners();

const editAvatarValidator = new FormValidator(editAvatarPopup.formElement, validationConfig);
editAvatarValidator.enableValidation();

const editAvatarButton = document.querySelector('.profile__avatar-btn');
editAvatarButton.addEventListener('click', () => {
  editAvatarValidator.resetFormValidity();
  editAvatarPopup.open();
});
