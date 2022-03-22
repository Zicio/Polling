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
      text = message.body.slice(0, 15).concat('...');
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
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    let hour = String(date.getHours()).padStart(2, '0');
    if (hour === 24) {
      hour = 0;
    }
    const minute = String(date.getMinutes()).padStart(2, '0');
    const year = +date.getFullYear().toString().slice(2);
    return {
      month,
      day,
      hour,
      minute,
      year,
    };
  }
}
