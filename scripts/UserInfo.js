export default class UserInfo {
  constructor([nameSelector, bioSelector]) {
    this._nameElement = document.querySelector(nameSelector);
    this._bioSelector = document.querySelector(bioSelector);
  }

  getUserInfo() {}

  setUserInfo({name, bio}) {}
}
