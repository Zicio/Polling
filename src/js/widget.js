import { of, interval, EMPTY } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError, take } from 'rxjs/operators';
import Dom from './Dom';

export default class Widget {
  static stream(url) {
    const data$ = interval(2000).pipe(
      take(5),
      switchMap((ev) => fromFetch(`${url}messages/unread`).pipe(
        catchError((err) => {
          // Network or other error, handle appropriately
          console.error('Network error', err);
          return EMPTY;
        }),
        switchMap((response) => {
          if (response.ok) {
            // OK return data
            return response.json();
          }
          // Server is returning a status requiring the client to try something else.
          console.log(`Error ${response.status}`);
          return EMPTY;
        }),
      )),
    );

    data$.subscribe({
      next: (result) => {
        for (const message of result.messages) {
          Dom.renderMessage(message);
        }
      },
      complete: () => console.log('done'),
    });
  }
}
