import { of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError } from 'rxjs/operators';

export default class App {
  constructor(element) {
    this.element = element;
    this.url = new URL('http://localhost:7000/'); // 'https://zicio-chat.herokuapp.com/'

    this.getRequest();
  }

  getRequest() {
    const data$ = fromFetch(`${this.url}messages/unread`).pipe(
      switchMap((response) => {
        if (response.ok) {
          // OK return data
          return response.json();
        }
        // Server is returning a status requiring the client to try something else.
        return of({ error: true, message: `Error ${response.status}` });
      }),
    );

    data$.subscribe({
      next: (result) => console.log(result),
      complete: () => console.log('done'),
    });
  }
}

const widget = new App(document);
