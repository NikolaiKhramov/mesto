export default class UserInfo {
  constructor({userNameSelector, userJobSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
  }

  getUserInfo() {
    const userInfo = {
      currentName: this._userName.textContent,
      currentJob: this._userJob.textContent
    }

    return userInfo;
  }

  setUserInfo({username, userjob}) {
    this._userName.textContent = username;
    this._userJob.textContent = userjob;
  }
}
