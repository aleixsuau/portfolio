import { TestBed } from '@angular/core/testing';

import { ContentResolverService } from './content.resolver';

describe('ContentResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContentResolverService = TestBed.get(ContentResolverService);
    expect(service).toBeTruthy();
  });
});
