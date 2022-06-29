export default class Card {
  constructor({cardData, handleCardClick}, templateSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const newPlaceCard = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.place')
      .cloneNode(true);
    return newPlaceCard;
  }

  removePlaceCard() {
    this._newPlaceCard.remove();
    this._newPlaceCard = null;
  }

  likePlaceCard() {
    this._likeCardButton.classList.toggle('place__like-btn_active');
  }

  _setEventListeners() {
    this._cardDeleteButton.addEventListener('click', () => {
      this.removePlaceCard();
    });

    this._likeCardButton.addEventListener('click', () => {
      this.likePlaceCard();
    });

    this._newPlaceCardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  createNewPlaceCard() {
    this._newPlaceCard = this._getTemplate();
    this._newPlaceCardImage = this._newPlaceCard.querySelector('.place__image-container');
    this._newPlaceCardName = this._newPlaceCard.querySelector('.place__name');
    this._cardDeleteButton = this._newPlaceCard.querySelector('.place__delete-btn');
    this._likeCardButton = this._newPlaceCard.querySelector('.place__like-btn');
    this._newPlaceCardImage.style.backgroundImage = `url('${this._link}')`;
    this._newPlaceCardName.textContent = this._name;
    this._setEventListeners();

    return this._newPlaceCard;
  }
};
