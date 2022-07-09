export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
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

  _closePopupOnClick(event) {
    if (event.target === event.currentTarget || event.target.classList.contains('popup__close-btn')) {
      this.closePopup();
    };
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (event) => {
      this._closePopupOnClick(event);
    });
  }
}
