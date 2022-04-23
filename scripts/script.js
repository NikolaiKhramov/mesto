const userInfo = document.querySelector('.profile__info');
const openPopupButton = userInfo.querySelector('.profile__info-edit');
const popup = document.querySelector('.popup');
const closePopupButton = popup.querySelector('.popup__close-btn');
const editProfileForm = popup.querySelector('.edit-form');
let userNameInput = editProfileForm.querySelector('.edit-form__input_context_username');
let userJobInput = editProfileForm.querySelector('.edit-form__input_context_userjob');
let currentUserName = userInfo.querySelector('.profile__info-username');
let currentUserJob = userInfo.querySelector('.profile__info-userjob');

function popupOpenToggle() {
  popup.classList.toggle('popup_opened');
  userNameInput.value = currentUserName.textContent;
  userJobInput.value = currentUserJob.textContent;
}

openPopupButton.addEventListener('click', popupOpenToggle);

closePopupButton.addEventListener('click', popupOpenToggle);

function formSubmitHandler(evt) {
  evt.preventDefault();
  currentUserName.textContent = userNameInput.value;
  currentUserJob.textContent = userJobInput.value;
  popup.classList.toggle('popup_opened');
}

editProfileForm.addEventListener('submit', formSubmitHandler);

/* let likeButtons = document.querySelectorAll('.place__like-btn');

for (let i = 0; i < likeButtons.length; i++) {
  likeButtons[i].addEventListener('click', function(){
    likeButtons[i].classList.toggle('place__like-btn_active');
  });
}; */
