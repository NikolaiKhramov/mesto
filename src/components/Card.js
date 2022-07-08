export default class Card {
  constructor({cardData, userId, handleCardClick, handleCardDelete, handleCardLikeSetting, handleCardLikeRemoving}, templateSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardId = cardData._id;
    this._likesList = cardData.likes;
    this._ownerId = cardData.owner._id;
    this._currentUserId = userId;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLikeSetting;
    this._handleCardLikeRemove = handleCardLikeRemoving;
    this._templateSelector = templateSelector;
  }

  _checkCardOwner() {
    if (this._ownerId !== this._currentUserId) {
      this._cardDeleteButton.remove();
    }
  }

  _isCardLiked() {
    return this._likesList.some((item) => item._id === this._currentUserId);
  }

  _renderLikesAmount() {
    this._likesAmountElement.textContent = this._likesList.length;
  }

  _handleLikeButtonState() {
    if (!this._isCardLiked()) {
      this._likeCardButton.classList.remove('place__like-btn_active');
    } else {
      this._likeCardButton.classList.add('place__like-btn_active');
    }
  }

  _toggleLikePlaceCard() {
    this._likeCardButton.classList.toggle('place__like-btn_active');
  }

  _likingPlaceCardHandler() {
    if (!this._isCardLiked()) {
      this._handleCardLike(this._cardId);
    } else {
      this._handleCardLikeRemove(this._cardId);
    }
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
      this._handleCardDelete(this._cardId);
    });

    this._likeCardButton.addEventListener('click', () => {
      this._likingPlaceCardHandler()
    });

    this._newPlaceCardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  updateLikesAmount(data) {
    this._likesList = data.likes;
    this._renderLikesAmount();
    this._toggleLikePlaceCard();
  }

  removePlaceCard() {
    this._newPlaceCard.remove();
    this._newPlaceCard = null;
  }

  createNewPlaceCard() {
    this._newPlaceCard = this._getTemplate();
    this._newPlaceCardImage = this._newPlaceCard.querySelector('.place__image-container');
    this._newPlaceCardName = this._newPlaceCard.querySelector('.place__name');
    this._cardDeleteButton = this._newPlaceCard.querySelector('.place__delete-btn');
    this._likeCardButton = this._newPlaceCard.querySelector('.place__like-btn');
    this._likesAmountElement = this._newPlaceCard.querySelector('.place__like-amount');
    this._newPlaceCardImage.style.backgroundImage = `url('${this._link}')`;
    this._newPlaceCardName.textContent = this._name;
    this._renderLikesAmount();
    this._checkCardOwner();
    this._handleLikeButtonState();
    this._setEventListeners();

    return this._newPlaceCard;
  }
};
