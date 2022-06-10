import { initialCards, validationData } from "./initialData.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const userInfo = document.querySelector('.profile__info');
const profileEditForm = document.querySelector('[name=profileEdit]');
const userNameInput = profileEditForm.querySelector('[name=new-username]');
const userJobInput = profileEditForm.querySelector('[name=new-userjob]');
const currentUserName = userInfo.querySelector('.profile__info-username');
const currentUserJob = userInfo.querySelector('.profile__info-userjob');
const profileEditPopup = document.querySelector('.popup_context_edit-profile');
const profileEditPopupOpenButton = userInfo.querySelector('.profile__info-edit');

const newPlacePopup = document.querySelector('.popup_context_create-new-place');
const newPlaceForm = newPlacePopup.querySelector('[name=new-place]');
const newPlaceNameInput = newPlacePopup.querySelector('[name=new-place-name]');
const newPlaceLinkInput = newPlacePopup.querySelector('[name=new-place-link]');
const newPlacePopupOpenButton = document.querySelector('.profile__add-btn');

const fullscreenPlacePopup = document.querySelector('.popup_context_fullscreen-place');
const fullscreenPlaceImage = fullscreenPlacePopup.querySelector('.fullscreen-place__image');
const fullscreenPlaceName = fullscreenPlacePopup.querySelector('.fullscreen-place__name');

const popups = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__close-btn');

// Функция открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', closePopupByEscButton);
};

//Функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closePopupByEscButton);
};

// Закрытие попапов на крестик
popupCloseButtons.forEach(elem => {
  elem.addEventListener('click', function(event) {
    closePopup(event.target.closest('.popup'));
  });
});

// Функция закрытия попапов при клике на оверлей
function closePopupOnOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  };
};

popups.forEach((element) => {
  element.addEventListener('mousedown', closePopupOnOverlay);
});

//Функция закрытия попапов нажатием на Esc
function closePopupByEscButton(event) {
  if (event.key === 'Escape') {
    const popupToClose = document.querySelector('.popup_opened');
    closePopup(popupToClose);
  };
};

// Валидация форм на странице
const profileEditFormValidated = new FormValidator(profileEditForm, validationData);
profileEditFormValidated.enableValidation();

const newPlaceFormValidated = new FormValidator(newPlaceForm, validationData);
newPlaceFormValidated.enableValidation();

// Открытие попапа для смены имени/описания пользователя
profileEditPopupOpenButton.addEventListener('click', function() {
  openPopup(profileEditPopup);
  userNameInput.value = currentUserName.textContent;
  userJobInput.value = currentUserJob.textContent;
  profileEditFormValidated.resetErrors();
  profileEditFormValidated.disableSubmitButton();
});

// Работа с формой для смены имени/описания пользователя
function profileEditFormHandler(evt) {
  evt.preventDefault();
  currentUserName.textContent = userNameInput.value;
  currentUserJob.textContent = userJobInput.value;
  closePopup(profileEditPopup);
};

// Вспомогательная функция для класса Card для открытия фуллскрин Попапа
function openFullscreenPlacePopup(name, link) {
  openPopup(fullscreenPlacePopup);
  fullscreenPlaceImage.src = link;
  fullscreenPlaceImage.alt = 'Фото из карточки Место ' + name;
  fullscreenPlaceName.textContent = name;
};

// Работа с карточками из массива и созданных позднее
function createPlace(cardData) {
  const placeCard = new Card(cardData, '#place-template', openFullscreenPlacePopup);
  const placeCardCreated = placeCard.createNewPlaceCard();
  return placeCardCreated;
};

function renderPlaceCard(cardData, containerToAppend) {
  containerToAppend = document.querySelector('.places__list');

  containerToAppend.prepend(createPlace(cardData));
};

initialCards.forEach((cardData) => {
  renderPlaceCard(cardData)
});

// Открытие попапа для добавления новой карточки Место
newPlacePopupOpenButton.addEventListener('click', function() {
  openPopup(newPlacePopup);
  newPlaceFormValidated.resetErrors();
  newPlaceFormValidated.reset();
  newPlaceFormValidated.disableSubmitButton();
});

// Работа с формой для создания новой карточки Место
const addNewPlaceFormHandler = (event) => {
  event.preventDefault();
  renderPlaceCard({ name: newPlaceNameInput.value, link: newPlaceLinkInput.value });
  closePopup(newPlacePopup);
};

//Обработчик для формы редактирования профиля
profileEditForm.addEventListener('submit', profileEditFormHandler);

//Обработчик для формы добавления новой карточки Место
newPlaceForm.addEventListener('submit', addNewPlaceFormHandler);
