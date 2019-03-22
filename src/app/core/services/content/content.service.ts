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
        image: 'https://images.ctfassets.net/5jh3ceokw2vz/2P9Phed9zwojH6Ly1A9Pv2/cc86e36792d6b78eae6c69914bbf6231/Scientific_Diagrams_W.jpg?w=450',
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
        image: 'https://images.ctfassets.net/5jh3ceokw2vz/31kaQjkIx24aQS60EkSa26/797ad2ef4eaa8eefa16141e7ebcbc87c/fci_thumb.jpg?w=450',
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
        image: 'https://images.ctfassets.net/5jh3ceokw2vz/4BXyaen1pKiWeIYw2wy2qI/a30bf0db235238a2b1e6f0127fbb58d9/_0169_CROWD_2.jpg?w=450',
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
        image: 'https://images.ctfassets.net/5jh3ceokw2vz/3CrMZTCDUcQIakS0cqUgmE/4dff9958ed7ca3738f5f17eaebe64989/_0197_andkas1gl_1920x1200_2.jpg?w=450',
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
        image: 'https://images.ctfassets.net/5jh3ceokw2vz/2P9Phed9zwojH6Ly1A9Pv2/cc86e36792d6b78eae6c69914bbf6231/Scientific_Diagrams_W.jpg?w=450',
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
        image: 'https://images.ctfassets.net/5jh3ceokw2vz/2P9Phed9zwojH6Ly1A9Pv2/cc86e36792d6b78eae6c69914bbf6231/Scientific_Diagrams_W.jpg?w=450',
        link: 'https://stackblitz.com/edit/help-hint?embed=1&file=app/app.component.ts',
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
        image: 'https://images.ctfassets.net/5jh3ceokw2vz/3CrMZTCDUcQIakS0cqUgmE/4dff9958ed7ca3738f5f17eaebe64989/_0197_andkas1gl_1920x1200_2.jpg?w=450',
        link: 'https://stackblitz.com/edit/help-hint?embed=1&file=app/app.component.ts',
        categories: [
          {
            title: 'code',
            icon: 'code',
          }
        ],
      },
    ]);
  }

  getAllContent() {
    return this.getWorks();
  }
}
