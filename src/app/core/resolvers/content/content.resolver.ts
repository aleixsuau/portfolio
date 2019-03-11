import { Injectable } from '@angular/core';
import { ContentService } from '../../services/content/content.service';


@Injectable({
  providedIn: 'root'
})
export class ContentResolverService {

  constructor(
    private contentService: ContentService,
  ) { }

  resolve() {
    return this.contentService.getAllContent();
  }
}
