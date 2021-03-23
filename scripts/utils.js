export function openPopup(popupElem) {
  popupElem.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

export function closePopup (popupElem) {
  popupElem.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

function closePopupByEsc (evt) {
  const openedPopupElement = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(openedPopupElement);
  }
}
