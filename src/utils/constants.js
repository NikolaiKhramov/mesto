const userInfo = document.querySelector('.profile__info');
const profileEditForm = document.querySelector('[name=profileEdit]');
const userNameInput = profileEditForm.querySelector('[name=username]');
const userJobInput = profileEditForm.querySelector('[name=userjob]');
const profileEditPopupOpenButton = userInfo.querySelector('.profile__info-edit');

const newPlacePopup = document.querySelector('.popup_context_create-new-place');
const newPlaceForm = newPlacePopup.querySelector('[name=new-place]');
const newPlacePopupOpenButton = document.querySelector('.profile__add-btn');

const avatarEditPopup = document.querySelector('.popup_context_edit-avatar');
const avatarEditForm = avatarEditPopup.querySelector('[name=new-avatar]');
const avatarEditPopupOpenButton = document.querySelector('.profile__avatar-edit');


const validationData = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
};

export {
  validationData,
  userInfo,
  profileEditForm,
  userNameInput,
  userJobInput,
  profileEditPopupOpenButton,
  newPlacePopup,
  newPlaceForm,
  newPlacePopupOpenButton,
  avatarEditForm,
  avatarEditPopupOpenButton
};
