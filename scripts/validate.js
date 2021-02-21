
const showInputError = (params, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add(params.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(params.errorClass);
}

const hideInputError = (params, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(params.inputErrorClass);
  errorElement.classList.remove(params.errorClass);
  errorElement.textContent = '';
}

const checkValidityInput = (params, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  if (inputElement.validity.valid) {
    hideInputError(params, formElement, inputElement);
  } else {
    showInputError(params, formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid);
};

const toggleButtonState = (params, inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(params.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(params.inactiveButtonClass);
      buttonElement.disabled = false;
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

const resetFormValidity = (params, formElement) => {
  formElement.reset();
  const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
  inputList.forEach(inputElement => {
    hideInputError(params, formElement, inputElement);
  });
  const buttonElement = formElement.querySelector(params.submitButtonSelector);
  toggleButtonState(params, inputList, buttonElement);
}

const enableValidation = (params) => {
  const formList = Array.from(document.querySelectorAll(params.formSelector));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });

    setInputEventListeners(params, formElement);
  });
};
