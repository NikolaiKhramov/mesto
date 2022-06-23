import './index.css';
import { initialCards, validationData } from "../utils/initialData.js";
import {  profileEditForm, userNameInput, userJobInput, profileEditPopupOpenButton, newPlaceForm, newPlacePopupOpenButton } from '../utils/constants.js';
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

// Валидация форм на странице
const profileEditFormValidated = new FormValidator(profileEditForm, validationData);
profileEditFormValidated.enableValidation();

const newPlaceFormValidated = new FormValidator(newPlaceForm, validationData);
newPlaceFormValidated.enableValidation();

// Работа с карточками Mesto(создание и рендер)
function createPlaceCard(cardData) {
  const placeCard = new Card({
    cardData: cardData,
    handleCardClick: (name, link) => {
      fullscreenPopup.openPopup(name, link);
    }}, '#place-template');
  const placeCardCompleted = placeCard.createNewPlaceCard();

  return placeCardCompleted;
};

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardsList.addItem(createPlaceCard(item));
  }}, '.places__list');

cardsList.renderItems();

// Класс для работы с информацией о пользователе
const userInfo = new UserInfo({
  userNameSelector: '.profile__info-username',
  userJobSelector: '.profile__info-userjob'
});

// Фуллскрин попап для карточек Mesto
const fullscreenPopup = new PopupWithImage('.popup_context_fullscreen-place');
fullscreenPopup.setEventListeners();

// Работа с попапом для редактирования информации о пользователе
const editProfilePopup = new PopupWithForm({
  popupSelector: '.popup_context_edit-profile',
  submitFormHandler: (formData) => {
    userInfo.setUserInfo({
      username: formData.username,
      userjob: formData.userjob
    });
    editProfilePopup.closePopup();
  }
});

editProfilePopup.setEventListeners();

profileEditPopupOpenButton.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();
  userNameInput.value = currentUserInfo.currentName;
  userJobInput.value = currentUserInfo.currentJob;
  editProfilePopup.openPopup();
  profileEditFormValidated.resetErrors();
  profileEditFormValidated.disableSubmitButton();
});

// Работа с попапом для добавления новой карточки Mesto
const newPlacePopup = new PopupWithForm({
  popupSelector: '.popup_context_create-new-place',
  submitFormHandler: (formData) => {
    cardsList.addItem(createPlaceCard(formData));
    newPlacePopup .closePopup();
  }
});

newPlacePopup .setEventListeners();

newPlacePopupOpenButton.addEventListener('click', () => {
  newPlacePopup .openPopup();
  newPlaceFormValidated.resetErrors();
  newPlaceFormValidated.disableSubmitButton();
});
