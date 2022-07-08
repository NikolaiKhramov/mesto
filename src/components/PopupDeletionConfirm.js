import Popup from "./Popup.js";

export default class PopupDeletionConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupButton = this._popup.querySelector('.popup__button');
  }

  setConfirmAction(callback) {
    this._confirmDeleteCallback = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupButton.addEventListener('click', () => {
      this._confirmDeleteCallback();
    });
  }

  loadingState(isLoading) {
    if (isLoading) {
      this._popupButton.textContent = 'Удаление...';
    } else {
      this._popupButton.textContent = 'Да';
    }
  }
}
