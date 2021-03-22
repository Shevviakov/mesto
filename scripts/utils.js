const popupElement = document.querySelector('.popup_type_image-popup');
const popupImgElement = popupElement.querySelector('.image-popup__image');
const popupTitleElement = popupElement.querySelector('.image-popup__title');

export function showImagePopup (cardObject) {
  popupImgElement.src = cardObject.link;
  popupImgElement.alt = cardObject.name;
  popupTitleElement.textContent = cardObject.name;
  openPopup(popupElement);
}

export function openPopup(popupElem) {
  popupElem.classList.add('popup_opened');
  document.addEventListener('keydown', _closePopupByEsc);
}

export function closePopup (popupElem) {
  popupElem.classList.remove('popup_opened');
  document.removeEventListener('keydown', _closePopupByEsc);
}

function _closePopupByEsc (evt) {
  const openedPopupElement = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(openedPopupElement);
  }
}
