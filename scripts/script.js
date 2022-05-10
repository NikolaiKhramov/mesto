const userInfo = document.querySelector('.profile__info');
const editProfileForm = document.querySelector('[name=edit-profile]');
let userNameInput = editProfileForm.querySelector('[name=new-username]');
let userJobInput = editProfileForm.querySelector('[name=new-userjob]');
let currentUserName = userInfo.querySelector('.profile__info-username');
let currentUserJob = userInfo.querySelector('.profile__info-userjob');
const editProfilePopup = document.querySelector('.popup_context_edit-profile');
const openEditProfilePopupBtn = userInfo.querySelector('.profile__info-edit');

const newPlacePopup = document.querySelector('.popup_context_create-new-place');
const newPlaceForm = newPlacePopup.querySelector('[name=new-place]');
const newPlaceNameInput = newPlacePopup.querySelector('[name=new-place-name]');
const newPlaceLinkInput = newPlacePopup.querySelector('[name=new-place-link]');
const openNewPlacePopupBtn = document.querySelector('.profile__add-btn');
const newPlaceCardTemplate = document.querySelector('#place-template').content.querySelector('.place');
const placeCardsContainer = document.querySelector('.places__list');

const fullscreenPlacePopup = document.querySelector('.popup_context_fullscreen-place');
let fullscreenPlaceImage = fullscreenPlacePopup.querySelector('.fullscreen-place__image');
let fullscreenPlaceName = fullscreenPlacePopup.querySelector('.fullscreen-place__name');

const initialPlaceImages = document.querySelectorAll('.place__image');
const likeButtons = document.querySelectorAll('.place__like-btn');
const closePopupBtns = document.querySelectorAll('.popup__close-btn');
const removePlaceCardBtns = document.querySelectorAll('.place__delete-btn');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Функция для открытия/закрытия попапов
function popupHandler(popup) {
  popup.classList.toggle('popup_opened');
};

// Закрытие попапов на крестик
closePopupBtns.forEach(elem => {
  elem.addEventListener('click', function(event) {
    event.target.closest('.popup').classList.toggle('popup_opened');
  });
});

// Активный лайк для карточек из верстки
likeButtons.forEach(elem => {
  elem.addEventListener('click', function() {
    elem.classList.toggle('place__like-btn_active');
  });
});

// Фуллскрин попап для карточек из верстки
initialPlaceImages.forEach(elem => {
  elem.addEventListener('click', function(event) {
    popupHandler(fullscreenPlacePopup);
    fullscreenPlaceImage.src = event.target.closest('.place').querySelector('.place__image').src;
    fullscreenPlaceName.textContent = event.target.closest('.place').querySelector('.place__name').textContent;
  });
});

// Удаление сверстанных карточек
removePlaceCardBtns.forEach(elem => {
  elem.addEventListener('click', function(event) {
    event.target.closest('.place').remove();
  });
});

// Открытие попапа для смены имени/описания пользователя
openEditProfilePopupBtn.addEventListener('click', function() {
  popupHandler(editProfilePopup);
  userNameInput.value = currentUserName.textContent;
  userJobInput.value = currentUserJob.textContent;
});

// Работа с формой для смены имени/описания пользователя
function formSubmitHandler(evt) {
  evt.preventDefault();
  currentUserName.textContent = userNameInput.value;
  currentUserJob.textContent = userJobInput.value;
  popupHandler(editProfilePopup);
};

editProfileForm.addEventListener('submit', formSubmitHandler);

// Генерация карточек Место из заданного массива и добавленных позднее
const createNewPlaceCard = (card) => {
  const newPlaceCard = newPlaceCardTemplate.cloneNode(true);


  const newPlaceCardName = newPlaceCard.querySelector('.place__name');
  newPlaceCardName.textContent = card.name;

  const newPlaceCardImage = newPlaceCard.querySelector('.place__image-container');
  newPlaceCardImage.style.backgroundImage = `url('${card.link}')`;
  newPlaceCardImage.addEventListener('click', function() {
    popupHandler(fullscreenPlacePopup);
    fullscreenPlaceImage.src = card.link;
    fullscreenPlaceImage.alt = card.name;
    fullscreenPlaceName.textContent = card.name;
  });

  const deleteCardBtn = newPlaceCard.querySelector('.place__delete-btn');
  deleteCardBtn.addEventListener('click', function(event) {
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
openNewPlacePopupBtn.addEventListener('click', function() {
  popupHandler(newPlacePopup);
  newPlaceNameInput.value = '';
  newPlaceLinkInput.value = '';
});

// Работа с формой для создания новой карточки Место
const handleSubmitAddNewPlaceForm = (event) => {
  event.preventDefault();

  renderPlaceCard({ name: newPlaceNameInput.value, link: newPlaceLinkInput.value });

  popupHandler(newPlacePopup);
};

newPlaceForm.addEventListener('submit', handleSubmitAddNewPlaceForm);
