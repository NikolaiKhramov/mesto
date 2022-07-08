import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, submitFormHandler}) {
    super(popupSelector);
    this._submitFormHandler = submitFormHandler;
    this._form = this._popup.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.form__input');
    this._submitFormButton = this._form.querySelector('.popup__button');
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitFormHandler(this._getInputValues());
    });
  }

  loadingState(isLoading) {
    if (isLoading) {
      this._submitFormButton.textContent = 'Сохранение...';
    } else {
      this._submitFormButton.textContent = 'Сохранить';
    }
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }
}
