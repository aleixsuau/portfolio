import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  constructor() { }

  getWorks(): Observable<IWork[]> {
    return of([
      {
        id: '1',
        title: 'Work 1',
        description: 'This is work 1',
        image: '/assets/img/ngx-medium-widget.png',
        link: 'https://stackblitz.com/edit/ngx-medium-posts-widget?embed=1&file=src/app/ngx-medium-widget/component/medium-widget/medium-widget.component.ts',
        categories: [
          {
            title: 'code',
            icon: 'code',
          }
        ],
      },
      {
        id: '2',
        title: 'Work 2',
        description: 'This is work 2',
        image: '/assets/img/ngx-medium-widget.png',
        link: 'https://stackblitz.com/edit/help-hint?embed=1&file=app/app.component.ts',
        categories: [
          {
            title: 'code',
            icon: 'code',
          }
        ],
      },
      {
        id: '1',
        title: 'Work 1',
        description: 'This is work 1',
        image: '/assets/img/ngx-medium-widget.png',
        link: 'https://stackblitz.com/edit/ngx-medium-posts-widget?embed=1&file=src/app/ngx-medium-widget/component/medium-widget/medium-widget.component.ts',
        categories: [
          {
            title: 'code',
            icon: 'code',
          }
        ],
      },
      {
        id: '2',
        title: 'Work 2',
        description: 'This is work 2',
        image: '/assets/img/ngx-medium-widget.png',
        link: 'https://stackblitz.com/edit/help-hint?embed=1&file=app/app.component.ts',
        categories: [
          {
            title: 'code',
            icon: 'code',
          }
        ],
      },
      {
        id: '1',
        title: 'Work 1',
        description: 'This is work 1',
        image: '/assets/img/ngx-medium-widget.png',
        link: 'https://stackblitz.com/edit/ngx-medium-posts-widget?embed=1&file=src/app/ngx-medium-widget/component/medium-widget/medium-widget.component.ts',
        categories: [
          {
            title: 'code',
            icon: 'code',
          }
        ],
      },
      {
        id: '2',
        title: 'Work 2',
        description: 'This is work 2',
        image: '/assets/img/ngx-medium-widget.png',
        link: 'https://stackblitz.com/edit/help-hint?embed=1&file=app/app.component.ts',
        categories: [
          {
            title: 'code',
            icon: 'code',
          }
        ],
      }
    ]);
  }

  getAllContent() {
    return this.getWorks();
  }
}
