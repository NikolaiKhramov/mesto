import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, submitFormHandler}) {
    super(popupSelector);
    this._submitFormHandler = submitFormHandler;
    this._form = this._popup.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.form__input');
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

  closePopup() {
    super.closePopup();
    this._form.reset();
  }
}
