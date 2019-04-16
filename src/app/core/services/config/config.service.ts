import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { publishReplay, refCount, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _configService = new BehaviorSubject<IAppConfig>(null);
  readonly $config = this._configService.asObservable().pipe(publishReplay(1), refCount());

  constructor(
    private httpClient: HttpClient,
  ) { }

  getConfig(): Observable<IAppConfig> {
    return this.httpClient
                  .get<IAppConfig>('https://portfolio-aleix.firebaseio.com/config.json')
                  .pipe(
                    map(config => {
                      this._configService.next(config);

                      return config;
                    })
                  );
  }
}
