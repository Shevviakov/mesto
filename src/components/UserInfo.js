export default class UserInfo {
  constructor({nameSelector, bioSelector, avatarSelector}) {
    this._nameElement = document.querySelector(nameSelector);
    this._bioElement = document.querySelector(bioSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      bio: this._bioElement.textContent
    }
  }

  setUserInfo({name, about}) {
    this._nameElement.textContent = name;
    this._bioElement.textContent = about;
  }

  setAvatar({avatar}) {
    this._avatarElement.style.backgroundImage = `url('${avatar}')`
  }
}
