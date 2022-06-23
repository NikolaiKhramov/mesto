import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.fullscreen-place__image');
    this._name = this._popup.querySelector('.fullscreen-place__name');
  }

  openPopup(name, link) {
    this._image.src = link;
    this._image.alt = 'Фото из карточки Mesto ' + name;
    this._name.textContent = name;
    super.openPopup();
  }
}
