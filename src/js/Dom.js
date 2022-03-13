export default class Dom {
  static renderMessage(message) {
    const table = document.querySelector('.widget__table');

    const messageTicket = Dom.setEl('div', 'table__message');
    table.prepend(messageTicket);

    const addressMessage = Dom.setEl('span', 'message__address');
    addressMessage.textContent = message.from;
    messageTicket.append(addressMessage);

    const textMessage = Dom.setEl('span', 'message__text');
    let text = message.subject;
    if (message.subject.length > 15) {
      text = message.body.slice(0, 16).concat('...');
    }
    textMessage.textContent = text;
    messageTicket.append(textMessage);

    const dateMessage = Dom.setEl('span', 'message__date');
    const date = Dom.getDate(+message.received);
    dateMessage.textContent = `${date.day}.${date.month}.${date.year} ${date.hour}:${date.minute}`;
    messageTicket.append(dateMessage);
  }

  static setEl(type, ...selector) {
    const el = document.createElement(type);
    el.classList.add(...selector);
    return el;
  }

  static getDate(sec) {
    const date = new Date(sec);
    const month = Dom.formatDate(date.getMonth() + 1);
    const day = Dom.formatDate(date.getDate());
    let hour = Dom.formatDate(date.getHours());
    if (hour === 24) {
      hour = 0;
    }
    const minute = Dom.formatDate(date.getMinutes());
    const year = +date.getFullYear().toString().slice(2);
    return {
      month,
      day,
      hour,
      minute,
      year,
    };
  }

  static formatDate(date) {
    if (date < 10) {
      date = `0${date}`;
    }
    return date;
  }
}
