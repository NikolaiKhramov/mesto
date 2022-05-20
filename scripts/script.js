const userInfo = document.querySelector('.profile__info');
const profileEditForm = document.querySelector('[name=profileEdit]');
const userNameInput = profileEditForm.querySelector('[name=new-username]');
const userJobInput = profileEditForm.querySelector('[name=new-userjob]');
const currentUserName = userInfo.querySelector('.profile__info-username');
const currentUserJob = userInfo.querySelector('.profile__info-userjob');
const profileEditFormSubmitButton = profileEditForm.querySelector('.popup__submit-btn');
const profileEditPopup = document.querySelector('.popup_context_edit-profile');
const profileEditPopupOpenButton = userInfo.querySelector('.profile__info-edit');

const newPlacePopup = document.querySelector('.popup_context_create-new-place');
const newPlaceForm = newPlacePopup.querySelector('[name=new-place]');
const newPlaceNameInput = newPlacePopup.querySelector('[name=new-place-name]');
const newPlaceLinkInput = newPlacePopup.querySelector('[name=new-place-link]');
const newPlaceFormSubmitButton = newPlacePopup.querySelector('.popup__submit-btn');
const newPlacePopupOpenButton = document.querySelector('.profile__add-btn');
const newPlaceCardTemplate = document.querySelector('#place-template').content.querySelector('.place');

const fullscreenPlacePopup = document.querySelector('.popup_context_fullscreen-place');
let fullscreenPlaceImage = fullscreenPlacePopup.querySelector('.fullscreen-place__image');
let fullscreenPlaceName = fullscreenPlacePopup.querySelector('.fullscreen-place__name');

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

// Открытие попапа для смены имени/описания пользователя
profileEditPopupOpenButton.addEventListener('click', function() {
  openPopup(profileEditPopup);
  resetErrors(profileEditForm, validationData);
  userNameInput.value = currentUserName.textContent;
  userJobInput.value = currentUserJob.textContent;
  disableSubmitButton(profileEditFormSubmitButton, validationData);
});

// Работа с формой для смены имени/описания пользователя
function profileEditFormHandler(evt) {
  evt.preventDefault();
  currentUserName.textContent = userNameInput.value;
  currentUserJob.textContent = userJobInput.value;
  closePopup(profileEditPopup);
};

// Генерация карточек Место из заданного массива и добавленных позднее
const createNewPlaceCard = (card) => {
  const newPlaceCard = newPlaceCardTemplate.cloneNode(true);

  const newPlaceCardName = newPlaceCard.querySelector('.place__name');
  newPlaceCardName.textContent = card.name;

  const newPlaceCardImage = newPlaceCard.querySelector('.place__image-container');
  newPlaceCardImage.style.backgroundImage = `url('${card.link}')`;
  newPlaceCardImage.addEventListener('click', function() {
    openPopup(fullscreenPlacePopup);
    fullscreenPlaceImage.src = card.link;
    fullscreenPlaceImage.alt = 'Фото из карточки Место ' + card.name;
    fullscreenPlaceName.textContent = card.name;
  });

  const cardDeleteButton = newPlaceCard.querySelector('.place__delete-btn');
  cardDeleteButton.addEventListener('click', function(event) {
    event.target.closest('.place').remove()
  });

  const likeCardBtn = newPlaceCard.querySelector('.place__like-btn');
  likeCardBtn.addEventListener('click', function(event) {
    event.target.closest('.place__like-btn').classList.toggle('place__like-btn_active')
  });

  return newPlaceCard;
};

function renderPlaceCard(card, placeCardsContainer) {
  placeCardsContainer = document.querySelector('.places__list');

  placeCardsContainer.prepend(createNewPlaceCard(card));
};

initialCards.forEach((card) => {
  renderPlaceCard(card);
});

// Открытие попапа для добавления новой карточки Место
newPlacePopupOpenButton.addEventListener('click', function() {
  openPopup(newPlacePopup);

  resetErrors(newPlaceForm, validationData);

  newPlaceForm.reset();

  disableSubmitButton(newPlaceFormSubmitButton, validationData);
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
