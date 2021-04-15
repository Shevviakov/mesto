export default class Section {
  constructor(containerSelector, renderer) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach(item => this._renderer(item))
  }

  addItem(elem) {
    this._container.prepend(elem);
  }

  appendItem(elem) {
    this._container.append(elem);
  }
}
