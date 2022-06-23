export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popup__close-btn');
    this._handleEscCloseBinded = this._handleEscClose.bind(this);
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscCloseBinded);
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscCloseBinded);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.closePopup();
    };
  }

  _closePopupOnOverlay(event) {
    if (event.target === event.currentTarget) {
      this.closePopup();
    };
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', () => {
      this.closePopup();
    });

    this._popup.addEventListener('mousedown', () => {
      this._closePopupOnOverlay(event);
    });
  }
}
