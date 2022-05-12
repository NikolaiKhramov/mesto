const userInfo = document.querySelector('.profile__info');
const profileEditForm = document.querySelector('[name=edit-profile]');
let userNameInput = profileEditForm.querySelector('[name=new-username]');
let userJobInput = profileEditForm.querySelector('[name=new-userjob]');
let currentUserName = userInfo.querySelector('.profile__info-username');
let currentUserJob = userInfo.querySelector('.profile__info-userjob');
const profileEditPopup = document.querySelector('.popup_context_edit-profile');
const profileEditPopupOpenButton = userInfo.querySelector('.profile__info-edit');

const newPlacePopup = document.querySelector('.popup_context_create-new-place');
const newPlaceForm = newPlacePopup.querySelector('[name=new-place]');
const newPlaceNameInput = newPlacePopup.querySelector('[name=new-place-name]');
const newPlaceLinkInput = newPlacePopup.querySelector('[name=new-place-link]');
const newPlacePopupOpenButton = document.querySelector('.profile__add-btn');
const newPlaceCardTemplate = document.querySelector('#place-template').content.querySelector('.place');
const placeCardsContainer = document.querySelector('.places__list');

const fullscreenPlacePopup = document.querySelector('.popup_context_fullscreen-place');
let fullscreenPlaceImage = fullscreenPlacePopup.querySelector('.fullscreen-place__image');
let fullscreenPlaceName = fullscreenPlacePopup.querySelector('.fullscreen-place__name');

const popupCloseButtons = document.querySelectorAll('.popup__close-btn');

// Функция для открытия/закрытия попапов
function openPopup(popup) {
  popup.classList.toggle('popup_opened');
};

// Закрытие попапов на крестик
popupCloseButtons.forEach(elem => {
  elem.addEventListener('click', function(event) {
    openPopup(event.target.closest('.popup'));
  });
});

// Открытие попапа для смены имени/описания пользователя
profileEditPopupOpenButton.addEventListener('click', function() {
  openPopup(profileEditPopup);
  userNameInput.value = currentUserName.textContent;
  userJobInput.value = currentUserJob.textContent;
});

// Работа с формой для смены имени/описания пользователя
function profileEditFormHandler(evt) {
  evt.preventDefault();
  currentUserName.textContent = userNameInput.value;
  currentUserJob.textContent = userJobInput.value;
  openPopup(profileEditPopup);
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

const renderPlaceCard = (card) => {
  placeCardsContainer.prepend(createNewPlaceCard(card));
};

initialCards.forEach((card) => {
  renderPlaceCard(card);
});

// Открытие попапа для добавления новой карточки Место
newPlacePopupOpenButton.addEventListener('click', function() {
  openPopup(newPlacePopup);
  newPlaceNameInput.value = '';
  newPlaceLinkInput.value = '';
});

// Работа с формой для создания новой карточки Место
const addNewPlaceFormHandler = (event) => {
  event.preventDefault();

  renderPlaceCard({ name: newPlaceNameInput.value, link: newPlaceLinkInput.value });

  openPopup(newPlacePopup);
};

//Обработчик для формы редактирования профиля
profileEditForm.addEventListener('submit', profileEditFormHandler);

//Обработчик для формы добавления новой карточки Место
newPlaceForm.addEventListener('submit', addNewPlaceFormHandler);
