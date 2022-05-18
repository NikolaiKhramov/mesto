const validationData = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
};

//Функция для показа ошибок валидации
function showInputError(formElement, inputElement, errorMessage, validationData) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(validationData.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationData.errorClass);
};

//Функция для скрытия ошибок валидации
function hideInputError(formElement, inputElement, validationData) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(validationData.inputErrorClass);
  errorElement.classList.remove(validationData.errorClass);
  errorElement.textContent = '';
};

//Функция показывает/скрывает ошибки в зависимости от валидности поля
function checkInputValidity(formElement, inputElement, validationData) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationData);
  } else {
    hideInputError(formElement, inputElement, validationData);
  };
};

//Функция для проверки валидности поля ввода
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//Функция для деактивации кнопки отправки формы
function disableSubmitButton(buttonElement, validationData) {
  buttonElement.classList.add(validationData.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
};

//Функция для активации кнопки отправки формы
function enableSubmitButton(buttonElement, validationData) {
  buttonElement.classList.remove(validationData.inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
};

//Функция для переключения состояния кнопки отправки формы
function toggleButtonState(inputList, buttonElement, validationData) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, validationData);
  } else {
    enableSubmitButton(buttonElement, validationData);
  };
};

//Функция для добавления слушателей на каждый инпут
function setEventListeners(formElement, validationData) {
  const inputList = Array.from(formElement.querySelectorAll(validationData.inputSelector));
  const buttonElement = formElement.querySelector(validationData.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, validationData);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement, validationData);
      toggleButtonState(inputList, buttonElement, validationData);
    });
  });
};

//Функция для валидации и сброса стандартного поведения каждой формы
function enableValidation(validationData) {
  const formList = Array.from(document.querySelectorAll(validationData.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, validationData);
  });
};

enableValidation(validationData);

//Функция для сброса ошибок полей ввода
function resetErrors(formElement, validationData) {
  inputList = Array.from(formElement.querySelectorAll(validationData.inputSelector));

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationData);
  });
};
