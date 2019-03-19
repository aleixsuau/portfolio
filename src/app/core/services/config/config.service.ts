import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _configService = new BehaviorSubject<IAppConfig>(null);
  readonly $config = this._configService.asObservable().pipe(share());

  constructor() { }

  getConfig(): Observable<IAppConfig> {
    const config = {
      menu: {
        hasBackdrop: false,
        mode: 'push',
        sections: [
          {
            title: 'hi',
            link: '/hi',
            icon: 'child_care',
            background_color: '#f5af19',
          },
          {
            title: 'works',
            link: '/works',
            icon: 'card_travel',
            background_color: '#f953c6',
          },
          {
            title: 'blog',
            link: '/blog',
            icon: 'edit',
            background_color: '#b91d73',
          },
          {
            title: 'works',
            link: '/works',
            icon: 'card_travel',
            background_color: '#5b86e5',
          },
        ],
      }
    };

    this._configService.next(config);

    return of(config);
  }
}
