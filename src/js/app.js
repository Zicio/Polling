import { of, interval } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError, take } from 'rxjs/operators';
import Dom from './Dom';

export default class App {
  constructor(element) {
    this.element = element;
    this.url = new URL('https://zicio-polling.herokuapp.com/'); // 'http://localhost:7000/'

    this.getRequest();
  }

  getRequest() {
    const data$ = interval(2000).pipe(
      take(5),
      switchMap((ev) => fromFetch(`${this.url}messages/unread`)),
      switchMap((response) => {
        if (response.ok) {
          // OK return data
          return response.json();
        }
        // Server is returning a status requiring the client to try something else.
        return of({ error: true, message: `Error ${response.status}` });
      }),
      catchError((err) => {
        // Network or other error, handle appropriately
        console.error(err);
        return of({ error: true, message: err.message });
      }),
    );

    data$.subscribe({
      next: (result) => {
        for (const message of result.messages) {
          Dom.renderMessage(message);
        }
      },
      error: (err) => console.error(err),
      complete: () => console.log('done'),
    });
  }
}

const widget = new App(document);
