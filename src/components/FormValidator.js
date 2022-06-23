export default class FormValidator {
  constructor(formElement, validationData) {
    this._formElement = formElement;
    this._validationData = validationData;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validationData.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._validationData.submitButtonSelector);
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._validationData.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._validationData.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._validationData.inputErrorClass);
    inputElement.classList.remove(this._validationData.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  disableSubmitButton() {
    this._buttonElement.classList.add(this._validationData.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }

  _enableSubmitButton() {
    this._buttonElement.classList.remove(this._validationData.inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  resetErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    this._setEventListeners();
  }

};
