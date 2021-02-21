
const checkValidityInput = (params, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  if (inputElement.validity.valid) {
    inputElement.classList.remove(params.inputErrorClass);
    errorElement.classList.remove(params.errorClass);
    errorElement.textContent = '';
  } else {
    inputElement.classList.add(params.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(params.errorClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid);
};

const toggleButtonState = (params, inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(params.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(params.inactiveButtonClass);
    }
};

const setInputEventListeners = (params, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
  const buttonElement = formElement.querySelector(params.submitButtonSelector);
  toggleButtonState(params, inputList, buttonElement);
  inputList.forEach(inputElement => {

    inputElement.addEventListener('input', evt => {
      checkValidityInput(params, formElement, inputElement);
      toggleButtonState(params, inputList, buttonElement);
    });
  });
};

const enableValidation = (params) => {
  const formList = Array.from(document.querySelectorAll(params.formSelector));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
      const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
      if (hasInvalidInput(inputList)) {
        evt.stopImmediatePropagation();
      }
    });

    setInputEventListeners(params, formElement);
  });
};

enableValidation({
  formSelector: '.popup-form',
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.popup-form__save-btn',
  inactiveButtonClass: 'popup-form__save-btn_inactive',
  inputErrorClass: 'popup-form__input_type_error',
  errorClass: 'popup-form__input-error_active'
});

