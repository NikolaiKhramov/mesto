export class Card {
  constructor(cardData, templateSelector, fullscreenOpener) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._fullscreenOpener = fullscreenOpener;
  }

  _getTemplate() {
    const newPlaceCard = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.place')
      .cloneNode(true);
    return newPlaceCard;
  }

  _setEventListeners() {
    this._cardDeleteButton.addEventListener('click', () => {
      this._newPlaceCard.remove();
    });

    this._likeCardButton.addEventListener('click', () => {
      this._likeCardButton.classList.toggle('place__like-btn_active');
    });

    this._newPlaceCardImage.addEventListener('click', () => {
      this._fullscreenOpener(this._name, this._link);
    });
  }

  createNewPlaceCard() {
    this._newPlaceCard = this._getTemplate();
    this._newPlaceCardImage = this._newPlaceCard.querySelector('.place__image-container');
    this._newPlaceCardImage.style.backgroundImage = `url('${this._link}')`;
    this._newPlaceCardName = this._newPlaceCard.querySelector('.place__name');
    this._newPlaceCardName.textContent = this._name;
    this._cardDeleteButton = this._newPlaceCard.querySelector('.place__delete-btn');
    this._likeCardButton = this._newPlaceCard.querySelector('.place__like-btn');
    this._setEventListeners();

    return this._newPlaceCard;
  }
};
