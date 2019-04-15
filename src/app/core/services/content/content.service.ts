import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getWorks(): Observable<IWork[]> {
    return this.httpClient.get<IWork[]>('https://portfolio-aleix.firebaseio.com/works.json');
  }

  getAllContent() {
    return this.getWorks();
  }
}
