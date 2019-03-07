import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  getConfig(): Observable<IAppConfig> {
    return of({
      menu: {
        hasBackdrop: false,
        mode: 'push',
        sections: [
          {
            title: 'portfolio',
            link: '/portfolio',
            icon: 'card_travel',
          },
          {
            title: 'blog',
            link: '/blog',
            icon: 'edit',
          }
        ],
      }
    });
  }
}
