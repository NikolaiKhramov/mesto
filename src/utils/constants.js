const userInfo = document.querySelector('.profile__info');
const profileEditForm = document.querySelector('[name=profileEdit]');
const userNameInput = profileEditForm.querySelector('[name=username]');
const userJobInput = profileEditForm.querySelector('[name=userjob]');
const profileEditPopupOpenButton = userInfo.querySelector('.profile__info-edit');

const newPlacePopup = document.querySelector('.popup_context_create-new-place');
const newPlaceForm = newPlacePopup.querySelector('[name=new-place]');
const newPlacePopupOpenButton = document.querySelector('.profile__add-btn');

export { userInfo, profileEditForm, userNameInput, userJobInput, profileEditPopupOpenButton, newPlacePopup, newPlaceForm, newPlacePopupOpenButton };
