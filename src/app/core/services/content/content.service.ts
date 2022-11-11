import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getWorks(): Observable<ICollectionItem[]> {
    return this.httpClient.get<ICollectionItem[]>('https://portfolio-aleix.firebaseio.com/works.json');
  }

  getPosts(): Observable<ICollectionItem[]> {
    return this.httpClient.get<ICollectionItem[]>('https://portfolio-aleix.firebaseio.com/posts.json');
  }

  getAllContent() {
    return forkJoin({
      works: this.getWorks(),
      posts: this.getPosts(),
    })
  }
}
