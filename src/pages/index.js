import './index.css';
import {
  validationData,
  profileEditForm,
  userNameInput,
  userJobInput,
  profileEditPopupOpenButton,
  newPlaceForm,
  newPlacePopupOpenButton,
  avatarEditForm,
  avatarEditPopupOpenButton } from '../utils/constants.js';
import Api from "../components/Api.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupDeletionConfirm from '../components/PopupDeletionConfirm.js';
import UserInfo from "../components/UserInfo.js";

// Класс для работы с сервером
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-44",
  headers: {
    authorization: "4588e259-c943-4192-8b33-eec449bf69a1",
    "Content-Type": "application/json",
  }
});

// Переменная для идентификатора текущего пользователя
let currentUserId = null;

// Получение и отрисовка данных с сервера(карточки Mesto, информация о пользователе)
api.getContent()
  .then(([initialCards, userData]) => {
    currentUserId = userData._id;
    userInfo.setUserInfo(userData);
    cardsList.renderItems(initialCards);
  });

// Валидация форм на странице
const profileEditFormValidated = new FormValidator(profileEditForm, validationData);
profileEditFormValidated.enableValidation();

const newPlaceFormValidated = new FormValidator(newPlaceForm, validationData);
newPlaceFormValidated.enableValidation();

const avatarFormValidated = new FormValidator(avatarEditForm, validationData);
avatarFormValidated .enableValidation();

// Работа с карточками Mesto(создание и рендер)
function createPlaceCard(cardData) {
  const placeCard = new Card({
    cardData: cardData,
    userId: currentUserId,
    handleCardClick: (name, link) => {
      fullscreenPopup.openPopup(name, link);
    },
    handleCardDelete: (cardId) => {
      deletionConfirmPopup.openPopup();
      deletionConfirmPopup.setConfirmAction(() => {
        deletionConfirmPopup.loadingState(true);
        api.deletePlaceCard(cardId)
        .then(() => {
          placeCard.removePlaceCard();
          deletionConfirmPopup.closePopup();
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        })
        .finally(() => {
          deletionConfirmPopup.loadingState(false);
        });
      });
    },
    handleCardLikeSetting: (cardId) => {
      api.setLikeOnCard(cardId)
        .then((data) => {
          placeCard.updateLikesAmount(data);
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        });
    },
    handleCardLikeRemoving: (cardId) => {
      api.removeLike(cardId)
        .then((data) => {
          placeCard.updateLikesAmount(data);
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        });
    }
  }, '#place-template');

  return placeCard.createNewPlaceCard();
};

const cardsList = new Section({
  renderer: (item) => {
    cardsList.addItem(createPlaceCard(item));
  }}, '.places__list');

// Класс для работы с информацией о пользователе
const userInfo = new UserInfo({
  userNameSelector: '.profile__info-username',
  userJobSelector: '.profile__info-userjob',
  userAvatarSelector: '.profile__avatar'
});

// Фуллскрин попап для карточек Mesto
const fullscreenPopup = new PopupWithImage('.popup_context_fullscreen-place');
fullscreenPopup.setEventListeners();

// Попап для подтверждения удаления карточки Mesto
const deletionConfirmPopup = new PopupDeletionConfirm('.popup_context_confirm-place-deletion');
deletionConfirmPopup.setEventListeners();

// Работа с попапом для редактирования информации о пользователе
const editProfilePopup = new PopupWithForm({
  popupSelector: '.popup_context_edit-profile',
  submitFormHandler: (formData) => {
    editProfilePopup.loadingState(true);
    api.editProfileInfo(formData)
      .then((formData) => {
        userInfo.setUserInfo(formData);
        editProfilePopup.closePopup();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        editProfilePopup.loadingState(false);
      });
  }
});

editProfilePopup.setEventListeners();

profileEditPopupOpenButton.addEventListener('click', () => {
  const { currentName, currentJob } = userInfo.getUserInfo();
  userNameInput.value = currentName;
  userJobInput.value = currentJob;
  profileEditFormValidated.resetErrors();
  profileEditFormValidated.disableSubmitButton();
  editProfilePopup.openPopup();
});

// Работа с попапом для добавления новой карточки Mesto
const newPlacePopup = new PopupWithForm({
  popupSelector: '.popup_context_create-new-place',
  submitFormHandler: (formData) => {
    newPlacePopup.loadingState(true);
    api.addNewPlaceCard(formData)
      .then((formData) => {
        cardsList.addItem(createPlaceCard(formData));
        newPlacePopup.closePopup();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        newPlacePopup.loadingState(false);
      });
  }
});

newPlacePopup.setEventListeners();

newPlacePopupOpenButton.addEventListener('click', () => {
  newPlaceFormValidated.resetErrors();
  newPlaceFormValidated.disableSubmitButton();
  newPlacePopup.openPopup();
});

// Работа с попапом для редактирования Аватара пользователя
const editAvatarPopup = new PopupWithForm({
  popupSelector: '.popup_context_edit-avatar',
  submitFormHandler: (formData) => {
    editAvatarPopup.loadingState(true);
    api.editUserAvatar(formData)
      .then((formData) => {
        userInfo.setUserInfo(formData);
        editAvatarPopup.closePopup();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        editAvatarPopup.loadingState(false);
      });
  }
});

editAvatarPopup.setEventListeners();

avatarEditPopupOpenButton.addEventListener('click', () => {
  avatarFormValidated .resetErrors();
  avatarFormValidated .disableSubmitButton();
  editAvatarPopup.openPopup();
});
