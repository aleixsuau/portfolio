import { ContentService } from './../../../../core/services/content/content.service';
import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PortfolioResolverService implements Resolve<IWork[]> {

  constructor(
    private contentService: ContentService,
  ) { }

  resolve() {
    return this.contentService.getWorks();
  }
}
