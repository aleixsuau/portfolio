import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { publishReplay, refCount } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private _menu = new BehaviorSubject<IMenu>(null);
  readonly menu$ = this._menu.asObservable().pipe(publishReplay(1), refCount());

  private _activeSection = new BehaviorSubject<IMenuSection>(null);
  readonly activeSection$ = this._activeSection.asObservable().pipe(publishReplay(1), refCount());

  constructor() {}

  loadMenu(menu: IMenu) {
    this._menu.next(menu);
    this._activeSection.next(menu.sections[0]);
  }

  setActiveSection(sectionIndex: number) {
    const activeSection = this._menu.getValue().sections[sectionIndex];

    this._activeSection.next(activeSection);
  }
}
