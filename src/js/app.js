import Widget from './widget';

export default class App {
  constructor(element) {
    this.element = element;
    this.url = new URL('https://zicio-polling.herokuapp.com/'); // 'http://localhost:7000/'

    this.getRequest();
  }

  getRequest() {
    Widget.stream(this.url);
  }
}

const app = new App(document);
