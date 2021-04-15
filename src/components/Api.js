export default class Api {
  constructor({cohortId, token}) {
    this._cohortId = cohortId;
    this._token = token;
  }

  getInitialCards() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards`, {
      headers: {
        'authorization': `${this._token}`,
      }
    })
      .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res);
    });
  }

  addNewCard(cardInfo) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards`, {
      method: 'POST',
      headers: {
        'authorization': `${this._token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cardInfo)
    })
      .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res);
    });
  }

  deleteCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'authorization': `${this._token}`,
      },
    })
      .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res);
    });
  }

  getUserInfo() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/users/me`, {
      headers: {
        'authorization': `${this._token}`,
      }
    })
      .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res);
    });
  }

  setUserInfo(userInfo) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/users/me`, {
      method: 'PATCH',
      headers: {
        'authorization': `${this._token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
      .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res);
    });
  }

  _like(method, cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/likes/${cardId}`, {
      method: method,
      headers: {
        'authorization': `${this._token}`,
      }
    })
      .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res);
    });
  }

  addLike(cardId) {
    return this._like('PUT', cardId);
  }

  removeLike(cardId) {
    return this._like('DELETE', cardId);
  }

  setAvatar(avatar) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'authorization': `${this._token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({avatar: avatar})
    })
      .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res);
    });
  }
}
