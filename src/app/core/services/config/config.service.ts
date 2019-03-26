import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { publishReplay, refCount } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _configService = new BehaviorSubject<IAppConfig>(null);
  readonly $config = this._configService.asObservable().pipe(publishReplay(1), refCount());

  constructor() { }

  getConfig(): Observable<IAppConfig> {
    const config = {
      menu: {
        hasBackdrop: false,
        mode: 'push',
        sections: [
          {
            id: 'home',
            title: 'hi',
            link: 'home',
            icon: 'child_care',
            background_color: '#f5af19',
          },
          {
            id: 'works',
            title: 'works',
            link: 'works',
            icon: 'card_travel',
            background_color: '#f953c6',
          },
          {
            id: 'blog',
            title: 'blog',
            link: 'blog',
            icon: 'edit',
            background_color: '#b91d73',
          },
          {
            id: 'contact',
            title: 'contact',
            link: 'contact',
            icon: 'alternate_email',
            background_color: '#f5af19',
          },
        ],
      }
    };

    this._configService.next(config);

    return of(config);
  }
}
